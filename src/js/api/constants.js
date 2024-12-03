export const API_KEY = "140f2610-00d2-4340-ae4b-ae109ee190dc";

export const accessToken = localStorage.getItem("accessToken");

export const API_BASE_URL = "https://v2.api.noroff.dev";

export const fetchId = new URLSearchParams(window.location.search).get("id");

export const API_AUTH = `${API_BASE_URL}/auth`;

export const API_AUTH_LOGIN = `${API_AUTH}/login`;

export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_AUCTION = `${API_BASE_URL}/auction`;

export const API_AUCTION_LISTINGS = `${API_AUCTION}/listings`;

export const API_AUCTION_PROFILES = `${API_AUCTION}/profiles`;

export const API_AUCTION_SELECTED_POST = `${API_AUCTION}/listings/${fetchId}`;

export const API_AUCTION_MY_LISTINGS = `${API_AUCTION_LISTINGS}/${localStorage.getItem(
  "userName"
)}/posts`;