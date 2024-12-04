export function renderAllListings(listings) {
  const listingsContainer = document.getElementById('listing-display');

 
  listingsContainer.innerHTML = '';

  listings.forEach(listing => {
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

    listingsContainer.appendChild(listingElement);
  });
}