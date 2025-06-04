import { displaySingleListing } from "../api/listings/listing.js";
import { renderSingleListing } from "../utilities/displaySingleListing.js";
import { getAccessToken } from "../api/constants.js";
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

  // Show skeleton loader initially
  renderSingleListing(null);
  
  try {
    // Fetch the listing data
    const showListing = await displaySingleListing();
    // Render the actual listing (this will remove the skeleton)
    renderSingleListing(showListing);
  } catch (error) {
    console.error('Error loading listing:', error);
    // Handle error - could show error message instead of skeleton
    const listingContainer = document.getElementById('single-listing-display');
    listingContainer.innerHTML = '<div class="text-red-500 p-4">Failed to load listing. Please try again.</div>';
  }
  
  setupAuthButtons(getAccessToken());
  setLogoutListener();
});
