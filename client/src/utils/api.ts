import { getLoginCookie } from "./cookie";

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
  const paramsString = new URLSearchParams(query_params).toString();
  const url = `${HOST}/${endpoint}?${paramsString}`;
  const response = await fetch(url);
  if (!response.ok) {
    console.error(response.status, response.statusText);
  }
  return response.json();
}
console.log(getLoginCookie());
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
  id: number,
  category: number,
  subcategory: number,
  formality: number,
  primary: string,
  secondary: string,
  material: number
) {
  return await queryAPI("add-clothing", {
    uid: getLoginCookie() || "",
    id: id.toString(),
    category: category.toString(),
    subcategory: subcategory.toString(),
    formality: formality.toString(),
    primary: primary,
    secondary: secondary,
    material: material.toString(),
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

export async function generateOutfit(formality: number) {
  return await queryAPI("generate-outfit", {
    uid: getLoginCookie() || "",
    lat: "41.824",
    lon: "-71.41888",
    id: "0",
    formality: formality.toString(),
  });
}

export async function removeClothing(id:number) {
  return await queryAPI("remove-clothing", {
    uid: getLoginCookie() || "",
    id: id.toString()
  });
}
