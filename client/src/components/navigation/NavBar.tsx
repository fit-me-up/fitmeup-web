import { useNavigate } from "react-router-dom";
import "../../styles/navbar.scss";
import { useState, useEffect } from "react";
import { determineWeatherIcon, mapToImage } from "../pages/HomePage";
import { PageType } from "../items/enums";
import { getWeatherData } from "../../utils/api";

/**
 * Class that handles making the navigation bar
 * @returns the navigation bar with all of its features
 */
export default function NavBar() {
  const [highTemp, setHighTemp] = useState("");
  const [lowTemp, setLowTemp] = useState("");
  const [currentTemp, setCurrentTemp] = useState("");
  const [currentRain, setCurrentRain] = useState(-1);
  const [currentCloud, setCurrentCloud] = useState(-1);
  const [currentSnow, setCurrentSnow] = useState(-1);
  const [showWeather, setShowWeather] = useState(false);

  const navigate = useNavigate();
/**
 * Changes to the appropriate page when clicked.
 * @param page the page to navigate to.
 */
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
/**
 * Gets weather data based on user location and sets the various weather fields.
 */
  useEffect(() => {
    async function fetchWeatherData() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          let json = await getWeatherData(
            position.coords.latitude,
            position.coords.longitude
          );
          if (json === undefined) {
            setShowWeather(false);
          } else {
            setLowTemp(json.temperature.low);
            setHighTemp(json.temperature.high);
            setCurrentTemp(json.temperature.current);
            setCurrentCloud(json.temperature.cloud);
            setCurrentRain(json.temperature.rain);
            setCurrentSnow(json.temperature.snowFall);
            setShowWeather(true);
          }
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
        setShowWeather(false);
      }
    }
    fetchWeatherData();
  }, []);


  return (
    <div className="navbar">
      {showWeather && (
        <div className="temp-container">
          <div className="temp-numbers">
            <h3 className="temptitle temp"> {highTemp}˚</h3> {/*Displays high temp*/}
            <h3 className="currenttitle temp"> {currentTemp}˚ </h3> {/*Displays current temp*/}
            <h3 className="temptitle temp"> {lowTemp}˚</h3> {/*Displays low temp*/}
          </div>
          <img
            className="weather-icon"
            src={mapToImage(determineWeatherIcon(currentCloud, currentRain, currentSnow))} /*Displays weather icon based on data*/
          />
        </div>
      )}
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
