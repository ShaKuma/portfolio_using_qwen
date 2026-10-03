import { useState, useRef, useEffect } from 'react';
import { Client } from "@gradio/client";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
      content: "Hello! 👋 I'm here to help you learn about Shashi Kumar. Feel free to ask me about his experience, skills, projects, education, certifications, or anything else related to his professional background!" 
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
      const systemPrompt = `You are a friendly and helpful AI assistant for Shashi Kumar's portfolio website. You have access to detailed information about Shashi's professional background.

${portfolioContext}

GUIDELINES:
1. Be conversational and friendly. Greet users warmly when they say hi/hello/hey.
2. Provide detailed, specific answers about Shashi's work, experience, skills, projects, education, and certifications.
3. List specific project names, technologies, achievements, and dates when relevant.
4. For greetings, respond warmly and offer to help with questions about Shashi.
5. If asked about unrelated topics, politely redirect to Shashi's professional background.
6. Be comprehensive but concise (2-4 sentences for most questions).
7. Reference previous messages in the conversation when relevant to maintain context.
8. Use markdown formatting for better readability (bold, lists, code blocks, etc.).

The conversation history is automatically managed by the chat interface, so you have full context of the ongoing conversation.`;

      // Build conversation history for Gradio ChatInterface
      // Format: [[user_msg, bot_msg], [user_msg, bot_msg], ...]
      const chatHistory = messages
        .reduce((acc: string[][], msg, idx, arr) => {
          if (msg.role === 'user') {
            // Start a new conversation pair
            acc.push([msg.content, '']);
          } else if (msg.role === 'assistant' && acc.length > 0) {
            // Fill in the bot's response for the last user message
            acc[acc.length - 1][1] = msg.content;
          }
          return acc;
        }, []);

      console.log('Chat history for API:', chatHistory);
      console.log('System message:', systemPrompt);

      // Call Gradio Chat API
      const result = await clientRef.current.predict("/chat", { 		
        message: userMessage,
        history: chatHistory,
        system_message: systemPrompt,
        temperature: 0.7,
        max_tokens: 512,
      });

      console.log('Gradio Chat API result:', result);

      // Extract response from Gradio ChatInterface
      let assistantMessage = "Sorry, I couldn't generate a response.";
      
      if (result && result.data) {
        // Gradio ChatInterface returns the updated history
        if (Array.isArray(result.data) && result.data.length > 0) {
          // Get the last exchange (most recent conversation)
          const lastExchange = result.data[result.data.length - 1];
          if (Array.isArray(lastExchange) && lastExchange.length >= 2) {
            assistantMessage = lastExchange[1]; // Bot's response is the second element
          }
        } else if (typeof result.data === 'string') {
          assistantMessage = result.data;
        } else if (result.data.message) {
          assistantMessage = result.data.message;
        } else if (result.data.response) {
          assistantMessage = result.data.response;
        }
      }
      
      // Clean up the response
      assistantMessage = assistantMessage.trim();
      
      if (!assistantMessage || assistantMessage.length < 3) {
        assistantMessage = "I apologize, but I couldn't generate a proper response. Please try asking your question again.";
      }
      
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
                  <div className="text-sm prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                        em: ({node, ...props}) => <em className="italic" {...props} />,
                        code: ({node, ...props}) => (
                          <code className="bg-dark-bg/50 px-1.5 py-0.5 rounded text-xs font-mono" {...props} />
                        ),
                        pre: ({node, ...props}) => (
                          <pre className="bg-dark-bg/50 p-2 rounded my-2 overflow-x-auto" {...props} />
                        ),
                        ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2 space-y-1" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2 space-y-1" {...props} />,
                        li: ({node, ...props}) => <li className="ml-2" {...props} />,
                        a: ({node, ...props}) => (
                          <a className="text-primary-light hover:text-primary underline" target="_blank" rel="noopener noreferrer" {...props} />
                        ),
                        h1: ({node, ...props}) => <h1 className="text-lg font-bold mb-2" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-base font-bold mb-2" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-sm font-bold mb-1" {...props} />,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
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
