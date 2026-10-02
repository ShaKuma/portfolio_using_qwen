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

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-dark-bg flex flex-col items-center justify-center transition-all duration-700 ${progress >= 100 ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}`}>
      <div className="relative mb-8">
        <div className="w-16 h-16 rounded-2xl gradient-bg"></div>
        <div className="absolute inset-0 w-16 h-16 rounded-2xl gradient-bg animate-ping opacity-20"></div>
      </div>
      <div className="w-48 h-1 bg-dark-card rounded-full overflow-hidden">
        <div 
          className="h-full gradient-bg rounded-full transition-all duration-200 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>
      <p className="mt-4 text-sm text-text-muted font-mono tracking-wider">Loading portfolio...</p>
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <div className={`min-h-screen bg-dark-bg text-text-primary transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <ScrollProgress />
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
