import { useInView } from '../hooks/useInView';

const projects = [
  {
    title: 'CloudScale Platform',
    description: 'A cloud-native microservices platform handling 10M+ requests/day with auto-scaling, service mesh, and real-time monitoring.',
    tags: ['Go', 'Kubernetes', 'gRPC', 'Prometheus'],
    icon: '🏗️',
    gradient: 'from-violet-600/20 to-purple-600/20',
    github: '#',
    live: '#',
    featured: true,
  },
  {
    title: 'DataFlow Analytics',
    description: 'Real-time data analytics dashboard processing streaming data from multiple sources with sub-second latency.',
    tags: ['React', 'TypeScript', 'Kafka', 'ClickHouse'],
    icon: '📊',
    gradient: 'from-blue-600/20 to-cyan-600/20',
    github: '#',
    live: '#',
    featured: true,
  },
  {
    title: 'DevConnect',
    description: 'Social platform for developers to share projects, collaborate on code, and build their professional network.',
    tags: ['Next.js', 'PostgreSQL', 'GraphQL', 'Redis'],
    icon: '👥',
    gradient: 'from-emerald-600/20 to-teal-600/20',
    github: '#',
    live: '#',
    featured: true,
  },
  {
    title: 'SecureVault',
    description: 'End-to-end encrypted password manager with zero-knowledge architecture and cross-platform sync.',
    tags: ['React Native', 'Node.js', 'MongoDB', 'Crypto'],
    icon: '🔐',
    gradient: 'from-amber-600/20 to-orange-600/20',
    github: '#',
    live: '#',
    featured: false,
  },
  {
    title: 'ML Pipeline Orchestrator',
    description: 'Automated ML pipeline system for training, evaluating, and deploying models at scale with version control.',
    tags: ['Python', 'TensorFlow', 'Docker', 'FastAPI'],
    icon: '🤖',
    gradient: 'from-pink-600/20 to-rose-600/20',
    github: '#',
    live: '#',
    featured: false,
  },
  {
    title: 'EcoTrack',
    description: 'IoT-powered environmental monitoring system with real-time sensor data visualization and alerting.',
    tags: ['Vue.js', 'Python', 'InfluxDB', 'MQTT'],
    icon: '🌱',
    gradient: 'from-green-600/20 to-lime-600/20',
    github: '#',
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
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
            A selection of projects I've built that showcase my expertise in full-stack development
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
                <p className="text-sm text-text-muted mb-5 line-clamp-2 leading-relaxed">
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
            href="#"
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
