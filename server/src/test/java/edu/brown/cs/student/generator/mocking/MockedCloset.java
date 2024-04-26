package edu.brown.cs.student.generator.mocking;

import edu.brown.cs.student.main.server.clothing.enums.Category;
import edu.brown.cs.student.main.server.clothing.enums.Formality;
import edu.brown.cs.student.main.server.clothing.enums.Material;
import edu.brown.cs.student.main.server.clothing.enums.Shape;
import edu.brown.cs.student.main.server.clothing.records.Clothing;
import edu.brown.cs.student.main.server.clothing.records.Color;
import edu.brown.cs.student.main.server.clothing.records.Palette;
import java.util.ArrayList;

public class MockedCloset {
  public MockedCloset() {}

  public ArrayList<Clothing> getClothing() {
    ArrayList<Clothing> closet = new ArrayList<>();
    closet.add(
        new Clothing(
            1,
            Category.TOP,
            Shape.LONG_SLEEVE,
            Formality.FLEX,
            new Palette(new Color(1.0, 1.0, 1.0), new Color(0.0, 0.0, 0.0)),
            Material.WOOL_COTTON));

    closet.add(
        new Clothing(
            2,
            Category.TOP,
            Shape.NO_SLEEVE,
            Formality.FLEX,
            new Palette(new Color(1.0, 1.0, 1.0), new Color(1.0, 0.0, 0.0)),
            Material.STRETCHY_SPANDEX));

    closet.add(
        new Clothing(
            3,
            Category.FULL_BODY,
            Shape.DRESS,
            Formality.FLEX,
            new Palette(new Color(0.0, 0.0, 0.0), new Color(0.0, 0.0, 0.0)),
            Material.SOFT_FUR));

    closet.add(
        new Clothing(
            4,
            Category.SHOE,
            Shape.SHOES,
            Formality.FLEX,
            new Palette(new Color(1.0, 0.0, 0.0), new Color(0.0, 0.0, 0.0)),
            Material.NOT_APPLICABLE));

    closet.add(
        new Clothing(
            5,
            Category.ACCESSORY,
            Shape.CAP,
            Formality.FLEX,
            new Palette(new Color(0.7, 0.7, 0.0), new Color(0.0, 0.0, 0.0)),
            Material.WOOL_COTTON));

    closet.add(
        new Clothing(
            6,
            Category.OUTERWEAR,
            Shape.JACKET,
            Formality.FLEX,
            new Palette(new Color(0.2, 0.2, 0.2), new Color(0.0, 0.0, 0.0)),
            Material.PLASTIC_NYLON));

    closet.add(
        new Clothing(
            7,
            Category.BOTTOM,
            Shape.PANTS,
            Formality.FLEX,
            new Palette(new Color(0.0, 0.0, 0.2), new Color(0.0, 0.0, 0.0)),
            Material.DENIM));

    return closet;
  }
}
