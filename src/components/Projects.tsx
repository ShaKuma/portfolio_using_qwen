const projects = [
  {
    title: 'CloudScale Platform',
    description: 'A cloud-native microservices platform handling 10M+ requests/day with auto-scaling, service mesh, and real-time monitoring.',
    tags: ['Go', 'Kubernetes', 'gRPC', 'Prometheus', 'Terraform'],
    image: '🏗️',
    github: '#',
    live: '#',
    featured: true,
  },
  {
    title: 'DataFlow Analytics',
    description: 'Real-time data analytics dashboard processing streaming data from multiple sources with sub-second latency.',
    tags: ['React', 'TypeScript', 'Kafka', 'ClickHouse', 'D3.js'],
    image: '📊',
    github: '#',
    live: '#',
    featured: true,
  },
  {
    title: 'DevConnect',
    description: 'Social platform for developers to share projects, collaborate on code, and build their professional network.',
    tags: ['Next.js', 'PostgreSQL', 'GraphQL', 'Redis', 'AWS'],
    image: '👥',
    github: '#',
    live: '#',
    featured: true,
  },
  {
    title: 'SecureVault',
    description: 'End-to-end encrypted password manager with zero-knowledge architecture and cross-platform sync.',
    tags: ['React Native', 'Node.js', 'MongoDB', 'Crypto', 'WebSocket'],
    image: '🔐',
    github: '#',
    live: '#',
    featured: false,
  },
  {
    title: 'ML Pipeline Orchestrator',
    description: 'Automated ML pipeline system for training, evaluating, and deploying models at scale with version control.',
    tags: ['Python', 'TensorFlow', 'Docker', 'FastAPI', 'MLflow'],
    image: '🤖',
    github: '#',
    live: '#',
    featured: false,
  },
  {
    title: 'EcoTrack',
    description: 'IoT-powered environmental monitoring system with real-time sensor data visualization and alerting.',
    tags: ['Vue.js', 'Python', 'InfluxDB', 'MQTT', 'Raspberry Pi'],
    image: '🌱',
    github: '#',
    live: '#',
    featured: false,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 lg:py-32 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary-light bg-primary/10 rounded-full mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
            A selection of projects I've built that showcase my expertise in full-stack development
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group glass-card rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Project Image/Icon */}
              <div className="h-48 bg-gradient-to-br from-dark-bg to-dark-surface flex items-center justify-center relative overflow-hidden">
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                  {project.image}
                </span>
                {project.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 text-xs font-medium text-primary-light bg-primary/20 rounded-full">
                    Featured
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-primary-light transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-text-secondary mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium text-text-muted bg-dark-bg rounded-md border border-dark-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  <a
                    href={project.github}
                    className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary-light transition-colors"
                  >
                    <i className="fab fa-github"></i>
                    Code
                  </a>
                  <a
                    href={project.live}
                    className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary-light transition-colors"
                  >
                    <i className="fas fa-external-link-alt"></i>
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-text-secondary border border-dark-border rounded-xl hover:border-primary/50 hover:text-primary-light hover:bg-white/5 transition-all"
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
