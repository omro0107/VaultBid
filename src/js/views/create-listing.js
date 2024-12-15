import { authGuard } from "../utilities/authGuard.js";
import { accessToken } from "../api/constants.js";
import { setupAuthButtons } from "../utilities/authButtons.js";
import { onCreateListing } from "../ui/listings/create.js";
import { setupHeaderEventListeners } from "../utilities/headerEventlisteners.js";
import { setLogoutListener } from "../ui/globals/logout.js";

authGuard();

document.addEventListener("DOMContentLoaded", () => {
  setupHeaderEventListeners();
  setLogoutListener();
  setupAuthButtons(accessToken);
});

const form = document.getElementById("list-form");

document.getElementById("add-image").addEventListener("click", function() {
  const container = document.getElementById("image-upload-container");
  const newImageUpload = document.createElement("div");
  newImageUpload.classList.add("image-upload");
  newImageUpload.innerHTML = `
      <input type="url" name="imageURL" placeholder="Enter image URL" required>
      <input type="text" name="imageAltText" placeholder="Describe the image content">
      <button type="button" class="remove-image" aria-label="Remove image">Remove</button>
  `;
  container.appendChild(newImageUpload);

  newImageUpload.querySelector(".remove-image").addEventListener("click", function() {
      container.removeChild(newImageUpload);
  });
});

form.addEventListener("submit", onCreateListing);