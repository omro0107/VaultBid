import { API_AUTH_LOGIN } from "../constants.js";
import { headers } from "../headers.js";

export async function login({ email, password }) {
  try {
    const response = await fetch(`${API_AUTH_LOGIN}`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      document.getElementById("error-message").innerHTML = `${data.errors[0].message}`;
    }
    
    if (response.ok) {
      window.location.href ="/";
    }

    localStorage.setItem("accessToken", `${data.data.accessToken}`);
    localStorage.setItem("userName", `${data.data.name}`);
    localStorage.setItem("myUserData", `${JSON.stringify(data)}`);
  } catch (error) {
    console.error('Error logging in.', error);
    throw error;
  }
}