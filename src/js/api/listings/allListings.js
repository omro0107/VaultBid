import { headers } from '../headers.js';
import { API_AUCTION_LISTINGS } from '../constants.js';

export async function fetchListings(limit = 12, page = 1) {
  try {
    const response = await fetch(`${API_AUCTION_LISTINGS}?limit=${limit}&page=${page}`, {
      method: "GET",
      headers: headers(),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
}