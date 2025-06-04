/**
 * Sets up authentication-dependent UI elements visibility
 * @param {string} accessToken - The current access token
 */
export function setupAuthButtons(accessToken) {
  const loginBtn = document.getElementById("login-btn");
  const registerBtn = document.getElementById("register-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const listItemBtn = document.getElementById("list");
  const profileBtn = document.getElementById("profile");

  // Check if auth buttons exist
  const authButtons = [loginBtn, registerBtn, logoutBtn];
  if (!authButtons.every(btn => btn)) {
    console.warn("Some auth buttons not found in the DOM.");
    return;
  }

  if (accessToken) {
    // User is logged in
    loginBtn.style.display = "none";
    registerBtn.style.display = "none";
    logoutBtn.style.display = "block";
    if (listItemBtn) listItemBtn.style.display = "block";
    if (profileBtn) profileBtn.style.display = "block";
  } else {
    // User is not logged in
    loginBtn.style.display = "block";
    registerBtn.style.display = "block";
    logoutBtn.style.display = "none";
    if (listItemBtn) listItemBtn.style.display = "none";
    if (profileBtn) profileBtn.style.display = "none";
  }
}
