export function renderSingleListing(listing) {
  const listingContainer = document.getElementById('single-listing-display'); 


  listingContainer.innerHTML = '';

  const titleElement = document.createElement('h2');
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

  listingContainer.appendChild(titleElement);
  listingContainer.appendChild(descriptionElement);
  listingContainer.appendChild(mediaElement);
  listingContainer.appendChild(tagsElement);
  listingContainer.appendChild(bidsElement);
  listingContainer.appendChild(endsAtElement);
}