import { useEffect, useState } from 'react';

const roles = ['Full Stack Developer', 'Cloud Architect', 'Open Source Contributor', 'System Designer'];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

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
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Status badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-sm text-text-secondary">Available for opportunities</span>
        </div>

        {/* Main heading */}
        <h1 className="animate-fade-in-up text-4xl sm:text-5xl md:text-7xl font-bold text-text-primary mb-6 leading-tight" style={{ animationDelay: '0.2s' }}>
          Hi, I'm <span className="gradient-text">Alex Chen</span>
        </h1>

        {/* Typing effect */}
        <div className="animate-fade-in-up text-xl sm:text-2xl md:text-3xl text-text-secondary mb-8 h-10" style={{ animationDelay: '0.4s' }}>
          <span>{displayText}</span>
          <span className="inline-block w-0.5 h-7 bg-primary-light ml-1 animate-pulse"></span>
        </div>

        {/* Description */}
        <p className="animate-fade-in-up max-w-2xl mx-auto text-lg text-text-muted mb-10 leading-relaxed" style={{ animationDelay: '0.6s' }}>
          I craft scalable, high-performance software solutions with 8+ years of experience 
          building products that serve millions of users. Passionate about clean code, 
          system design, and developer experience.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: '0.8s' }}>
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-8 py-4 text-white font-semibold gradient-bg rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40"
          >
            <i className="fas fa-code text-sm"></i>
            View My Work
            <i className="fas fa-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-text-primary font-semibold border border-dark-border rounded-xl hover:border-primary/50 hover:bg-white/5 transition-all"
          >
            <i className="fas fa-download text-sm"></i>
            Download CV
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fade-in-up mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6" style={{ animationDelay: '1s' }}>
          {[
            { value: '8+', label: 'Years Experience' },
            { value: '50+', label: 'Projects Delivered' },
            { value: '30+', label: 'Happy Clients' },
            { value: '15K+', label: 'GitHub Stars' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-text-muted hover:text-primary-light transition-colors">
          <i className="fas fa-chevron-down text-xl"></i>
        </a>
      </div>
    </section>
  );
}
