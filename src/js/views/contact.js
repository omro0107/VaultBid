/**
 * @fileoverview Contact form handling and success modal display
 * Manages the contact form submission and displays a success modal upon completion
 */

import { validationService } from "../services/ValidationService.js";
import { showMessage } from "../utilities/showMessage.js";

/**
 * Creates and displays a success modal after form submission
 * @returns {void}
 */
function showSuccessModal() {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 flex items-center justify-center z-50';
  modal.innerHTML = `
    <div class="fixed inset-0 bg-black opacity-50"></div>
    <div class="bg-white p-6 rounded-lg shadow-xl z-10 max-w-md w-full mx-4">
      <div class="text-center">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Thank you for contacting us!</h3>
        <p class="text-sm text-gray-500 mb-4">We will get back to you shortly.</p>
        <button class="bg-brand-dark text-white px-4 py-2 rounded hover:bg-brand-darker">OK</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Add click handler for the OK button
  const okButton = modal.querySelector('button');
  okButton.addEventListener('click', () => {
    modal.remove();
    // Clear the form
    document.getElementById('contactForm').reset();
  });
}

/**
 * Validates form input values
 * @param {Object} formData - The form data to validate
 * @param {string} formData.name - The user's name
 * @param {string} formData.email - The user's email
 * @param {string} formData.subject - The message subject
 * @param {string} formData.message - The message content
 * @returns {boolean} True if validation passes, false otherwise
 */
function validateForm(formData) {
  const { name, email, subject, message } = formData;

  // Check for empty fields
  if (!name || !email || !subject || !message) {
    showMessage('userError', 'Please fill in all fields');
    return false;
  }

  // Validate email format
  if (!validationService.validateEmail(email).isValid) {
    showMessage('userError', 'Please enter a valid email address');
    return false;
  }

  // Validate message length
  if (message.length < 10) {
    showMessage('userError', 'Message must be at least 10 characters long');
    return false;
  }

  return true;
}

// Initialize form handling
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const submitButton = contactForm.querySelector('button[type="button"]');

  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    // Get form values
    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('inquiry-email').value.trim(),
      subject: document.getElementById('subject').value.trim(),
      message: document.getElementById('message').value.trim()
    };

    // Validate form data
    if (!validateForm(formData)) {
      return;
    }

    // Show success modal
    showSuccessModal();
  });
});
