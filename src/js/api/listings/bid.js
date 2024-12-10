import { headers } from "../headers.js";
import { API_AUCTION_BID, API_AUCTION_LISTINGS } from "../constants.js";
import { showMessage } from "../../utilities/showMessage.js";

export async function placeBid(listingId, bidAmount) {
  try {
    const bidUrl = `${API_AUCTION_BID(listingId)}?_seller=true&_bids=true`;
    console.log('Bid URL:', bidUrl);

    const response = await fetch(bidUrl, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ amount: bidAmount }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to place bid. Status: ${response.status}, Message: ${errorData.message}`);
    }

    showMessage('Bid placed successfully!');

    const updatedListing = await fetch(`${API_AUCTION_LISTINGS}/${listingId}`);
    const updatedData = await updatedListing.json();
    return updatedData.data;
  } catch (error) {
    console.error('Error placing bid:', error);
    alert('Failed to place bid. Please try again.');
    throw error;
  }
}