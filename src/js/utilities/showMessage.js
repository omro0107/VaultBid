export function showMessage(message) {
    const messageContainer = document.getElementById('message-container');
    messageContainer.textContent = message;
    messageContainer.style.display = 'block';
    setTimeout(() => {
        messageContainer.style.display = 'none';
    }, 3000);
}