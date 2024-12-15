import { accessToken } from "../api/constants.js";
import { setLogoutListener } from "../ui/globals/logout.js";
import { loadListings } from "../utilities/displayListings.js";
import { setupPagination } from "../utilities/pagination.js";
import { setupHeaderEventListeners } from "../utilities/headerEventlisteners.js";
import { setupAuthButtons } from "../utilities/authButtons.js";

let currentPage = 1;
let totalPages = 1;

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

  setupHeaderEventListeners();
  setupPagination(currentPage, totalPages, loadListings);
  loadListings(currentPage);
  setLogoutListener();
  setupAuthButtons(accessToken);
});

