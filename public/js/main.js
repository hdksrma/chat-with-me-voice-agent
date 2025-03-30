/**
 * Main application logic for the voice bot
 * Handles the communication with the server and orchestrates UI and speech modules
 */

/**
 * Send a message to the server and process the response
 */
function sendMessage() {
    const userInput = textInput.value.trim();
    if (!userInput) return;
    
    // Add user message to chat
    addMessageToChat('user', userInput);
    clearInput();
    
    // Show thinking indicator
    const thinkingMsg = showThinkingIndicator();
    
    // Send to API
    fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Remove thinking message
        removeMessage(thinkingMsg);
        
        // Add bot response
        const botMessage = data.response;
        addMessageToChat('bot', botMessage);
        
        // Speak the response
        speakText(botMessage);
    })
    .catch(error => {
        console.error('Error:', error);
        removeMessage(thinkingMsg);
        addMessageToChat('bot', 'Sorry, I encountered an error processing your request. Please try again.');
    });
}

/**
 * Initialize the application
 */
function initApp() {
    console.log('Voice Bot Application Initialized');
    // Any additional initialization can go here
}

// Initialize the application when the document is fully loaded
document.addEventListener('DOMContentLoaded', initApp);