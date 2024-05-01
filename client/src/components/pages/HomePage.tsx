import "../../styles/navbar.scss";
import { useState, useEffect } from "react";
import NavBar from "../navigation/NavBar";
import sunlogo from "../../styles/images/sunshinefitmeup.png"
import snowylogo from "../../styles/images/snowfitmeup.png"
import rainylogo from "../../styles/images/rainyfitmeup.png"
import cloudylogo from "../../styles/images/cloudyfitmeup.png"

export enum WeatherType {
  SNOW = 'snow',
  CLOUDY = 'cloudy',
  RAINY = 'rainy',
  CLEAR = 'clear'
}

export function mapToImage(weather: WeatherType) {
  switch(weather) {
    case WeatherType.CLEAR:
      return sunlogo;
    case WeatherType.SNOW:
      return snowylogo;
    case WeatherType.CLOUDY:
      return cloudylogo;
    case WeatherType.RAINY:
      return rainylogo;
  }
}

export function determineWeatherIcon(cloud: number, rain: number, snow : number) {
  if (snow > 1) {
    return WeatherType.SNOW;
  } else if (rain > 50) {
    return WeatherType.RAINY
  }else if (cloud > 50) {
    return WeatherType.CLOUDY;
  } else {
    return WeatherType.CLEAR;
  }
}

export default function HomePage() {

  return (
      <body>
        <NavBar />
      </body>
  );
}