import { useState, useEffect, useRef } from 'react';

const portfolioSummary = `Hi there! I'm Shashi Kumar, an Associate Lead Software Engineer at TIS, FIS, Fidelity Information Services, based in Noida, India.

With over 11 years of experience as a full stack web application developer, I've handled everything from development to deployment across multiple enterprise applications.

I'm passionate about learning and quickly implementing new technologies. My automation work has saved over 32 thousand dollars quarterly through innovative engineering solutions.

I'm also certified in Artificial Intelligence and Machine Learning from IIT Delhi, where I completed a 6 month intensive program. My AI expertise includes Deep Learning with neural networks, Natural Language Processing, Computer Vision using YOLO v 8, Large Language Models, and frameworks like TensorFlow, PyTorch, and Hugging Face Transformers.

In my current role at F I S, I've architected Model Context Protocol servers for GitHub, JIRA, Jenkins, Splunk, and more, integrated with VS Code. I've also built an enterprise-grade Web U I for an Organization Wide AI ChatBot System, leveraging the A 2 A protocol for multi-turn agent conversations and parallel agent invocation.

My technical stack includes React, A S P dot NET, C sharp, Python, SQL Server, Jenkins, Kafka, Docker, and many more modern technologies.

I've received several accolades including Client Service Appreciation for reverse engineering legacy C plus plus code, and I won a Hackathon challenge across Cognizant worldwide with my Insta Quote Android application.

Feel free to explore my portfolio to learn more about my projects, skills, and experience. Let's connect and build something amazing together!`;

// Split text into chunks (sentences) for streaming
function splitTextIntoChunks(text: string, maxLength: number = 200): string[] {
  const chunks: string[] = [];
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  
  let currentChunk = '';
  
  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > maxLength && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += sentence;
    }
  }
  
  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
}

