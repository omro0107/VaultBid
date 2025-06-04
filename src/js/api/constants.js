import { tokenService } from '../services/TokenService.js';

// Get API configuration from environment variables
export const API_KEY = import.meta.env.VITE_API_KEY;
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://v2.api.noroff.dev";

// Get access token through secure token service
export const getAccessToken = () => tokenService.getAccessToken();

// Get username through secure token service
export const getUsername = () => tokenService.getUsername();

// URL parameter extraction
export const fetchId = new URLSearchParams(window.location.search).get("id");

// API endpoints
export const API_AUTH = `${API_BASE_URL}/auth`;
export const API_AUTH_LOGIN = `${API_AUTH}/login`;
export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_AUCTION = `${API_BASE_URL}/auction`;
export const API_AUCTION_LISTINGS = `${API_AUCTION}/listings`;
export const API_AUCTION_PROFILES = `${API_AUCTION}/profiles`;

export const API_AUCTION_SELECTED_POST = `${API_AUCTION}/listings/${fetchId}`;

export const API_AUCTION_BID = (listingId) => `${API_AUCTION_LISTINGS}/${listingId}/bids`;

export const API_AUCTION_MY_LISTINGS = () => {
  const username = getUsername();
  return username ? `${API_AUCTION_LISTINGS}/${username}/listings` : null;
};

// Validation helpers
export const validateApiKey = () => {
  if (!API_KEY) {
    console.error('API_KEY is not configured. Please check your environment variables.');
    return false;
  }
  return true;
};

export const validateApiBaseUrl = () => {
  if (!API_BASE_URL) {
    console.error('API_BASE_URL is not configured. Please check your environment variables.');
    return false;
  }
  return true;
};
