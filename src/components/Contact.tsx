import { useState } from 'react';
import { useInView } from '../hooks/useInView';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const { ref: headerRef, isInView: headerVisible } = useInView();
  const { ref: formRef, isInView: formVisible } = useInView();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct mailto URL with form data
    const subject = encodeURIComponent(formData.subject || 'Contact from Portfolio');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:Shashikmr01991@gmail.com?subject=${subject}&body=${body}`;
    
    // Create a temporary anchor element and click it
    // This is more reliable than window.location.href
    const link = document.createElement('a');
    link.href = mailtoLink;
    link.click();
  };

  return (
    <section id="contact" className="py-16 lg:py-24 relative">
      <div className="section-divider"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Section Header */}
        <div ref={headerRef} className={`text-center mb-12 reveal ${headerVisible ? 'visible' : ''}`}>
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary-light bg-primary/10 rounded-full mb-5 border border-primary/20">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </p>
          <div className="mt-4 w-16 h-1 gradient-bg rounded-full mx-auto"></div>
        </div>

        <div ref={formRef} className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className={`lg:col-span-2 space-y-6 reveal-left ${formVisible ? 'visible' : ''}`}>
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold text-text-primary mb-6">Contact Information</h3>
              <div className="space-y-5">
                <a
                  href="mailto:Shashikmr01991@gmail.com"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <i className="fas fa-envelope text-primary-light"></i>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Email</p>
                    <p className="text-text-primary group-hover:text-primary-light transition-colors font-medium break-all">Shashikmr01991@gmail.com</p>
                  </div>
                </a>
                <a
                  href="tel:+919940342772"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <i className="fas fa-phone text-primary-light"></i>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Phone</p>
                    <p className="text-text-primary group-hover:text-primary-light transition-colors font-medium">+91 9940342772</p>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-primary-light"></i>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Location</p>
                    <p className="text-text-primary font-medium">Noida, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-bold text-text-primary mb-5">Connect With Me</h3>
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/in/shashi-kumar-6b955b80"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-12 h-12 rounded-xl bg-dark-card border border-dark-border flex items-center justify-center text-text-muted hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                >
                  <i className="fab fa-linkedin-in text-lg"></i>
                </a>
                <a
                  href="mailto:Shashikmr01991@gmail.com"
                  aria-label="Email"
                  className="w-12 h-12 rounded-xl bg-dark-card border border-dark-border flex items-center justify-center text-text-muted hover:text-white hover:bg-primary hover:border-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                >
                  <i className="fas fa-envelope text-lg"></i>
                </a>
              </div>
            </div>

            {/* Quick response note */}
            <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-primary/5 border border-primary/10">
              <i className="fas fa-bolt text-warm"></i>
              <p className="text-sm text-text-secondary">
                <span className="text-text-primary font-medium">Quick response</span> — I typically reply within 24 hours
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`lg:col-span-3 reveal-right ${formVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <div className="glass-card rounded-2xl p-6 lg:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-text-secondary mb-2.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 bg-dark-bg border border-dark-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all duration-300"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-medium text-text-secondary mb-2.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 bg-dark-bg border border-dark-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all duration-300"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3.5 bg-dark-bg border border-dark-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all duration-300"
                      placeholder="Project Discussion"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2.5">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3.5 bg-dark-bg border border-dark-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn-primary w-full sm:w-auto justify-center"
                  >
                    <i className="fas fa-paper-plane"></i>
                    Send Message
                  </button>
                </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
