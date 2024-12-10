import { authGuard } from "../utilities/authGuard.js";
import { displayUser  } from "../utilities/displayProfile.js";
import { setLogoutListener } from "../ui/globals/logout.js";
import { readProfile } from "../api/profile/read.js";
import { getUsername } from "../utilities/storage.js";
import { setupUpdateProfileModal } from "../ui/profile/update.js";


document.addEventListener("DOMContentLoaded", async () => {
  authGuard();
  
  const username = getUsername();
  
  try {
    const profileData = await readProfile(username);
    console.log("Profile Data:", profileData);

    if (profileData && profileData.data) {
      localStorage.setItem("myUserData", JSON.stringify(profileData));
      displayUser (profileData.data);
    } else {
        console.error("Failed to fetch user profile data:", profileData);
    }
  } catch (error) {
    handleError(error);
  }

  setLogoutListener();
  setupUpdateProfileModal(); 
});

function handleError(error) {
  console.error("Error fetching profile data:", error);
  alert('An error occurred while fetching profile data. Please try again.');
}