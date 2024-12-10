import { displaySingleListing } from "../api/listings/listing.js";
import { renderSingleListing } from "../utilities/displaySingleListing.js";

const showListing = await displaySingleListing();
console.log('Fetched listing data:', showListing);
renderSingleListing(showListing);