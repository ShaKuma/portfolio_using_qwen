import { useEffect, useState } from 'react';
import NeuralNetworkBackground from './NeuralNetworkBackground';

const roles = ['Full Stack Developer', 'AI/ML Enthusiast', 'Cloud Engineer', 'Tech Lead'];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const role = roles[currentRole];
    
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < role.length) {
          setDisplayText(role.slice(0, displayText.length + 1));
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(role.slice(0, displayText.length - 1));
        } else {
          // Finished deleting, move to next role
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const timeout = setTimeout(handleTyping, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden noise-bg pt-20">
      {/* Neural Network Animation */}
      <NeuralNetworkBackground />
      
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px] animate-morph"
          style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-accent/6 rounded-full blur-[80px] animate-morph"
          style={{ transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`, animationDelay: '4s' }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[60px] animate-float"
          style={{ animationDelay: '2s' }}
        ></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(124, 58, 237, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 0.3) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}></div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary-light/40 animate-float"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 16}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${6 + i * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main heading with staggered animation */}
        <div className="overflow-hidden mb-4">
          <h1 className="animate-fade-in-up text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-text-primary leading-[1.1] tracking-tight" style={{ animationDelay: '0.2s' }}>
            Hi, I'm{' '}
            <span className="relative inline-block">
              <span className="gradient-text">Shashi Kumar</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 10C50 4 100 2 150 6C200 10 250 4 298 8" stroke="url(#underline-gradient)" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="underline-gradient" x1="0" y1="0" x2="300" y2="0">
                    <stop stopColor="#7c3aed"/>
                    <stop offset="1" stopColor="#06b6d4"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>
        </div>

        {/* AI/ML Badge */}
        <div className="animate-fade-in-up mb-6" style={{ animationDelay: '0.3s' }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary to-accent rounded-full shadow-lg shadow-primary/30 animate-neural-pulse">
            <i className="fas fa-robot animate-glow-pulse"></i>
            AI/ML Engineer • IIT Delhi Certified
          </span>
        </div>

        {/* Typing effect */}
        <div className="animate-fade-in-up h-12 mb-8 flex items-center justify-center" style={{ animationDelay: '0.4s' }}>
          <span className="text-xl sm:text-2xl md:text-3xl font-light text-text-secondary tracking-wide">
            {displayText}
          </span>
          <span className="typing-cursor"></span>
        </div>

        {/* Description */}
        <p className="animate-fade-in-up max-w-2xl mx-auto text-lg text-text-muted mb-8 leading-relaxed" style={{ animationDelay: '0.6s' }}>
          11+ years full stack. Deep AI/ML foundations. Building smart, scalable web solutions.
        </p>

        {/* AI/ML Highlight Pills */}
        <div className="animate-fade-in-up flex flex-wrap justify-center gap-3 mb-12" style={{ animationDelay: '0.7s' }}>
          {[
            { icon: 'fa-brain', text: 'Deep Learning' },
            { icon: 'fa-robot', text: 'Large Language Models' },
            { icon: 'fa-eye', text: 'Computer Vision' },
            { icon: 'fa-comments', text: 'Natural Language Processing' },
          ].map((item) => (
            <span
              key={item.text}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-light bg-primary/10 border border-primary/20 rounded-full hover:bg-primary/20 hover:border-primary/40 transition-all duration-300"
            >
              <i className={`fas ${item.icon} text-xs`}></i>
              {item.text}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: '0.8s' }}>
          <a href="#projects" className="btn-primary text-base">
            <i className="fas fa-rocket text-sm"></i>
            View My Work
            <i className="fas fa-arrow-right text-sm ml-1"></i>
          </a>
          <a href="#contact" className="btn-secondary text-base">
            <i className="fas fa-comments text-sm"></i>
            Let's Connect
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fade-in-up mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8" style={{ animationDelay: '1s' }}>
          {[
            { value: '11+', label: 'Years Full Stack' },
            { value: '32K+', label: 'Dollars Saved' },
            { value: '50+', label: 'Projects Delivered' },
            { value: 'IIT', label: 'AI/ML Certified' },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center group cursor-default" style={{ animationDelay: `${1 + i * 0.1}s` }}>
              <div className="text-3xl sm:text-4xl font-bold gradient-text-static group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-sm text-text-muted mt-2 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <button 
          onClick={() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="flex flex-col items-center gap-2 text-text-muted hover:text-primary-light transition-all duration-300 group cursor-pointer"
        >
          <span className="text-xs font-medium tracking-widest uppercase group-hover:tracking-wider transition-all duration-300">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1.5 group-hover:border-primary-light transition-colors">
            <div className="w-1.5 h-3 rounded-full bg-current animate-bounce"></div>
          </div>
        </button>
      </div>
    </section>
  );
}
