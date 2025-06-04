import { tokenService } from '../services/TokenService.js';

/**
 * Get username using secure token service
 * @returns {string} The username or empty string if not found
 */
export function getUsername() {
  return tokenService.getUsername() || '';
}

/**
 * Check if user is authenticated
 * @returns {boolean} True if user is authenticated
 */
export function isAuthenticated() {
  return tokenService.isAuthenticated();
}

/**
 * Get user data using secure token service
 * @returns {Object|null} User data or null if not found
 */
export function getUserData() {
  return tokenService.getUserData();
}
