export default function Footer() {
  return (
    <footer className="relative border-t border-dark-border/50 bg-dark-bg">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <a href="#home" className="flex items-center gap-3 mb-4 group">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-xl gradient-bg opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-[1px] rounded-[11px] bg-dark-bg flex items-center justify-center">
                  <span className="text-sm font-bold gradient-text">AC</span>
                </div>
              </div>
              <span className="text-lg font-bold text-text-primary">
                Alex<span className="gradient-text-static">.dev</span>
              </span>
            </a>
            <p className="text-sm text-text-muted leading-relaxed max-w-xs">
              Building scalable, high-performance software solutions. Let's create something amazing together.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-5">Quick Links</h4>
            <div className="grid grid-cols-2 gap-3">
              {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-text-muted hover:text-primary-light transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-5">Connect</h4>
            <div className="flex gap-3">
              {[
                { icon: 'fab fa-github', label: 'GitHub' },
                { icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
                { icon: 'fab fa-twitter', label: 'Twitter' },
                { icon: 'fab fa-dev', label: 'Dev.to' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-dark-card border border-dark-border flex items-center justify-center text-text-muted hover:text-primary-light hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-dark-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} Alex Chen. All rights reserved.
          </p>
          <p className="text-sm text-text-muted flex items-center gap-1.5">
            Built with <span className="text-red-400">♥</span> using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
