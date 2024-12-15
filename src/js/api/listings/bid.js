import { headers } from "../headers.js";
import { API_AUCTION_BID, API_AUCTION_LISTINGS } from "../constants.js";
import { showMessage } from "../../utilities/showMessage.js";

/**
 * Places a bid on a specific auction listing.
 *
 * This function sends a POST request to place a bid on the specified listing.
 * It validates the bid amount and updates the listing data after a successful bid.
 *
 * @param {string} listingId - The unique identifier of the listing to bid on.
 * @param {number} bidAmount - The amount of the bid to place.
 *
 * @returns {Promise<Object>} The updated listing data after placing the bid.
 * @throws {Error} Throws an error if the bid amount is invalid, if the fetch operation fails,
 *                 or if the response is not OK.
 */
export async function placeBid(listingId, bidAmount) {
  try {
    const bidUrl = `${API_AUCTION_BID(listingId)}?_seller=true&_bids=true`;
    
    if (bidAmount <= 0) {
      throw new Error('Bid amount must be greater than zero.');
    }

    const response = await fetch(bidUrl, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ amount: bidAmount }),
    });

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