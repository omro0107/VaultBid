/**
 * @fileoverview Authentication buttons setup and navigation handling
 * Manages authentication button visibility, click handlers, and mobile menu functionality
 */

import { getAccessToken } from "../api/constants.js";
import { setupAuthButtons } from "../utilities/authButtons.js";
import { setLogoutListener } from "../ui/globals/logout.js";

/**
 * Calculates the base URL for consistent navigation across different page depths
 * @returns {string} The base URL path with appropriate number of '../' segments
 */
function getBaseUrl() {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/');
    const depth = pathParts.filter(part => part.length > 0).length;
    return '../'.repeat(depth);
}

/**
 * Initializes authentication buttons and mobile menu functionality
 * Sets up event listeners for login, register, and mobile menu toggle
 */
document.addEventListener("DOMContentLoaded", async () => {
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const loginBtn = document.getElementById("login-btn");
    const registerBtn = document.getElementById("register-btn");
    const baseUrl = getBaseUrl();

    // Set up mobile menu toggle functionality
    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    // Set up login button navigation
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            window.location.href = `${baseUrl}auth/login/`;
        });
    }

    // Set up register button navigation
    if (registerBtn) {
        registerBtn.addEventListener("click", () => {
            window.location.href = `${baseUrl}auth/register/`;
        });
    }

    // Initialize authentication button visibility and logout functionality
    setupAuthButtons(getAccessToken());
    setLogoutListener();
});
