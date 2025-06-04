import { API_AUTH_LOGIN } from "../constants.js";
import { headers, validateResponseHeaders } from "../headers.js";
import { validationService } from "../../services/ValidationService.js";
import { tokenService } from "../../services/TokenService.js";
import { showMessage } from "../../utilities/showMessage.js";

/**
 * Logs in a user with the provided email and password.
 *
 * This function sends a POST request to the authentication API to log in a user.
 * It includes input validation, secure token storage, and enhanced error handling.
 *
 * @param {Object} userData - The user data for login.
 * @param {string} userData.email - The email address of the user.
 * @param {string} userData.password - The password for the user account.
 *
 * @returns {Promise<Object>} Returns the login response data if successful.
 * @throws {Error} Throws an error if validation fails or if the request fails.
 */
export async function login({ email, password }) {
  try {
    // Validate input
    const emailValidation = validationService.validateEmail(email);
    const passwordValidation = validationService.validatePassword(password);

    if (!emailValidation.isValid || !passwordValidation.isValid) {
      const errorMessage = !emailValidation.isValid 
        ? emailValidation.message 
        : passwordValidation.message;
      showMessage("error-message", errorMessage);
      throw new Error(errorMessage);
    }

    // Check for security threats
    const securityCheck = validationService.checkSecurityThreats(email);
    if (!securityCheck.isSafe) {
      const errorMessage = "Invalid input detected";
      showMessage("error-message", errorMessage);
      throw new Error(errorMessage);
    }

    // Make API request
    const response = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        email: emailValidation.value,
        password: passwordValidation.value,
      }),
    });

    // Validate response headers
    if (!validateResponseHeaders(response.headers)) {
      throw new Error('Invalid response headers');
    }

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.errors?.[0]?.message || 'Login failed';
      showMessage("error-message", errorMessage);
      throw new Error(errorMessage);
    }

    // Validate response data
    if (!data.data?.accessToken || !data.data?.name) {
      throw new Error('Invalid response data');
    }

    // Store data securely
    tokenService.setAccessToken(data.data.accessToken);
    tokenService.setUserData(data);

    // Redirect on success
    window.location.href = "/";

    return data;
  } catch (error) {
    console.error('Login error:', error);
    showMessage("error-message", error.message || 'An error occurred during login');
    throw error;
  }
}
