import { useInView } from '../hooks/useInView';

export default function About() {
  const { ref: sectionRef, isInView } = useInView();
  const { ref: codeRef, isInView: codeVisible } = useInView();

  return (
    <section id="about" className="py-24 lg:py-36 relative">
      <div className="section-divider"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* Section Header */}
        <div ref={sectionRef} className={`text-center mb-20 reveal ${isInView ? 'visible' : ''}`}>
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary-light bg-primary/10 rounded-full mb-5 border border-primary/20">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight">
            Turning Ideas Into{' '}
            <span className="gradient-text">Digital Reality</span>
          </h2>
          <div className="mt-4 w-16 h-1 gradient-bg rounded-full mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Code Visual */}
          <div ref={codeRef} className={`reveal-left ${codeVisible ? 'visible' : ''}`}>
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative glass-card rounded-2xl overflow-hidden">
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-dark-border/50 bg-dark-surface/50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <span className="text-xs text-text-muted ml-2 font-mono">about.tsx</span>
                </div>
                
                {/* Code content */}
                <div className="p-6 font-mono text-sm leading-relaxed">
                  <div className="text-text-muted">
                    <span className="text-primary-light">interface</span>{' '}
                    <span className="text-accent">Developer</span> {'{'}
                  </div>
                  <div className="pl-4 space-y-1.5 mt-2">
                    <p><span className="text-accent">name</span>: <span className="text-green-400">"Alex Chen"</span>;</p>
                    <p><span className="text-accent">title</span>: <span className="text-green-400">"Senior Software Engineer"</span>;</p>
                    <p><span className="text-accent">location</span>: <span className="text-green-400">"San Francisco, CA"</span>;</p>
                    <p><span className="text-accent">education</span>: <span className="text-green-400">"M.S. CS, Stanford"</span>;</p>
                    <p className="pt-2"><span className="text-accent">interests</span>: <span className="text-primary-light">string</span>[] = [</p>
                    <div className="pl-4">
                      <p className="text-green-400">"Scalable Systems",</p>
                      <p className="text-green-400">"Open Source",</p>
                      <p className="text-green-400">"Cloud Architecture",</p>
                      <p className="text-green-400">"Developer Experience"</p>
                    </div>
                    <p>];</p>
                    <p className="pt-2"><span className="text-accent">motto</span> = <span className="text-green-400">"Ship fast, iterate faster"</span>;</p>
                  </div>
                  <div className="text-text-muted mt-2">{'}'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className={`reveal-right ${codeVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-text-primary leading-tight">
                A passionate engineer who loves building things that make a difference
              </h3>
              <p className="text-text-secondary leading-relaxed text-[15px]">
                With over 8 years of experience in software development, I specialize in building 
                robust, scalable applications using modern technologies. My journey started with 
                curiosity about how things work under the hood, and it has evolved into a career 
                focused on creating impactful solutions.
              </p>
              <p className="text-text-secondary leading-relaxed text-[15px]">
                I've had the privilege of working with startups and Fortune 500 companies, 
                contributing to projects ranging from real-time data processing systems to 
                consumer-facing applications serving millions of users. I believe in writing 
                clean, maintainable code and building systems that scale.
              </p>
              
              {/* Quick facts */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                {[
                  { icon: 'fa-graduation-cap', text: 'M.S. Computer Science, Stanford' },
                  { icon: 'fa-briefcase', text: '8+ Years Professional Experience' },
                  { icon: 'fa-globe', text: 'Remote & On-site Available' },
                  { icon: 'fa-language', text: 'English, Mandarin' },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3 group">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <i className={`fas ${item.icon} text-primary-light text-xs`}></i>
                    </div>
                    <span className="text-sm text-text-secondary pt-2">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
