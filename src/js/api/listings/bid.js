import { headers } from "../headers.js";
import { API_AUCTION_BID, API_AUCTION_LISTINGS } from "../constants.js";
import { showMessage } from "../../utilities/showMessage.js";

export async function placeBid(listingId, bidAmount) {
  try {
    const bidUrl = `${API_AUCTION_BID(listingId)}?_seller=true&_bids=true`;
    console.log('Bid URL:', bidUrl);
    
    if (bidAmount <= 0) {
      throw new Error('Bid amount must be greater than zero.');
    }

    const response = await fetch(bidUrl, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ amount: bidAmount }),
    });

    console.log('Response Status:', response.status);
    const responseBody = await response.json();

    if (!response.ok) {
      console.error('Error Data:', responseBody);
      throw new Error(`Failed to place bid. Status: ${response.status}, Message: ${responseBody.message || 'unknown error'}`);
    }

    showMessage('Bid placed successfully!');

    const updatedListingResponse = await fetch(`${API_AUCTION_LISTINGS}/${listingId}?_seller=true&_bids=true`);
    const updatedListingData = await updatedListingResponse.json();
;

    return updatedListingData.data;
  } catch (error) {
    console.error('Error placing bid:', error);
    alert('Failed to place bid. Please try again.');
    throw error;
  }
}