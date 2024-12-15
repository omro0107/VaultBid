import { API_AUTH_REGISTER } from '../constants.js';
import { headers } from '../headers.js';

/**
 * Registers a new user with the provided details.
 *
 * This function sends a POST request to the authentication API to register a new user.
 * It validates the email format and handles the response, including error messages.
 *
 * @param {Object} userData - The user data for registration.
 * @param {string} userData.name - The name of the user.
 * @param {string} userData.email - The email address of the user.
 * @param {string} userData.password - The password for the user account.
 *
 * @returns {Promise<Object>} The result of the registration process.
 * @throws {Error} Throws an error if the fetch operation fails or if the response is not OK.
 */
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
