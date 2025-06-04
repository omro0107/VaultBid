import { authGuard } from "../utilities/authGuard.js";
import { displayUser  } from "../utilities/displayProfile.js";
import { setLogoutListener } from "../ui/globals/logout.js";
import { readProfile } from "../api/profile/read.js";
import { getUsername } from "../utilities/storage.js";
import { setupUpdateProfileModal } from "../ui/profile/update.js";
import { getAccessToken } from "../api/constants.js";
import { setupAuthButtons } from "../utilities/authButtons.js";

/**
 * Initializes the user profile page.
 *
 * This function sets up the authentication guard, fetches the user's profile data,
 * displays the user information, and sets up event listeners for the menu toggle,
 * logout functionality, and profile update modal.
 *
 * @returns {void} This function does not return a value.
 */

document.addEventListener("DOMContentLoaded", async () => {
  authGuard();
  
  const username = getUsername();
  
  try {
    const profileData = await readProfile(username);

    if (profileData && profileData.data) {
      localStorage.setItem("myUserData", JSON.stringify(profileData));
      displayUser (profileData.data);
    } else {
        console.error("Failed to fetch user profile data:", profileData);
    }
  } catch (error) {
    handleError(error);
  }

  const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

  setLogoutListener();
  setupUpdateProfileModal(); 
  setupAuthButtons(getAccessToken());
});

function handleError(error) {
  console.error("Error fetching profile data:", error);
  alert('An error occurred while fetching profile data. Please try again.');
}