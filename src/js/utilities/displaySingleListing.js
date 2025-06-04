import { showMessage } from "../utilities/showMessage.js";
import { placeBid } from "../api/listings/bid.js";
import { tokenService } from "../services/TokenService.js";

/**
 * Renders a single listing on the page.
 *
 * This function displays the details of a specific listing, including its media, title, description,
 * tags, number of bids, highest bid amount, seller information, and auction end time. It also
 * provides a form for placing a bid if the user is logged in.
 *
 * @param {Object} listing - The listing object containing details to be displayed.
 * @param {string} listing.id - The unique identifier for the listing.
 * @param {string} listing.title - The title of the listing.
 * @param {string} listing.description - A description of the listing.
 * @param {Array<Object>} listing.media - An array of media objects associated with the listing.
 * @param {string} listing.media[].url - The URL of the media.
 * @param {string} listing.media[].alt - The alt text for the media.
 * @param {Array<string>} listing.tags - An array of tags associated with the listing.
 * @param {Object} listing._count - An object containing counts related to the listing.
 * @param {number} listing._count.bids - The number of bids placed on the listing.
 * @param {Array<Object>} listing.bids - An array of bid objects associated with the listing.
 * @param {Object} listing.seller - The seller information for the listing.
 * @param {string} listing.seller.name - The name of the seller.
 * @param {string} listing.endsAt - The end time of the auction in ISO format.
 *
 * @returns {void} This function does not return a value.
 */

export function renderSingleListing(listing) {
  const isLoggedIn = tokenService.isAuthenticated();
  const isListingEnded = listing && listing.endsAt && new Date(listing.endsAt) <= new Date();

  const listingContainer = document.getElementById('single-listing-display'); 
  listingContainer.innerHTML = '';
  listingContainer.className = 'container mx-auto max-w-6xl px-4 py-8';

  // Only show skeleton if listing data is not available
  if (!listing) {
    const skeletonContainer = document.createElement('div');
    skeletonContainer.className = 'flex flex-col space-y-4';
    skeletonContainer.id = 'skeleton-loader';
    
    const skeletonImage = document.createElement('div');
    skeletonImage.className = 'bg-gray-200 h-48 rounded-lg animate-pulse';
    skeletonContainer.appendChild(skeletonImage);

    const skeletonTitle = document.createElement('div');
    skeletonTitle.className = 'bg-gray-200 h-6 rounded-lg animate-pulse w-3/4';
    skeletonContainer.appendChild(skeletonTitle);

    const skeletonDescription = document.createElement('div');
    skeletonDescription.className = 'bg-gray-200 h-4 rounded-lg animate-pulse w-full';
    skeletonContainer.appendChild(skeletonDescription);

    const skeletonTags = document.createElement('div');
    skeletonTags.className = 'bg-gray-200 h-4 rounded-lg animate-pulse w-1/2';
    skeletonContainer.appendChild(skeletonTags);

    listingContainer.appendChild(skeletonContainer);
    return;
  }

  // Remove skeleton if it exists
  const existingSkeleton = document.getElementById('skeleton-loader');
  if (existingSkeleton) {
    existingSkeleton.remove();
  }

  const messageContainer = document.createElement('div');
  messageContainer.id = 'message-container';
  messageContainer.className = 'hidden bg-green-500 text-white p-4 rounded mb-4';
  listingContainer.appendChild(messageContainer);

  const mediaContainer = document.createElement('div');
  mediaContainer.className = 'flex flex-col items-center mb-8';

  const mainImage = document.createElement('img');
  mainImage.className = 'w-full max-w-2xl h-auto max-h-96 object-cover rounded-lg mb-2 mx-auto';
  if (listing.media.length > 0) {
    mainImage.src = listing.media[0].url;
    mainImage.alt = listing.media[0].alt;
    }
  mediaContainer.appendChild(mainImage);

  const carouselContainer = document.createElement('div');
  carouselContainer.className = 'flex overflow-x-auto gap-4 mt-4 max-w-2xl mx-auto';

  listing.media.forEach((media, index) => {
    const imgElement = document.createElement('img');
    imgElement.src = media.url;
    imgElement.alt = media.alt;
    imgElement.className = 'w-24 h-auto mr-2 cursor-pointer';
    imgElement.dataset.index = index;
    imgElement.addEventListener('click', () => {
      mainImage.src = media.url;
      mainImage.alt = media.alt;
    });
    carouselContainer.appendChild(imgElement);
  });

  mediaContainer.appendChild(carouselContainer);
  listingContainer.appendChild(mediaContainer);

  const contentContainer = document.createElement('div');
  contentContainer.className = 'flex flex-col max-w-2xl mx-auto w-full bg-white p-6 rounded-lg shadow-sm';

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
  bidForm.className = 'mt-6 p-4 bg-gray-50 rounded-lg border';

  if (isListingEnded) {
    // Show ended auction message
    const endedMessageElement = document.createElement('div');
    endedMessageElement.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4';
    endedMessageElement.innerHTML = `
      <strong>Auction Ended</strong><br>
      This auction has ended on ${new Date(listing.endsAt).toLocaleString()}. No more bids can be placed.
    `;
    contentContainer.appendChild(endedMessageElement);
  } else if (isLoggedIn) {
    const bidLabel = document.createElement('label');
    bidLabel.setAttribute('for', 'bid-amount');
    bidLabel.className = 'block text-sm font-medium text-gray-700 mb-2';
    bidLabel.textContent = 'Enter your bid amount:';

    const bidInput = document.createElement('input');
    bidInput.type = 'number';
    bidInput.id = 'bid-amount';
    bidInput.required = true;
    bidInput.step = '0.01';
    bidInput.min = '0';
    bidInput.placeholder = 'Enter amount...';
    bidInput.className = 'w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brand-dark focus:border-transparent';

    const bidButton = document.createElement('button');
    bidButton.type = 'submit';
    bidButton.className = 'w-full bg-brand-dark text-white rounded-md py-2 px-4 hover:bg-brand-darker focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2 transition-colors duration-200';
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

      try {
        const updatedListingData = await placeBid(listing.id, bidAmount);
        
        // Show success modal
        const successModal = document.createElement('div');
        successModal.className = 'fixed inset-0 flex items-center justify-center z-50';
        successModal.innerHTML = `
          <div class="fixed inset-0 bg-black opacity-50"></div>
          <div class="bg-white p-6 rounded-lg shadow-xl z-10 max-w-md w-full mx-4">
            <div class="text-center">
              <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-2">Bid Placed Successfully!</h3>
              <p class="text-sm text-gray-500 mb-4">Your bid of $${bidAmount} has been placed.</p>
              <button class="bg-brand-dark text-white px-4 py-2 rounded hover:bg-brand-darker">Close</button>
            </div>
          </div>
        `;
        
        document.body.appendChild(successModal);
        
        // Add click handlers
        const closeButton = successModal.querySelector('button');
        const backdrop = successModal.querySelector('.fixed.inset-0.bg-black');
        
        const closeModal = () => {
          successModal.remove();
          renderSingleListing(updatedListingData);
        };
        
        closeButton.addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);
        
        // Auto close after 3 seconds
        setTimeout(closeModal, 3000);
        
      } catch (error) {
        console.error('Error placing bid:', error);
        showMessage('error', 'Failed to place bid. Please try again.');
      }
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