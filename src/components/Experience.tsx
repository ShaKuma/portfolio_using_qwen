import { useInView } from '../hooks/useInView';
import { currentRole, previousExperience } from '../data/portfolioData';

const experiences = [
  {
    role: currentRole.title,
    company: currentRole.company,
    period: currentRole.period,
    description: 'Leading AI/ML initiatives and full-stack development for enterprise-grade payment processing systems. Architecting next-generation AI agent platforms, MCP server ecosystems, and organization-wide intelligent automation solutions that serve thousands of internal users.',
    achievements: currentRole.achievements,
    tech: ['Python', 'React', 'LLMs', 'MCP', 'A2A Protocol', 'Vector Embeddings', 'Jenkins', 'Kafka', 'C#', 'SQL Server'],
  },
  ...previousExperience.map((exp, index) => ({
    role: exp.title,
    company: exp.company,
    period: exp.period,
    description: index === 0 
      ? 'Finance project aimed at estimating human resource and hardware/software required yearly for running the project. System calculated revenue cost generated monthly, quarterly, and yearly.'
      : 'Innovation Management system handling flow from creating innovation title to approval and implementation. System calculated dollars saved after performing automation using different technologies.',
    achievements: exp.achievements,
    tech: index === 0 
      ? ['ASP.NET', 'MVC', 'C#', 'SQL Server', 'TFS', 'AJAX', 'LDAP']
      : ['ASP.NET MVC', 'jQuery', 'JavaScript', 'SQL Server', 'PL/SQL'],
  })),
];

export default function Experience() {
  const { ref: headerRef, isInView: headerVisible } = useInView();
  const { ref: timelineRef, isInView: timelineVisible } = useInView();

  return (
    <section id="experience" className="py-16 lg:py-24 relative">
      <div className="section-divider"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Section Header */}
        <div ref={headerRef} className={`text-center mb-12 reveal ${headerVisible ? 'visible' : ''}`}>
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary-light bg-primary/10 rounded-full mb-5 border border-primary/20">
            Career Journey
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
            11+ years of professional experience building scalable solutions & AI platforms
          </p>
          <div className="mt-4 w-16 h-1 gradient-bg rounded-full mx-auto"></div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-px">
            <div className={`h-full bg-gradient-to-b from-primary via-accent to-primary/20 transition-all duration-1000 ${timelineVisible ? 'opacity-100' : 'opacity-0'}`}></div>
          </div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.company + exp.period}
                className={`relative reveal ${timelineVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-4 h-4 rounded-full gradient-bg border-4 border-dark-bg"></div>
                  <div className="absolute inset-0 w-4 h-4 rounded-full gradient-bg animate-ping opacity-20"></div>
                </div>

                {/* Content card */}
                <div className={`ml-14 lg:ml-0 ${index % 2 === 0 ? 'lg:mr-auto lg:w-[calc(50%-2rem)]' : 'lg:ml-auto lg:w-[calc(50%-2rem)]'}`}>
                  <div className="glass-card card-glow rounded-2xl p-6">
                    {/* Period badge */}
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-light bg-primary/10 rounded-full mb-3 border border-primary/20">
                      {exp.period}
                    </span>

                    <h3 className="text-xl font-bold text-text-primary">{exp.role}</h3>
                    <p className="text-primary-light font-medium text-sm mb-3">{exp.company}</p>
                    <p className="text-sm text-text-muted mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <ul className="space-y-2.5 mb-5">
                      {exp.achievements.map((achievement) => (
                        <li key={achievement} className="flex items-start gap-2.5 text-sm text-text-secondary leading-relaxed">
                          <i className="fas fa-check-circle text-green-400 mt-1 flex-shrink-0 text-xs"></i>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-xs font-medium text-text-muted bg-dark-bg rounded-md border border-dark-border/50"
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
