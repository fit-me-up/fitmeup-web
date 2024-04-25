package edu.brown.cs.student.main.server.clothing.data;

import edu.brown.cs.student.main.server.clothing.records.Clothing;
import java.util.ArrayList;

public interface ClosetSource {
  public ArrayList<Clothing> getClothing();
}
