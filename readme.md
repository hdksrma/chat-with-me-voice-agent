# Chat With Me Voice Agent - Hardik

A web-based voice bot that responds to interview questions about me, using speech recognition and text-to-speech capabilities.

## 🌟 Live Demo

**[Click here to try the live demo](https://chat-with-me-voice-agent.onrender.com)**

> **Best experienced in Chrome browser for optimal speech recognition**

This live demo is deployed on Render's free tier and may take 30 seconds to "wake up" if it hasn't been accessed recently.

## 🎯 Features

- **Voice Recognition**: Speak your questions directly to the bot
- **Text-to-Speech**: Hear the bot's responses in a natural voice
- **Interview Q&A**: Pre-configured to answer common interview questions
- **Easy Customization**: Simple configuration for your personal information
- **Mobile-Friendly**: Works on desktop and mobile devices

## 📋 Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn
- An OpenAI API key ([Get one here](https://platform.openai.com/account/api-keys))
- Modern web browser (Chrome recommended for best speech recognition)

## 🚀 Quick Start

Follow these simple steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/hdksrma/chat-with-me-voice-agent
cd chat-with-me-voice-agent
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Your Personal Information

Edit the file `src/config/openai.js` and replace the placeholder text in the `personalSystemPrompt` variable with your information:

An example is given below ⬇️⬇️⬇️

```javascript
const personalSystemPrompt = `
You are a voice bot representing me in a job interview. Respond to questions as if you were me, based on the following personal information:

LIFE STORY:
I graduated with a computer science degree from Stanford, worked at two startups focusing on machine learning applications, and recently led a team developing AI-powered analytics tools. My passion lies in creating technology that's both powerful and accessible to non-technical users.

SUPERPOWER:
My ability to translate complex technical concepts into understandable, actionable insights that bridge the gap between engineers and business stakeholders.

GROWTH AREAS:
1. Delegating more effectively instead of trying to handle everything myself
2. Improving my public speaking skills for larger audiences and conferences
3. Expanding my knowledge of cloud infrastructure and DevOps practices

MISCONCEPTIONS:
People often think I'm solely focused on technical details, but I'm actually equally passionate about user experience and product design.

HOW I PUSH BOUNDARIES:
I regularly take on projects with technologies I'm unfamiliar with, setting ambitious timelines that force me to learn quickly and thoroughly. I also mentor junior developers to challenge my own understanding.

When answering questions, maintain a professional, conversational tone. Keep responses concise (1-3 paragraphs max). Don't reference that you're an AI or that you're representing someone - respond directly as if you are the person.
`;
```

### 4. Set Up Your Environment Variables

Create a `.env` file in the root directory:

```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

Replace `your_openai_api_key_here` with your actual OpenAI API key.

### 5. Start the Application

```bash
npm start
```

### 6. Access the Voice Bot

Open your browser and go to:

```
http://localhost:3000
```

## 🔍 How to Use

1. **Text Input**: Type your question in the input field and click "Send"
2. **Voice Input**: Click the microphone button, speak your question, and the bot will automatically process it
3. **Quick Questions**: Use the suggestion buttons below the chat for common interview questions

## 📁 Project Structure

```
chat-with-me-voice-agent/
├── src/                    # Server-side code
│   ├── app.js              # Main Express application
│   ├── routes/             # API routes
│   │   └── chat.js         # Chat endpoint handling
│   └── config/             # Configuration
│       └── openai.js       # OpenAI setup and personalization
│
├── public/                 # Client-side code (static files)
│   ├── index.html          # HTML structure
│   ├── css/                # Stylesheets
│   │   └── style.css       # Main styles
│   ├── js/                 # JavaScript files
│   │   ├── main.js         # Main application logic
│   │   ├── speech.js       # Speech recognition and synthesis
│   │   └── ui.js           # UI interaction handlers
│   └── favicon.ico         # Site favicon
│
├── package.json            # Dependencies and scripts
├── .env                    # Environment variables
└── README.md               # Documentation
```

## 🔧 Customization Options

### Changing the Bot's Voice

You can modify the voice used for text-to-speech in `public/js/speech.js`:

```javascript
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
```

### Adding More Suggested Questions

Edit the `index.html` file to add more suggestion buttons:

```html
<div class="suggestions mt-4 text-center">
    <h5>Suggested Questions:</h5>
    <button class="btn btn-outline-primary suggestion-btn" 
            data-question="Your new question here?">Question Label</button>
    <!-- Add more buttons as needed -->
</div>
```

### Changing the UI Theme

Modify the colors and styles in `public/css/style.css` to match your personal brand.


## ❓ Troubleshooting

### Voice Recognition Issues

- Ensure you're using a modern browser (Chrome recommended)
- Check that you've granted microphone permissions
- Speak clearly and at a moderate pace
- Ensure you're in a quiet environment

### OpenAI API Issues

- Verify your API key is correct in the `.env` file
- Check that your OpenAI account has available credits
- Ensure your account isn't rate-limited

### Application Doesn't Start

- Check that all dependencies are installed: `npm install`
- Verify that port 3000 isn't in use by another application
- Ensure Node.js is installed and is version 14 or higher

## 🙏 Acknowledgements

- [OpenAI](https://openai.com/) for the GPT API
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) for voice recognition and synthesis
- [Express](https://expressjs.com/) for the server framework
- [Bootstrap](https://getbootstrap.com/) for UI components