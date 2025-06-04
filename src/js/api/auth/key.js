import { API_AUTH_KEY } from "../constants.js";
import { headers, validateResponseHeaders } from "../headers.js";
import { tokenService } from "../../services/TokenService.js";

/**
 * Retrieves and securely stores the API key
 * @returns {Promise<string>} The API key
 * @throws {Error} If the request fails or response is invalid
 */
export async function getKey() {
  try {
    const response = await fetch(API_AUTH_KEY, {
      method: "POST",
      headers: headers(),
    });

    // Validate response headers
    if (!validateResponseHeaders(response.headers)) {
      throw new Error('Invalid response headers');
    }

    if (!response.ok) {
      throw new Error(`Failed to get key: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Validate response data
    if (!data?.key) {
      throw new Error('Invalid response data: missing key');
    }

    // Store API key securely
    tokenService.setApiKey(data.key);

    return data.key;
  } catch (error) {
    console.error('Error getting API key:', error);
    throw error;
  }
}
