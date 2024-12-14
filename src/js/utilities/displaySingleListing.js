import { showMessage } from "../utilities/showMessage.js";
import { placeBid } from "../api/listings/bid.js";

export function renderSingleListing(listing) {
  const isLoggedIn = !! localStorage.getItem("accessToken");

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

  let highestBidAmount = 0;
  if (listing.bids && listing.bids.length > 0) {
    highestBidAmount = Math.max(...listing.bids.map(bid => bid.amount));
  }

  const highestBidElement = document.createElement('p');
  if (highestBidAmount > 0) {
    highestBidElement.textContent = `Current Highest Bid: $${highestBidAmount}`;
  } else {
    highestBidElement.textContent = 'Current Highest Bid: No bids placed yet.';
  }

  const sellerElement = document.createElement('p');
if (listing.seller && listing.seller.name) {
    sellerElement.textContent = `Seller: ${listing.seller.name}`;
} else {
    sellerElement.textContent = 'Seller: Unknown';
}

  const endsAtElement = document.createElement('p');
  endsAtElement.textContent = `Auction Ends At: ${new Date(listing.endsAt).toLocaleString()}`; 

  listingContainer.appendChild(titleElement);
  listingContainer.appendChild(descriptionElement);
  listingContainer.appendChild(mediaElement);
  listingContainer.appendChild(tagsElement);
  listingContainer.appendChild(bidsElement);
  listingContainer.appendChild(highestBidElement);
  listingContainer.appendChild(sellerElement);
  listingContainer.appendChild(endsAtElement);

  const bidForm = document.createElement('form');
  bidForm.id = 'bid-form';

  if (isLoggedIn) {
    const bidLabel = document.createElement('label');
    bidLabel.setAttribute('for', 'bid-amount');
    bidLabel.textContent = 'Enter your bid amount:';

    const bidInput = document.createElement('input');
    bidInput.type = 'number';
    bidInput.id = 'bid-amount';
    bidInput.name = 'bidAmount';
    bidInput.min = 1;
    bidInput.required = true;

    const bidButton = document.createElement('button');
    bidButton.type = 'submit';
    bidButton.textContent = 'Place Bid';

    bidForm.appendChild(bidLabel);
    bidForm.appendChild(bidInput);
    bidForm.appendChild(bidButton);
    listingContainer.appendChild(bidForm);

    bidForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const bidAmount = parseFloat(bidInput.value);

      if (!bidAmount || bidAmount <= 0) {
        showMessage('Please enter a valid bid amount.');
        return;
      }

      console.log('Placing bid with amount:', bidAmount);

      const updatedListingData = await placeBid(listing.id, bidAmount);
      renderSingleListing(updatedListingData);
    });
  } else {
    const messageElement = document.createElement('p');
    messageElement.textContent = 'You must be logged in to place a bid. Please log in or register.';
    listingContainer.appendChild(messageElement);
    const loginLink = document.createElement('a');
    loginLink.href = '/auth/login/index.html';
    loginLink.textContent = 'Log in here';
    listingContainer.appendChild(loginLink);
  }
}