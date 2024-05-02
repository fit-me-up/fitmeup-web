package edu.brown.cs.student.main.server.handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.server.clothing.enums.*;
import edu.brown.cs.student.main.server.clothing.records.Clothing;
import edu.brown.cs.student.main.server.clothing.records.Color;
import edu.brown.cs.student.main.server.clothing.records.Palette;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

public class Utils {

  /**
   * Function that converts an object into a JSON.
   *
   * @param map the map to convert.
   * @return the data in JSON format.
   */
  public static String toMoshiJson(Map<String, Object> map) {
    Moshi moshi = new Moshi.Builder().build();
    Type mapStringObject = Types.newParameterizedType(Map.class, String.class, Object.class);
    JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapStringObject);

    return adapter.toJson(map);
  }

  /**
   * Parses JSON data from a JsonReader and converts it to the specified target type.
   *
   * @param source The JsonReader containing the JSON data.
   * @param targetType The Class representing the target data type to convert the JSON to.
   * @param <T> The generic type of the target data.
   * @return An instance of the target data type parsed from the JSON.
   * @throws IOException if there's an error reading or parsing the JSON data.
   */
  public static <T> T fromJsonGeneral(String source, Class<T> targetType) throws IOException {
    Moshi moshi = new Moshi.Builder().build();
    JsonAdapter<T> adapter = moshi.adapter(targetType);

    return adapter.fromJson(source);
  }

  /**
   * Converts a string to a clothing object.
   *
   * @param clothing the string to convert.
   * @return the clothing object.
   */
  public static Clothing fromStringClothing(String clothing) {
    String[] parts = clothing.split(",");
    int id = Integer.parseInt(parts[0]);
    Category cat = Category.values()[Integer.parseInt(parts[1])];
    Subcategory subcat = Subcategory.values()[Integer.parseInt(parts[2])];
    Formality formality = Formality.values()[Integer.parseInt(parts[3])];
    Palette palette = new Palette(hexToRGB(parts[4]), hexToRGB(parts[5]));
    Material material = Material.values()[Integer.parseInt(parts[6])];

    return new Clothing(id, cat, subcat, formality, palette, material);
  }

  /*
   * Converts a clothing object to a string.
   *
   * @param clothing the clothing object to convert.
   * @return the string representation of the clothing object.
   */
  public static String toStringFromClothing(Clothing clothing) {
    Color prim = clothing.colors().primary();
    Color sec = clothing.colors().accent();
    String primary = rgbToHex(prim.r(), prim.g(), prim.b());
    String secondary = rgbToHex(sec.r(), sec.g(), sec.b());
    return clothing.id()
        + ","
        + clothing.category().ordinal()
        + ","
        + clothing.subcategory().ordinal()
        + ","
        + clothing.formality().ordinal()
        + ","
        + primary
        + ","
        + secondary
        + ","
        + clothing.material().ordinal();
  }

  public static Map<String, String> clothingToHashMap(Clothing clothing) {
    Map<String, String> map = new HashMap<>();
    String hexColor1 =
        rgbToHex(
            clothing.colors().primary().r(),
            clothing.colors().primary().g(),
            clothing.colors().primary().b());
    String hexColor2 =
        rgbToHex(
            clothing.colors().accent().r(),
            clothing.colors().accent().g(),
            clothing.colors().accent().b());
    map.put("id", Integer.toString(clothing.id()));
    map.put("category", Integer.toString(clothing.category().ordinal()));
    map.put("subcategory", Integer.toString(clothing.subcategory().ordinal()));
    map.put("formality", Integer.toString(clothing.formality().ordinal()));
    map.put("primary", hexColor1);
    map.put("accent", hexColor2);
    map.put("material", Integer.toString(clothing.material().ordinal()));
    return map;
  }

  public static String rgbToHex(double r, double g, double b) {
    int red = Math.min((int) (r * 255), 255);
    int green = Math.min((int) (g * 255), 255);
    int blue = Math.min((int) (b * 255), 255);
    return String.format("#%02x%02x%02x", red, green, blue);
  }

  public static Color hexToRGB(String hex) {
    double r = Integer.parseInt(hex.substring(1, 3), 16) / 255.0;
    double g = Integer.parseInt(hex.substring(3, 5), 16) / 255.0;
    double b = Integer.parseInt(hex.substring(5, 7), 16) / 255.0;

    return new Color(r, g, b);
  }
}
