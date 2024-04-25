package edu.brown.cs.student.main.server.clothing.generation;

import edu.brown.cs.student.main.server.clothing.data.ClosetSource;
import edu.brown.cs.student.main.server.clothing.enums.Category;
import edu.brown.cs.student.main.server.clothing.enums.Formality;
import edu.brown.cs.student.main.server.clothing.records.Clothing;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Random;

public class ClosetData {

  private HashMap<Category, HashMap<Formality, HashMap<Integer, Clothing>>> closet;
  private ArrayList<Clothing> clothingList;

  private ClosetSource source;

  public ClosetData(ClosetSource source) {
    this.source = source;
    this.clothingList = this.loadClothing();
    this.initializeCloset();
    this.loadCloset();
  }

  private void initializeCloset() {
    this.closet = new HashMap<>();

    this.closet.put(Category.TOP, new HashMap<>());
    this.closet.put(Category.BOTTOM, new HashMap<>());
    this.closet.put(Category.SHOE, new HashMap<>());
    this.closet.put(Category.FULL_BODY, new HashMap<>());
    this.closet.put(Category.OUTERWEAR, new HashMap<>());
    this.closet.put(Category.ACCESSORY, new HashMap<>());

    for (HashMap<Formality, HashMap<Integer, Clothing>> formalityMap : this.closet.values()) {
      formalityMap.put(Formality.FORMAL, new HashMap<>());
      formalityMap.put(Formality.INFORMAL, new HashMap<>());
      formalityMap.put(Formality.FLEX, new HashMap<>());
    }
  }

  private void loadCloset() {
    for (Clothing item : this.clothingList) {
      this.closet.get(item.category()).get(item.formality()).put(item.id(), item);

      if (item.formality() == Formality.FLEX) {
        this.closet.get(item.category()).get(Formality.INFORMAL).put(item.id(), item);
        this.closet.get(item.category()).get(Formality.FORMAL).put(item.id(), item);
      }
    }
  }

  private ArrayList<Clothing> loadClothing() {
    // GET CLOTHING LIST FROM DATABASE
    return this.source.getClothing();
  }

  public ArrayList<Clothing> getRandItem(Formality formality, Category category, int n) {
    ArrayList<Clothing> randList = new ArrayList<>();
    HashMap<Integer, Clothing> items = this.closet.get(category).get(formality);
    int numItems = items.size();
    if (numItems > 0) {
      for (int i = 0; i < n; i++) {
        Random random = new Random();
        int randomIndex = random.nextInt(numItems);

        int counter = 0;
        for (Clothing item : items.values()) {
          if (counter == randomIndex) {
            randList.add(item);
          }
          counter++;
        }
      }
    }
    return randList;
  }

  public double hasFullBody(Formality formality) {
    double numFull = this.closet.get(Category.FULL_BODY).get(formality).size();
    double numTops = this.closet.get(Category.TOP).get(formality).size();
    return (numFull / (numTops + numFull));
  }
}
