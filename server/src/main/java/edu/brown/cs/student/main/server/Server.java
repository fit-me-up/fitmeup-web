package edu.brown.cs.student.main.server;

import static spark.Spark.after;

import edu.brown.cs.student.main.server.handlers.AddClothingHandler;
import edu.brown.cs.student.main.server.handlers.ClearUserHandler;
import edu.brown.cs.student.main.server.handlers.ListClothingHandler;
import edu.brown.cs.student.main.server.handlers.RemoveClothingHandler;
import edu.brown.cs.student.main.server.handlers.nwsapi.WeatherHandler;
import edu.brown.cs.student.main.server.handlers.nwsapi.datasource.weather.NWSAPIWeatherSource;
import edu.brown.cs.student.main.server.handlers.nwsapi.datasource.weather.WeatherDatasource;
import edu.brown.cs.student.main.server.storage.FirebaseUtilities;
import edu.brown.cs.student.main.server.storage.StorageInterface;
import java.io.IOException;
import spark.Filter;
import spark.Spark;

/** Top Level class for our project, utilizes spark to create and maintain our server. */
public class Server {

  public static void setUpServer(WeatherDatasource datasource) {
    int port = 3232;
    Spark.port(port);

    after(
        (Filter)
            (request, response) -> {
              response.header("Access-Control-Allow-Origin", "*");
              response.header("Access-Control-Allow-Methods", "*");
            });

    StorageInterface firebaseUtils;
    try {
      firebaseUtils = new FirebaseUtilities();

      Spark.get("add-clothing", new AddClothingHandler(firebaseUtils));
      Spark.get("list-clothing", new ListClothingHandler(firebaseUtils));
      Spark.get("remove-clothing", new RemoveClothingHandler(firebaseUtils));
      Spark.get("clear-user", new ClearUserHandler(firebaseUtils));
      Spark.get("weather", new WeatherHandler(datasource));

      Spark.notFound(
          (request, response) -> {
            response.status(404); // Not Found
            return "404 Not Found - The requested endpoint does not exist.";
          });

      Spark.init();
      Spark.awaitInitialization();

      System.out.println("Server started at http://localhost:" + port);
    } catch (IOException e) {
      e.printStackTrace();
      System.err.println(
          "Error: Could not initialize Firebase. Likely due to firebase_config.json not being found. Exiting.");
      System.exit(1);
    }
  }

  /**
   * Runs Server.
   *
   * @param args none
   */
  public static void main(String[] args) {
    setUpServer(new NWSAPIWeatherSource());
  }
}
