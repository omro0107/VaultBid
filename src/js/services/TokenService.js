/**
 * TokenService - Centralized token management with security enhancements
 * Handles token storage, validation, and automatic cleanup
 */

import { secureStorage } from './SecureStorageService.js';

class TokenService {
  constructor() {
    this.TOKEN_KEY = 'accessToken';
    this.USER_DATA_KEY = 'userData';
    this.USERNAME_KEY = 'userName';
    this.API_KEY_STORAGE = 'apiKey';
    this.TOKEN_EXPIRY_KEY = 'tokenExpiry';
    
    // Set token expiry time (24 hours in milliseconds)
    this.TOKEN_EXPIRY_TIME = 24 * 60 * 60 * 1000;
    
    // Initialize cleanup on page load
    this.initializeCleanup();
  }

  /**
   * Initialize automatic cleanup and validation
   */
  initializeCleanup() {
    // Clean expired tokens on initialization
    this.cleanExpiredTokens();
    
    // Set up periodic cleanup (every 5 minutes)
    setInterval(() => {
      this.cleanExpiredTokens();
    }, 5 * 60 * 1000);

    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
      this.cleanup();
    });
  }

  /**
   * Store access token with expiry
   */
  setAccessToken(token) {
    if (!token || typeof token !== 'string') {
      console.error('Invalid token provided');
      return false;
    }

    const expiryTime = Date.now() + this.TOKEN_EXPIRY_TIME;
    
    secureStorage.setItem(this.TOKEN_KEY, token, true); // Encrypt token
    secureStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime);
    
    return true;
  }

  /**
   * Get access token if valid
   */
  getAccessToken() {
    if (!this.isTokenValid()) {
      this.clearTokens();
      return null;
    }

    return secureStorage.getItem(this.TOKEN_KEY, true); // Decrypt token
  }

  /**
   * Check if token exists and is not expired
   */
  isTokenValid() {
    const token = secureStorage.getItem(this.TOKEN_KEY, true);
    const expiry = secureStorage.getItem(this.TOKEN_EXPIRY_KEY);

    if (!token || !expiry) {
      return false;
    }

    return Date.now() < expiry;
  }

  /**
   * Store user data securely
   */
  setUserData(userData) {
    if (!userData) {
      console.error('Invalid user data provided');
      return false;
    }

    secureStorage.setItem(this.USER_DATA_KEY, userData, true); // Encrypt user data
    
    // Store username separately for easy access
    if (userData.data && userData.data.name) {
      secureStorage.setItem(this.USERNAME_KEY, userData.data.name);
    }

    return true;
  }

  /**
   * Get user data
   */
  getUserData() {
    return secureStorage.getItem(this.USER_DATA_KEY, true); // Decrypt user data
  }

  /**
   * Get username
   */
  getUsername() {
    return secureStorage.getItem(this.USERNAME_KEY) || '';
  }

  /**
   * Store API key securely
   */
  setApiKey(apiKey) {
    if (!apiKey) {
      console.error('Invalid API key provided');
      return false;
    }

    secureStorage.setItem(this.API_KEY_STORAGE, apiKey, true); // Encrypt API key
    return true;
  }

  /**
   * Get API key
   */
  getApiKey() {
    return secureStorage.getItem(this.API_KEY_STORAGE, true); // Decrypt API key
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return this.isTokenValid() && this.getAccessToken() !== null;
  }

  /**
   * Clear all tokens and user data
   */
  clearTokens() {
    secureStorage.removeItem(this.TOKEN_KEY);
    secureStorage.removeItem(this.TOKEN_EXPIRY_KEY);
    secureStorage.removeItem(this.USER_DATA_KEY);
    secureStorage.removeItem(this.USERNAME_KEY);
    secureStorage.removeItem(this.API_KEY_STORAGE);
  }

  /**
   * Clean expired tokens
   */
  cleanExpiredTokens() {
    if (!this.isTokenValid()) {
      this.clearTokens();
    }
  }

  /**
   * Refresh token (placeholder for future implementation)
   */
  async refreshToken() {
    // This would typically make an API call to refresh the token
    // For now, we'll just validate the current token
    if (!this.isTokenValid()) {
      this.clearTokens();
      return false;
    }
    return true;
  }

  /**
   * Logout and clear all data
   */
  logout() {
    this.clearTokens();
    secureStorage.clear();
  }

  /**
   * Cleanup on page unload
   */
  cleanup() {
    // Perform any necessary cleanup
    this.cleanExpiredTokens();
  }

  /**
   * Get token info for debugging (without exposing actual token)
   */
  getTokenInfo() {
    const hasToken = secureStorage.hasItem(this.TOKEN_KEY);
    const expiry = secureStorage.getItem(this.TOKEN_EXPIRY_KEY);
    const isValid = this.isTokenValid();

    return {
      hasToken,
      isValid,
      expiresAt: expiry ? new Date(expiry).toISOString() : null,
      timeUntilExpiry: expiry ? Math.max(0, expiry - Date.now()) : 0
    };
  }
}

// Export singleton instance
export const tokenService = new TokenService();
