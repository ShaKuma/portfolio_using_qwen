import { useInView } from '../hooks/useInView';

const projects = [
  {
    title: 'Auto-Refresh Member Service',
    description: 'Background window service for auto-refreshing members list in database based on Active Directory changes using LDAP Protocol. Saved $32K quarterly in project costs.',
    tags: ['C#', 'LDAP', 'Threading', 'Data Structures'],
    icon: '💰',
    gradient: 'from-violet-600/20 to-purple-600/20',
    github: '#',
    live: '#',
    featured: true,
  },
  {
    title: 'Insta Quote - Insurance App',
    description: 'Android prototype for insurance domain - scanning barcodes to fetch product details and searching best insurance policies. Won Hackathon and moved to real-time implementation.',
    tags: ['Android SDK', 'Java', 'Barcode Scanner', 'Insurance'],
    icon: '📱',
    gradient: 'from-blue-600/20 to-cyan-600/20',
    github: '#',
    live: '#',
    featured: true,
  },
  {
    title: 'LSTM Sales Prediction',
    description: 'Implemented Artificial Neural Network (LSTM model) for future sales prediction using deep learning techniques for time-series forecasting.',
    tags: ['Python', 'TensorFlow', 'LSTM', 'Deep Learning'],
    icon: '📈',
    gradient: 'from-emerald-600/20 to-teal-600/20',
    github: '#',
    live: '#',
    featured: true,
  },
  {
    title: 'Text Sentiment Analysis',
    description: 'Built LSTM model for text sentiment analysis on Amazon product reviews using deep learning for natural language processing.',
    tags: ['Python', 'LSTM', 'NLP', 'Amazon Reviews'],
    icon: '🧠',
    gradient: 'from-amber-600/20 to-orange-600/20',
    github: '#',
    live: '#',
    featured: false,
  },
  {
    title: 'Fraud Detection System',
    description: 'Implemented Early Warning System for fraud account detection in payment processing application at Global Payments.',
    tags: ['C#', 'React', 'Analytics', 'Fraud Detection'],
    icon: '🛡️',
    gradient: 'from-pink-600/20 to-rose-600/20',
    github: '#',
    live: '#',
    featured: false,
  },
  {
    title: 'Text Generation Model',
    description: 'Used Hugging Face transformers to build text generation model using pre-trained models. Also implemented text-to-speech pipeline.',
    tags: ['Hugging Face', 'Transformers', 'LLM', 'TTS'],
    icon: '🤖',
    gradient: 'from-green-600/20 to-lime-600/20',
    github: 'https://github.com/ShaKuma/',
    live: '#',
    featured: false,
  },
];

export default function Projects() {
  const { ref: headerRef, isInView: headerVisible } = useInView();
  const { ref: gridRef, isInView: gridVisible } = useInView();

  return (
    <section id="projects" className="py-24 lg:py-36 relative">
      <div className="section-divider"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* Section Header */}
        <div ref={headerRef} className={`text-center mb-20 reveal ${headerVisible ? 'visible' : ''}`}>
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary-light bg-primary/10 rounded-full mb-5 border border-primary/20">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight">
            Featured <span className="gradient-text">Projects & Achievements</span>
          </h2>
          <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
            Key projects and innovations that showcase my expertise in full-stack development and AI/ML
          </p>
          <div className="mt-4 w-16 h-1 gradient-bg rounded-full mx-auto"></div>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group glass-card card-glow rounded-2xl overflow-hidden reveal ${gridVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {/* Project Image/Icon */}
              <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                <span className="text-6xl group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 ease-out">
                  {project.icon}
                </span>
                {project.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold text-primary-light bg-primary/20 rounded-full border border-primary/30 backdrop-blur-sm">
                    Featured
                  </div>
                )}
                {/* Hover overlay with links */}
                <div className="absolute inset-0 bg-dark-bg/80 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-400">
                  <a
                    href={project.github}
                    className="w-11 h-11 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-text-secondary hover:text-primary-light hover:border-primary/50 transition-all hover:scale-110"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                  <a
                    href={project.live}
                    className="w-11 h-11 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-text-secondary hover:text-primary-light hover:border-primary/50 transition-all hover:scale-110"
                  >
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-primary-light transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-text-muted mb-5 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium text-text-muted bg-dark-bg/80 rounded-md border border-dark-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className={`text-center mt-16 reveal ${gridVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.6s' }}>
          <a
            href="https://github.com/ShaKuma/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <i className="fab fa-github"></i>
            View More on GitHub
            <i className="fas fa-arrow-right text-xs"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
