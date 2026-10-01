const experiences = [
  {
    role: 'Senior Software Engineer',
    company: 'TechCorp Inc.',
    period: '2022 - Present',
    description: 'Leading the backend architecture team, designing and implementing microservices handling 10M+ daily requests. Mentoring junior developers and driving best practices.',
    achievements: [
      'Reduced API latency by 60% through caching strategies',
      'Led migration from monolith to microservices',
      'Implemented CI/CD reducing deploy time by 80%',
    ],
    tech: ['Go', 'Kubernetes', 'AWS', 'PostgreSQL'],
  },
  {
    role: 'Full Stack Developer',
    company: 'StartupXYZ',
    period: '2020 - 2022',
    description: 'Built the core product from scratch, taking it from MVP to serving 500K+ users. Worked across the entire stack from React frontend to cloud infrastructure.',
    achievements: [
      'Built real-time collaboration features',
      'Scaled infrastructure to handle 100x growth',
      'Implemented comprehensive testing (95% coverage)',
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'Docker'],
  },
  {
    role: 'Software Developer',
    company: 'Digital Solutions Ltd.',
    period: '2018 - 2020',
    description: 'Developed enterprise web applications for Fortune 500 clients. Focused on performance optimization and building reusable component libraries.',
    achievements: [
      'Built component library used across 12 projects',
      'Optimized database queries reducing load time by 40%',
      'Introduced automated testing practices',
    ],
    tech: ['TypeScript', 'Vue.js', 'Python', 'PostgreSQL'],
  },
  {
    role: 'Junior Developer',
    company: 'WebDev Agency',
    period: '2016 - 2018',
    description: 'Started my professional career building responsive web applications and learning industry best practices in an agile environment.',
    achievements: [
      'Delivered 20+ client projects on time',
      'Learned agile methodologies and team collaboration',
      'Contributed to open-source projects',
    ],
    tech: ['JavaScript', 'React', 'Node.js', 'MySQL'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary-light bg-primary/10 rounded-full mb-4">
            Career Journey
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
            My professional journey building software that makes a difference
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary/20"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                className={`relative flex flex-col lg:flex-row gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 lg:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full gradient-bg border-4 border-dark-bg z-10 animate-pulse-glow" style={{ animationDelay: `${index * 0.5}s` }}></div>

                {/* Content */}
                <div className={`ml-16 lg:ml-0 lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                  <div className="glass-card rounded-2xl p-6 hover:border-primary/30 transition-all duration-300">
                    {/* Period */}
                    <span className="inline-block px-3 py-1 text-xs font-medium text-primary-light bg-primary/10 rounded-full mb-3">
                      {exp.period}
                    </span>

                    <h3 className="text-xl font-bold text-text-primary">{exp.role}</h3>
                    <p className="text-primary-light font-medium mb-3">{exp.company}</p>
                    <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <ul className="space-y-2 mb-4">
                      {exp.achievements.map((achievement) => (
                        <li key={achievement} className="flex items-start gap-2 text-sm text-text-secondary">
                          <i className="fas fa-check-circle text-green-400 mt-0.5 flex-shrink-0"></i>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-xs font-medium text-text-muted bg-dark-bg rounded-md border border-dark-border"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
