package edu.brown.cs.student.generator;

import edu.brown.cs.student.generator.mocking.MockedCloset;
import edu.brown.cs.student.main.server.clothing.enums.Formality;
import edu.brown.cs.student.main.server.clothing.generation.ClosetData;
import edu.brown.cs.student.main.server.clothing.generation.Generator;
import edu.brown.cs.student.main.server.clothing.records.Outfit;
import edu.brown.cs.student.main.server.handlers.nwsapi.datasource.weather.WeatherData;
import org.junit.jupiter.api.Test;
import org.testng.Assert;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestGen {
    @Test
    public void TestOutputs(){
        MockedCloset source = new MockedCloset();
        ClosetData closet = new ClosetData(source);
        Generator generator = new Generator(closet);
        WeatherData weather = new WeatherData(50, 50, 50,
                50, 50, 50, 50.0, 50.0, "hey");

        Outfit fit = generator.generateOutfit(weather, Formality.FLEX);
        Outfit fit2 = generator.generateOutfit(weather, Formality.FLEX);

        Assert.assertNotEquals(fit, fit2);
    }
}
