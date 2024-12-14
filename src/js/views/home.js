import { accessToken } from "../api/constants.js";
import { setLogoutListener } from "../ui/globals/logout.js";
import { showMessage } from "../utilities/showMessage.js";
import { fetchListings } from "../api/listings/allListings.js";
import { renderListings, updatePaginationControls } from "../utilities/displayListings.js";
import { setupPagination } from "../utilities/pagination.js";
import { searchListings } from "../api/listings/searchListings.js";

let currentPage = 1;
let totalPages = 1;

const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const logoutBtn = document.getElementById("logout-btn");

if (accessToken) {
  loginBtn.style.display = "none";
  registerBtn.style.display = "none";
} else {
  logoutBtn.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginIcon = document.getElementById("login-btn");

  if (loginIcon) {
    loginIcon.addEventListener("click", () => {
      window.location.href = "../../../auth/login/index.html";
    });
  }

  const registerIcon = document.getElementById("register-btn");

  if (registerIcon) {
    registerIcon.addEventListener("click", () => {
      window.location.href = "../../../auth/register/index.html";
    });
  }

  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");

  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      searchListings(query, currentPage);
    }
  });

  searchInput.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        searchListings(query, currentPage);
      }
    }
  });
});

async function loadListings(page = 1) {
  currentPage = page;
  console.log(`loading listings for page: ${currentPage}`);
  try {
    const data = await fetchListings(12, page);
    console.log('Fetched data:', data);

    const listings = data.data
    totalPages = data.meta.pageCount;
    console.log(`Current Page: ${currentPage}, Total Pages: ${totalPages}`);
    
    renderListings(listings);
    updatePaginationControls(currentPage, totalPages);
  } catch (error) {
    console.error('Failed to load listings:', error);
    showMessage('Failed to load listings. Please try again later.');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupPagination(currentPage, totalPages, loadListings);
  loadListings(currentPage);
  setLogoutListener();
});