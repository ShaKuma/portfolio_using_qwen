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
  const conversationHistoryRef = useRef<Array<{role: string, content: string}>>([]);

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
      
      const client = await Client.connect("shkumar1991/llm-chat-custom");
      clientRef.current = client;
      setIsConnected(true);
      setIsLoading(false);
    } catch (err: any) {
      console.error('Failed to connect to Gradio client:', err);
      
      try {
        const client = await Client.connect("https://shkumar1991-llm-chat-custom.hf.space");
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
    
    // Add user message to UI
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setError(null);

    // Add empty assistant message for streaming/typing indicator
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    try {
      // Get compact portfolio context
      const portfolioContext = generateChatbotContext();
      
      // Build clean message with context
      const messageWith = `[CONTEXT]
${portfolioContext}

[USER MESSAGE]
${userMessage}

[INSTRUCTIONS]
You are a friendly AI assistant for Shashi Kumar's portfolio. Respond naturally and conversationally:
- For greetings (hi, hello, hey, etc.): Respond warmly and offer to help with questions about Shashi's experience, skills, projects, education, or certifications
- For questions about Shashi: Answer using ONLY the context above, be specific and detailed
- For off-topic questions: Politely redirect to Shashi's professional background
- Be conversational, helpful, and concise (2-4 sentences)
- Use markdown formatting for better readability`;

      console.log('Sending message to /chat_response endpoint...');
      console.log('Conversation history length:', conversationHistoryRef.current.length);
      console.log('Message length:', messageWith.length);

      let assistantMessage = "";
      let streamingSucceeded = false;

      // Try streaming first
      try {
        console.log('Attempting streaming...');
        const stream = await clientRef.current.stream("/chat_response", {
          message: messageWith,
        });

        // Check if stream is iterable
        if (stream && typeof stream[Symbol.asyncIterator] === 'function') {
          console.log('Stream is iterable, processing chunks...');
          
          for await (const chunk of stream) {
            console.log('Received chunk:', chunk);
            
            // Extract text from chunk
            let chunkText = "";
            if (typeof chunk === 'string') {
              chunkText = chunk;
            } else if (chunk && chunk.data) {
              if (typeof chunk.data === 'string') {
                chunkText = chunk.data;
              } else if (Array.isArray(chunk.data)) {
                chunkText = chunk.data.join('');
              } else if (chunk.data.message) {
                chunkText = chunk.data.message;
              } else if (chunk.data.response) {
                chunkText = chunk.data.response;
              } else if (chunk.data.text) {
                chunkText = chunk.data.text;
              }
            }

            // Append to full message
            assistantMessage += chunkText;
            streamingSucceeded = true;

            // Update UI in real-time
            setMessages(prev => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1] = { 
                role: 'assistant', 
                content: assistantMessage 
              };
              return newMessages;
            });
          }
        } else {
          console.log('Stream is not iterable, falling back to predict()');
          throw new Error('Stream not iterable');
        }
      } catch (streamError) {
        console.log('Streaming failed, using predict() instead:', streamError);
        streamingSucceeded = false;
      }

      // If streaming failed or didn't work, use predict()
      if (!streamingSucceeded) {
        console.log('Using predict() method...');
        const result = await clientRef.current.predict("/chat_response", {
          message: messageWith,
        });

        console.log('API Response:', result);

        // Extract the response
        if (result && result.data) {
          if (typeof result.data === 'string') {
            assistantMessage = result.data;
          } else if (Array.isArray(result.data) && result.data.length > 0) {
            assistantMessage = result.data[result.data.length - 1] || result.data[0];
          } else if (result.data.message) {
            assistantMessage = result.data.message;
          } else if (result.data.response) {
            assistantMessage = result.data.response;
          } else if (result.data.text) {
            assistantMessage = result.data.text;
          }
        }

        // Update the assistant message
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { 
            role: 'assistant', 
            content: assistantMessage 
          };
          return newMessages;
        });
      }

      // Clean up the response
      assistantMessage = assistantMessage.trim();
      
      if (!assistantMessage || assistantMessage.length < 3) {
        assistantMessage = "I apologize, but I couldn't generate a proper response. Please try asking your question again.";
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { 
            role: 'assistant', 
            content: assistantMessage 
          };
          return newMessages;
        });
      }

      // CRUCIAL: Append this interaction to conversation history for memory
      conversationHistoryRef.current.push({ role: "user", content: userMessage });
      conversationHistoryRef.current.push({ role: "assistant", content: assistantMessage });

      console.log('Conversation history updated:', conversationHistoryRef.current.length, 'messages');

    } catch (err: any) {
      console.error('Error generating response:', err);
      console.error('Error details:', {
        message: err.message,
        stack: err.stack,
        name: err.name
      });
      
      const errorMessage = err.message || 'Unknown error occurred';
      setError(`Failed to get response: ${errorMessage}`);
      
      setMessages(prev => {
        const newMessages = [...prev];
        // Replace the empty assistant message with error
        newMessages[newMessages.length - 1] = { 
          role: 'assistant', 
          content: `Sorry, I encountered an error: ${errorMessage}. Please try again.` 
        };
        return newMessages;
      });
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
            {messages.map((msg, idx) => {
              // Skip rendering empty assistant messages (they're just placeholders for streaming)
              if (msg.role === 'assistant' && msg.content === '' && isLoading) {
                return null;
              }
              
              return (
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
              );
            })}
            
            {/* Loading indicator - show when loading and last message is empty assistant message */}
            {isLoading && messages[messages.length - 1]?.role === 'assistant' && messages[messages.length - 1]?.content === '' && (
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
