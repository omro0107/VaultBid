export function getUsername() {
  return localStorage.getItem("userName") || '';
}