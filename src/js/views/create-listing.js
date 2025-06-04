/**
 * @fileoverview Create listing page initialization and functionality
 * Handles the create listing form, image management, and authentication
 */

import { authGuard } from "../utilities/authGuard.js";
import { getAccessToken } from "../api/constants.js";
import { setupAuthButtons } from "../utilities/authButtons.js";
import { onCreateListing } from "../ui/listings/create.js";
import { setupHeaderEventListeners } from "../utilities/headerEventlisteners.js";
import { setLogoutListener } from "../ui/globals/logout.js";

// Ensure user is authenticated before accessing this page
authGuard();

/**
 * Initializes the create listing page functionality
 * Sets up mobile menu, header events, authentication, and form handling
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
  setLogoutListener();
  setupAuthButtons(getAccessToken());
});

const form = document.getElementById("list-form");

/**
 * Adds a new image upload field to the form
 * Creates input fields for image URL and alt text with remove functionality
 */
document.getElementById("add-image").addEventListener("click", function() {
  const container = document.getElementById("image-upload-container");
  const newImageUpload = document.createElement("div");
  newImageUpload.classList.add("image-upload");
  newImageUpload.innerHTML = `
      <input type="url" name="imageURL" placeholder="Enter image URL" class="border rounded p-2 w-full mb-2" autocomplete="url" required>
      <input type="text" name="imageAltText" placeholder="Describe the image content" class="border rounded p-2 w-full mb-2" autocomplete="off">
      <button type="button" class="remove-image bg-brand-dark text-white rounded p-2" aria-label="Remove image">Remove</button>
  `;
  container.appendChild(newImageUpload);

  // Add remove functionality to the new image upload field
  newImageUpload.querySelector(".remove-image").addEventListener("click", function() {
    container.removeChild(newImageUpload);
  });
});

// Set up form submission handling
form.addEventListener("submit", onCreateListing);
