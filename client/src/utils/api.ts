import { getLoginCookie } from "./cookie";

const HOST = "http://localhost:3232";

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

/**
 * Function that clears the data associated with each user.
 * @param uid the user's id.
 * @returns clear user data.
 */
export async function clearUser(uid: string = getLoginCookie() || "") {
  return await queryAPI("clear-user", {
    uid: uid,
  });
}
