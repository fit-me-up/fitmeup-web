package edu.brown.cs.student.main.server.handlers;

import edu.brown.cs.student.main.server.clothing.records.Clothing;
import edu.brown.cs.student.main.server.storage.StorageInterface;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * ListClothingHandler is called by the list-clothing endpoint in server, and works to retrieve the
 * list of clothing associated with the user who created them.
 */
public class ListClothingHandler implements Route {

  public StorageInterface storageHandler;

  public ListClothingHandler(StorageInterface storageHandler) {
    this.storageHandler = storageHandler;
  }

  /**
   * Invoked when a request is made on this route's corresponding path
   *
   * @param request The request object providing information about the HTTP request
   * @param response The response object providing functionality for modifying the response
   * @return The content to be set in the response
   */
  @Override
  public Object handle(Request request, Response response) {
    Map<String, Object> responseMap = new HashMap<>();
    try {
      String uid = request.queryParams("uid");

      // Get all the pins for the user
      List<Map<String, Object>> vals = this.storageHandler.getCollection(uid, "clothing");

      // Convert the key,value map to just a list of the pins.
      List<String> clothingList =
          vals.stream().map(clothing -> clothing.get("clothing").toString()).toList();
      List<Clothing> clothingConverted =
          clothingList.stream().map(Utils::fromStringClothing).toList();
      responseMap.put("response_type", "success");
      responseMap.put("clothing", clothingConverted);
    } catch (Exception e) {
      // Error likely occurred in the storage handler.
      responseMap.put("response_type", "error");
      String[] parts = e.getClass().toString().split("\\.");
      responseMap.put("exception", parts[parts.length - 1]);
      responseMap.put("error_message", e.getMessage());
    }

    return Utils.toMoshiJson(responseMap);
  }
}
