import "../../styles/navbar.scss";
import { useState, useEffect } from "react";
import NavBar from "../navigation/NavBar";
import sunlogo from "../../styles/images/sunshinefitmeup.png"
import snowylogo from "../../styles/images/snowfitmeup.png"
import rainylogo from "../../styles/images/rainyfitmeup.png"
import cloudylogo from "../../styles/images/cloudyfitmeup.png"
import { getNameCookie } from "../../utils/cookie";
import "../../styles/homepage.scss";
import { getWeatherData } from "../../utils/api";

let cache = null;

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
  const [showTimeOfDay, setShowTimeOfDay] = useState<boolean>(true);
  const [showName, setShowName] = useState<boolean>(true);
  const name = getNameCookie();
  if (name === undefined) {
    setShowName(false);
  }

  const getTimeOfDay =  () => {
    const currHour = new Date().getHours();
    if (currHour >= 5 && currHour < 12) {
      return "Morning";
    } else if (currHour >= 12 && currHour < 18) {
      return "Afternoon";
    } else if (currHour >= 18 && currHour < 22) {
      return "Evening";
    } else {
      setShowTimeOfDay(false);
      return "";
    }
  }

  const getWelcomeMessage = () => {
    if (showTimeOfDay) {
      if (showName) {
        return `Good ${getTimeOfDay()}, ${name}!`;
      } else {
        return `Good ${getTimeOfDay()}!`;
      }
    } else {
      if (showName) {
        return `Hello ${name}!`;
      } else {
        return `Hello!`;
      }
    }
  }
  return (
    <body>
      <div className="homepage">
        <h1 className="hello-message">{getWelcomeMessage()}</h1>
      </div>
    </body>
  );
}