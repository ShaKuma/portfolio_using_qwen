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
  const [isLoading, setIsLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  
  const synthesizerRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const startTimeRef = useRef<number>(0);
  const pauseTimeRef = useRef<number>(0);

  useEffect(() => {
    // Initialize audio context
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Start loading model in background
    loadModelInBackground();
    
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
  }, []);

  const loadModelInBackground = async () => {
    try {
      setIsLoading(true);
      setLoadProgress(0);
      
      console.log('Starting to load neural TTS model...');
      
      const { pipeline } = await import('@huggingface/transformers');
      
      console.log('Transformers library loaded, downloading model...');
      setLoadProgress(10);
      
      synthesizerRef.current = await pipeline(
        'text-to-speech',
        'Xenova/speecht5_tts',
        {
          progress_callback: (progress: any) => {
            console.log('Model progress:', progress);
            if (progress.status === 'downloading') {
              const percent = progress.progress ? Math.round(progress.progress) : 0;
              setLoadProgress(10 + (percent * 0.8)); // 10-90%
            } else if (progress.status === 'loading') {
              setLoadProgress(95);
            } else if (progress.status === 'ready') {
              setLoadProgress(100);
              setIsLoading(false);
              setModelReady(true);
              console.log('Neural TTS model ready!');
            }
          }
        }
      );
      
      setLoadProgress(100);
      setIsLoading(false);
      setModelReady(true);
      console.log('Neural TTS model loaded successfully!');
    } catch (error) {
      console.error('Failed to load neural TTS model:', error);
      setIsLoading(false);
      setLoadProgress(0);
    }
  };

  const speak = async () => {
    console.log('Speak function called');
    console.log('Model ready:', modelReady);
    console.log('Synthesizer:', synthesizerRef.current);
    
    if (!synthesizerRef.current) {
      console.error('Synthesizer not ready yet');
      alert('Neural TTS model is still loading. Please wait a moment.');
      return;
    }
    
    if (!audioContextRef.current) {
      console.error('Audio context not initialized');
      return;
    }
    
    // Resume audio context if suspended (browser autoplay policy)
    if (audioContextRef.current.state === 'suspended') {
      console.log('Resuming audio context...');
      await audioContextRef.current.resume();
    }
    
    try {
      console.log('Generating speech with neural network...');
      setIsSpeaking(true);
      setIsPaused(false);
      
      const output = await synthesizerRef.current(portfolioSummary, {
        speaker_embeddings: new Float32Array(512).fill(0),
      });
      
      console.log('Speech generated, decoding audio...');
      
      const audioBuffer = await audioContextRef.current.decodeAudioData(output.audio.buffer);
      audioBufferRef.current = audioBuffer;
      
      console.log('Playing audio...');
      playAudio();
    } catch (error) {
      console.error('Speech generation failed:', error);
      setIsSpeaking(false);
      alert('Failed to generate speech. Check console for details.');
    }
  };

  const playAudio = () => {
    if (!audioBufferRef.current || !audioContextRef.current) {
      console.error('Audio buffer or context not available');
      return;
    }
    
    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.connect(audioContextRef.current.destination);
    source.onended = () => {
      console.log('Audio playback ended');
      setIsSpeaking(false);
      setIsPaused(false);
    };
    
    source.start(0, pauseTimeRef.current);
    startTimeRef.current = audioContextRef.current.currentTime - pauseTimeRef.current;
    sourceNodeRef.current = source;
    console.log('Audio playback started');
  };

  const pause = () => {
    if (sourceNodeRef.current && audioContextRef.current) {
      pauseTimeRef.current = audioContextRef.current.currentTime - startTimeRef.current;
      sourceNodeRef.current.stop();
      setIsPaused(true);
      console.log('Audio paused at:', pauseTimeRef.current);
    }
  };

  const resume = () => {
    setIsPaused(false);
    playAudio();
    console.log('Audio resumed');
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
    console.log('Audio stopped');
  };

  const handleClick = async () => {
    console.log('Button clicked, current state:', { isSpeaking, isPaused, modelReady, isLoading });
    
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
      {/* Floating Button with Label */}
      <div className="fixed bottom-8 left-8 z-50 flex items-center gap-3">
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-full left-0 mb-3 px-4 py-2.5 bg-dark-card border border-dark-border rounded-lg shadow-xl animate-fade-in whitespace-nowrap">
            {isLoading ? (
              <>
                <p className="text-sm text-text-primary font-medium">
                  🧠 Loading Neural TTS Engine
                </p>
                <p className="text-xs text-text-muted mt-1">
                  SpeechT5 Transformer: {Math.round(loadProgress)}%
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-text-primary font-medium">
                  🧠 AI-Powered Portfolio Summary
                </p>
                <p className="text-xs text-text-muted mt-1">Powered by SpeechT5 Transformer</p>
              </>
            )}
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
            disabled={isLoading}
            className={`relative w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg ${
              isLoading
                ? 'bg-gradient-to-br from-gray-600 to-gray-700 cursor-wait shadow-gray-500/20'
                : isSpeaking && !isPaused
                ? 'bg-gradient-to-br from-primary to-accent animate-neural-pulse shadow-primary/40'
                : isPaused
                ? 'bg-gradient-to-br from-amber-500 to-orange-500 shadow-amber-500/30'
                : 'bg-gradient-to-br from-primary to-accent hover:scale-110 shadow-primary/30 hover:shadow-primary/50'
            }`}
            aria-label={
              isLoading 
                ? 'Loading neural TTS model' 
                : isSpeaking 
                ? (isPaused ? 'Resume speaking' : 'Pause speaking') 
                : 'Listen to portfolio summary'
            }
          >
            {/* Pulse rings when speaking */}
            {isSpeaking && !isPaused && (
              <>
                <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping"></span>
                <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" style={{ animationDelay: '0.5s' }}></span>
              </>
            )}

            {/* Loading spinner */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              </div>
            )}

            {/* Speaker Icon */}
            {!isLoading && (
              <i className={`fas ${
                isSpeaking && !isPaused 
                  ? 'fa-volume-up' 
                  : isPaused 
                  ? 'fa-pause' 
                  : 'fa-volume-up'
              } text-lg relative z-10`}></i>
            )}
          </button>

          {/* Label */}
          <button
            onClick={handleClick}
            disabled={isLoading}
            className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
              isLoading
                ? 'bg-dark-card border border-dark-border text-text-muted cursor-wait'
                : isSpeaking && !isPaused
                ? 'bg-primary/20 text-primary-light border border-primary/30'
                : isPaused
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-dark-card border border-dark-border text-text-secondary hover:text-primary-light hover:border-primary/30 hover:bg-dark-elevated'
            }`}
          >
            {isLoading ? `Loading ${Math.round(loadProgress)}%` : isSpeaking && !isPaused ? 'Speaking...' : isPaused ? 'Paused' : 'Summarize'}
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
