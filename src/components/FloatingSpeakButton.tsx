import { useState, useEffect } from 'react';

const portfolioSummary = `
Hi there! I'm Shashi Kumar, an Associate Lead Software Engineer at TIS, FIS, Fidelity Information Services, based in Noida, India.

With over 11 years of experience as a full stack web application developer, I've handled everything from development to deployment across multiple enterprise applications.

I'm passionate about learning and quickly implementing new technologies. My automation work has saved over 32 thousand dollars quarterly through innovative engineering solutions.

I'm also certified in Artificial Intelligence and Machine Learning from IIT Delhi, where I completed a 6 month intensive program. My AI expertise includes Deep Learning with A N N, C N N, R N N, and L S T M models, Natural Language Processing, Computer Vision using YOLO v 8, Large Language Models, and frameworks like TensorFlow, PyTorch, and Hugging Face Transformers.

In my current role at F I S, I've architected Model Context Protocol servers for GitHub, JIRA, Jenkins, Splunk, and more, integrated with VS Code. I've also built an enterprise-grade Web U I for an Organization Wide AI ChatBot System, leveraging the A 2 A protocol for multi-turn agent conversations and parallel agent invocation.

My technical stack includes React, A S P dot NET, C sharp, Python, SQL Server, Jenkins, Kafka, Docker, and many more modern technologies.

I've received several accolades including Client Service Appreciation for reverse engineering legacy C plus plus code, and I won a Hackathon challenge across Cognizant worldwide with my Insta Quote Android application.

Feel free to explore my portfolio to learn more about my projects, skills, and experience. Let's connect and build something amazing together!
`;

export default function FloatingSpeakButton() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Check browser support
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
    }

    // Cleanup on unmount
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = () => {
    if (!isSupported) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(portfolioSummary.trim());
    
    // Configure voice settings
    utterance.rate = 1.0;      // Normal speed
    utterance.pitch = 1.0;     // Normal pitch
    utterance.volume = 1.0;    // Full volume
    utterance.lang = 'en-US';  // English

    // Try to use a good quality voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) => v.name.includes('Google') && v.lang.startsWith('en')
    ) || voices.find((v) => v.lang.startsWith('en'));
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const pause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const resume = () => {
    window.speechSynthesis.resume();
    setIsPaused(false);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const handleClick = () => {
    if (!isSpeaking) {
      speak();
    } else if (isPaused) {
      resume();
    } else {
      pause();
    }
  };

  if (!isSupported) return null;

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-8 left-8 z-50 flex items-center gap-3">
        {/* Tooltip */}
        {showTooltip && !isSpeaking && (
          <div className="absolute bottom-full left-0 mb-3 px-4 py-2 bg-dark-card border border-dark-border rounded-lg shadow-xl animate-fade-in whitespace-nowrap">
            <p className="text-sm text-text-primary font-medium">
              🔊 Listen to my portfolio summary
            </p>
            <div className="absolute bottom-0 left-6 w-2 h-2 bg-dark-card border-r border-b border-dark-border rotate-45 -translate-y-1"></div>
          </div>
        )}

        {/* Stop button (shown when speaking) */}
        {isSpeaking && (
          <button
            onClick={stop}
            className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-all duration-300 animate-scale-in shadow-lg shadow-red-500/20"
            aria-label="Stop speaking"
          >
            <i className="fas fa-stop"></i>
          </button>
        )}

        {/* Main speak button */}
        <button
          onClick={handleClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`relative w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg ${
            isSpeaking && !isPaused
              ? 'bg-gradient-to-br from-primary to-accent animate-neural-pulse shadow-primary/40'
              : isPaused
              ? 'bg-gradient-to-br from-amber-500 to-orange-500 shadow-amber-500/30'
              : 'bg-gradient-to-br from-primary to-accent hover:scale-110 shadow-primary/30 hover:shadow-primary/50'
          }`}
          aria-label={isSpeaking ? (isPaused ? 'Resume speaking' : 'Pause speaking') : 'Listen to portfolio summary'}
        >
          {/* Pulse rings when speaking */}
          {isSpeaking && !isPaused && (
            <>
              <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping"></span>
              <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" style={{ animationDelay: '0.5s' }}></span>
            </>
          )}

          {/* Icon */}
          <i className={`fas ${
            isSpeaking && !isPaused 
              ? 'fa-volume-up' 
              : isPaused 
              ? 'fa-pause' 
              : 'fa-volume-up'
          } text-lg relative z-10`}></i>
        </button>
      </div>

      {/* Speaking indicator bar at bottom */}
      {isSpeaking && !isPaused && (
        <div className="fixed bottom-0 left-0 right-0 h-1 bg-dark-border/30 z-40">
          <div className="h-full gradient-bg animate-pulse"></div>
        </div>
      )}
    </>
  );
}
