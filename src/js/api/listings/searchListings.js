import { headers } from '../headers.js';
import { API_AUCTION_LISTINGS } from '../constants.js';
import { renderListings, updatePaginationControls } from '../../utilities/displayListings.js';
import { showMessage } from '../../utilities/showMessage.js';
/**
 * Searches for auction listings based on a query and updates the display.
 *
 * This function sends a GET request to the auction listings API to search for
 * listings that match the provided query. It handles the response, renders the
 * listings, and updates pagination controls based on the current page.
 *
 * @param {string} query - The search query to filter listings.
 * @param {number} currentPage - The current page number for pagination.
 *
 * @returns {Promise<void>} This function does not return a value.
 * @throws {Error} Throws an error if the fetch operation fails or if the response is not OK.
 */
export async function searchListings(query, currentPage) {
  try {
    const response = await fetch(`${API_AUCTION_LISTINGS}/search?q=${encodeURIComponent(query)}`, {
      method: "GET",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const resultJson = await response.json();
    const totalPages = resultJson.meta.pageCount;

    renderListings(resultJson.data);
    updatePaginationControls(currentPage, totalPages);
  } catch (error) {
    console.error('Error fetching search results:', error);
    showMessage('Failed to search listings. Please try again later.');
  }
}