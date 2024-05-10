package edu.brown.cs.student.main.server.clothing.generation;

import edu.brown.cs.student.main.server.clothing.enums.Category;
import edu.brown.cs.student.main.server.clothing.enums.Formality;
import edu.brown.cs.student.main.server.clothing.enums.Subcategory;
import edu.brown.cs.student.main.server.clothing.records.Clothing;
import edu.brown.cs.student.main.server.clothing.records.CompatibilityPair;
import edu.brown.cs.student.main.server.clothing.records.Outfit;
import edu.brown.cs.student.main.server.handlers.nwsapi.datasource.weather.WeatherData;
import java.util.ArrayList;

public class Generator {

  private CompatibilityUtils comper;
  private ClosetData closet;

  public Generator(ClosetData myCloset) {
    this.closet = myCloset;
    this.comper = new CompatibilityUtils();
  }

  public Outfit generateOutfit(WeatherData weatherData, Formality formality) {
    // Tracking current outfit for compatibility
    ArrayList<Clothing> selectedItems = new ArrayList<>();

    Clothing full = null;
    Clothing top = null;
    Clothing bot = null;
    Clothing outerwear = null;
    Clothing accessory = null;
    Clothing shoe;

    // Decide if it will be a full body outfit
    boolean isFull = useFullBody(formality);

    // Pick the full body or top and bottom
    if (isFull) {
      full = this.addItem(formality, weatherData, selectedItems, Category.FULL_BODY);
    } else {
      top = this.addItem(formality, weatherData, selectedItems, Category.TOP);
      bot = this.addItem(formality, weatherData, selectedItems, Category.BOTTOM);
    }

    // Add a shoe
    shoe = this.addItem(formality, weatherData, selectedItems, Category.SHOE);

    // Decide if jacket needed and pick one
    if (this.useJacket(weatherData)) {
      outerwear = this.addItem(formality, weatherData, selectedItems, Category.OUTERWEAR);
    }

    // Decide if accessory needed and pick one
    accessory = this.addItem(formality, weatherData, selectedItems, Category.ACCESSORY);

    // Apply outfit rules and return the outfit
    return this.applyRules(top, bot, shoe, outerwear, full, accessory, weatherData, formality);
  }

  private Clothing addItem(
      Formality formality,
      WeatherData weather,
      ArrayList<Clothing> selectedItems,
      Category category) {

    CompatibilityPair pair;

    // Get the list of possible options
    ArrayList<Clothing> options = this.closet.getRandItem(formality, category);

    // If there are options, pick the best one and add to list
    if (!options.isEmpty()) {
      pair = this.comper.pickBest(options, selectedItems, weather);
      Clothing item = pair.clothing();
      Double score = pair.score();

      // Get an accessory only if the best score is above 6.9
      if (score < 6.9 && category == Category.ACCESSORY) {
        return null;
      }

      selectedItems.add(item);
      return item;
    } else {
      return null;
    }
  }

  private boolean useJacket(WeatherData weatherData) {
    // Get a weighted average of the day's temperature
    double temp =
        ((double) (weatherData.high() + weatherData.low() + 2 * weatherData.current())) / 4.0;

    // Constrain it between 0 and 100, and then scale to 0-1
    temp = Math.max(temp, 0.0);
    temp = Math.min(temp, 100.0);
    double scaled = temp / 100.0;

    // Hard limits
    if (scaled < 0.4) {
      // Yes jacket if below 40
      return true;
    } else if (scaled > 0.78) {
      // No jacket if above 76
      return false;
    } else {
      // Else, the probability of a jacket is the inverse of the temperature
      double chance = Math.random();
      return chance > scaled;
    }
  }

  private boolean useFullBody(Formality formality) {
    double fullRatio;

    // fullRatio is the number of full body items / total full body and tops
    if ((fullRatio = this.closet.hasFullBody(formality)) > 0) {
      double chance = Math.random();
      return chance < fullRatio;
    } else {
      return false;
    }
  }

  private Outfit applyRules(
      Clothing top,
      Clothing bot,
      Clothing shoe,
      Clothing outerwear,
      Clothing full,
      Clothing accessory,
      WeatherData weather,
      Formality formality) {

    // No sweatshirt on a dress
    if (full != null && outerwear != null) {
      if (full.subcategory() == Subcategory.DRESS
          && outerwear.subcategory() == Subcategory.SWEATSHIRT) {
        outerwear = null;
      }
    }

    // No outerwear with a suit
    if (full != null && outerwear != null) {
      if (full.subcategory() == Subcategory.SUIT) {
        outerwear = null;
      }
    }

    // No scarf with a tank top
    if (top != null && accessory != null) {
      if (top.subcategory() == Subcategory.NO_SLEEVE
          && accessory.subcategory() == Subcategory.SCARF) {
        accessory = null;
      }
    }

    // No hat with a suit
    if (full != null && accessory != null) {
      if (full.subcategory() == Subcategory.SUIT
          && accessory.subcategory() == Subcategory.HEADWEAR) {
        accessory = null;
      }
    }

    return new Outfit(top, bot, shoe, outerwear, full, accessory);
  }
}
