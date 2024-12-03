import { API_AUTH_LOGIN } from "../constants";
import { headers } from "../headers";

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
      document.getElementById("userError").innerHTML = `${data.errors[0].message}`;
    }
    
    if (response.ok) {
      document.getElementById(
        "userSuccess"
      ).innerHTML = `Successfully logged in. Redirected to Home page`;
      setTimeout(() => {
        window.location.href = "/";
      });
    }

    localStorage.setItem("accessToken", `${data.data.accessToken}`);
    localStorage.setItem("userName", `${data.data.name}`);
    localStorage.setItem("myUserData", `${JSON.stringify(data)}`);
  } catch (error) {
    console.error('Error logging in.', error);
    throw error;
  }
}