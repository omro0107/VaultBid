import { onLogout } from "../auth/logout.js";

export function setLogoutListener() {
  const button = document.getElementById("logout-btn");


  button.addEventListener("click", onLogout);
}