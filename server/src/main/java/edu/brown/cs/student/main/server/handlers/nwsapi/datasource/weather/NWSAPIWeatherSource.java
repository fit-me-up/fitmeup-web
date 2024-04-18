package edu.brown.cs.student.main.server.handlers.nwsapi.datasource.weather;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import edu.brown.cs.student.main.server.handlers.nwsapi.datasource.DatasourceException;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.*;
import okio.Buffer;

/**
 * A datasource for weather forecasts via NWS API. This class uses the _real_ API to return results.
 * It has no caching in itself, and is focused on working with the real API.
 */
public class NWSAPIWeatherSource implements WeatherDatasource {

  private static GridResponse resolveGridCoordinates(double lat, double lon)
      throws DatasourceException {
    try {
      URL requestURL = new URL("https", "api.weather.gov", "/points/" + lat + "," + lon);
      HttpURLConnection clientConnection = connect(requestURL);
      Moshi moshi = new Moshi.Builder().build();

      JsonAdapter<GridResponse> adapter = moshi.adapter(GridResponse.class).nonNull();
      // NOTE: important! pattern for handling the input stream
      GridResponse body =
          adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
      clientConnection.disconnect();
      if (body == null || body.properties() == null || body.properties().gridId() == null)
        throw new DatasourceException("Malformed response from NWS");
      return body;
    } catch (IOException e) {
      throw new DatasourceException(e.getMessage());
    }
  }

  /**
   * Private helper method; throws IOException so different callers can handle differently if
   * needed.
   */
  private static HttpURLConnection connect(URL requestURL) throws DatasourceException, IOException {
    URLConnection urlConnection = requestURL.openConnection();
    if (!(urlConnection instanceof HttpURLConnection))
      throw new DatasourceException("unexpected: result of connection wasn't HTTP");
    HttpURLConnection clientConnection = (HttpURLConnection) urlConnection;
    clientConnection.connect(); // GET
    if (clientConnection.getResponseCode() != 200)
      throw new DatasourceException(
          "unexpected: API connection not success status: "
              + clientConnection.getResponseMessage());
    return clientConnection;
  }

  /**
   * Given a geolocation, find the current weather at that location by invoking the NWS API. This
   * method will make real web requests.
   *
   * @param loc the location to find weather at
   * @return the current weather at the given location
   * @throws DatasourceException if there is an issue obtaining the data from the API
   */
  @Override
  public WeatherData getCurrentWeather(Geolocation loc)
      throws DatasourceException, IllegalArgumentException {
    return getCurrentWeather(loc.lat(), loc.lon());
  }

  private static WeatherData getCurrentWeather(double lat, double lon)
      throws DatasourceException, IllegalArgumentException {
    try {
      // Double-check that the coordinates are valid.
      if (!Geolocation.isValidGeolocation(lat, lon)) {
        throw new IllegalArgumentException("Invalid geolocation");
      }

      // NWS is not robust to high precision; limit to X.XXXX
      lat = Math.floor(lat * 10000.0) / 10000.0;
      lon = Math.floor(lon * 10000.0) / 10000.0;

      GridResponse gridResponse = resolveGridCoordinates(lat, lon);
      String gid = gridResponse.properties().gridId();
      String gx = gridResponse.properties().gridX();
      String gy = gridResponse.properties().gridY();

      URL requestURL =
          new URL("https", "api.weather.gov", "/gridpoints/" + gid + "/" + gx + "," + gy);
      HttpURLConnection clientConnection = connect(requestURL);
      Moshi moshi = new Moshi.Builder().build();

      JsonAdapter<ForecastResponse> adapter = moshi.adapter(ForecastResponse.class).nonNull();

      ForecastResponse body =
          adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

      clientConnection.disconnect();

      // Validity checks for response
      if (body == null
          || body.properties() == null
          || body.properties().maxTemperature() == null
          || body.properties().minTemperature() == null) {
        throw new DatasourceException("Malformed response from NWS");
      }

      List<ForecastResponseTempValue> highs = body.properties().maxTemperature().values();
      List<ForecastResponseTempValue> lows = body.properties().minTemperature().values();

      if (highs.isEmpty() || lows.isEmpty()) {
        throw new DatasourceException("Could not obtain weather data from NWS");
      }

      int high = convertToF(highs.get(0).value());
      int low = convertToF(lows.get(0).value());
      return new WeatherData(high, low, highs.get(0).validTime().split("T")[0]);

    } catch (IOException e) {
      throw new DatasourceException(e.getMessage(), e);
    }
  }

  private static int convertToF(double c) {
    return (int) Math.round(c * 9.0 / 5.0 + 32.0);
  }

  // //////////////////////////////////////////////////////////////
  // NWS API data classes. These must be public for Moshi.
  ////////////////////////////////////////////////////////////////

  public record GridResponse(String id, GridResponseProperties properties) {}

  public record GridResponseProperties(
      String gridId, String gridX, String gridY, String timeZone, String radarStation) {}

  public record ForecastResponse(String id, ForecastResponseProperties properties) {}

  public record ForecastResponseProperties(
      String updateTime,
      ForecastResponseTemperature maxTemperature,
      ForecastResponseTemperature minTemperature) {}

  public record ForecastResponseTemperature(String uom, List<ForecastResponseTempValue> values) {}

  public record ForecastResponseTempValue(String validTime, double value) {}
}
