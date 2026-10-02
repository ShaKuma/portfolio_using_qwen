import { useState, useEffect, useRef } from 'react';

const portfolioSummary = `Hi there! I'm Shashi Kumar, an Associate Lead Software Engineer at TIS, FIS, Fidelity Information Services, based in Noida, India.

With over 11 years of experience as a full stack web application developer, I've handled everything from development to deployment across multiple enterprise applications.

I'm passionate about learning and quickly implementing new technologies. My automation work has saved over 32 thousand dollars quarterly through innovative engineering solutions.

I'm also certified in Artificial Intelligence and Machine Learning from IIT Delhi, where I completed a 6 month intensive program. My AI expertise includes Deep Learning with neural networks, Natural Language Processing, Computer Vision using YOLO v 8, Large Language Models, and frameworks like TensorFlow, PyTorch, and Hugging Face Transformers.

In my current role at F I S, I've architected Model Context Protocol servers for GitHub, JIRA, Jenkins, Splunk, and more, integrated with VS Code. I've also built an enterprise-grade Web U I for an Organization Wide AI ChatBot System, leveraging the A 2 A protocol for multi-turn agent conversations and parallel agent invocation.

My technical stack includes React, A S P dot NET, C sharp, Python, SQL Server, Jenkins, Kafka, Docker, and many more modern technologies.

I've received several accolades including Client Service Appreciation for reverse engineering legacy C plus plus code, and I won a Hackathon challenge across Cognizant worldwide with my Insta Quote Android application.

Feel free to explore my portfolio to learn more about my projects, skills, and experience. Let's connect and build something amazing together!`;

export default function FloatingSpeakButton() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isNeuralReady, setIsNeuralReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState('');
  const [useNeural, setUseNeural] = useState(true); // Toggle between neural and browser TTS
  
  const synthesizerRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const startTimeRef = useRef<number>(0);
  const pauseTimeRef = useRef<number>(0);

  useEffect(() => {
    // Initialize audio context
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Pre-load neural model in background after page load
    const timer = setTimeout(() => {
      loadNeuralModel();
    }, 3000); // Wait 3 seconds after page load
    
    return () => {
      clearTimeout(timer);
      if (sourceNodeRef.current) {
        try {
          sourceNodeRef.current.stop();
        } catch (e) {
          // Ignore if already stopped
        }
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  const loadNeuralModel = async () => {
    if (synthesizerRef.current) return;
    
    setIsLoading(true);
    setLoadingProgress('Initializing neural TTS...');
    
    try {
      // Dynamic import to avoid loading transformers.js until needed
      const { pipeline } = await import('@huggingface/transformers');
      
      setLoadingProgress('Loading SpeechT5 model...');
      
      // Load SpeechT5 TTS model - uses transformer neural network
      synthesizerRef.current = await pipeline(
        'text-to-speech',
        'Xenova/speecht5_tts',
        {
          progress_callback: (progress: any) => {
            if (progress.status === 'downloading') {
              const percent = progress.progress ? Math.round(progress.progress) : 0;
              setLoadingProgress(`Downloading neural model: ${percent}%`);
            } else if (progress.status === 'loading') {
              setLoadingProgress('Loading into memory...');
            } else if (progress.status === 'ready') {
              setLoadingProgress('Model ready!');
            }
          }
        }
      );
      
      setIsNeuralReady(true);
      setIsLoading(false);
      setLoadingProgress('');
    } catch (error) {
      console.error('Failed to load neural TTS model:', error);
      setIsLoading(false);
      setLoadingProgress('Using browser TTS');
      setUseNeural(false); // Fallback to browser TTS
    }
  };

  const speakWithNeural = async () => {
    if (!synthesizerRef.current) return false;
    
    try {
      setIsSpeaking(true);
      setIsPaused(false);
      
      // Generate speech using neural network
      const output = await synthesizerRef.current(portfolioSummary, {
        speaker_embeddings: new Float32Array(512).fill(0),
      });
      
      // Convert to audio buffer and play
      const audioBuffer = await audioContextRef.current!.decodeAudioData(output.audio.buffer);
      audioBufferRef.current = audioBuffer;
      
      playAudio();
      return true;
    } catch (error) {
      console.error('Neural TTS failed:', error);
      return false;
    }
  };

  const speakWithBrowser = () => {
    if (!('speechSynthesis' in window)) return false;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(portfolioSummary);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    utterance.lang = 'en-US';
    
    // Use best available voice
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
    return true;
  };

  const speak = async () => {
    // Try neural TTS first if ready
    if (useNeural && isNeuralReady) {
      const success = await speakWithNeural();
      if (success) return;
    }
    
    // Fallback to browser TTS
    speakWithBrowser();
  };

  const playAudio = () => {
    if (!audioBufferRef.current || !audioContextRef.current) return;
    
    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.connect(audioContextRef.current.destination);
    source.onended = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    
    source.start(0, pauseTimeRef.current);
    startTimeRef.current = audioContextRef.current.currentTime - pauseTimeRef.current;
    sourceNodeRef.current = source;
  };

  const pause = () => {
    if (isNeuralReady && useNeural && sourceNodeRef.current && audioContextRef.current) {
      pauseTimeRef.current = audioContextRef.current.currentTime - startTimeRef.current;
      sourceNodeRef.current.stop();
      setIsPaused(true);
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resume = () => {
    if (isNeuralReady && useNeural) {
      setIsPaused(false);
      playAudio();
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stop = () => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
      } catch (e) {
        // Ignore
      }
      sourceNodeRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    pauseTimeRef.current = 0;
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const handleClick = async () => {
    if (!isSpeaking && !isLoading) {
      await speak();
    } else if (isSpeaking && !isPaused) {
      pause();
    } else if (isPaused) {
      resume();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-8 left-8 z-50 flex items-center gap-3">
        {/* Tooltip */}
        {showTooltip && !isSpeaking && !isLoading && (
          <div className="absolute bottom-full left-0 mb-3 px-4 py-2 bg-dark-card border border-dark-border rounded-lg shadow-xl animate-fade-in whitespace-nowrap">
            <p className="text-sm text-text-primary font-medium">
              {isNeuralReady ? '🧠 Neural TTS Ready' : '🔊 Listen to my portfolio'}
            </p>
            <p className="text-xs text-text-muted mt-1">
              {isNeuralReady ? 'Powered by SpeechT5 Transformer' : 'Loading neural model...'}
            </p>
            <div className="absolute bottom-0 left-6 w-2 h-2 bg-dark-card border-r border-b border-dark-border rotate-45 -translate-y-1"></div>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute bottom-full left-0 mb-3 px-4 py-3 bg-dark-card border border-primary/30 rounded-lg shadow-xl animate-fade-in min-w-[200px]">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
              <div>
                <p className="text-sm text-text-primary font-medium">Loading Neural TTS</p>
                <p className="text-xs text-text-muted">{loadingProgress}</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-6 w-2 h-2 bg-dark-card border-r border-b border-primary/30 rotate-45 -translate-y-1"></div>
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
          disabled={isLoading}
          className={`relative w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg ${
            isLoading
              ? 'bg-gradient-to-br from-gray-600 to-gray-700 cursor-wait'
              : isSpeaking && !isPaused
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
            isLoading
              ? 'fa-spinner fa-spin'
              : isSpeaking && !isPaused 
              ? 'fa-volume-up' 
              : isPaused 
              ? 'fa-pause' 
              : isNeuralReady
              ? 'fa-brain'
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
