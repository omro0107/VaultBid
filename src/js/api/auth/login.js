import { API_AUTH_LOGIN } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Logs in a user with the provided email and password.
 *
 * This function sends a POST request to the authentication API to log in a user.
 * It handles the response, including error messages and storing user data in local storage.
 *
 * @param {Object} userData - The user data for login.
 * @param {string} userData.email - The email address of the user.
 * @param {string} userData.password - The password for the user account.
 *
 * @returns {Promise<void>} This function does not return a value.
 * @throws {Error} Throws an error if the fetch operation fails or if the response is not OK.
 */
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