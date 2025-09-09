// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;

// Middleware to parse JSON bodies and enable CORS for the frontend
app.use(express.json());
app.use(cors());

// Get the API key from environment variables
const geminiApiKey = process.env.GEMINI_API_KEY;

// Check if the API key is set
if (!geminiApiKey) {
  console.error("GEMINI_API_KEY is not set in the environment variables.");
  process.exit(1);
}

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

// Store the chat history in a simple array
const chatHistory = [];

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Add the user's message to the chat history
    chatHistory.push({ role: "user", parts: [{ text: userMessage }] });

    // Start a new chat session with the model, passing the history
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 200,
      },
    });

    const result = await chat.sendMessage(userMessage);
    const aiResponse = result.response.text();

    // Add the AI's response to the chat history
    chatHistory.push({ role: "model", parts: [{ text: aiResponse }] });

    // Send the AI's message back to the frontend
    res.json({ message: aiResponse });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: "Failed to get response from AI." });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
