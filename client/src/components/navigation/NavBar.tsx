import {
  useNavigate
} from "react-router-dom";
import "../../styles/navbar.scss";
import { useState, useEffect } from "react";
import { getWeatherData } from "../pages/HomePage";

export default function NavBar() {

  const navigate = useNavigate()

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

   const [highTemp, setHighTemp] = useState("");
   const [lowTemp, setLowTemp] = useState("");
   const [currentTemp, setCurrentTemp] = useState("");

   useEffect(() => {
     async function fetchWeatherData() {
       let json = await getWeatherData(41.824, -71.4128);
       setLowTemp(json.temperature.low);
       setHighTemp(json.temperature.high);
       setCurrentTemp(json.temperature.current);
     }
     fetchWeatherData();
   }, []);

  return (
    <div className="navbar">
      <div className="titles-container">
        <h3 className="pagetitle home" onClick={() => changePage(PageType.Home)}> Home </h3>
        <h3 className="pagetitle generate" onClick={() => changePage(PageType.Generate)}> Generate </h3>
        <h1 className="maintitle" onClick={() => changePage(PageType.Home)}> Fit-Me-UP! </h1>
        <h3 className="pagetitle saved" onClick={() => changePage(PageType.Saved)}> Saved </h3>
        <h3 className="pagetitle closet" onClick={() => changePage(PageType.Closet)}> Closet </h3>
      </div>
      <div className="temp-container">
        <h3 className="temptitle temp"> {highTemp}˚</h3>
        <h3 className="currenttitle temp"> {currentTemp}˚ </h3>
        <h3 className="temptitle temp"> {lowTemp}˚</h3>

      </div>
    </div>
  );
}

// can move these enums somewhere else idk
export enum PageType {
  Generate = 'generate',
  Saved = 'saved',
  Home = 'home',
  Closet = 'closet',
}