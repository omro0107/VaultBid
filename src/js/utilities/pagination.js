/**
 * @fileoverview Pagination functionality for listings
 * Handles pagination controls and navigation between pages
 */

import { getCurrentPage, getTotalPages } from './displayListings.js';

/**
 * Sets up pagination controls with event listeners for navigation
 * @param {Function} loadListings - Function to load listings for a specific page
 * @returns {void}
 */
export function setupPagination(loadListings) {
  const prevPageBtn = document.getElementById('prev-page');
  const nextPageBtn = document.getElementById('next-page');
  const pageInfo = document.getElementById('page-info');

  if (!prevPageBtn || !nextPageBtn || !pageInfo) {
    console.error('Pagination elements not found');
    return;
  }

  // Set up previous page navigation
  prevPageBtn.addEventListener('click', () => {
    const currentPage = getCurrentPage();
    if (currentPage > 1) {
      loadListings(currentPage - 1);
    }
  });

  // Set up next page navigation
  nextPageBtn.addEventListener('click', () => {
    const currentPage = getCurrentPage();
    const totalPages = getTotalPages();
    if (currentPage < totalPages) {
      loadListings(currentPage + 1);
    }
  });
}
