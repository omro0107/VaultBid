import { API_AUCTION_PROFILES } from "../constants.js";
import { headers } from "../headers.js";
/**
 * Fetches the user's profile data from the server.
 *
 * This function sends a GET request to retrieve the profile information
 * for a specific user identified by their username. It handles the response
 * from the server and returns the profile data.
 *
 * @param {string} username - The username of the user whose profile is to be fetched.
 *
 * @returns {Promise<Object>} The profile data returned from the server.
 * @throws {Error} Throws an error if the profile fetch fails.
 */
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