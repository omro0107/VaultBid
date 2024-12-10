import { headers } from '../headers.js';
import { API_AUCTION_LISTINGS, API_AUCTION_MY_LISTINGS } from '../constants.js';
import { renderListings } from '../../utilities/displayListings.js'
import { fetchListings } from '../listings/allListings.js';

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
    displayError('Failed to load your listings. Please try again later.');
  }
}

export async function displayAllListings(page = 1) {
  try {
    const resultJson = await fetchListings(page);
    const listings = resultJson.data; 

    listings.sort((a, b) => new Date(b.created) - new Date(a.created));

    renderListings(listings);
  } catch (error) {
    console.error('Error fetching all listings:', error);
    alert('Failed to load listings. Please try again later.');
  }
}

export function displayError(message) {
  const errorMessage = document.createElement('p');
  errorMessage.textContent = message;
  errorMessage.className = 'text-red-500';
  document.querySelector('.error-message').appendChild(errorMessage);
}