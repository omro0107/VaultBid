import { login } from "../../api/auth/login.js";

export async function onLogin(event) {
  event.preventDefault();

  const form = event.target;

  const loggedInUserData = Object.fromEntries(new FormData(form));

  login(loggedInUserData);
}