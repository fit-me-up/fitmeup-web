package edu.brown.cs.student.generator;

import edu.brown.cs.student.generator.mocking.MockedCloset;
import edu.brown.cs.student.main.server.clothing.enums.Formality;
import edu.brown.cs.student.main.server.clothing.generation.ClosetData;
import edu.brown.cs.student.main.server.clothing.generation.Generator;
import edu.brown.cs.student.main.server.clothing.records.Outfit;
import edu.brown.cs.student.main.server.handlers.nwsapi.datasource.weather.WeatherData;
import org.junit.jupiter.api.Test;
import org.testng.Assert;

public class TestGen {
  @Test
  public void TestOutputs() {
    MockedCloset source = new MockedCloset();
    ClosetData closet = new ClosetData(source);
    Generator generator = new Generator(closet);
    WeatherData weather = new WeatherData(0, 0, 0, 50, 50, 50, 50.0, 50.0, "hey");
    WeatherData weather2 = new WeatherData(100, 100, 100, 50, 50, 50, 50.0, 50.0, "hey");

    Outfit fit = generator.generateOutfit(weather, Formality.FLEX);
    Outfit fit2 = generator.generateOutfit(weather2, Formality.FORMAL);

    Assert.assertNotEquals(fit, fit2);
  }

  @Test
  public void TestWeather() {
    MockedCloset source = new MockedCloset();
    ClosetData closet = new ClosetData(source);
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

    Assert.assertTrue(ratio < 0.5 && ratio > 0.1);
  }
}
