import "../../styles/navbar.scss";
import { useState, useEffect } from "react";
import NavBar from "../navigation/NavBar";
import sunlogo from "../../styles/images/sunshinefitmeup.png"
import snowylogo from "../../styles/images/snowfitmeup.png"
import rainylogo from "../../styles/images/rainyfitmeup.png"
import cloudylogo from "../../styles/images/cloudyfitmeup.png"


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

export async function addClothingItem(uid: string, id: string, category: number, type: number, formality: number, colors: string, material: string) {
  return await queryAPI("add-clothing", {
    uid: uid,
    id : id,
    category: category.toString(),
    type : type.toString(),
    formality: formality.toString(),
    colors: colors,
    material: material
  })
}

export async function listClothing(uid: string) {
  return await queryAPI("list-clothing", {
    uid : uid
  })
}

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

export function determineWeatherIcon(cloud: number, rain: number, snow : number) : WeatherType{
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