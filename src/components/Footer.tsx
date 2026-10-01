export default function Footer() {
  return (
    <footer className="border-t border-dark-border bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo & Copyright */}
          <div>
            <a href="#home" className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center font-bold text-white text-sm">
                AC
              </div>
              <span className="text-lg font-bold text-text-primary">
                Alex<span className="gradient-text">Chen</span>
              </span>
            </a>
            <p className="text-sm text-text-muted">
              © {new Date().getFullYear()} Alex Chen. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-text-muted hover:text-primary-light transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex justify-start md:justify-end gap-3">
            {[
              { icon: 'fab fa-github', href: '#' },
              { icon: 'fab fa-linkedin-in', href: '#' },
              { icon: 'fab fa-twitter', href: '#' },
              { icon: 'fab fa-dev', href: '#' },
            ].map((social) => (
              <a
                key={social.icon}
                href={social.href}
                className="w-9 h-9 rounded-lg bg-dark-surface border border-dark-border flex items-center justify-center text-text-muted hover:text-primary-light hover:border-primary/30 transition-all"
              >
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-dark-border text-center">
          <p className="text-sm text-text-muted">
            Built with <span className="text-red-400">❤</span> using React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
