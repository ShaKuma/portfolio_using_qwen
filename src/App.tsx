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

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simple loading animation
    setTimeout(() => setLoaded(true), 1500);
  }, []);

  return (
    <>
      {!loaded && (
        <div className="fixed inset-0 z-[100] bg-dark-bg flex flex-col items-center justify-center transition-all duration-700">
          <div className="relative mb-10">
            <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center">
              <span className="text-2xl font-bold text-white">SK</span>
            </div>
            <div className="absolute inset-0 w-20 h-20 rounded-2xl gradient-bg animate-ping opacity-20"></div>
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Shashi Kumar</h2>
          <p className="text-sm text-text-muted">Loading Portfolio...</p>
        </div>
      )}
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
