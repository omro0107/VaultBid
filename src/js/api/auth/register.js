import { API_AUTH_REGISTER } from '../constants.js';
import { headers } from '../headers.js';

export async function register({
  name,
  email,
  password,
}) {
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
