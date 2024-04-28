package edu.brown.cs.student.main.server.handlers.clothing;

import edu.brown.cs.student.main.server.clothing.records.Clothing;
import edu.brown.cs.student.main.server.handlers.Utils;
import edu.brown.cs.student.main.server.storage.StorageInterface;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class RemoveClothingHandler implements Route {

  private StorageInterface storageHandler;

  public RemoveClothingHandler(StorageInterface storageHandler) {
    this.storageHandler = storageHandler;
  }

  @Override
  public Object handle(Request request, Response response) {
    Map<String, Object> responseMap = new HashMap<>();
    try {
      String uid = request.queryParams("uid");
      String id = request.queryParams("id");

      this.storageHandler.deleteDocument(
          this.storageHandler.getDocumentReference(uid, "clothing", "clothing-" + id));

      List<Map<String, Object>> vals = this.storageHandler.getCollection(uid, "clothing");

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
