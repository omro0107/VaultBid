import { API_AUCTION_LISTINGS } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Creates a new auction listing.
 *
 * This function sends a POST request to the auction listings API to create a new listing
 * with the provided details. It handles the response and returns the created listing data.
 *
 * @param {Object} listingData - The data for the new listing.
 * @param {string} listingData.title - The title of the listing.
 * @param {string} listingData.description - A description of the listing.
 * @param {Array<string>} listingData.tags - An array of tags associated with the listing.
 * @param {Array<Object>} listingData.media - An array of media objects associated with the listing.
 * @param {string} listingData.endsAt - The end time of the auction in ISO format.
 *
 * @returns {Promise<Object>} The created listing data returned from the server.
 * @throws {Error} Throws an error if the listing creation fails or if the response is not OK.
 */
export async function createListing({ title, description, tags, media, endsAt }) {
  try {
    const response = await fetch(`${API_AUCTION_LISTINGS}`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        title,
        description,
        tags,
        media,
        endsAt,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors[0].message);
    }

    return data;
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error;
  }
}