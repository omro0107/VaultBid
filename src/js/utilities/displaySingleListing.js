import { showMessage } from "../utilities/showMessage.js";
import { placeBid } from "../api/listings/bid.js";

export function renderSingleListing(listing) {
  const isLoggedIn = !! localStorage.getItem("accessToken");

  const listingContainer = document.getElementById('single-listing-display'); 
  listingContainer.innerHTML = '';
  listingContainer.className = 'flex p-4';

  const mediaContainer = document.createElement('div');
  mediaContainer.className = 'flex-shrink-0 mr-4';

  if (listing.media.length > 0) {
    listing.media.forEach(media => {
      const mediaElement = document.createElement('img');
      mediaElement.src = media.url;
      mediaElement.alt = media.alt;
      mediaElement.className = 'w-48 h-auto mb-2';
      mediaContainer.appendChild(mediaElement);
    });
  }
  listingContainer.appendChild(mediaContainer);

  const contentContainer = document.createElement('div');
  contentContainer.className = 'flex flex-col';

  const titleElement = document.createElement('h2');
  titleElement.className = 'text-lg font-semibold mb-2';
  titleElement.textContent = listing.title;

  const descriptionElement = document.createElement('p');
  descriptionElement.className = 'mb-4';
  descriptionElement.textContent = listing.description;

  const tagsElement = document.createElement('p');
  tagsElement.className = 'text-sm mb-2';
  tagsElement.textContent = 'Tags: ' + listing.tags.join(', ');

  const bidsElement = document.createElement('p');
  bidsElement.className = 'text-sm mb-2';
  bidsElement.textContent = `Number of Bids: ${listing._count.bids}`;

  let highestBidAmount = 0;
  if (listing.bids && listing.bids.length > 0) {
    highestBidAmount = Math.max(...listing.bids.map(bid => bid.amount));
  }

  const highestBidElement = document.createElement('p');
  highestBidElement.className = 'text-lg font-semibold mb-4';
  if (highestBidAmount > 0) {
    highestBidElement.textContent = `Current Highest Bid: $${highestBidAmount}`;
  } else {
    highestBidElement.textContent = 'Current Highest Bid: No bids placed yet.';
  }

  const sellerElement = document.createElement('p');
  sellerElement.className = 'text-sm mb-2';
if (listing.seller && listing.seller.name) {
    sellerElement.textContent = `Seller: ${listing.seller.name}`;
} else {
    sellerElement.textContent = 'Seller: Unknown';
}

  const endsAtElement = document.createElement('p');
  endsAtElement.className = 'text-sm mb-4';
  endsAtElement.textContent = `Auction Ends At: ${new Date(listing.endsAt).toLocaleString()}`; 

  contentContainer.appendChild(titleElement);
  contentContainer.appendChild(descriptionElement);
  contentContainer.appendChild(tagsElement);
  contentContainer.appendChild(bidsElement);
  contentContainer.appendChild(highestBidElement);
  contentContainer.appendChild(sellerElement);
  contentContainer.appendChild(endsAtElement);

  const bidForm = document.createElement('form');
  bidForm.id = 'bid-form';
  bidForm.className = 'mt-4';

  if (isLoggedIn) {
    const bidLabel = document.createElement('label');
    bidLabel.setAttribute('for', 'bid-amount');
    bidLabel.className = 'mb-2';
    bidLabel.textContent = 'Enter your bid amount:';

    const bidInput = document.createElement('input');
    bidInput.type = 'number';
    bidInput.id = 'bid-amount';
    bidInput.name = 'bidAmount';
    bidInput.min = 1;
    bidInput.required = true;
    bidInput.className = 'border rounded p-2 mb-2';

    const bidButton = document.createElement('button');
    bidButton.type = 'submit';
    bidButton.className = 'bg-brand-dark text-white rounded p-2 hover:bg-accent';
    bidButton.textContent = 'Place Bid';

    bidForm.appendChild(bidLabel);
    bidForm.appendChild(bidInput);
    bidForm.appendChild(bidButton);
    contentContainer.appendChild(bidForm);

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
    contentContainer.appendChild(messageElement);
    const loginLink = document.createElement('a');
    loginLink.href = '/auth/login/index.html';
    loginLink.textContent = 'Log in here';
    contentContainer.appendChild(loginLink);
  }
  listingContainer.appendChild(contentContainer);
}