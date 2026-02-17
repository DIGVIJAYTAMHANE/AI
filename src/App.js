import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './App.css';

// 1. Initialize Gemini with your .env variable
const API_KEY = process.env.REACT_APP_GEMINI_KEY; 
const genAI = new GoogleGenerativeAI(API_KEY);

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenAI = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setResponse(""); // Clear previous text
    
    try {
      // Using the stable 2026 model
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(query);
      const text = result.response.text();
      setResponse(text);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setResponse("Oops! " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Gemini <span>Flash</span></h1>
        <p>Your AI assistant is ready.</p>
      </header>

      <div className="chat-box">
        <textarea
          placeholder="Ask me anything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
          onClick={handleGenAI} 
          disabled={loading || !query}
          className={loading ? "loading" : ""}
        >
          {loading ? "Thinking..." : "Generate Response"}
        </button>
      </div>

      {response && (
        <div className="response-area">
          <h3>Response:</h3>
          <div className="result-text">{response}</div>
        </div>
      )}
    </div>
  );
}

export default App;