export default function FloatingSpeakButton() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState('Initializing...');
  const [currentChunk, setCurrentChunk] = useState(0);
  const [totalChunks, setTotalChunks] = useState(0);
  
  const workerRef = useRef<Worker | null>(null);
  const audioQueueRef = useRef<Array<{ audio: Float32Array; sampling_rate: number }>>([]);
  const chunksRef = useRef<string[]>([]);
  const nextChunkToRequestRef = useRef(0);
  const isPlayingRef = useRef(false);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const speakTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Request next chunk from worker
  const requestNextChunk = () => {
    if (nextChunkToRequestRef.current < chunksRef.current.length && workerRef.current) {
      const chunkIndex = nextChunkToRequestRef.current;
      const chunkText = chunksRef.current[chunkIndex];
      
      console.log(`Requesting chunk ${chunkIndex + 1}/${chunksRef.current.length}`);
      
      workerRef.current.postMessage({
        type: 'synthesize-chunk',
        text: chunkText,
        chunkIndex: chunkIndex,
        totalChunks: chunksRef.current.length
      });
      
      nextChunkToRequestRef.current++;
    }
  };

  // Play next chunk from queue
  const playNextChunk = () => {
    if (audioQueueRef.current.length === 0) {
      // No more chunks to play
      if (nextChunkToRequestRef.current >= chunksRef.current.length) {
        // All chunks processed and played
        console.log('All chunks played, stopping');
        isPlayingRef.current = false;
        setIsSpeaking(false);
        setIsPaused(false);
      }
      return;
    }

    isPlayingRef.current = true;
    const chunk = audioQueueRef.current.shift()!;
    
    console.log(`Playing chunk from queue, ${audioQueueRef.current.length} remaining`);
    
    // Clean up any existing audio context first
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    
    // Create audio context
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioContextRef.current = audioContext;
    
    // Create audio buffer
    const audioBuffer = audioContext.createBuffer(1, chunk.audio.length, chunk.sampling_rate);
    audioBuffer.getChannelData(0).set(chunk.audio);
    
    // Create source and play with slower, more natural pace
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    
    // Slow down playback for more natural, conversational pace
    source.playbackRate.value = 0.85;
    
    // Add audio processing for more natural sound
    const lowpass = audioContext.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 3500;
    lowpass.Q.value = 0.7;
    
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 1.1;
    
    // Connect: source -> filter -> gain -> destination
    source.connect(lowpass);
    lowpass.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    audioSourceRef.current = source;
    
    source.onended = () => {
      console.log('Chunk finished playing');
      audioSourceRef.current = null;
      
      // Clean up audio context
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      
      // Play next chunk
      playNextChunk();
    };
    
    source.start();
    setIsSpeaking(true);
    setIsPaused(false);
  };

  useEffect(() => {
    // Create the worker
    workerRef.current = new Worker(new URL('../tts.worker.ts', import.meta.url), {
      type: 'module',
    });

    // Handle messages from the worker
    const onMessageReceived = (e: MessageEvent) => {
      console.log('Worker message:', e.data);
      
      switch (e.data.status) {
        case 'loading':
          setLoadingMessage(e.data.message);
          setLoadProgress(10);
          break;

        case 'progress':
          setLoadProgress(e.data.progress);
          setLoadingMessage(e.data.message);
          break;

        case 'ready':
          console.log('TTS model ready!');
          setModelReady(true);
          setIsLoading(false);
          setLoadProgress(100);
          setLoadingMessage('Ready');
          break;

        case 'synthesizing-chunk':
          setLoadingMessage(e.data.message);
          setCurrentChunk(e.data.chunkIndex + 1);
          setTotalChunks(e.data.totalChunks);
          break;

        case 'chunk-complete':
          console.log(`Chunk ${e.data.chunkIndex + 1} received, adding to queue`);
          // Add chunk to queue
          audioQueueRef.current.push({
            audio: e.data.audio,
            sampling_rate: e.data.sampling_rate
          });
          
          // Start playback if not already playing
          if (!isPlayingRef.current) {
            playNextChunk();
          }
          
          // Request next chunk if available
          if (nextChunkToRequestRef.current < chunksRef.current.length) {
            requestNextChunk();
          }
          break;

        case 'error':
          console.error('Worker error:', e.data.message);
          setError(e.data.message);
          setIsSpeaking(false);
          setIsLoading(false);
          break;

        case 'cleanup':
          console.log('TTS model cleaned up:', e.data.message);
          setModelReady(false);
          setIsLoading(true);
          setLoadProgress(0);
          setLoadingMessage('Model unloaded');
          break;
      }
    };

    const onErrorReceived = (e: ErrorEvent) => {
      console.error('Worker error:', e);
      setError(e.message);
      setIsLoading(false);
    };

    workerRef.current.addEventListener('message', onMessageReceived);
    workerRef.current.addEventListener('error', onErrorReceived);

    // Initialize the worker
    workerRef.current.postMessage({ type: 'init' });

    return () => {
      workerRef.current?.removeEventListener('message', onMessageReceived);
      workerRef.current?.removeEventListener('error', onErrorReceived);
      workerRef.current?.terminate();
      if (speakTimeoutRef.current) {
        clearTimeout(speakTimeoutRef.current);
      }
    };
  }, []);

  const speak = () => {
    if (!modelReady || !workerRef.current) {
      console.error('Model not ready');
      return;
    }

    console.log('Starting streaming speech generation...');
    setIsSpeaking(true);
    setLoadingMessage('Preparing speech...');
    setError(null);
    
    // Reset queue and chunk tracking
    audioQueueRef.current = [];
    nextChunkToRequestRef.current = 0;
    isPlayingRef.current = false;
    
    // Split text into chunks
    const chunks = splitTextIntoChunks(portfolioSummary, 200);
    chunksRef.current = chunks;
    setTotalChunks(chunks.length);
    
    console.log(`Split text into ${chunks.length} chunks`);
    
    // Clear any existing timeout
    if (speakTimeoutRef.current) {
      clearTimeout(speakTimeoutRef.current);
    }

    // Add timeout to prevent infinite loading (per chunk)
    speakTimeoutRef.current = setTimeout(() => {
      console.warn('Speech generation timeout after 120 seconds');
      setError('Speech generation is taking too long. Please try again.');
      setIsSpeaking(false);
      setLoadingMessage('');
    }, 120000); // 120 seconds total timeout

    // Request first chunk immediately
    requestNextChunk();
  };

  const pause = () => {
    // Note: Web Audio API doesn't support pause/resume directly
    // We'll stop and would need to regenerate to resume
    // For now, just stop
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
      audioSourceRef.current = null;
    }
    setIsPaused(true);
  };

  const resume = () => {
    // Can't resume with Web Audio API, would need to regenerate
    // For now, just restart
    if (isPaused) {
      speak();
    }
  };

  const stop = () => {
    // Stop current audio
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
      audioSourceRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    // Clear streaming queue
    audioQueueRef.current = [];
    nextChunkToRequestRef.current = 0;
    isPlayingRef.current = false;
    chunksRef.current = [];
    
    // Clear timeout
    if (speakTimeoutRef.current) {
      clearTimeout(speakTimeoutRef.current);
      speakTimeoutRef.current = null;
    }
    
    setIsSpeaking(false);
    setIsPaused(false);
    setCurrentChunk(0);
    setTotalChunks(0);
  };

  const handleClick = () => {
    if (!isSpeaking && !isLoading) {
      speak();
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
        {/* Persistent Progress Indicator (shows during loading even without hover) */}
        {isLoading && (
          <div className="absolute bottom-full left-0 mb-3 px-4 py-3 bg-dark-card border border-primary/30 rounded-lg shadow-xl animate-fade-in min-w-[220px]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-brain text-primary-light animate-pulse text-sm"></i>
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-text-primary">Loading Neural TTS</p>
                <p className="text-[10px] text-text-muted">{loadingMessage}</p>
              </div>
              <span className="text-xs font-bold text-primary-light">{Math.round(loadProgress)}%</span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-dark-bg rounded-full overflow-hidden">
              <div 
                className="h-full gradient-bg rounded-full transition-all duration-300 ease-out"
                style={{ width: `${loadProgress}%` }}
              ></div>
            </div>
            <div className="absolute bottom-0 left-6 w-2 h-2 bg-dark-card border-r border-b border-primary/30 rotate-45 -translate-y-1"></div>
          </div>
        )}

        {/* Streaming Progress Indicator (shows during speech generation) */}
        {isSpeaking && totalChunks > 0 && (
          <div className="absolute bottom-full left-0 mb-3 px-4 py-3 bg-dark-card border border-accent/30 rounded-lg shadow-xl animate-fade-in min-w-[220px]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-waveform-lines text-accent-light animate-pulse text-sm"></i>
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-text-primary">Streaming Speech</p>
                <p className="text-[10px] text-text-muted">{loadingMessage}</p>
              </div>
              <span className="text-xs font-bold text-accent-light">{currentChunk}/{totalChunks}</span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-dark-bg rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-accent to-primary rounded-full transition-all duration-300 ease-out"
                style={{ width: `${(currentChunk / totalChunks) * 100}%` }}
              ></div>
            </div>
            <div className="absolute bottom-0 left-6 w-2 h-2 bg-dark-card border-r border-b border-accent/30 rotate-45 -translate-y-1"></div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="absolute bottom-full left-0 mb-3 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg shadow-xl min-w-[220px]">
            <p className="text-xs text-red-400">Error: {error}</p>
          </div>
        )}

        {/* Tooltip (shows on hover when not loading) */}
        {showTooltip && !isLoading && !error && (
          <div className="absolute bottom-full left-0 mb-3 px-4 py-2.5 bg-dark-card border border-dark-border rounded-lg shadow-xl animate-fade-in whitespace-nowrap">
            <p className="text-sm text-text-primary font-medium">
              🧠 AI-Powered Portfolio Summary
            </p>
            <p className="text-xs text-text-muted mt-1">Streaming Neural TTS • MMS-TTS Model</p>
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
            disabled={isLoading || !!error}
            className={`relative w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg ${
              isLoading || error
                ? 'bg-gradient-to-br from-gray-600 to-gray-700 cursor-not-allowed shadow-gray-500/20'
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
            disabled={isLoading || !!error}
            className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
              isLoading || error
                ? 'bg-dark-card border border-dark-border text-text-muted cursor-not-allowed'
                : isSpeaking && !isPaused
                ? 'bg-primary/20 text-primary-light border border-primary/30'
                : isPaused
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-dark-card border border-dark-border text-text-secondary hover:text-primary-light hover:border-primary/30 hover:bg-dark-elevated'
            }`}
          >
            {isLoading 
              ? `Loading ${Math.round(loadProgress)}%` 
              : error 
              ? 'Error' 
              : isSpeaking && !isPaused && totalChunks > 0
              ? `Streaming ${currentChunk}/${totalChunks}`
              : isSpeaking && !isPaused 
              ? 'Speaking...' 
              : isPaused 
              ? 'Paused' 
              : 'Summarize'}
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
