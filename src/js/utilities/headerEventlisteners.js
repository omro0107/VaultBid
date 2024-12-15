import { searchListings } from "../../js/api/listings/searchListings.js";

export function setupHeaderEventListeners() {
  const searchIcon = document.getElementById("search");
  const searchInputContainer = document.getElementById("search-input-container");
  const headerSearchInput = document.getElementById("header-search-input");
  const searchButton = document.getElementById("search-button");
  const loginBtn = document.getElementById("login-btn");
  const registerBtn = document.getElementById("register-btn");
  const logoutBtn = document.getElementById("logout-btn");

  if (searchIcon && searchInputContainer && headerSearchInput && searchButton) {
    searchIcon.addEventListener("click", () => {
      searchInputContainer.classList.toggle("hidden");
      headerSearchInput.focus();
    });

    document.addEventListener("click", (event) => {
      if (!searchIcon.contains(event.target) && !searchInputContainer.contains(event.target)) {
        searchInputContainer.classList.add("hidden");
      }
    });

    searchButton.addEventListener("click", () => {
      const query = headerSearchInput.value.trim();
      if (query) {
        searchListings(query, 1);
      }
    });

    headerSearchInput.addEventListener("keypress", (event) => {
      if (event.key === 'Enter') {
        const query = headerSearchInput.value.trim();
        if (query) {
          searchListings(query, 1);
        }
      }
    });
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      window.location.href = "../../../auth/login/";
    });
  }

  if (registerBtn) {
    registerBtn.addEventListener("click", () => {
      window.location.href = "../../../auth/register/";
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
    });
  }
}