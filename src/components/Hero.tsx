import { useEffect, useState } from 'react';

const roles = ['Full Stack Developer', 'AI/ML Enthusiast', 'Cloud Engineer', 'Tech Lead'];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(role.slice(0, displayText.length + 1));
          if (displayText.length === role.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(role.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
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
    <section id="home" className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden noise-bg">
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

        {/* Typing effect */}
        <div className="animate-fade-in-up h-12 mb-8 flex items-center justify-center" style={{ animationDelay: '0.4s' }}>
          <span className="text-xl sm:text-2xl md:text-3xl font-light text-text-secondary tracking-wide">
            {displayText}
          </span>
          <span className="typing-cursor"></span>
        </div>

        {/* Description */}
        <p className="animate-fade-in-up max-w-2xl mx-auto text-lg text-text-muted mb-12 leading-relaxed" style={{ animationDelay: '0.6s' }}>
          11+ years of experience building enterprise AI agent platforms, MCP server ecosystems, 
          and scalable web applications. Currently architecting organization-wide AI ChatBot systems 
          with A2A protocols, vector embeddings, and robust security guardrails.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: '0.8s' }}>
          <a href="#projects" className="btn-primary text-base">
            <i className="fas fa-rocket text-sm"></i>
            View My Work
            <i className="fas fa-arrow-right text-sm ml-1"></i>
          </a>
          <a href="#contact" className="btn-secondary text-base">
            <i className="fas fa-download text-sm"></i>
            Download CV
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fade-in-up mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8" style={{ animationDelay: '1s' }}>
          {[
            { value: '11+', label: 'Years Experience' },
            { value: '32K+', label: 'Dollars Saved' },
            { value: '3', label: 'Companies' },
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
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <a href="#about" className="flex flex-col items-center gap-2 text-text-muted hover:text-primary-light transition-colors group">
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-current flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-current animate-bounce"></div>
          </div>
        </a>
      </div>
    </section>
  );
}
