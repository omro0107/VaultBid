import { tokenService } from '../services/TokenService.js';

/**
 * Authentication guard to protect routes
 * Redirects to login page if user is not authenticated
 */
export function authGuard() {
  if (!tokenService.isAuthenticated()) {
    setTimeout(() => {
      alert("You must be logged in to view this page");
      window.location.href = "/auth/login/index.html";
    }, 100);
  }
}

/**
 * Check if user is authenticated without redirecting
 * @returns {boolean} True if user is authenticated
 */
export function isUserAuthenticated() {
  return tokenService.isAuthenticated();
}

/**
 * Get authentication status and token info for debugging
 * @returns {Object} Authentication status and token information
 */
export function getAuthStatus() {
  return {
    isAuthenticated: tokenService.isAuthenticated(),
    tokenInfo: tokenService.getTokenInfo()
  };
}
