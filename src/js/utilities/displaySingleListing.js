import { headers } from "../api/headers.js" ;
import { API_AUCTION_LISTINGS } from "../api/constants.js";

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

  const bidForm = document.createElement('form');
  bidForm.id = 'bid-form';

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
      alert('Please enter a valid bid amount.');
      return;
    }

    try {
      const response = await fetch(`${API_AUCTION_LISTINGS}/${listing.id}/bids`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ amount: bidAmount }),
      });

      if (!response.ok) {
        throw new Error(`Failed to place bid. Status: ${response.status}`);
      }

      const result = await response.json();
      alert('Bid placed successfully!');
      console.log('Bid Response:', result);

      const updatedListing = await fetch(`${API_AUCTION_LISTINGS}/${listing.id}`);
      const updatedData = await updatedListing.json();
      renderSingleListing(updatedData.data);

    } catch (error) {
      console.error('Error placing bid:', error);
      alert('Failed to place bid. Please try again.');
    }
  });

}