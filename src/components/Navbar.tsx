import { useState, useEffect } from 'react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-bg/90 backdrop-blur-lg shadow-lg shadow-black/20 border-b border-dark-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center font-bold text-white text-lg group-hover:scale-110 transition-transform">
              AC
            </div>
            <span className="text-xl font-bold text-text-primary hidden sm:block">
              Alex<span className="gradient-text">Chen</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary-light rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white gradient-bg rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
          >
            <i className="fas fa-paper-plane text-xs"></i>
            Let's Talk
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-text-primary"
          >
            <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-dark-bg/95 backdrop-blur-lg border-t border-dark-border">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-text-secondary hover:text-primary-light hover:bg-white/5 rounded-lg transition-all"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-center text-white gradient-bg rounded-lg font-semibold mt-3"
            >
              Let's Talk
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
