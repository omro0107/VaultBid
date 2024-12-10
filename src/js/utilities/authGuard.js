export function authGuard() {
  if (!localStorage.getItem('accessToken')) {
    setTimeout(() => {
      alert("You must be logged in to view this page");
      window.location.href = "../../../../auth/login/index.html";
    }, 100);
  }
}
