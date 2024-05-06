import "../../styles/navbar.scss";
import { useState, useEffect } from "react";
import NavBar from "../navigation/NavBar";
import sunlogo from "../../styles/images/sunshinefitmeup.png"
import snowylogo from "../../styles/images/snowfitmeup.png"
import rainylogo from "../../styles/images/rainyfitmeup.png"
import cloudylogo from "../../styles/images/cloudyfitmeup.png"
import { getNameCookie } from "../../utils/cookie";
import "../../styles/homepage.scss";
import { useNavigate } from "react-router-dom";
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
  const date = new Date();
  const [showTimeOfDay, setShowTimeOfDay] = useState<boolean>(true);
  const [showName, setShowName] = useState<boolean>(true);
  const [today, setToday] = useState<[number, number]>([0,0]);
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const navigate = useNavigate();

  const name = getNameCookie();
  if (name === undefined) {
    setShowName(false);
  }

  const getTimeOfDay =  () => {
    const currHour = date.getHours();
    if (currHour >= 5 && currHour < 12) {
      return "Morning";
    } else if (currHour >= 12 && currHour < 18) {
      return "Afternoon";
    } else if (currHour >= 18 && currHour < 24) {
      return "Evening";
    } else {
      setShowTimeOfDay(false);
      return "";
    }
  }

  const getWelcomeMessage = () => {
    if (showTimeOfDay) {
      if (showName) {
        return `Good ${getTimeOfDay()}, ${name}! 😊`;
      } else {
        return `Good ${getTimeOfDay()}! 😊`;
      }
    } else {
      if (showName) {
        return `Hello ${name}! 😊`;
      } else {
        return `Hello! 😊`;
      }
    }
  }

  const generatePositiveMessage = () => {
    var i = 0;
    if (date.getDate()===today[0] && date.getMonth()===today[1]) {
      i = messageIndex;
    } else {
      i = Math.floor(Math.random() * 5);
      setMessageIndex(i);
      setToday([date.getDate(), date.getMonth()]);
    }
    switch(i) {
      case 0:
        return "It's nice to see you!";
      case 1:
        return "You look great today!";
      case 2: 
        return "Excited to see what look you’ll rock today!"
      case 3:
        return "Another great day, another great look!";
      case 4:
        return "You're shining bright today!";
    }
  }

  return (
    <body style={{ backgroundColor: "#f9e8d0 "}}>
      <NavBar />
      <div className="homepage">
        <h1 className="hello-message">{getWelcomeMessage()}</h1>
        <h3 className="positive-message">{generatePositiveMessage()}</h3>
        <div className="nav-buttons">
          <button
            onClick={() => navigate("/generate")}
            style={{ backgroundColor: "#d27088" }}
          >
            Generate Today's Outfit{" "}
          </button>
          <button
            onClick={() => navigate("/saved")}
            style={{ backgroundColor: "#846a95" }}
          >
            View Saved Outfits{" "}
          </button>
          <button
            onClick={() => navigate("/closet")}
            style={{ backgroundColor: "#3f6492" }}
          >
            View My Closet{" "}
          </button>
        </div>
      </div>
    </body>
  );
}