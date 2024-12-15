import { headers } from '../headers.js';
import { API_AUCTION_LISTINGS, API_AUCTION_MY_LISTINGS } from '../constants.js';
import { renderListings } from '../../utilities/displayListings.js'
import { fetchListings } from '../listings/allListings.js';
import { showMessage } from '../../utilities/showMessage.js';

/**
 * Fetches and displays a single listing based on the ID from the URL.
 *
 * This function retrieves the listing data from the server using the listing ID
 * obtained from the URL query parameters. It includes seller and bid information
 * in the request.
 *
 * @returns {Promise<Object>} The data of the single listing.
 * @throws {Error} Throws an error if the fetch operation fails or if the response is not OK.
 */
export async function displaySingleListing() {
  const pageId = new URLSearchParams(window.location.search).get("id");
  try {
    const fetchInfo = await fetch(`${API_AUCTION_LISTINGS}/${pageId}?_seller=true&_bids=true`, {
      method: "GET",
      headers: headers(),
    });

    if (!fetchInfo.ok) {
      throw new Error(`Error: ${fetchInfo.status}`);
    }

    const data = await fetchInfo.json();
    return data.data;
  } catch (error) {
    alert("Failed to display listing: " + error.message);
  }
}

/**
 * Fetches and displays the user's listings.
 *
 * This function retrieves the listings created by the logged-in user from the server
 * and renders them on the page. It handles any errors that occur during the fetch process.
 *
 * @returns {Promise<void>} This function does not return a value.
 * @throws {Error} Throws an error if the fetch operation fails or if the response is not OK.
 */
export async function displayMyListings() {
  try {
    const response = await fetch(API_AUCTION_MY_LISTINGS, {
      method: "GET",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const resultJson = await response.json();
    const listingObjects = resultJson.data;

    renderListings(listingObjects) 
  } catch (error) {
    console.error('Error fetching listings:', error);
    showMessage('Failed to load your listings. Please try again later.');
  }
}

/**
 * Fetches and displays all auction listings for a specified page.
 *
 * This function retrieves all auction listings from the server for the given page number
 * and renders them on the page. It handles any errors that occur during the fetch process.
 *
 * @param {number} [page=1] - The page number to load listings for (default is 1).
 * @returns {Promise<void>} This function does not return a value.
 * @throws {Error} Throws an error if the fetch operation fails or if the response is not OK.
 */
export async function displayAllListings(page = 1) {
  try {
    const resultJson = await fetchListings(page);
    const listings = resultJson.data; 
    
    renderListings(listings);
  } catch (error) {
    console.error('Error fetching all listings:', error);
    alert('Failed to load listings. Please try again later.');
  }
}