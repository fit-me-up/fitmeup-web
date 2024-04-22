package edu.brown.cs.student.main.server.clothing.generation;

import edu.brown.cs.student.main.server.clothing.enums.Category;
import edu.brown.cs.student.main.server.clothing.enums.Formality;
import edu.brown.cs.student.main.server.clothing.records.Clothing;
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
    ArrayList<Clothing> selectedItems = new ArrayList<>();

    boolean isFull = useFullBody(formality);

    Clothing full = null;
    Clothing top = null;
    Clothing bot = null;
    Clothing outerwear = null;
    Clothing accessory = null;
    Clothing shoe;

    if (isFull) {
      full = this.addItem(formality, weatherData, selectedItems, Category.FULL_BODY, 1);
    } else {
      top = this.addItem(formality, weatherData, selectedItems, Category.TOP, 1);
      bot = this.addItem(formality, weatherData, selectedItems, Category.BOTTOM, 10);
    }

    shoe = this.addItem(formality, weatherData, selectedItems, Category.SHOE, 5);

    if (this.useJacket(weatherData)) {
      outerwear = this.addItem(formality, weatherData, selectedItems, Category.OUTERWEAR, 10);
    }

    if (this.useAccessory()) {
      accessory = this.addItem(formality, weatherData, selectedItems, Category.ACCESSORY, 5);
    }

    return new Outfit(isFull, top, bot, shoe, outerwear, full, accessory);
  }

  private Clothing addItem(
      Formality formality,
      WeatherData weather,
      ArrayList<Clothing> selectedItems,
      Category category,
      int n) {
    ArrayList<Clothing> accessoryOptions = this.closet.getRandItem(formality, category, n);
    Clothing item = this.comper.pickBest(accessoryOptions, selectedItems, weather);
    selectedItems.add(item);
    return item;
  }

  private boolean useJacket(WeatherData weatherData) {
    double temp =
        ((double)
                (weatherData.high()
                    + weatherData.low()
                    + weatherData.current()
                    + weatherData.current()))
            / 4.0;
    temp = Math.max(temp, 0.0);
    temp = Math.min(temp, 100.0);
    double scaled = temp / 100.0;

    // Hard limits
    if (scaled < 0.3) {
      return true;
    } else if (scaled > 0.7) {
      return false;
    } else {
      double chance = Math.random();
      return chance > scaled;
    }
  }

  private boolean useAccessory() {
    double chance = Math.random();
    return chance < 0.5;
  }

  private boolean useFullBody(Formality formality) {
    double fullRatio;
    if ((fullRatio = this.closet.hasFullBody(formality)) > 0) {
      double chance = Math.random();
      return chance < fullRatio;
    } else {
      return false;
    }
  }
}
