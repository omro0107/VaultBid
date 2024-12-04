import { onRegister } from "../ui/auth/register.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.forms.register;

  form.addEventListener("submit", onRegister);
});