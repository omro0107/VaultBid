import { API_AUTH_REGISTER } from '../constants.js';
import { headers, validateResponseHeaders } from '../headers.js';
import { validationService } from '../../services/ValidationService.js';
import { showMessage } from '../../utilities/showMessage.js';

/**
 * Registers a new user with the provided details.
 *
 * This function sends a POST request to the authentication API to register a new user.
 * It includes comprehensive input validation, security checks, and enhanced error handling.
 *
 * @param {Object} userData - The user data for registration.
 * @param {string} userData.name - The name of the user.
 * @param {string} userData.email - The email address of the user.
 * @param {string} userData.password - The password for the user account.
 *
 * @returns {Promise<Object>} The result of the registration process.
 * @throws {Error} Throws an error if validation fails or if the request fails.
 */
export async function register({ name, email, password }) {
  try {
    // Validate all inputs
    const validationRules = {
      name: [{ method: 'validateUsername' }],
      email: [{ method: 'validateEmail' }],
      password: [{ method: 'validatePassword' }]
    };

    const { isValid, errors, sanitizedData } = validationService.validateFormData(
      { name, email, password },
      validationRules
    );

    if (!isValid) {
      const errorMessage = Object.values(errors)[0];
      showMessage("userError", errorMessage);
      throw new Error(errorMessage);
    }

    // Additional email domain validation for Noroff
    if (!email.endsWith('@stud.noroff.no')) {
      const errorMessage = "Invalid email address. Please use an email that ends with @stud.noroff.no.";
      showMessage("userError", errorMessage);
      throw new Error(errorMessage);
    }

    // Security threat check
    const securityChecks = [
      validationService.checkSecurityThreats(sanitizedData.name),
      validationService.checkSecurityThreats(sanitizedData.email)
    ];

    const securityThreats = securityChecks.find(check => !check.isSafe);
    if (securityThreats) {
      const errorMessage = "Invalid input detected";
      showMessage("userError", errorMessage);
      throw new Error(errorMessage);
    }

    // Make API request
    const response = await fetch(API_AUTH_REGISTER, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(sanitizedData),
    });

    // Validate response headers
    if (!validateResponseHeaders(response.headers)) {
      throw new Error('Invalid response headers');
    }

    const result = await response.json();

    if (!response.ok) {
      const errorMessage = result.errors?.[0]?.message || 'Registration failed';
      showMessage("userError", errorMessage);
      throw new Error(errorMessage);
    }

    // Validate response data
    if (!result.data) {
      throw new Error('Invalid response data');
    }

    // Redirect to login page on success
    window.location.href = "/auth/login/index.html";

    return result;
  } catch (error) {
    console.error('Registration error:', error);
    showMessage("userError", error.message || 'An error occurred during registration');
    throw error;
  }
}
