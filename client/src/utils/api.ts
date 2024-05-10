import { getLoginCookie } from "./cookie";
import { ClothingItem } from "../components/items/ClothingItem";
import { Description } from "../components/items/Description";
import { determineCategory } from "./determineImage";
import { Dispatch, SetStateAction } from "react";

const HOST = "http://localhost:3232";
let cache: any;

/**
 * Function that queries backend API.
 * @param endpoint the endpoint of what we are querying.
 * @param query_params parameters of the endpoint.
 * @returns the response map returned by the query.
 */
async function queryAPI(
  endpoint: string,
  query_params: Record<string, string>
) {
  console.log("Sending API!" + endpoint);
  const paramsString = new URLSearchParams(query_params).toString();
  const url = `${HOST}/${endpoint}?${paramsString}`;
  const response = await fetch(url);
  if (!response.ok) {
    console.error(response.status, response.statusText);
  }
  return response.json();
}

/**
 * Function that clears the data associated with each user.
 * @param uid the user's id.
 * @returns clear user data.
 */
export async function clearUser() {
  return await queryAPI("clear-user", {
    uid: getLoginCookie() || "",
  });
}

export async function getWeatherData(lat: number, lon: number) {
  if (!cache) {
    cache = await queryAPI("weather", {
      lat: lat.toString(),
      lon: lon.toString(),
    });
  } 
  if (cache.response_type == 'error') {
    console.log("Weather data currently unavailable");
    return undefined;
  } else {
    return cache;
  }
}

export async function addClothingItem(
  category: number,
  subcategory: number,
  formality: number,
  primary: string,
  secondary: string,
  material: number,
  description: string
) {
  console.log(description);
  return await queryAPI("add-clothing", {
    uid: getLoginCookie() || "",
    category: category.toString(),
    subcategory: subcategory.toString(),
    formality: formality.toString(),
    primary: primary,
    secondary: secondary,
    material: material.toString(),
    description: description,
  });
}

export async function listClothing() {
  return await queryAPI("list-clothing", {
    uid: getLoginCookie() || "",
  });
}

export async function listOutfits() {
  return await queryAPI("list-outfits", {
    uid: getLoginCookie() || "",
  });
}

export async function addOutfit(top: string, bottom: string, shoe: string,
  outerwear: string, fullbody: string, accessory: string) {
  return await queryAPI("add-outfit", {
    uid: getLoginCookie() || "",
    top: top.toString(),
    bottom: bottom.toString(),
    shoe: shoe.toString(),
    outerwear: outerwear.toString(),
    fullbody: fullbody.toString(),
    accessory: accessory.toString()
  });
}

export async function generateOutfit(formality: number) {
  // Default to Providence, RI
  let lat = "41.824"
  let lon = "-71.41888"
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      lat = position.coords.latitude.toString();
      lon = position.coords.longitude.toString();
    });
  } 

  return await queryAPI("generate-outfit", {
    uid: getLoginCookie() || "",
    lat: lat,
    lon: lon,
    formality: formality.toString(),
  });
}

export async function removeClothing(id:number) {
  return await queryAPI("remove-clothing", {
    uid: getLoginCookie() || "",
    id: id.toString()
  });
}

export const updateClothing = (
  setClothesProps: Dispatch<
    SetStateAction<Map<string, [string, string, string, string]>>
  >
) => {
  listClothing().then(
    (clothing: { clothing: ClothingItem[]; descriptions: Description[] }) => {
      let clothes = clothing.clothing;
      let descriptions = clothing.descriptions;
      let clothesMap = new Map<string, [string, string, string, string]>();
      clothes.forEach((item) => {
        let img = determineCategory(
          item.category,
          item.subcategory,
          item.material,
          item.formality
        );
        let description = "";
        descriptions.forEach((desc) => {
          if (desc.id === item.id.toString()) {
            description = desc.desc;
          }
        });
        clothesMap.set(item.id.toString(), [
          img,
          item.primary,
          item.category.toString(),
          description,
        ]);
      });
      setClothesProps(clothesMap);
    }
  );
};