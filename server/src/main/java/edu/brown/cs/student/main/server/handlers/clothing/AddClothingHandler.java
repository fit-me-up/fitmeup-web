package edu.brown.cs.student.main.server.handlers.clothing;

import edu.brown.cs.student.main.server.handlers.Utils;
import edu.brown.cs.student.main.server.storage.StorageInterface;
import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * AddClothingHandler is called by the add clothing endpoint in server, and works to add an item of
 * clothing to the user's closet.
 */
public class AddClothingHandler implements Route {

  public StorageInterface storageHandler;

  public AddClothingHandler(StorageInterface storageHandler) {
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
      // Collect parameters from the request to build a clothing item.
      String uid = request.queryParams("uid");
      String id = request.queryParams("id");
      String category = request.queryParams("category");
      String type = request.queryParams("type");
      String formality = request.queryParams("formality");
      String colors = request.queryParams("colors");
      String material = request.queryParams("material");

      Map<String, Object> data = new HashMap<>();
      String clothing =
          id + "," + category + "," + type + "," + formality + "," + colors + "," + material;
      data.put("clothing", clothing);
      String clothingId = "clothing-" + id;

      // Use the storage handler to add the document to the database.
      this.storageHandler.addDocument(uid, "clothing", clothingId, data);

      responseMap.put("response_type", "success");
      responseMap.put("clothing", Utils.fromStringClothing(clothing));
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
