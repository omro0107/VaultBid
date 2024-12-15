import { showMessage } from "../utilities/showMessage.js";
import { fetchListings } from "../api/listings/allListings.js";

export function renderListings(listings) {
  const thumbnailsContainer = document.getElementById('listings-thumbnails');
  thumbnailsContainer.innerHTML = '';

  listings.forEach(listing => {
    const thumbnailElement = createThumbnailElement(listing);
    thumbnailsContainer.appendChild(thumbnailElement);
  });
}

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

export function updatePaginationControls(currentPage, totalPages) {
  document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;
  document.getElementById('prev-page').disabled = currentPage === 1;
  document.getElementById('next-page').disabled = currentPage === totalPages;
}


export async function loadListings(page = 1) {
  currentPage = page;
  console.log(`loading listings for page: ${currentPage}`);
  try {
    const data = await fetchListings(12, page);
    console.log('Fetched data:', data);

    const listings = data.data
    totalPages = data.meta.pageCount;
    console.log(`Current Page: ${currentPage}, Total Pages: ${totalPages}`);
    
    renderListings(listings);
    updatePaginationControls(currentPage, totalPages);
  } catch (error) {
    console.error('Failed to load listings:', error);
    showMessage('Failed to load listings. Please try again later.');
  }
}

let currentPage = 1;
let totalPages = 1;