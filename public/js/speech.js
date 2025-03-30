/**
 * Speech handling module for the voice bot
 * Manages speech recognition and text-to-speech functionality
 */

// Speech recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-US';

// Speech synthesis setup
const synth = window.speechSynthesis;

// Variables
let isListening = false;

/**
 * Toggle speech recognition on/off
 */
function toggleListening() {
    if (isListening) {
        recognition.stop();
        document.getElementById('micBtn').classList.remove('listening-pulse');
        document.getElementById('statusIndicator').textContent = 'Click the microphone to speak';
        isListening = false;
    } else {
        recognition.start();
        document.getElementById('micBtn').classList.add('listening-pulse');
        document.getElementById('statusIndicator').textContent = 'Listening...';
        isListening = true;
    }
}

/**
 * Speak text using speech synthesis with improved handling for longer texts
 * @param {string} text - The text to speak
 */
function speakText(text) {
    // Stop any ongoing speech
    synth.cancel();
    
    // Split text into sentences for more reliable speaking
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    
    // Queue of sentences to speak
    const speakQueue = [...sentences];
    let speaking = false;
    
    // Function to speak the next sentence in the queue
    function speakNext() {
        if (speakQueue.length === 0 || speaking) return;
        
        speaking = true;
        const sentence = speakQueue.shift();
        const utterance = new SpeechSynthesisUtterance(sentence);
        
        // Customize voice
        utterance.rate = 1; // Speed: 0.1 to 10
        utterance.pitch = 1; // Pitch: 0 to 2
        
        // Voice selection
        let voices = synth.getVoices();
        if (voices.length > 0) {
            // Try to find a natural sounding English voice
            const preferredVoice = voices.find(voice => 
                (voice.name.includes('Google') && voice.lang.includes('en')) ||
                voice.name.includes('Daniel') ||
                voice.name.includes('Samantha')
            );
            
            if (preferredVoice) {
                utterance.voice = preferredVoice;
            }
        }
        
        // Set up event handlers
        utterance.onend = () => {
            speaking = false;
            speakNext(); // Speak the next sentence
        };
        
        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            speaking = false;
            speakNext(); // Try the next sentence
        };
        
        // Actually speak the sentence
        synth.speak(utterance);
    }
    
    // Add event listener for voices changed (in case voices aren't loaded yet)
    if (speechSynthesis.onvoiceschanged !== undefined && !window.voicesLoaded) {
        speechSynthesis.onvoiceschanged = () => {
            window.voicesLoaded = true;
            speakNext();
        };
    }
    
    // Start speaking
    speakNext();
    
    // Chrome has a bug where speech synthesis stops after ~15 seconds
    // This is a workaround to keep it going
    const chromeWorkaround = setInterval(() => {
        if (speakQueue.length === 0 && !speaking) {
            clearInterval(chromeWorkaround);
            return;
        }
        
        if (synth.paused) {
            synth.resume();
        }
    }, 5000);
}

// Configure speech recognition events
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById('textInput').value = transcript;
    document.getElementById('micBtn').classList.remove('listening-pulse');
    document.getElementById('statusIndicator').textContent = 'Processing...';
    isListening = false;
    setTimeout(() => {
        // Get access to the sendMessage function from main.js
        sendMessage();
    }, 500); // Small delay to show the recognized text
};

recognition.onend = () => {
    document.getElementById('micBtn').classList.remove('listening-pulse');
    if (isListening) {
        document.getElementById('statusIndicator').textContent = 'Listening stopped. Click microphone to try again.';
        isListening = false;
    }
};

recognition.onerror = (event) => {
    console.error('Speech recognition error', event.error);
    document.getElementById('micBtn').classList.remove('listening-pulse');
    document.getElementById('statusIndicator').textContent = `Error: ${event.error}. Click microphone to try again.`;
    isListening = false;
};