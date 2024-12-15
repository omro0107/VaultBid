import { displaySingleListing } from "../api/listings/listing.js";
import { renderSingleListing } from "../utilities/displaySingleListing.js";
import { accessToken } from "../api/constants.js";
import { setupAuthButtons } from "../utilities/authButtons.js";
import { setLogoutListener } from "../ui/globals/logout.js";

document.addEventListener("DOMContentLoaded", async () => {
  const showListing = await displaySingleListing();
  console.log('Fetched listing data:', showListing);
  renderSingleListing(showListing);

  setupAuthButtons(accessToken);
  setLogoutListener();
});