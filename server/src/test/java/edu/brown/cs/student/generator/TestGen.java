package edu.brown.cs.student.generator;

import edu.brown.cs.student.generator.mocking.MockedCloset;
import edu.brown.cs.student.main.server.clothing.enums.Formality;
import edu.brown.cs.student.main.server.clothing.generation.ClosetData;
import edu.brown.cs.student.main.server.clothing.generation.Generator;
import edu.brown.cs.student.main.server.clothing.records.Outfit;
import edu.brown.cs.student.main.server.handlers.nwsapi.datasource.weather.WeatherData;
import java.util.ArrayList;
import org.junit.jupiter.api.Test;
import org.testng.Assert;

public class TestGen {

  // Test of different outputs
  @Test
  public void TestOutputs() {
    MockedCloset source = new MockedCloset();
    ClosetData closet = new ClosetData(source.getClothing(1));
    Generator generator = new Generator(closet);
    WeatherData weather = new WeatherData(50, 50, 50, 50, 50, 50, 50.0, 50.0, "12/05/2024");

    double different = 0;
    for (int i = 0; i < 10; i++) {
      Outfit fit = generator.generateOutfit(weather, Formality.FLEX);
      Outfit fit2 = generator.generateOutfit(weather, Formality.FLEX);

      if (!fit.equals(fit2)) {
        different++;
      }
    }
    Assert.assertTrue(different > 0);
  }

  // Test that weather impacts it
  @Test
  public void TestWeather() {
    MockedCloset source = new MockedCloset();
    ClosetData closet = new ClosetData(source.getClothing(1));
    Generator generator = new Generator(closet);
    WeatherData cold = new WeatherData(0, 0, 0, 50, 50, 50, 50.0, 50.0, "hey");

    double jackets = 0;
    for (int i = 0; i < 50; i++) {
      Outfit fit = generator.generateOutfit(cold, Formality.FLEX);
      if (fit.outerwear() != null) {
        jackets++;
      }
    }

    Assert.assertEquals(jackets, 50.0);

    WeatherData warm = new WeatherData(100, 100, 100, 50, 50, 50, 50.0, 50.0, "hey");

    double jackets1 = 0;
    for (int i = 0; i < 50; i++) {
      Outfit fit = generator.generateOutfit(warm, Formality.FLEX);
      if (fit.outerwear() != null) {
        jackets1++;
      }
    }

    Assert.assertEquals(jackets1, 0.0);

    WeatherData chill = new WeatherData(60, 60, 60, 50, 50, 50, 50.0, 50.0, "hey");

    double jackets2 = 0;
    for (int i = 0; i < 50; i++) {
      Outfit fit = generator.generateOutfit(chill, Formality.FLEX);
      if (fit.outerwear() != null) {
        jackets2++;
      }
    }

    double ratio = jackets2 / 50.0;

    Assert.assertTrue(ratio < 0.6 && ratio > 0.1);
  }

  // Test that en empty closet it ok
  @Test
  public void TestEmptyCloset() {
    ClosetData closet = new ClosetData(new ArrayList<>());
    Generator generator = new Generator(closet);
    WeatherData weather = new WeatherData(0, 0, 0, 50, 50, 50, 50.0, 50.0, "hey");

    Outfit empty = generator.generateOutfit(weather, Formality.FLEX);

    Outfit emptyTrue = new Outfit(false, null, null, null, null, null, null);

    Assert.assertEquals(emptyTrue, empty);
  }

  // Test that if there is only one option, it gives that option each time
  @Test
  public void TestOnePossible() {
    MockedCloset source = new MockedCloset();
    ClosetData closet = new ClosetData(source.getClothing(0));
    Generator generator = new Generator(closet);
    WeatherData weather = new WeatherData(50, 50, 50, 50, 50, 50, 50.0, 50.0, "12/05/2024");

    double different = 0;
    for (int i = 0; i < 10; i++) {
      Outfit fit = generator.generateOutfit(weather, Formality.FLEX);
      Outfit fit2 = generator.generateOutfit(weather, Formality.FLEX);

      if (!fit.equals(fit2)) {
        different++;
      }
    }
    Assert.assertTrue(different == 0);
  }

  // Test that formality has an effect
  @Test
  public void TestFormality() {
    MockedCloset source = new MockedCloset();
    ClosetData closet = new ClosetData(source.getClothing(1));
    Generator generator = new Generator(closet);
    WeatherData weather = new WeatherData(50, 50, 50, 50, 50, 50, 50.0, 50.0, "12/05/2024");

    double formal = 0;
    double informal = 0;
    for (int i = 0; i < 50; i++) {
      Outfit fit = generator.generateOutfit(weather, Formality.FORMAL);
      Outfit fit2 = generator.generateOutfit(weather, Formality.FLEX);
      if (fit.top() != null && fit.top().formality().equals(Formality.FORMAL)) {
        formal++;
      }
      if (fit2.top() != null && fit2.top().formality().equals(Formality.FORMAL)) {
        informal++;
      }
    }
    Assert.assertTrue(formal > informal);
  }
}
