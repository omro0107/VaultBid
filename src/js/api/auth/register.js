import { API_AUTH_REGISTER } from '../constants.js';
import { headers } from '../headers.js';

export async function register({
  name,
  email,
  password,
}) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
  if (!emailPattern.test(email)) {
    document.getElementById("userError").innerHTML = "Invalid email address. Please use an email that ends with @stud.noroff.no.";
    return;
  }
  try {
    const response = await fetch(`${API_AUTH_REGISTER}`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      document.getElementById("userError").innerHTML = `${result.errors[0].message}`;
    }

    if (response.ok) {
    window.location.href = "../../../../auth/login/index.html";
    }
    return result
  } catch (error) {
    console.error(error);
    throw error;
  }
  }
