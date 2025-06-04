import { showMessage } from "../utilities/showMessage.js";
import { fetchListings } from "../api/listings/allListings.js";

/**
 * Checks if a listing has ended by comparing the end date with the current time.
 *
 * @param {Object} listing - The listing object to check.
 * @param {string} listing.endsAt - The end time of the auction in ISO format.
 *
 * @returns {boolean} True if the listing has ended, false otherwise.
 */
function isListingEnded(listing) {
  if (!listing.endsAt) return false;
  return new Date(listing.endsAt) <= new Date();
}

/**
 * Renders a list of listings in the thumbnails container.
 *
 * This function takes an array of listings, filters out ended auctions, and creates thumbnail elements 
 * for each active listing, appending them to the thumbnails container in the DOM.
 *
 * @param {Array<Object>} listings - An array of listing objects to be rendered.
 * @param {string} listings[].id - The unique identifier for the listing.
 * @param {string} listings[].title - The title of the listing.
 * @param {Array<Object>} listings[].media - An array of media objects associated with the listing.
 * @param {string} listings[].media[].url - The URL of the media.
 * @param {string} listings[].media[].alt - The alt text for the media.
 * @param {string} listings[].endsAt - The end time of the auction in ISO format.
 *
 * @returns {void} This function does not return a value.
 */
export function renderListings(listings) {
  const thumbnailsContainer = document.getElementById('listings-thumbnails');
  thumbnailsContainer.innerHTML = '';

  // Filter out ended listings
  const activeListings = listings.filter(listing => !isListingEnded(listing));

  activeListings.forEach(listing => {
    const thumbnailElement = createThumbnailElement(listing);
    thumbnailsContainer.appendChild(thumbnailElement);
  });

  // Show message if no active listings
  if (activeListings.length === 0 && listings.length > 0) {
    const messageElement = document.createElement('div');
    messageElement.className = 'col-span-full text-center py-8 text-gray-500';
    messageElement.textContent = 'No active auctions available at the moment.';
    thumbnailsContainer.appendChild(messageElement);
  }
}

/**
 * Creates a thumbnail element for a single listing.
 *
 * This function generates a DOM element representing a listing thumbnail,
 * including the image and title, and sets up a click event to navigate to the listing page.
 *
 * @param {Object} listing - The listing object to create a thumbnail for.
 * @param {string} listing.id - The unique identifier for the listing.
 * @param {string} listing.title - The title of the listing.
 * @param {Array<Object>} listing.media - An array of media objects associated with the listing.
 * @param {string} listing.media[].url - The URL of the media.
 * @param {string} listing.media[].alt - The alt text for the media.
 *
 * @returns {HTMLElement} The created thumbnail element for the listing.
 */
function createThumbnailElement(listing) {
  const thumbnailElement = document.createElement('div');
  thumbnailElement.classList.add('thumbnail-item', 'bg-white', 'shadow-md', 'rounded-lg', 'overflow-hidden', 'transition', 'transform', 'hover:scale-105', 'cursor-pointer');

  const thumbnailImage = document.createElement('img');
  if (listing.media.length > 0) {
    thumbnailImage.src = listing.media[0].url;
    thumbnailImage.alt = listing.media[0].alt;
  }
  thumbnailImage.classList.add('w-full', 'h-48', 'object-cover');

  const thumbnailTitle = document.createElement('p');
  thumbnailTitle.textContent = listing.title;
  thumbnailTitle.classList.add('p-4', 'text-lg', 'font-semibold', 'text-gray-800');

  thumbnailElement.appendChild(thumbnailImage);
  thumbnailElement.appendChild(thumbnailTitle);

  thumbnailElement.addEventListener('click', () => {
    window.location.href = `../../../auctions/listing/index.html?id=${listing.id}`;
  });

  return thumbnailElement;
}

/**
 * Updates the pagination controls based on the current page and total pages.
 *
 * This function updates the page information text and enables or disables the previous
 * and next page buttons based on the current page.
 *
 * @param {number} currentPage - The current page number.
 * @param {number} totalPages - The total number of pages available.
 *
 * @returns {void} This function does not return a value.
 */
export function updatePaginationControls(currentPage, totalPages) {
  document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;
  document.getElementById('prev-page').disabled = currentPage === 1;
  document.getElementById('next-page').disabled = currentPage === totalPages;
}

/**
 * Loads listings for a specific page and renders them.
 *
 * This function fetches listings from the API for the specified page, displays loading skeletons
 * while the data is being fetched, and then renders the listings and updates pagination controls.
 *
 * @param {number} [page=1] - The page number to load listings for (default is 1).
 *
 * @returns {Promise<void>} This function returns a promise that resolves when the listings are loaded.
 */
export async function loadListings(page = 1) {
  setCurrentPage(page);

  const thumbnailsContainer = document.getElementById('listings-thumbnails');
  thumbnailsContainer.innerHTML = '';
  for (let i = 0; i < 12; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton-thumbnail bg-gray-200 rounded-lg animate-pulse h-48';
    thumbnailsContainer.appendChild(skeleton);
  }

  try {
    const data = await fetchListings(12, page);

    const listings = data.data;
    setTotalPages(data.meta.pageCount);
    
    thumbnailsContainer.innerHTML = '';
    renderListings(listings);
    updatePaginationControls(getCurrentPage(), getTotalPages());
  } catch (error) {
    console.error('Failed to load listings:', error);
    showMessage('Failed to load listings. Please try again later.');
  }
}

// State management for pagination
const paginationState = {
  currentPage: 1,
  totalPages: 1
};

// Export functions to get and set pagination state
export function getCurrentPage() {
  return paginationState.currentPage;
}

export function getTotalPages() {
  return paginationState.totalPages;
}

export function setCurrentPage(page) {
  paginationState.currentPage = page;
}

export function setTotalPages(pages) {
  paginationState.totalPages = pages;
}
