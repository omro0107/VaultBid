import { accessToken } from "../api/constants.js";
import { setupAuthButtons } from "../utilities/authButtons.js";
import { setLogoutListener } from "../ui/globals/logout.js";

document.addEventListener("DOMContentLoaded", async () => {
  setupAuthButtons(accessToken);
  setLogoutListener();
});