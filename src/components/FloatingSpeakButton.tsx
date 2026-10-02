import { useState, useEffect, useRef } from 'react';
import { pipeline } from '@huggingface/transformers';

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
  const [isLoading, setIsLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState('');
  
  const synthesizerRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const startTimeRef = useRef<number>(0);
  const pauseTimeRef = useRef<number>(0);

  useEffect(() => {
    // Initialize audio context
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    return () => {
      // Cleanup
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const loadModel = async () => {
    if (synthesizerRef.current) return;
    
    setIsLoading(true);
    setLoadingProgress('Loading neural TTS model...');
    
    try {
      // Load SpeechT5 TTS model using Transformers.js
      // This is a transformer-based model that produces natural human-like speech
      synthesizerRef.current = await pipeline(
        'text-to-speech',
        'Xenova/speecht5_tts',
        {
          progress_callback: (progress: any) => {
            if (progress.status === 'downloading') {
              const percent = progress.progress ? Math.round(progress.progress) : 0;
              setLoadingProgress(`Downloading model: ${percent}%`);
            } else if (progress.status === 'loading') {
              setLoadingProgress('Loading model into memory...');
            }
          }
        }
      );
      
      setLoadingProgress('Model ready!');
      setTimeout(() => setIsLoading(false), 500);
    } catch (error) {
      console.error('Failed to load TTS model:', error);
      setIsLoading(false);
      setLoadingProgress('Failed to load model');
    }
  };

  const speak = async () => {
    if (!synthesizerRef.current) {
      await loadModel();
      if (!synthesizerRef.current) return;
    }

    try {
      setIsSpeaking(true);
      setIsPaused(false);
      
      // Generate speech using the neural network model
      const output = await synthesizerRef.current(portfolioSummary, {
        speaker_embeddings: new Float32Array(512).fill(0), // Default speaker embedding
      });
      
      // Convert to audio buffer
      const audioBuffer = await audioContextRef.current!.decodeAudioData(output.audio.buffer);
      audioBufferRef.current = audioBuffer;
      
      // Play audio
      playAudio();
    } catch (error) {
      console.error('Speech generation failed:', error);
      setIsSpeaking(false);
    }
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
    if (sourceNodeRef.current && audioContextRef.current) {
      pauseTimeRef.current = audioContextRef.current.currentTime - startTimeRef.current;
      sourceNodeRef.current.stop();
      setIsPaused(true);
    }
  };

  const resume = () => {
    setIsPaused(false);
    playAudio();
  };

  const stop = () => {
    if (sourceNodeRef.current) {
      sourceNodeRef.current.stop();
      sourceNodeRef.current = null;
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
              🧠 Neural TTS - Listen to my portfolio
            </p>
            <p className="text-xs text-text-muted mt-1">Powered by Transformers.js</p>
            <div className="absolute bottom-0 left-6 w-2 h-2 bg-dark-card border-r border-b border-dark-border rotate-45 -translate-y-1"></div>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute bottom-full left-0 mb-3 px-4 py-3 bg-dark-card border border-primary/30 rounded-lg shadow-xl animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
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
              : 'fa-brain'
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
