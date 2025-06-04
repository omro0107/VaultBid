/**
 * ValidationService - Centralized input validation and sanitization
 * Provides security against XSS, injection attacks, and data validation
 */

class ValidationService {
  constructor() {
    // Common validation patterns
    this.patterns = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      username: /^[a-zA-Z0-9_]{3,20}$/,
      password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
      url: /^https?:\/\/.+/,
      uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      alphanumeric: /^[a-zA-Z0-9]+$/,
      numeric: /^\d+$/,
      decimal: /^\d+(\.\d{1,2})?$/
    };

    // XSS prevention patterns
    this.xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
      /<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi
    ];
  }

  /**
   * Sanitize string input to prevent XSS
   */
  sanitizeString(input) {
    if (typeof input !== 'string') {
      return '';
    }

    let sanitized = input;

    // Remove potential XSS patterns
    this.xssPatterns.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '');
    });

    // Encode HTML entities
    sanitized = sanitized
      .replace(/&/g, '&amp;')
      .replace(/</g, '<')
      .replace(/>/g, '>')
      .replace(/"/g, '"')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');

    return sanitized.trim();
  }

  /**
   * Validate email format
   */
  validateEmail(email) {
    if (!email || typeof email !== 'string') {
      return { isValid: false, message: 'Email is required' };
    }

    const sanitizedEmail = this.sanitizeString(email);
    
    if (!this.patterns.email.test(sanitizedEmail)) {
      return { isValid: false, message: 'Invalid email format' };
    }

    if (sanitizedEmail.length > 254) {
      return { isValid: false, message: 'Email is too long' };
    }

    return { isValid: true, value: sanitizedEmail };
  }

  /**
   * Validate username
   */
  validateUsername(username) {
    if (!username || typeof username !== 'string') {
      return { isValid: false, message: 'Username is required' };
    }

    const sanitizedUsername = this.sanitizeString(username);

    if (sanitizedUsername.length < 3) {
      return { isValid: false, message: 'Username must be at least 3 characters' };
    }

    if (sanitizedUsername.length > 20) {
      return { isValid: false, message: 'Username must be less than 20 characters' };
    }

    if (!this.patterns.username.test(sanitizedUsername)) {
      return { isValid: false, message: 'Username can only contain letters, numbers, and underscores' };
    }

    return { isValid: true, value: sanitizedUsername };
  }

  /**
   * Validate password strength
   */
  validatePassword(password) {
    if (!password || typeof password !== 'string') {
      return { isValid: false, message: 'Password is required' };
    }

    if (password.length < 8) {
      return { isValid: false, message: 'Password must be at least 8 characters' };
    }

    if (password.length > 128) {
      return { isValid: false, message: 'Password is too long' };
    }

    if (!this.patterns.password.test(password)) {
      return { 
        isValid: false, 
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' 
      };
    }

    return { isValid: true, value: password };
  }

  /**
   * Validate URL
   */
  validateUrl(url) {
    if (!url || typeof url !== 'string') {
      return { isValid: false, message: 'URL is required' };
    }

    // For URLs, we need minimal sanitization to avoid breaking valid URLs
    const trimmedUrl = url.trim();

    if (!this.patterns.url.test(trimmedUrl)) {
      return { isValid: false, message: 'Invalid URL format. URL must start with http:// or https://' };
    }

    // Additional validation for image URLs
    try {
      new URL(trimmedUrl); // This will throw if URL is malformed
      
      // Check for common image hosting domains or file extensions
      const validImageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
      const imageHostingDomains = ['unsplash.com', 'imgur.com', 'cloudinary.com', 'amazonaws.com'];
      
      const hasValidExtension = validImageExtensions.some(ext => 
        trimmedUrl.toLowerCase().includes(ext)
      );
      
      const isFromImageHost = imageHostingDomains.some(domain => 
        trimmedUrl.toLowerCase().includes(domain)
      );
      
      // Accept URLs with valid extensions OR from known image hosting services
      if (!hasValidExtension && !isFromImageHost) {
        return { 
          isValid: false, 
          message: 'Please provide a valid image URL (with .jpg, .jpeg, .png, .gif, .webp extension or from a known image hosting service)' 
        };
      }

      // Only sanitize for XSS after validation passes
      const sanitizedUrl = this.sanitizeUrlForStorage(trimmedUrl);
      return { isValid: true, value: sanitizedUrl };
    } catch (error) {
      return { 
        isValid: false, 
        message: `Invalid URL format: ${error.message}. Please provide a complete URL starting with https://` 
      };
    }
  }

  /**
   * Sanitize URL for safe storage (minimal sanitization to preserve URL structure)
   */
  sanitizeUrlForStorage(url) {
    // Only remove dangerous patterns but preserve URL structure
    let sanitized = url;
    
    // Remove javascript: protocol and other dangerous patterns
    const dangerousPatterns = [
      /javascript:/gi,
      /data:/gi,
      /vbscript:/gi,
      /<script/gi,
      /on\w+\s*=/gi
    ];

    dangerousPatterns.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '');
    });

    return sanitized.trim();
  }

  /**
   * Validate numeric input
   */
  validateNumber(value, min = null, max = null) {
    if (value === null || value === undefined || value === '') {
      return { isValid: false, message: 'Number is required' };
    }

    const num = Number(value);

    if (isNaN(num)) {
      return { isValid: false, message: 'Invalid number format' };
    }

    if (min !== null && num < min) {
      return { isValid: false, message: `Number must be at least ${min}` };
    }

    if (max !== null && num > max) {
      return { isValid: false, message: `Number must be at most ${max}` };
    }

    return { isValid: true, value: num };
  }

  /**
   * Validate bid amount
   */
  validateBidAmount(amount, currentHighestBid = 0) {
    const numberValidation = this.validateNumber(amount, 0.01);
    
    if (!numberValidation.isValid) {
      return numberValidation;
    }

    if (numberValidation.value <= currentHighestBid) {
      return { 
        isValid: false, 
        message: `Bid must be higher than current highest bid of ${currentHighestBid}` 
      };
    }

    return { isValid: true, value: numberValidation.value };
  }

  /**
   * Validate listing title
   */
  validateListingTitle(title) {
    if (!title || typeof title !== 'string') {
      return { isValid: false, message: 'Title is required' };
    }

    const sanitizedTitle = this.sanitizeString(title);

    if (sanitizedTitle.length < 3) {
      return { isValid: false, message: 'Title must be at least 3 characters' };
    }

    if (sanitizedTitle.length > 100) {
      return { isValid: false, message: 'Title must be less than 100 characters' };
    }

    return { isValid: true, value: sanitizedTitle };
  }

  /**
   * Validate listing description
   */
  validateDescription(description) {
    if (!description || typeof description !== 'string') {
      return { isValid: false, message: 'Description is required' };
    }

    const sanitizedDescription = this.sanitizeString(description);

    if (sanitizedDescription.length < 10) {
      return { isValid: false, message: 'Description must be at least 10 characters' };
    }

    if (sanitizedDescription.length > 1000) {
      return { isValid: false, message: 'Description must be less than 1000 characters' };
    }

    return { isValid: true, value: sanitizedDescription };
  }

  /**
   * Validate date (for auction end date)
   */
  validateDate(dateString) {
    if (!dateString) {
      return { isValid: false, message: 'Date is required' };
    }

    const date = new Date(dateString);
    const now = new Date();

    if (isNaN(date.getTime())) {
      return { isValid: false, message: 'Invalid date format' };
    }

    if (date <= now) {
      return { isValid: false, message: 'Date must be in the future' };
    }

    // Check if date is not too far in the future (e.g., 1 year)
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    if (date > oneYearFromNow) {
      return { isValid: false, message: 'Date cannot be more than 1 year in the future' };
    }

    return { isValid: true, value: date.toISOString() };
  }

  /**
   * Validate form data object
   */
  validateFormData(formData, validationRules) {
    const errors = {};
    const sanitizedData = {};

    for (const [field, rules] of Object.entries(validationRules)) {
      const value = formData[field];
      
      for (const rule of rules) {
        const result = this[rule.method](value, ...rule.params || []);
        
        if (!result.isValid) {
          errors[field] = result.message;
          break;
        } else {
          sanitizedData[field] = result.value;
        }
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      sanitizedData
    };
  }

  /**
   * Sanitize object recursively
   */
  sanitizeObject(obj) {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    const sanitized = {};

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        sanitized[key] = this.sanitizeString(value);
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitizeObject(value);
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }

  /**
   * Check for common security threats in input
   */
  checkSecurityThreats(input) {
    if (typeof input !== 'string') {
      return { isSafe: true };
    }

    const threats = [];

    // Check for XSS patterns
    this.xssPatterns.forEach((pattern, index) => {
      if (pattern.test(input)) {
        threats.push(`XSS pattern ${index + 1} detected`);
      }
    });

    // Check for SQL injection patterns
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER)\b)/gi,
      /(UNION|OR|AND)\s+\d+\s*=\s*\d+/gi,
      /['"]\s*(OR|AND)\s*['"]\d+['"]\s*=\s*['"]\d+['"]*/gi
    ];

    sqlPatterns.forEach((pattern, index) => {
      if (pattern.test(input)) {
        threats.push(`SQL injection pattern ${index + 1} detected`);
      }
    });

    return {
      isSafe: threats.length === 0,
      threats
    };
  }
}

// Export singleton instance
export const validationService = new ValidationService();
