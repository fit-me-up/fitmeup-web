import { useNavigate } from "react-router-dom";
import "../../styles/navbar.scss";
import { useState, useEffect } from "react";
import { determineWeatherIcon, mapToImage } from "../pages/HomePage";
import { PageType } from "../items/enums";
import { getWeatherData } from "../../utils/api";

export default function NavBar() {
  const [highTemp, setHighTemp] = useState("");
  const [lowTemp, setLowTemp] = useState("");
  const [currentTemp, setCurrentTemp] = useState("");
  const [currentRain, setCurrentRain] = useState(0);
  const [currentCloud, setCurrentCloud] = useState(0);
  const [currentSnow, setCurrentSnow] = useState(0);

  const navigate = useNavigate();

  const changePage = (page: PageType) => {
    switch (page) {
      case PageType.Generate:
        navigate("/generate");
        break;
      case PageType.Saved:
        navigate("/saved");
        break;
      case PageType.Home:
        navigate("/home");
        break;
      case PageType.Closet:
        navigate("/closet");
        break;
      default:
        navigate("/home");
        break;
    }
  };

  useEffect(() => {
    async function fetchWeatherData() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          let json = await getWeatherData(
            position.coords.latitude,
            position.coords.longitude
          );
          setLowTemp(json.temperature.low);
          setHighTemp(json.temperature.high);
          setCurrentTemp(json.temperature.current);
          setCurrentCloud(json.temperature.cloud);
          setCurrentRain(json.temperature.rain);
          setCurrentSnow(json.temperature.snowFall);
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
    fetchWeatherData();
  }, []);


  return (
    <div className="navbar">
      <div className="temp-container">
        <div className="temp-numbers">
          <h3 className="temptitle temp"> {highTemp}˚</h3>
          <h3 className="currenttitle temp"> {currentTemp}˚ </h3>
          <h3 className="temptitle temp"> {lowTemp}˚</h3>
        </div>
        <img
          className="weather-icon"
          src={mapToImage(
            determineWeatherIcon(currentCloud, currentRain, currentSnow)
          )}
        />
      </div>
      <div className="titles-container">
        <h3
          className="pagetitle home"
          onClick={() => changePage(PageType.Home)}
        >
          {"Home"}
        </h3>
        <h3
          className="pagetitle generate"
          onClick={() => changePage(PageType.Generate)}
        >
          {"Generate"}
        </h3>
        <h1 className="maintitle" onClick={() => changePage(PageType.Home)}>
          {"Fit-Me-UP!"}
        </h1>
        <h3
          className="pagetitle saved"
          onClick={() => changePage(PageType.Saved)}
        >
          {"Saved"}
        </h3>
        <h3
          className="pagetitle closet"
          onClick={() => changePage(PageType.Closet)}
        >
          {"Closet"}
        </h3>
      </div>
    </div>
  );
}
