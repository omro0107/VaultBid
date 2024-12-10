import { headers } from '../headers.js';
import { API_AUCTION_LISTINGS } from '../constants.js';
import { renderListings, updatePaginationControls } from '../../utilities/displayListings.js';
import { displayError } from '../listings/listing.js';

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
    displayError('Failed to search listings. Please try again later.');
  }
}