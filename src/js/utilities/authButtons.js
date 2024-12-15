export function setupAuthButtons(accessToken) {
  console.log("Setting up auth buttons with accessToken:", accessToken);
  const loginBtn = document.getElementById("login-btn");
  const registerBtn = document.getElementById("register-btn");
  const logoutBtn = document.getElementById("logout-btn");

  if (loginBtn && registerBtn && logoutBtn) {
    if (accessToken) {
      loginBtn.style.display = "none";
      registerBtn.style.display = "none";
    } else {
      logoutBtn.style.display = "none";
    }
  } else {
    console.warn("Auth buttons not found in the DOM.");
  }
}