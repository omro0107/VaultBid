import { API_AUCTION_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

export async function updateProfile(username, { avatar, bio }) {
  try {
    const updateData = {};
    
    if (bio) {
      updateData.bio = bio;
    }
    
    if (avatar) {
      updateData.avatar = { 
        url: avatar,
        alt: ""
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