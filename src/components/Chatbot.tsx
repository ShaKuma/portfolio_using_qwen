import { useState, useRef, useEffect } from 'react';
import { streamText } from 'ai';
import { transformersJS } from '@browser-ai/transformers-js';

const SHASHI_CONTEXT = `You are an AI assistant that answers questions about Shashi Kumar. Use ONLY the facts below to answer. Be direct and concise.

KEY FACTS:
- Name: Shashi Kumar
- Experience: 11+ years as full stack developer
- Current Role: Associate Lead Software Engineer at TIS:FIS (Fidelity Information Services) since June 2020
- Location: Noida, India
- Education: B.Tech CSE from Lovely Professional University (7.87/10), AI/ML certified from IIT Delhi (6 months, 2024)

CURRENT WORK:
- Built MCP servers for GitHub, JIRA, Jenkins, Splunk, Windows RDP, PDF Creator
- Created enterprise AI ChatBot with A2A protocol for multi-agent conversations
- Implemented vector embeddings for user memory and security guardrails for PII protection
- Developed fraud detection system and LSTM sales prediction model

PREVIOUS ROLES:
- Cognizant Associate (2017-2020): Saved $32K quarterly via LDAP automation
- Cognizant Programmer Analyst (2014-2017): Built automation systems

SKILLS:
- Frontend: ReactJS, JavaScript, ASP.NET MVC, HTML/CSS
- Backend: C#/.NET, Python, C/C++, Java, Web Services
- AI/ML: TensorFlow, PyTorch, YOLOv8, Hugging Face, LSTM, NLP, LLMs
- DevOps: Jenkins, Kafka, SQL Server, Git, Grafana, Prometheus

ACHIEVEMENTS:
- Saved $32K+ quarterly through automation
- Won Cognizant worldwide Hackathon with Insta Quote Android app
- Client Service Appreciation for C++ reverse engineering

CONTACT:
- Email: Shashikmr01991@gmail.com
- Phone: +91 9940342772
- LinkedIn: linkedin.com/in/shashi-kumar-6b955b80
- GitHub: github.com/ShaKuma

RULES:
1. Answer ONLY based on the facts above
2. Be direct and concise (1-3 sentences)
3. If asked about topics not related to Shashi, say "I can only answer questions about Shashi Kumar's professional background."
4. Do not make up information`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: "Hi! I can tell you about Shashi Kumar's 11+ years of experience, his AI/ML expertise from IIT Delhi, technical skills, or current role at TIS:FIS. What would you like to know?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize model when chatbot is opened
    if (isOpen && !modelRef.current) {
      initializeModel();
    }
  }, [isOpen]);

  const initializeModel = async () => {
    try {
      setIsLoading(true);
      setLoadingProgress(0);

      const model = transformersJS('HuggingFaceTB/SmolLM2-135M-Instruct', {
        device: 'wasm',
        worker: new Worker(new URL('../chatbot.worker.ts', import.meta.url), {
          type: 'module',
        }),
      });

      // Check availability and download with progress
      const availability = await model.availability();
      
      if (availability === 'downloadable') {
        await model.createSessionWithProgress((progress: number) => {
          setLoadingProgress(Math.round(progress * 100));
        });
      }

      modelRef.current = model;
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
      // Format conversation for SmolLM2 (no system messages allowed)
      const conversationHistory = messages
        .filter(msg => msg.role !== 'assistant' || msg.content !== "Hi! I'm an AI assistant. Ask me anything about Shashi Kumar's experience, skills, or projects!")
        .map(msg => {
          if (msg.role === 'user') return `Question: ${msg.content}`;
          return `Answer: ${msg.content}`;
        })
        .join('\n\n');
      
      const fullPrompt = `${SHASHI_CONTEXT}

${conversationHistory}

Question: ${userMessage}
Answer:`;

      const result = streamText({
        model: modelRef.current,
        prompt: fullPrompt,
      });

      let assistantMessage = '';
      for await (const textPart of result.textStream) {
        assistantMessage += textPart;
        setMessages(prev => {
          const newMessages = [...prev];
          if (newMessages[newMessages.length - 1]?.role === 'assistant') {
            newMessages[newMessages.length - 1] = { role: 'assistant', content: assistantMessage };
          } else {
            newMessages.push({ role: 'assistant', content: assistantMessage });
          }
          return newMessages;
        });
      }
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
