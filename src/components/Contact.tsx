import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 lg:py-32 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary-light bg-primary/10 rounded-full mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold text-text-primary mb-6">Contact Information</h3>
              <div className="space-y-5">
                {[
                  { icon: 'fa-envelope', label: 'Email', value: 'alex@example.com', href: 'mailto:alex@example.com' },
                  { icon: 'fa-phone', label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
                  { icon: 'fa-map-marker-alt', label: 'Location', value: 'San Francisco, CA', href: '#' },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <i className={`fas ${item.icon} text-primary-light`}></i>
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">{item.label}</p>
                      <p className="text-text-primary group-hover:text-primary-light transition-colors">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-bold text-text-primary mb-4">Connect With Me</h3>
              <div className="flex gap-3">
                {[
                  { icon: 'fab fa-github', label: 'GitHub', href: '#', color: 'hover:bg-gray-700' },
                  { icon: 'fab fa-linkedin-in', label: 'LinkedIn', href: '#', color: 'hover:bg-blue-700' },
                  { icon: 'fab fa-twitter', label: 'Twitter', href: '#', color: 'hover:bg-sky-500' },
                  { icon: 'fab fa-dev', label: 'Dev.to', href: '#', color: 'hover:bg-gray-800' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className={`w-11 h-11 rounded-lg bg-dark-bg border border-dark-border flex items-center justify-center text-text-secondary hover:text-white ${social.color} transition-all duration-200`}
                  >
                    <i className={`${social.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="glass-card rounded-2xl p-6 lg:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <i className="fas fa-check text-green-400 text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">Message Sent!</h3>
                  <p className="text-text-secondary">Thank you for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                      placeholder="Project Discussion"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all resize-none"
                      placeholder="Tell me about your project..."
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-white font-semibold gradient-bg rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
                  >
                    <i className="fas fa-paper-plane"></i>
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
