/**
 * Chat API routes
 * Handles the chat endpoint for communication with the OpenAI API
 */

const express = require('express');
const router = express.Router();
const { openai, personalSystemPrompt } = require('../config/openai');

/**
 * POST /api/chat
 * Processes user messages and returns AI responses
 */
router.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    
    // Validate input
    if (!userMessage || typeof userMessage !== 'string') {
      return res.status(400).json({ error: 'Invalid message format' });
    }
    
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4",  // or gpt-3.5-turbo based on your needs and budget
      messages: [
        { "role": "system", "content": personalSystemPrompt },
        { "role": "user", "content": userMessage }
      ],
      max_tokens: 300  // Keep responses reasonably sized
    });
    
    // Extract and return the response
    const botResponse = completion.choices[0].message.content;
    res.json({ response: botResponse });
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

module.exports = router;