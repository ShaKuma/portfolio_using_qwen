import { useInView } from '../hooks/useInView';

const projects = [
  {
    title: 'Enterprise AI ChatBot Platform',
    description: 'Designed & built an organization-wide AI ChatBot Web UI integrated with MCP servers for orchestrating calls to JIRA, GitHub, Wiki, Jenkins, and more. Features A2A protocol for multi-turn agent conversations, cross-agent collaboration, and parallel agent invocation.',
    tags: ['React', 'LLMs', 'A2A Protocol', 'MCP', 'Vector DB'],
    icon: '🤖',
    gradient: 'from-violet-600/20 to-purple-600/20',
    github: '#',
    live: '#',
    featured: true,
  },
  {
    title: 'MCP Servers Ecosystem',
    description: 'Architected Model Context Protocol (MCP) servers for GitHub, JIRA, Jenkins, Web Services, Splunk, Windows RDP, and PDF Creator — integrated with VS Code to enable AI-powered development workflows across the organization.',
    tags: ['MCP', 'VS Code', 'GitHub API', 'Jenkins', 'Splunk'],
    icon: '🔌',
    gradient: 'from-blue-600/20 to-cyan-600/20',
    github: 'https://github.com/ShaKuma/',
    live: '#',
    featured: true,
  },
  {
    title: 'AI Agent Security & Guardrails',
    description: 'Engineered robust security guardrails to prevent PII/sensitive data leakage to external LLMs. Implemented OWASP Top 10 remediations for AI agents with anonymous data transmission and vector-based per-user agent memory.',
    tags: ['OWASP', 'Security', 'Vector Embeddings', 'LLMs', 'PII Protection'],
    icon: '🛡️',
    gradient: 'from-emerald-600/20 to-teal-600/20',
    github: '#',
    live: '#',
    featured: true,
  },
  {
    title: 'Auto-Refresh Member Service',
    description: 'Background window service for auto-refreshing members list in database based on Active Directory changes using LDAP Protocol. Used advanced data structures and threading for efficient updates. Saved $32K quarterly.',
    tags: ['C#', 'LDAP', 'Threading', 'Data Structures'],
    icon: '💰',
    gradient: 'from-amber-600/20 to-orange-600/20',
    github: '#',
    live: '#',
    featured: false,
  },
  {
    title: 'Insta Quote - Insurance App',
    description: 'Android prototype for insurance domain — scanning barcodes to fetch product details and searching best insurance policies. Won Hackathon challenge across Cognizant worldwide and moved to real-time implementation.',
    tags: ['Android SDK', 'Java', 'Barcode Scanner', 'Insurance'],
    icon: '📱',
    gradient: 'from-pink-600/20 to-rose-600/20',
    github: '#',
    live: '#',
    featured: false,
  },
  {
    title: 'LSTM Sales Prediction & NLP',
    description: 'Implemented ANN (LSTM) for future sales prediction. Built text sentiment analysis on Amazon reviews using LSTM. Used Hugging Face transformers for text generation and text-to-speech pipelines.',
    tags: ['Python', 'TensorFlow', 'LSTM', 'Hugging Face', 'NLP'],
    icon: '🧠',
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
    <section id="projects" className="py-16 lg:py-24 relative">
      <div className="section-divider"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Section Header */}
        <div ref={headerRef} className={`text-center mb-12 reveal ${headerVisible ? 'visible' : ''}`}>
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary-light bg-primary/10 rounded-full mb-5 border border-primary/20">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight">
            Featured <span className="gradient-text">Projects & Innovations</span>
          </h2>
          <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
            Key projects showcasing expertise in AI agents, MCP ecosystems, full-stack development, and ML
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


      </div>
    </section>
  );
}
