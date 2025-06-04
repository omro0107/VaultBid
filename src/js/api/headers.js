import { API_KEY, getAccessToken, validateApiKey } from "./constants.js";
import { validationService } from "../services/ValidationService.js";

/**
 * Creates and returns headers for API requests with security enhancements
 * Includes content security policies and validation
 */
export function headers() {
  // Validate API key
  if (!validateApiKey()) {
    throw new Error('Invalid API configuration');
  }

  // Create base headers
  const headers = new Headers({
    "Content-Type": "application/json",
    // Add security headers
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains"
  });

  // Add API key after validation
  const sanitizedApiKey = validationService.sanitizeString(API_KEY);
  headers.append("X-Noroff-API-Key", sanitizedApiKey);

  // Add authorization token if available
  const accessToken = getAccessToken();
  if (accessToken) {
    const sanitizedToken = validationService.sanitizeString(accessToken);
    headers.append("Authorization", `Bearer ${sanitizedToken}`);
  }

  return headers;
}

/**
 * Creates headers specifically for file upload requests
 */
export function fileUploadHeaders() {
  const baseHeaders = headers();
  baseHeaders.delete("Content-Type"); // Let the browser set the correct content type
  return baseHeaders;
}

/**
 * Validates the response headers for security
 */
export function validateResponseHeaders(headers) {
  // Only require essential headers for external APIs
  const essentialHeaders = [
    'content-type'
  ];

  const missingEssentialHeaders = essentialHeaders.filter(header => !headers.get(header));
  
  if (missingEssentialHeaders.length > 0) {
    console.warn('Missing essential headers:', missingEssentialHeaders);
    return false;
  }

  // Check for security headers but only warn (don't fail for external APIs)
  const securityHeaders = [
    'x-content-type-options',
    'x-frame-options'
  ];

  const missingSecurityHeaders = securityHeaders.filter(header => !headers.get(header));
  
  if (missingSecurityHeaders.length > 0) {
    console.warn('Missing security headers (external API):', missingSecurityHeaders);
    // Don't fail for missing security headers from external APIs
  }

  // Validate content type
  const contentType = headers.get('content-type');
  if (contentType && !contentType.includes('application/json')) {
    console.warn('Unexpected content type:', contentType);
    return false;
  }

  return true;
}
