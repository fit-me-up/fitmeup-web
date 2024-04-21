import "../../styles/navbar.scss";
import { useState, useEffect } from "react";
import NavBar from "../navigation/NavBar";

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

export async function getWeatherData(lat: number, lon: number) {
    return await queryAPI("weather", {
      lat: lat.toString(),
      lon: lon.toString(),
    });
  }

export default function HomePage() {


  return (
      <body>
        <NavBar />
      </body>
  );
}
