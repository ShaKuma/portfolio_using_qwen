import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import FloatingSpeakButton from './components/FloatingSpeakButton';

function LoadingScreen({ 
  onComplete, 
  modelProgress, 
  modelStatus 
}: { 
  onComplete: () => void;
  modelProgress: number;
  modelStatus: string;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          // Wait for model to load before completing
          if (modelProgress >= 100) {
            clearInterval(interval);
            setTimeout(onComplete, 500);
            return 100;
          }
          return 90;
        }
        return prev + Math.random() * 10 + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete, modelProgress]);

  return (
    <div className={`fixed inset-0 z-[100] bg-dark-bg flex flex-col items-center justify-center transition-all duration-700 ${progress >= 100 ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}`}>
      {/* Animated logo */}
      <div className="relative mb-10">
        <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center">
          <span className="text-2xl font-bold text-white">SK</span>
        </div>
        <div className="absolute inset-0 w-20 h-20 rounded-2xl gradient-bg animate-ping opacity-20"></div>
      </div>

      {/* Name */}
      <h2 className="text-2xl font-bold text-text-primary mb-2">Shashi Kumar</h2>
      <p className="text-sm text-text-muted mb-10">Portfolio Loading...</p>

      {/* Main progress bar */}
      <div className="w-64 h-1.5 bg-dark-card rounded-full overflow-hidden mb-3">
        <div 
          className="h-full gradient-bg rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>
      <p className="text-xs text-text-muted mb-8">{Math.round(progress)}%</p>

      {/* Neural TTS Model Status */}
      <div className="w-64 p-4 rounded-xl bg-dark-card/50 border border-dark-border/50">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            modelProgress >= 100 
              ? 'bg-green-500/20 border border-green-500/30' 
              : modelProgress > 0
              ? 'bg-primary/20 border border-primary/30'
              : 'bg-dark-border/30 border border-dark-border'
          }`}>
            <i className={`fas ${
              modelProgress >= 100 
                ? 'fa-check text-green-400' 
                : modelProgress > 0
                ? 'fa-brain text-primary-light animate-pulse'
                : 'fa-brain text-text-muted'
            } text-sm`}></i>
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-text-primary">Neural TTS Engine</p>
            <p className="text-[10px] text-text-muted">SpeechT5 Transformer Model</p>
          </div>
          {modelProgress >= 100 && (
            <span className="text-[10px] font-medium text-green-400">Ready</span>
          )}
        </div>
        
        {/* Model progress bar */}
        <div className="w-full h-1 bg-dark-bg rounded-full overflow-hidden mb-2">
          <div 
            className={`h-full rounded-full transition-all duration-300 ease-out ${
              modelProgress >= 100 ? 'bg-green-500' : 'gradient-bg'
            }`}
            style={{ width: `${Math.min(modelProgress, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[10px] text-text-muted truncate flex-1">{modelStatus}</p>
          <p className="text-[10px] text-text-muted font-mono ml-2">{Math.round(modelProgress)}%</p>
        </div>
      </div>

      {/* Loading message */}
      <p className="mt-8 text-xs text-text-muted/60 text-center max-w-xs">
        Pre-loading AI voice engine for portfolio narration...
      </p>
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [modelProgress, setModelProgress] = useState(0);
  const [modelStatus, setModelStatus] = useState('Initializing...');
  const [modelReady, setModelReady] = useState(false);

  useEffect(() => {
    // Start loading the neural TTS model immediately
    loadNeuralModel();
  }, []);

  const loadNeuralModel = async () => {
    try {
      setModelStatus('Loading transformers library...');
      setModelProgress(5);
      
      const { pipeline } = await import('@huggingface/transformers');
      
      setModelStatus('Downloading SpeechT5 model...');
      setModelProgress(15);
      
      // Load SpeechT5 TTS model with progress tracking
      await pipeline(
        'text-to-speech',
        'Xenova/speecht5_tts',
        {
          progress_callback: (progress: any) => {
            if (progress.status === 'downloading') {
              const percent = progress.progress ? Math.round(progress.progress) : 0;
              // Map download progress to 15-85% range
              const mappedProgress = 15 + (percent * 0.7);
              setModelProgress(mappedProgress);
              setModelStatus(`Downloading neural model: ${percent}%`);
            } else if (progress.status === 'loading') {
              setModelProgress(90);
              setModelStatus('Loading model into memory...');
            } else if (progress.status === 'ready') {
              setModelProgress(100);
              setModelStatus('Model ready!');
              setModelReady(true);
            }
          }
        }
      );
      
      setModelProgress(100);
      setModelStatus('Model ready!');
      setModelReady(true);
    } catch (error) {
      console.error('Failed to load neural TTS model:', error);
      setModelStatus('Failed to load model');
      setModelProgress(0);
    }
  };

  return (
    <>
      {!loaded && (
        <LoadingScreen 
          onComplete={() => setLoaded(true)} 
          modelProgress={modelProgress}
          modelStatus={modelStatus}
        />
      )}
      <div className={`min-h-screen bg-dark-bg text-text-primary transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <ScrollProgress />
        <FloatingSpeakButton modelReady={modelReady} />
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
