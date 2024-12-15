export function showMessage(message) {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
        messageContainer.textContent = message;
        messageContainer.classList.remove('hidden');
        setTimeout(() => {
            messageContainer.style.display = 'none';
        }, 3000);
    } else {
        console.error('Message container not found in the DOM.');
    }
}