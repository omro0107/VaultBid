export function renderAllListings(listings) {
  const listingsContainer = document.getElementById('listing-display');
  const thumbnailsContainer = document.getElementById('listings-thumbnails');

 
  listingsContainer.innerHTML = '';
  thumbnailsContainer.innerHTML = '';

  const latestListings = listings.slice(0, 6);
  const remainingListings = listings.slice(6);

  latestListings.forEach(listing => {
    const listingElement = document.createElement('div');
    listingElement.classList.add('listing-item');
    
    const titleElement = document.createElement('h3');
    titleElement.textContent = listing.title;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = listing.description;

    const mediaElement = document.createElement('img');
    if (listing.media.length > 0) {
      mediaElement.src = listing.media[0].url;
      mediaElement.alt = listing.media[0].alt;
    }

    const tagsElement = document.createElement('p');
    tagsElement.textContent = 'Tags: ' + listing.tags.join(', ');

    const bidsElement = document.createElement('p');
    bidsElement.textContent = `Number of Bids: ${listing._count.bids}`;

    const endsAtElement = document.createElement('p');
    endsAtElement.textContent = `Auction Ends At: ${new Date(listing.endsAt).toLocaleString()}`;

    listingElement.appendChild(titleElement);
    listingElement.appendChild(descriptionElement);
    listingElement.appendChild(mediaElement);
    listingElement.appendChild(tagsElement);
    listingElement.appendChild(bidsElement);
    listingElement.appendChild(endsAtElement);

    listingElement.addEventListener('click', () => {
      window.location.href = `../../../auctions/listing/index.html?id=${listing.id}`;
    });

    listingsContainer.appendChild(listingElement);
  });

  remainingListings.forEach((listing) => {
    const thumbnailElement = document.createElement('div');
    thumbnailElement.classList.add('thumbnail-item');

    const thumbnailImage = document.createElement('img');
    if (listing.media.length > 0) {
      thumbnailImage.src = listing.media[0].url;
      thumbnailImage.alt = listing.media[0].alt;
    }

    const thumbnailTitle = document.createElement('p');
    thumbnailTitle.textContent = listing.title;

    thumbnailElement.appendChild(thumbnailImage);
    thumbnailElement.appendChild(thumbnailTitle);

    thumbnailElement.addEventListener('click', () => {
      window.location.href = `../../../auctions/listing/index.html?id=${listing.id}`;
    });

    thumbnailsContainer.appendChild(thumbnailElement);
  });
}