import { updateProfile } from "../../api/profile/update.js";
import { tokenService } from "../../services/TokenService.js";
import { validationService } from "../../services/ValidationService.js";
import { showMessage } from "../../utilities/showMessage.js";

/**
 * Sets up the update profile modal functionality with enhanced security.
 *
 * This function initializes the event listeners for opening and closing the modal,
 * and handles the form submission for updating the user's profile with input validation
 * and secure data storage.
 *
 * @returns {void}
 */
export function setupUpdateProfileModal() {
    const openModalBtn = document.getElementById('open-update-profile');
    const modal = document.getElementById('update-profile-modal');
    const closeModalBtn = modal.querySelector('.close-modal');
    const updateForm = document.getElementById('updateProfile');
    const errorDisplay = document.getElementById('update-error-message');

    openModalBtn.addEventListener('click', () => {
        const userData = tokenService.getUserData();
        if (userData?.data) {
            document.getElementById('avatar').value = userData.data.avatar?.url || '';
            document.getElementById('bio').value = userData.data.bio || '';
        }
        modal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        if (errorDisplay) {
            errorDisplay.textContent = '';
        }
    });

    updateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const avatarUrl = document.getElementById('avatar').value;
        const bio = document.getElementById('bio').value;

        try {
            // Validate inputs
            const urlValidation = validationService.validateUrl(avatarUrl);
            if (!urlValidation.isValid) {
                showMessage('userError', urlValidation.message);
                return;
            }

            const bioValidation = validationService.validateDescription(bio);
            if (!bioValidation.isValid) {
                showMessage('userError', bioValidation.message);
                return;
            }

            // Security check
            const securityChecks = [
                validationService.checkSecurityThreats(avatarUrl),
                validationService.checkSecurityThreats(bio)
            ];

            const securityThreats = securityChecks.find(check => !check.isSafe);
            if (securityThreats) {
                showMessage('userError', 'Invalid input detected');
                return;
            }

            const userData = tokenService.getUserData();
            if (!userData?.data?.name) {
                throw new Error('User data not found');
            }

            const response = await updateProfile(userData.data.name, {
                avatar: urlValidation.value,
                bio: bioValidation.value
            });

            if (!response?.data) {
                throw new Error('Invalid response data');
            }

            // Update stored user data
            const updatedUserData = {
                ...userData,
                data: {
                    ...userData.data,
                    avatar: { url: response.data.avatar.url },
                    bio: response.data.bio
                }
            };
            
            tokenService.setUserData(updatedUserData);
            
            // Show success message and reload
            showMessage('success', 'Profile updated successfully');
            setTimeout(() => location.reload(), 1000);

        } catch (error) {
            console.error('Failed to update profile:', error);
            showMessage('userError', error.message || 'Failed to update profile. Please try again.');
        }
    });
}
