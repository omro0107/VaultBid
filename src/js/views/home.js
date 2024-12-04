import { authGuard } from "../utilities/authGuard.js";
import { accessToken } from "../api/constants.js";
import { setLogoutListener } from "../ui/globals/logout.js";
import { displayAllListings, displayError } from "../api/listings/listing.js";

if (accessToken) {
  document.getElementById("login-btn").style.display = "none";
  document.getElementById("register-btn").style.display = "none";
}

if (!accessToken) {
  document.getElementById("logout-btn").style.display = "none";
}

authGuard();
setLogoutListener();
displayAllListings();
displayError();