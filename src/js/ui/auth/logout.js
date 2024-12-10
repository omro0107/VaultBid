export async function onLogout() {
  try {
    localStorage.clear();

    window.location.href = "../../../../../auth/login/index.html";
    
  } catch (error) {
    console.error(error);
  }
}