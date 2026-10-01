export default function About() {
  return (
    <section id="about" className="py-20 lg:py-32 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary-light bg-primary/10 rounded-full mb-4">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary">
            Turning Ideas Into <span className="gradient-text">Digital Reality</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image/Visual */}
          <div className="relative">
            <div className="gradient-border p-8">
              <div className="aspect-square rounded-lg bg-dark-bg overflow-hidden flex items-center justify-center relative">
                {/* Code-like visual */}
                <div className="text-left font-mono text-sm p-6 w-full">
                  <div className="text-text-muted mb-4">
                    <span className="text-accent">const</span> <span className="text-primary-light">developer</span> = {'{'}
                  </div>
                  <div className="pl-4 space-y-2">
                    <p><span className="text-accent">name:</span> <span className="text-green-400">"Alex Chen"</span>,</p>
                    <p><span className="text-accent">role:</span> <span className="text-green-400">"Senior Software Engineer"</span>,</p>
                    <p><span className="text-accent">location:</span> <span className="text-green-400">"San Francisco, CA"</span>,</p>
                    <p><span className="text-accent">education:</span> <span className="text-green-400">"M.S. Computer Science"</span>,</p>
                    <p><span className="text-accent">passions:</span> [</p>
                    <div className="pl-4">
                      <p className="text-green-400">"Building scalable systems",</p>
                      <p className="text-green-400">"Open source contribution",</p>
                      <p className="text-green-400">"Mentoring developers",</p>
                      <p className="text-green-400">"Cloud architecture"</p>
                    </div>
                    <p>],</p>
                    <p><span className="text-accent">currently:</span> <span className="text-green-400">"Building the future"</span></p>
                  </div>
                  <div className="text-text-muted mt-4">{'}'}</div>
                </div>
                {/* Decorative dots */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-text-primary">
              A passionate engineer who loves building things that matter
            </h3>
            <p className="text-text-secondary leading-relaxed">
              With over 8 years of experience in software development, I specialize in building 
              robust, scalable applications using modern technologies. My journey started with 
              curiosity about how things work under the hood, and it has evolved into a career 
              focused on creating impactful solutions.
            </p>
            <p className="text-text-secondary leading-relaxed">
              I've had the privilege of working with startups and Fortune 500 companies, 
              contributing to projects ranging from real-time data processing systems to 
              consumer-facing applications serving millions of users. I believe in writing 
              clean, maintainable code and building systems that scale.
            </p>
            
            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { icon: 'fa-graduation-cap', text: 'M.S. Computer Science, Stanford' },
                { icon: 'fa-briefcase', text: '8+ Years Professional Experience' },
                { icon: 'fa-globe', text: 'Remote & On-site Available' },
                { icon: 'fa-language', text: 'English, Mandarin' },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className={`fas ${item.icon} text-primary-light text-sm`}></i>
                  </div>
                  <span className="text-sm text-text-secondary">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
