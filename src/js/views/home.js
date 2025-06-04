/**
 * @fileoverview Home page initialization and setup
 * Handles the main page functionality including listings display, pagination, and authentication
 */

import { getAccessToken } from "../api/constants.js";
import { setLogoutListener } from "../ui/globals/logout.js";
import { loadListings } from "../utilities/displayListings.js";
import { setupPagination } from "../utilities/pagination.js";
import { setupHeaderEventListeners } from "../utilities/headerEventlisteners.js";
import { setupAuthButtons } from "../utilities/authButtons.js";

/**
 * Initializes the home page functionality when DOM is loaded
 * Sets up mobile menu, header events, pagination, listings, and authentication
 */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  // Set up mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Initialize page functionality
  setupHeaderEventListeners();
  setupPagination(loadListings);
  loadListings(1); // Start with page 1
  setLogoutListener();
  setupAuthButtons(getAccessToken());
});

