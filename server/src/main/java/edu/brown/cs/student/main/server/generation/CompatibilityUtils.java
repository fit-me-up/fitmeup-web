package edu.brown.cs.student.main.server.generation;

import edu.brown.cs.student.main.server.enums.Formality;
import edu.brown.cs.student.main.server.handlers.nwsapi.datasource.weather.WeatherData;
import edu.brown.cs.student.main.server.records.Clothing;
import org.checkerframework.checker.units.qual.C;

import java.util.ArrayList;
import java.util.Map;

public class CompatibilityUtils {

  public CompatibilityUtils() {}

  private double colorBaseComp(Clothing option, Clothing existing) {
    return 1;
  }

  private double colorValueComp(Clothing option, Clothing existing) {
    return 1;
  }

  private double colorComp(Clothing option, ArrayList<Clothing> existing){
    double n = existing.size();
    boolean penalty = false;

    if (n == 0){
      return 1;
    }

    double agg = 0;
    for (Clothing test : existing){
      double colorCompat = Math.random();
      // DEFINE COLOR COMPAT HERE

      // Penalty if any specific one is too low
      if (colorCompat < 0.5){
        penalty = true;
      }

      agg += colorCompat;
    }

    if (penalty){
      return (agg / n) / 2;
    }
    return (agg / n);
  }

  private double materialComp(Clothing option, ArrayList<Clothing> existing) {
    double n = existing.size();

    if (n == 0){
      return 1;
    }

    double agg = 0;
    for (Clothing test : existing){
      agg += option.material().compatWith(test.material());
    }
    return (agg / n);
  }

  private double weatherComp(Clothing option, WeatherData weather){
    return 1;
  }

  public Clothing pickBest(ArrayList<Clothing> options, ArrayList<Clothing> existing, WeatherData weather){
    Clothing best = options.get(0);

    double bestScore = 0;
    double currScore;
    for (Clothing option : options){
      if ((currScore = this.getCompatibility(option, existing, weather)) > bestScore){
        bestScore = currScore;
        best = option;
      }
    }
    return best;
  }

  private double getCompatibility(Clothing option, ArrayList<Clothing> existing, WeatherData weather){
    double weatherComp = this.weatherComp(option, weather);
    double materialComp = this.materialComp(option, existing);
    double colorComp = this.colorComp(option, existing);

    return weatherComp + materialComp + (2 * colorComp);
  }
}
