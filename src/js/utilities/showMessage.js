export function showMessage(message) {
    const messageContainer = document.getElementById('message-container');
    console.log('Message Container:', messageContainer);
    if (messageContainer) {
        messageContainer.textContent = message;
        messageContainer.style.display = 'block';
        setTimeout(() => {
            messageContainer.style.display = 'none';
        }, 3000);
    } else {
        console.error('Message container not found in the DOM.');
    }
}