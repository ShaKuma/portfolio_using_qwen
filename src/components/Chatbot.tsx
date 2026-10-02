import { useState, useRef, useEffect } from 'react';
import { pipeline, env } from '@huggingface/transformers';
import { generateChatbotContext } from '../data/portfolioData';

// Configure transformers to use CDN
env.allowLocalModels = false;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: "Hi! Ask me about Shashi's experience, skills, or projects." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const generatorRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize model when chatbot is opened
    if (isOpen && !generatorRef.current) {
      initializeModel();
    }
  }, [isOpen]);

  const initializeModel = async () => {
    try {
      setIsLoading(true);
      setLoadingProgress(0);

      // Load the text generation pipeline
      const generator = await pipeline('text-generation', 'HuggingFaceTB/SmolLM2-135M-Instruct', {
        progress_callback: (progress: any) => {
          if (progress.status === 'progress') {
            setLoadingProgress(Math.round(progress.progress));
          }
        },
      });

      generatorRef.current = generator;
      setModelReady(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to initialize model:', error);
      setIsLoading(false);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error loading the AI model. Please refresh the page and try again.' 
      }]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !modelReady) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Generate dynamic context from portfolio data
      const SHASHI_CONTEXT = generateChatbotContext();
      
      // Simplified prompt format to prevent hallucination
      const fullPrompt = `${SHASHI_CONTEXT}

Q: ${userMessage}
A:`;

      // Initialize streaming response
      let assistantMessage = '';
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      // Generate with streaming - lower temperature for more accurate responses
      const output = await generatorRef.current(fullPrompt, {
        max_new_tokens: 150,
        temperature: 0.3, // Lower temperature for more factual responses
        top_p: 0.85,
        top_k: 50,
        repetition_penalty: 1.2, // Penalize repetition
        do_sample: true,
        callback_function: (output: any) => {
          // Extract the generated text (remove the prompt)
          const generatedText = output[0].generated_text.replace(fullPrompt, '').trim();
          
          // Clean up the response - remove any repeated welcome messages
          let cleanText = generatedText;
          if (cleanText.toLowerCase().includes('hi!') || cleanText.toLowerCase().includes('hello')) {
            // Remove greeting if it appears in the middle of response
            cleanText = cleanText.replace(/^(Hi!|Hello!|Hey!)\s*/i, '').trim();
          }
          
          assistantMessage = cleanText;
          
          // Update the last message with streaming content
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { role: 'assistant', content: assistantMessage };
            return newMessages;
          });
        },
      });

      // Final update with complete response
      let finalText = output[0].generated_text.replace(fullPrompt, '').trim();
      
      // Clean up final response
      if (finalText.toLowerCase().includes('hi!') || finalText.toLowerCase().includes('hello')) {
        finalText = finalText.replace(/^(Hi!|Hello!|Hey!)\s*/i, '').trim();
      }
      
      // If response is empty or just repeats the question, provide a fallback
      if (!finalText || finalText.length < 10) {
        finalText = "Based on the information available, I can help you with questions about Shashi's experience, skills, projects, or contact details.";
      }
      
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { role: 'assistant', content: finalText };
        return newMessages;
      });
    } catch (error) {
      console.error('Error generating response:', error);
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
                {isLoading && !modelReady ? `Loading model... ${loadingProgress}%` : 'AI Assistant'}
              </p>
            </div>
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
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 bg-dark-card border-t border-dark-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={modelReady ? "Ask about Shashi..." : "Loading model..."}
                disabled={!modelReady || isLoading}
                className="flex-1 px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all text-sm disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!modelReady || isLoading || !input.trim()}
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
