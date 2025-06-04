import { tokenService } from '../../services/TokenService.js';

/**
 * Handles user logout by securely clearing all stored data
 * and redirecting to the login page.
 * 
 * @returns {Promise<void>}
 */
export async function onLogout() {
  try {
    // Use TokenService to securely clear all stored data
    tokenService.logout();

    // Redirect to login page
    window.location.href = "/auth/login/index.html";
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}
