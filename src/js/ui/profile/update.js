import { updateProfile } from "../../api/profile/update.js";

/**
 * Sets up the update profile modal functionality.
 *
 * This function initializes the event listeners for opening and closing the modal,
 * as well as handling the form submission for updating the user's profile.
 *
 * @returns {void} This function does not return a value.
 */

export function setupUpdateProfileModal() {
    const openModalBtn = document.getElementById('open-update-profile');
    const modal = document.getElementById('update-profile-modal');
    const closeModalBtn = modal.querySelector('.close-modal');
    const updateForm = document.getElementById('updateProfile');

    openModalBtn.addEventListener('click', () => {
        const storedUserData = JSON.parse(localStorage.getItem('myUserData'));
        if (storedUserData) {
            const userData = storedUserData.data;
            document.getElementById('avatar').value = userData.avatar.url;
            document.getElementById('bio').value = userData.bio;
        }
        modal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    updateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const avatarUrl = document.getElementById('avatar').value;
        const bio = document.getElementById('bio').value;

        try {
            const storedUserData = JSON.parse(localStorage.getItem('myUserData'));
            const username = storedUserData.data.name;

            const response = await updateProfile(username, {
                avatar: avatarUrl,
                bio: bio
            });

            storedUserData.data.avatar.url = response.data.avatar.url;
            storedUserData.data.bio = response.data.bio;
            localStorage.setItem('myUserData', JSON.stringify(storedUserData));

            location.reload();

        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    });
}