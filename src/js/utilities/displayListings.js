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