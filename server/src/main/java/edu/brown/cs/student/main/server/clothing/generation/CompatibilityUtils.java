package edu.brown.cs.student.main.server.clothing.generation;

import edu.brown.cs.student.main.server.clothing.records.Clothing;
import edu.brown.cs.student.main.server.clothing.records.Color;
import edu.brown.cs.student.main.server.clothing.records.Palette;
import edu.brown.cs.student.main.server.handlers.nwsapi.datasource.weather.WeatherData;
import java.util.ArrayList;

public class CompatibilityUtils {

  public CompatibilityUtils() {}

  public double colorBaseComp(Color option, Color existing) {
    double comp = 0;

    // Here we will try to decide whether the color is similar by ratios.
    double r1 = option.r();
    double g1 = option.g();
    double b1 = option.b();
    double discount1 = r1 + g1 + b1;

    // Normalize the values.
    r1 = r1 / discount1;
    g1 = g1 / discount1;
    b1 = b1 / discount1;

    double r2 = existing.r();
    double g2 = existing.g();
    double b2 = existing.b();
    double discount2 = r2 + g2 + b2;

    r2 = r2 / discount2;
    g2 = g2 / discount2;
    b2 = b2 / discount2;

    double err = (Math.abs(r1 - r2) + Math.abs(b1 - b2) + Math.abs(g1 - g2)) / 3;
    comp = 1.0 - err;

    if (comp < 0.4) {
      return 0;
    } else return comp;
  }

  public double colorValueComp(Color option, Color existing) {
    double comp = 0;

    // Here, we will be taking effectively the saturation of the color.
    double r1 = option.r();
    double g1 = option.g();
    double b1 = option.b();
    double sat1 = (r1 + g1 + b1) / 3.0;

    double r2 = existing.r();
    double g2 = existing.g();
    double b2 = existing.b();
    double sat2 = (r2 + g2 + b2) / 3.0;

    double diff = Math.abs(sat1 - sat2);
    comp = 1 - diff;

    if (comp < 0.6) {
      return 0;
    } else return comp;
  }

  public double paletteComp(Palette option, Palette existing) {
    // Compatibility with primary color.
    int numComps = 0;
    double pToP = 0;
    double pToS = 0;
    double sToP = 0;
    double sToS = 0;

    pToP =
        colorBaseComp(option.primary(), existing.primary())
            + colorValueComp(option.primary(), existing.primary());
    numComps++;

    if (existing.accent() != null) {
      pToS =
          colorBaseComp(option.primary(), existing.accent())
              + colorValueComp(option.primary(), existing.accent());
      numComps++;
    }

    if (option.accent() != null) {
      sToP =
          colorBaseComp(option.accent(), existing.primary())
              + colorValueComp(option.accent(), existing.primary());
      numComps++;
    }

    if (option.accent() != null && existing.accent() != null) {
      sToS =
          colorBaseComp(option.accent(), existing.accent())
              + colorValueComp(option.accent(), existing.accent());
      numComps++;
    }

    // Return an average.
    return (pToP + pToS + sToS + sToP) / numComps;
  }

  private double colorComp(Clothing option, ArrayList<Clothing> existing) {
    double n = existing.size();
    boolean penalty = false;

    if (n == 0) {
      return 1;
    }

    double agg = 0;
    for (Clothing test : existing) {
      double colorCompat = paletteComp(option.colors(), test.colors());

      // Penalty if any specific item compatibility is too low.
      if (colorCompat < 0.5) {
        penalty = true;
      }
      agg += colorCompat;
    }

    // If it has a color compat of less than 0.5 with any of the existing clothing items...
    if (penalty) {
      return (agg / n) / 2;
    }

    return (agg / n);
  }

  private double materialComp(Clothing option, ArrayList<Clothing> existing) {
    double n = existing.size();

    if (n == 0) {
      return 1;
    }

    double agg = 0;
    for (Clothing test : existing) {
      agg += option.material().compatWith(test.material());
    }
    return (agg / n);
  }

  private double weatherComp(Clothing option, WeatherData weather) {
    return 1;
  }

  public Clothing pickBest(
      ArrayList<Clothing> options, ArrayList<Clothing> existing, WeatherData weather) {
    Clothing best = options.get(0);

    double bestScore = 0;
    double currScore;
    for (Clothing option : options) {
      if ((currScore = this.getCompatibility(option, existing, weather)) > bestScore) {
        bestScore = currScore;
        best = option;
      }
    }
    return best;
  }

  private double getCompatibility(
      Clothing option, ArrayList<Clothing> existing, WeatherData weather) {
    double weatherComp = this.weatherComp(option, weather);
    double materialComp = this.materialComp(option, existing);
    double colorComp = this.colorComp(option, existing);

    return weatherComp + materialComp + (3 * colorComp);
  }
}
