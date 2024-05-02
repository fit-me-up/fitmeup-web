package edu.brown.cs.student.colors;

import edu.brown.cs.student.main.server.clothing.generation.CompatibilityUtils;
import edu.brown.cs.student.main.server.clothing.records.Color;
import org.junit.jupiter.api.Test;
import org.testng.Assert;

public class TestColor {

  @Test
  public void TestBaseCompat() {
    Color pink = new Color(1.0, 0.6, 1.0);
    Color lightRed = new Color(1.0, 0.6, 0.6);
    Color darkGreen = new Color(0.05, 0.3, 0.05);

    CompatibilityUtils comp = new CompatibilityUtils();

    Assert.assertTrue(comp.colorValueComp(pink, lightRed) > comp.colorValueComp(pink, darkGreen));
  }

  @Test
  public void TestValueCompat() {
    Color pink = new Color(1.0, 0.6, 1.0);
    Color lightRed = new Color(1.0, 0.6, 0.6);
    Color darkGreen = new Color(0.05, 0.3, 0.05);

    CompatibilityUtils comp = new CompatibilityUtils();

    Assert.assertTrue(comp.colorBaseComp(pink, lightRed) > comp.colorBaseComp(pink, darkGreen));
  }
}
