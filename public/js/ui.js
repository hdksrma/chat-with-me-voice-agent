/**
 * UI handling module for the voice bot
 * Manages UI interactions and DOM manipulations
 */

// Chat UI elements
const chatBody = document.getElementById('chatBody');
const textInput = document.getElementById('textInput');
const sendBtn = document.getElementById('sendBtn');
const micBtn = document.getElementById('micBtn');
const statusIndicator = document.getElementById('statusIndicator');
const suggestionBtns = document.querySelectorAll('.suggestion-btn');

/**
 * Add a message to the chat interface
 * @param {string} sender - 'user' or 'bot'
 * @param {string} content - Message content (HTML allowed)
 * @returns {HTMLElement} - The created message element
 */
function addMessageToChat(sender, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender === 'user' ? 'user-message' : 'bot-message'}`;
    messageDiv.innerHTML = content;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    return messageDiv;
}

/**
 * Show a thinking indicator while waiting for the bot response
 * @returns {HTMLElement} - The thinking message element
 */
function showThinkingIndicator() {
    return addMessageToChat('bot', '<em>Thinking...</em>');
}

/**
 * Remove a message element from the chat
 * @param {HTMLElement} messageElement - The message element to remove
 */
function removeMessage(messageElement) {
    if (messageElement && messageElement.parentNode) {
        messageElement.parentNode.removeChild(messageElement);
    }
}

/**
 * Clear the input field
 */
function clearInput() {
    textInput.value = '';
    textInput.focus();
}

/**
 * Set up event listeners for UI elements
 */
function setupUIListeners() {
    // Send button click handler
    sendBtn.addEventListener('click', () => {
        sendMessage();
    });
    
    // Enter key handler for text input
    textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Microphone button click handler
    micBtn.addEventListener('click', () => {
        toggleListening();
    });
    
    // Suggestion buttons click handlers
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            textInput.value = btn.dataset.question;
            sendMessage();
        });
    });
}

// Initialize UI event listeners
document.addEventListener('DOMContentLoaded', setupUIListeners);