import { useInView } from '../hooks/useInView';
import AnimatedTerminal from './AnimatedTerminal';
import FloatingParticles from './FloatingParticles';
import { personalInfo, currentRole, achievements } from '../data/portfolioData';

export default function About() {
  const { ref: sectionRef, isInView } = useInView();
  const { ref: codeRef, isInView: codeVisible } = useInView();

  return (
    <section id="about" className="py-16 lg:py-24 relative">
      <div className="section-divider"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Section Header */}
        <div ref={sectionRef} className={`text-center mb-12 reveal ${isInView ? 'visible' : ''}`}>
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
              
              {/* Animated Terminal */}
              <AnimatedTerminal />
            </div>
          </div>

          {/* Right - Content */}
          <div className={`reveal-right ${codeVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-text-primary leading-tight">
                {currentRole.title} at {currentRole.company}
              </h3>
              <p className="text-text-secondary leading-relaxed text-[15px]">
                With 11+ years of experience working as a full stack web application developer, I've 
                handled everything from development to deployment across multiple enterprise applications. 
                I have a proven ability to use innovative methods for processing and troubleshooting 
                problems, providing cost-effective solutions that drive real business value.
              </p>
              <p className="text-text-secondary leading-relaxed text-[15px]">
                Currently based in {personalInfo.location}, I specialize in building scalable systems 
                and have {personalInfo.certification.toLowerCase()}.
              </p>

              {/* AI/ML Capabilities Highlight */}
              <div className="mt-6 p-5 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 relative overflow-hidden">
                {/* Floating particles background */}
                <div className="absolute inset-0">
                  <FloatingParticles />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse">
                      <i className="fas fa-brain text-white"></i>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-text-primary">AI/ML Expertise</h4>
                      <p className="text-xs text-text-muted">IIT Delhi Certified • 6 Months Intensive Program</p>
                    </div>
                  </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-green-400 mt-0.5 flex-shrink-0 text-xs"></i>
                    <span className="text-text-secondary">Deep Learning (ANN, CNN, RNN, LSTM)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-green-400 mt-0.5 flex-shrink-0 text-xs"></i>
                    <span className="text-text-secondary">NLP & Transformers</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-green-400 mt-0.5 flex-shrink-0 text-xs"></i>
                    <span className="text-text-secondary">Computer Vision (YOLOv8)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-green-400 mt-0.5 flex-shrink-0 text-xs"></i>
                    <span className="text-text-secondary">LLMs & Transfer Learning</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-green-400 mt-0.5 flex-shrink-0 text-xs"></i>
                    <span className="text-text-secondary">TensorFlow & PyTorch</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-green-400 mt-0.5 flex-shrink-0 text-xs"></i>
                    <span className="text-text-secondary">Hugging Face Ecosystem</span>
                  </div>
                </div>
                </div>
              </div>
              
              {/* Quick facts */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                {[
                  { icon: 'fa-graduation-cap', text: 'B.Tech CSE, Lovely Professional University' },
                  { icon: 'fa-certificate', text: 'AI/ML Course, IIT Delhi (6 months)' },
                  { icon: 'fa-briefcase', text: '11+ Years Full Stack Experience' },
                  { icon: 'fa-map-marker-alt', text: 'Based in Noida, India' },
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
