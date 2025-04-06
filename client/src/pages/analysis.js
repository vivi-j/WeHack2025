import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import axios from 'axios'; // Import axios

const Analysis = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', isUser: false },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
  
    // Add user message to chat
    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
  
    try {
      // Send message to backend
      const response = await axios.post('http://localhost:3001/api/chat', {
        prompt: input,
        // If you want to implement full conversation history:
        // history: messages.map(msg => ({
        //   role: msg.isUser ? 'user' : 'model',
        //   parts: [{ text: msg.text }]
        // }))
      });
  
      // Add AI response to chat
      setMessages((prev) => [...prev, { 
        text: response.data.text, 
        isUser: false 
      }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [...prev, { 
        text: "Sorry, I couldn't process your request. Please try again.", 
        isUser: false 
      }]);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="bg-[#0B0003] h-screen">
      <Navbar />

      <div className="flex h-full">

        <div className="fixed top-[80px] w-full">
          <div className="flex gap-8 mt-4 pl-12">
            <a href="/dashboard" className="text-white p-2 rounded-3xl border-2 border-[#E7C0BC] hover:text-[#E7C0BC] font-montserrat hover:underline">Dashboard</a>
            <p className='text-[#E7C0BC] bg-[#483137] p-2 rounded-3xl font-montserrat underline'>Analysis</p>
          </div>
                    {/* Add this new div for the "Connect with raccon" text */}
                    <div className="mt-4 mb-4">
            <p className="text-white font-[Damion] text-[#E7C0BC] text-[40px] pl-12">
              Connect with Raccoon :3
            </p>
          </div>

          <div className="flex justify-end space-x-4 mt-16">
            <div className="flex flex-col justify-between bg-[#483137] border-2 border-[#E7C0BC] w-1/2 p-4 rounded-3xl h-[70vh]">
              {/* Logo & Header */}
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg"
                  alt="Gemini Logo"
                  className="w-8 h-8"
                />
                <h1 className="text-white font-Roboto">Lil' Raccoon</h1>
              </div>
              {/* Chat Messages (Scrollable) */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-2">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      msg.isUser ? 'bg-[#3A252C] ml-auto' : 'bg-[#5A3E45]'
                    } text-white max-w-[80%]`}
                  >
                    {msg.isHTML ? msg.text : <p>{msg.text}</p>}
                  </div>
                ))}
                {isLoading && (
                  <div className="bg-[#5A3E45] p-3 rounded-lg text-white max-w-[80%]">
                    <p>
                      Thinking<span className="animate-pulse">...</span>
                    </p>
                  </div>
                )}
              </div>

              {/* User Input & Send Button */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 bg-[#3A252C] border border-[#E7C0BC] rounded-lg px-4 py-2 text-white focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-[#E7C0BC] text-[#0B0003] px-4 py-2 rounded-lg hover:bg-[#D8A8A3] transition disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <link
        href="https://fonts.googleapis.com/css2?family=Damion&family=Roboto+Mono&display=swap"
        rel="stylesheet"
      />
    </div>
  );
};

export default Analysis;