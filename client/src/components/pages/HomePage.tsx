import "../../styles/navbar.scss";
import { useEffect } from "react";
import NavBar from "../navigation/NavBar";

export default function HomePage() {
  const HOST = "http://localhost:3232";

  async function queryAPI(
    endpoint: string,
    query_params: Record<string, string>
  ) {
    const paramsString = new URLSearchParams(query_params).toString();
    const url = `${HOST}/${endpoint}?${paramsString}`;
    const response = await fetch(url);
    if (!response.ok) {
      console.error(response.status, response.statusText);
    }
    return response.json();
  }

  async function getWeatherData(lat: number, long: number) {
    return await queryAPI("weather", {
      lat: lat.toString(),
      long: long.toString(),
    });
  }

  useEffect(() => {
    async function fetchWeatherData() {
      let json = await getWeatherData(41.824, 71.4128);
      console.log(json);
    }
    fetchWeatherData();
  }, []);

  return (
    <div>
      <body>
        <NavBar />
      </body>
    </div>
  );
}
