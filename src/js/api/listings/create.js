import { API_AUCTION_LISTINGS } from "../constants.js";
import { headers } from "../headers.js";

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