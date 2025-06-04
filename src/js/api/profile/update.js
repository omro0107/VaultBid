import { API_AUCTION_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Updates the user's profile with the provided avatar and bio.
 *
 * This function sends a PUT request to update the user's profile information
 * on the server. It constructs the request body based on the provided avatar
 * and bio, and handles the response from the server.
 *
 * @param {string} username - The username of the user whose profile is to be updated.
 * @param {Object} profileData - An object containing the profile data to update.
 * @param {string} [profileData.avatar] - The new avatar URL for the user (optional).
 * @param {string} [profileData.bio] - The new bio for the user (optional).
 *
 * @returns {Promise<Object>} The updated profile data returned from the server.
 * @throws {Error} Throws an error if the profile update fails.
 */
export async function updateProfile(username, { avatar, bio }) {
  try {
    const updateData = {};
    
    if (bio) {
      updateData.bio = bio;
    }
    
    if (avatar) {
      updateData.avatar = { 
        url: avatar,
        alt: "Profile avatar"
      };
    }
    
    const response = await fetch(`${API_AUCTION_PROFILES}/${username}`, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(updateData),
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update profile');
    }

    return data;
  } catch (error) {
    console.error("Profile update error:", error);
    throw error;
  }
}