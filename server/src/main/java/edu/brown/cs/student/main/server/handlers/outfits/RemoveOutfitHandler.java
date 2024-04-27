package edu.brown.cs.student.main.server.handlers.outfits;

import edu.brown.cs.student.main.server.handlers.Utils;
import edu.brown.cs.student.main.server.storage.StorageInterface;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class RemoveOutfitHandler implements Route {

  private StorageInterface storageHandler;

  public RemoveOutfitHandler(StorageInterface storageHandler) {
    this.storageHandler = storageHandler;
  }

  @Override
  public Object handle(Request request, Response response) {
    Map<String, Object> responseMap = new HashMap<>();
    try {
      String uid = request.queryParams("uid");
      String id = request.queryParams("id");

      this.storageHandler.deleteDocument(
          this.storageHandler.getDocumentReference(uid, "outfits", "outfit-" + id));

      List<Map<String, Object>> vals = this.storageHandler.getCollection(uid, "outfits");

      List<String> outfitList =
          vals.stream().map(outfit -> outfit.get("outfit").toString()).toList();

      responseMap.put("response_type", "success");
      responseMap.put("clothing", outfitList);

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
