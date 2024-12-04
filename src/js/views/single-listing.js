import { displaySingleListing } from "../api/listings/listing.js";
import { renderSingleListing } from "../utilities/displaySingleListing.js";

const showListing = await displaySingleListing();
renderSingleListing(showListing);