/**
 * SecureStorageService - Handles secure storage of sensitive data
 * Uses sessionStorage instead of localStorage for better security
 * Implements basic encryption for sensitive data
 */

class SecureStorageService {
  constructor() {
    this.storageType = sessionStorage; // More secure than localStorage
    this.encryptionKey = this.generateKey();
  }

  /**
   * Generate a simple encryption key (in production, use a more robust method)
   */
  generateKey() {
    return btoa(Math.random().toString(36).substring(2, 15));
  }

  /**
   * Simple encryption using base64 (in production, use proper encryption)
   */
  encrypt(data) {
    try {
      const jsonString = JSON.stringify(data);
      return btoa(jsonString);
    } catch (error) {
      console.error('Encryption failed:', error);
      return null;
    }
  }

  /**
   * Simple decryption
   */
  decrypt(encryptedData) {
    try {
      const jsonString = atob(encryptedData);
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Decryption failed:', error);
      return null;
    }
  }

  /**
   * Store data securely
   */
  setItem(key, value, encrypt = false) {
    try {
      const dataToStore = encrypt ? this.encrypt(value) : JSON.stringify(value);
      this.storageType.setItem(key, dataToStore);
      return true;
    } catch (error) {
      console.error('Failed to store data:', error);
      return false;
    }
  }

  /**
   * Retrieve data securely
   */
  getItem(key, decrypt = false) {
    try {
      const storedData = this.storageType.getItem(key);
      if (!storedData) return null;

      return decrypt ? this.decrypt(storedData) : JSON.parse(storedData);
    } catch (error) {
      console.error('Failed to retrieve data:', error);
      return null;
    }
  }

  /**
   * Remove specific item
   */
  removeItem(key) {
    try {
      this.storageType.removeItem(key);
      return true;
    } catch (error) {
      console.error('Failed to remove data:', error);
      return false;
    }
  }

  /**
   * Clear all stored data
   */
  clear() {
    try {
      this.storageType.clear();
      return true;
    } catch (error) {
      console.error('Failed to clear storage:', error);
      return false;
    }
  }

  /**
   * Check if item exists
   */
  hasItem(key) {
    return this.storageType.getItem(key) !== null;
  }

  /**
   * Get all keys
   */
  getAllKeys() {
    const keys = [];
    for (let i = 0; i < this.storageType.length; i++) {
      keys.push(this.storageType.key(i));
    }
    return keys;
  }
}

// Export singleton instance
export const secureStorage = new SecureStorageService();
