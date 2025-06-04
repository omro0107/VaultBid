import { headers } from '../headers.js';
import { API_AUCTION_LISTINGS } from '../constants.js';

/**
 * Fetches auction listings from the API.
 *
 * This function sends a GET request to retrieve auction listings with optional pagination.
 * It allows specifying the number of listings to fetch and the page number.
 *
 * @param {number} [limit=12] - The maximum number of listings to fetch (default is 12).
 * @param {number} [page=1] - The page number to fetch (default is 1).
 *
 * @returns {Promise<Object>} The JSON response containing the listings data.
 * @throws {Error} Throws an error if the fetch operation fails or if the response is not OK.
 */
export async function fetchListings(limit = 12, page = 1) {
  try {
    // Try to sort by end date to get active auctions first
    const queryParams = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
      sort: 'endsAt',
      sortOrder: 'desc'
    });

    const response = await fetch(`${API_AUCTION_LISTINGS}?${queryParams}`, {
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