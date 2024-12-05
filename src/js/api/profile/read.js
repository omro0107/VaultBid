import { API_AUCTION_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

export async function readProfile(username) {
  try {
    const response = await fetch(`${API_AUCTION_PROFILES}/${username}`, {
      method: "GET",
      headers: headers(),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}