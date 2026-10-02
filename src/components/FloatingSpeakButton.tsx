import { useState, useEffect, useRef } from 'react';

const portfolioSummary = `Hi there! I'm Shashi Kumar, an Associate Lead Software Engineer at TIS, FIS, Fidelity Information Services, based in Noida, India.

With over 11 years of experience as a full stack web application developer, I've handled everything from development to deployment across multiple enterprise applications.

I'm passionate about learning and quickly implementing new technologies. My automation work has saved over 32 thousand dollars quarterly through innovative engineering solutions.

I'm also certified in Artificial Intelligence and Machine Learning from IIT Delhi, where I completed a 6 month intensive program. My AI expertise includes Deep Learning with neural networks, Natural Language Processing, Computer Vision using YOLO v 8, Large Language Models, and frameworks like TensorFlow, PyTorch, and Hugging Face Transformers.

In my current role at F I S, I've architected Model Context Protocol servers for GitHub, JIRA, Jenkins, Splunk, and more, integrated with VS Code. I've also built an enterprise-grade Web U I for an Organization Wide AI ChatBot System, leveraging the A 2 A protocol for multi-turn agent conversations and parallel agent invocation.

My technical stack includes React, A S P dot NET, C sharp, Python, SQL Server, Jenkins, Kafka, Docker, and many more modern technologies.

I've received several accolades including Client Service Appreciation for reverse engineering legacy C plus plus code, and I won a Hackathon challenge across Cognizant worldwide with my Insta Quote Android application.

Feel free to explore my portfolio to learn more about my projects, skills, and experience. Let's connect and build something amazing together!`;

interface FloatingSpeakButtonProps {
  modelReady: boolean;
}

export default function FloatingSpeakButton({ modelReady }: FloatingSpeakButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const synthesizerRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const startTimeRef = useRef<number>(0);
  const pauseTimeRef = useRef<number>(0);

  useEffect(() => {
    // Initialize audio context
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Load the synthesizer once model is ready
    if (modelReady) {
      loadSynthesizer();
    }
    
    return () => {
      if (sourceNodeRef.current) {
        try {
          sourceNodeRef.current.stop();
        } catch (e) {
          // Ignore
        }
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, [modelReady]);

  const loadSynthesizer = async () => {
    if (synthesizerRef.current) return;
    
    try {
      const { pipeline } = await import('@huggingface/transformers');
      
      synthesizerRef.current = await pipeline(
        'text-to-speech',
        'Xenova/speecht5_tts',
        {
          // Model is already cached from the loading screen
        }
      );
    } catch (error) {
      console.error('Failed to initialize synthesizer:', error);
    }
  };

  const speak = async () => {
    if (!synthesizerRef.current) {
      console.error('Synthesizer not ready');
      return;
    }
    
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
      try {
        sourceNodeRef.current.stop();
      } catch (e) {
        // Ignore
      }
      sourceNodeRef.current = null;
    }
    pauseTimeRef.current = 0;
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const handleClick = async () => {
    if (!isSpeaking) {
      await speak();
    } else if (isPaused) {
      resume();
    } else {
      pause();
    }
  };

  // Don't render if model isn't ready yet
  if (!modelReady) return null;

  return (
    <>
      {/* Floating Button with Label */}
      <div className="fixed bottom-8 left-8 z-50 flex items-center gap-3">
        {/* Tooltip */}
        {showTooltip && !isSpeaking && (
          <div className="absolute bottom-full left-0 mb-3 px-4 py-2.5 bg-dark-card border border-dark-border rounded-lg shadow-xl animate-fade-in whitespace-nowrap">
            <p className="text-sm text-text-primary font-medium">
              🧠 AI-Powered Portfolio Summary
            </p>
            <p className="text-xs text-text-muted mt-1">Powered by SpeechT5 Transformer</p>
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

        {/* Main speak button with label */}
        <div className="flex items-center gap-3">
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

            {/* Speaker Icon */}
            <i className={`fas ${
              isSpeaking && !isPaused 
                ? 'fa-volume-up' 
                : isPaused 
                ? 'fa-pause' 
                : 'fa-volume-up'
            } text-lg relative z-10`}></i>
          </button>

          {/* Label */}
          <button
            onClick={handleClick}
            className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
              isSpeaking && !isPaused
                ? 'bg-primary/20 text-primary-light border border-primary/30'
                : isPaused
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-dark-card border border-dark-border text-text-secondary hover:text-primary-light hover:border-primary/30 hover:bg-dark-elevated'
            }`}
          >
            {isSpeaking && !isPaused ? 'Speaking...' : isPaused ? 'Paused' : 'Summarize'}
          </button>
        </div>
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
