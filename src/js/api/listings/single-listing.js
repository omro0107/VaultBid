import { headers } from '../headers.js';
import { API_AUCTION_LISTINGS, API_AUCTION_MY_LISTINGS } from '../constants.js';
import { renderAllListings } from '../../utilities/displayListings.js'

export async function displaySingleListing() {
  const pageId = new URLSearchParams(window.location.search).get("id");
  try {
    const fetchInfo = await fetch(`${API_AUCTION_LISTINGS}/${pageId}?_author=true&_comments=true`, {
      method: "GET",
      headers: headers(),
    });

    if (fetchInfo.ok) {
      const data = await fetchInfo.json();
      const listingData = data.data;

      return listingData; 
    } else {
      throw new Error(`Error: ${fetchInfo.status}`);
    }
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
    const listingObjectsToRender = listingObjects.slice();

    displayMyListings(listingObjectsToRender); 
  } catch (error) {
    console.error('Error fetching listings:', error);
    displayError('Failed to load your listings. Please try again later.');
  }
}

export async function displayAllListings() {
  try {
    const response = await fetch(API_AUCTION_LISTINGS, {
      method: "GET",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const resultJson = await response.json();
    const listings = resultJson.data; 

    renderAllListings(listings);
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