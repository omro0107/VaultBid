import { displaySingleListing } from "../api/listings/listing.js";
import { renderSingleListing } from "../utilities/displaySingleListing.js";
import { accessToken } from "../api/constants.js";
import { setupAuthButtons } from "../utilities/authButtons.js";
import { setLogoutListener } from "../ui/globals/logout.js";

/**
 * Initializes the single listing page.
 *
 * This function sets up event listeners for the menu toggle, fetches the single listing data,
 * renders the listing, and sets up authentication buttons and logout listener.
 *
 * @returns {void} This function does not return a value.
 */

document.addEventListener("DOMContentLoaded", async () => {
  const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }
  const showListing = await displaySingleListing();
  renderSingleListing(showListing);
  setupAuthButtons(accessToken);
  setLogoutListener();
});