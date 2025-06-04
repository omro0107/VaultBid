/**
 * Shows a message to the user
 * @param {string} type - The type of message (userError, success, etc.)
 * @param {string} message - The message to display
 */
export function showMessage(type, message) {
    // Try multiple possible container IDs
    const possibleContainers = ['message-container', 'message', 'error-message', 'success-message'];
    let messageContainer = null;
    
    for (const containerId of possibleContainers) {
        messageContainer = document.getElementById(containerId);
        if (messageContainer) break;
    }
    
    if (messageContainer) {
        messageContainer.textContent = message;
        messageContainer.className = `message ${type} visible`;
        messageContainer.style.display = 'block';
        
        setTimeout(() => {
            messageContainer.classList.add('hidden');
            messageContainer.style.display = 'none';
        }, 5000);
    } else {
        // Fallback to console and alert for important messages
        if (type === 'userError') {
            console.error('Error:', message);
            alert(message); // Show alert for errors when no container is available
        } else {
            console.log(`${type}:`, message);
        }
    }
}

// Backward compatibility - single parameter version
export function showMessageSingle(message) {
    showMessage('info', message);
}
