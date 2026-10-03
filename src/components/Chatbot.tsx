import { useState, useRef, useEffect } from 'react';
import { Client } from "@gradio/client";
import { generateChatbotContext } from '../data/portfolioData';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: "Hi! I'm an AI assistant powered by Shashi's portfolio data. Ask me anything about his experience, skills, projects, or background!" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const clientRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Gradio client when chat opens
  useEffect(() => {
    if (isOpen && !clientRef.current) {
      initializeClient();
    }
  }, [isOpen]);

  const initializeClient = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Try with full URL first
      const client = await Client.connect("https://shkumar1991-llm-chat-custom.hf.space");
      clientRef.current = client;
      setIsConnected(true);
      setIsLoading(false);
    } catch (err: any) {
      console.error('Failed to connect to Gradio client:', err);
      
      // Try alternative connection method
      try {
        const client = await Client.connect("shkumar1991/llm-chat-custom", {
          hf_token: undefined,
        });
        clientRef.current = client;
        setIsConnected(true);
        setIsLoading(false);
      } catch (retryErr) {
        console.error('Retry also failed:', retryErr);
        setError('Failed to connect to AI service. The Hugging Face Space might be sleeping. Please try again in a moment.');
        setIsLoading(false);
      }
    }
  };

  const handleReconnect = () => {
    clientRef.current = null;
    setIsConnected(false);
    initializeClient();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !isConnected) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setError(null);

    try {
      // Get portfolio context
      const portfolioContext = generateChatbotContext();
      
      // Create system prompt with portfolio context
      const systemPrompt = `You are an AI assistant that answers questions about Shashi Kumar based on his portfolio. Use ONLY the information provided below to answer questions accurately and concisely.

${portfolioContext}

Rules:
- Answer questions directly and concisely (2-3 sentences max)
- Use ONLY the facts provided above
- If asked about topics not related to Shashi, politely redirect to his expertise
- Be professional and helpful
- If you don't know something, say "I don't have that information in my knowledge base"`;

      // Call Gradio API
      const result = await clientRef.current.predict("/generate_text", { 		
        prompt: userMessage, 
        system_prompt: systemPrompt, 
        temperature: 0.7, 
      });

      // Extract response
      const assistantMessage = result.data[0] || "Sorry, I couldn't generate a response.";
      
      // Add assistant message
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (err) {
      console.error('Error generating response:', err);
      setError('Failed to get response. Please try again.');
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg ${
          isOpen
            ? 'bg-gradient-to-br from-red-500 to-pink-500 hover:scale-110 shadow-red-500/30'
            : 'bg-gradient-to-br from-primary to-accent hover:scale-110 shadow-primary/30 hover:shadow-primary/50'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comments'} text-xl`}></i>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 z-50 w-96 h-[600px] bg-dark-card border border-dark-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <i className="fas fa-robot text-white text-lg"></i>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold">Ask about Shashi Kumar</h3>
              <p className="text-white/80 text-xs">
                {isLoading && !isConnected ? 'Connecting...' : isConnected ? 'AI Assistant' : 'Offline'}
              </p>
            </div>
            {isConnected ? (
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            ) : !isLoading ? (
              <button
                onClick={handleReconnect}
                className="text-white/80 hover:text-white transition-colors"
                title="Reconnect"
              >
                <i className="fas fa-redo text-sm"></i>
              </button>
            ) : null}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark-bg">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-primary to-accent text-white'
                      : 'bg-dark-card border border-dark-border text-text-primary'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex justify-start">
                <div className="bg-dark-card border border-dark-border rounded-2xl px-4 py-2.5">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary-light rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary-light rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary-light rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Error message with reconnect button */}
            {error && (
              <div className="flex flex-col items-center gap-2">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2 text-red-400 text-xs">
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  {error}
                </div>
                <button
                  onClick={handleReconnect}
                  className="text-xs text-primary-light hover:text-primary hover:underline transition-colors"
                >
                  <i className="fas fa-redo mr-1"></i>
                  Try Reconnecting
                </button>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 bg-dark-card border-t border-dark-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isConnected ? "Ask about Shashi..." : "Connecting..."}
                disabled={!isConnected || isLoading}
                className="flex-1 px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all text-sm disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!isConnected || isLoading || !input.trim()}
                className="px-4 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
