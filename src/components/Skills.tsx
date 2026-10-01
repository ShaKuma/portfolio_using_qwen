import { useInView } from '../hooks/useInView';

const skillCategories = [
  {
    title: 'Frontend',
    icon: 'fa-laptop-code',
    gradient: 'from-violet-500 to-purple-500',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 92 },
      { name: 'Vue.js', level: 80 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'HTML/CSS/SCSS', level: 98 },
    ],
  },
  {
    title: 'Backend',
    icon: 'fa-server',
    gradient: 'from-pink-500 to-rose-500',
    skills: [
      { name: 'Node.js / Express', level: 93 },
      { name: 'Python / Django', level: 88 },
      { name: 'Go', level: 78 },
      { name: 'GraphQL', level: 85 },
      { name: 'REST APIs', level: 95 },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: 'fa-cloud',
    gradient: 'from-amber-500 to-orange-500',
    skills: [
      { name: 'AWS (EC2, Lambda, S3)', level: 90 },
      { name: 'Docker / Kubernetes', level: 88 },
      { name: 'CI/CD Pipelines', level: 92 },
      { name: 'Terraform', level: 82 },
      { name: 'Monitoring (Grafana)', level: 85 },
    ],
  },
  {
    title: 'Database',
    icon: 'fa-database',
    gradient: 'from-emerald-500 to-teal-500',
    skills: [
      { name: 'PostgreSQL', level: 92 },
      { name: 'MongoDB', level: 88 },
      { name: 'Redis', level: 85 },
      { name: 'Elasticsearch', level: 78 },
      { name: 'DynamoDB', level: 80 },
    ],
  },
];

const technologies = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Go',
  'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS',
  'GraphQL', 'REST', 'Git', 'Linux', 'Terraform', 'Figma',
];

export default function Skills() {
  const { ref: headerRef, isInView: headerVisible } = useInView();
  const { ref: gridRef, isInView: gridVisible } = useInView();
  const { ref: tagsRef, isInView: tagsVisible } = useInView();

  return (
    <section id="skills" className="py-24 lg:py-36 relative">
      <div className="section-divider"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* Section Header */}
        <div ref={headerRef} className={`text-center mb-20 reveal ${headerVisible ? 'visible' : ''}`}>
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary-light bg-primary/10 rounded-full mb-5 border border-primary/20">
            Skills & Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
            Technologies I work with daily to build robust, scalable applications
          </p>
          <div className="mt-4 w-16 h-1 gradient-bg rounded-full mx-auto"></div>
        </div>

        {/* Skill Categories Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-20">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className={`glass-card card-glow rounded-2xl p-6 lg:p-8 reveal ${gridVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg`}>
                  <i className={`fas ${category.icon} text-white text-lg`}></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">{category.title}</h3>
                  <p className="text-xs text-text-muted">{category.skills.length} technologies</p>
                </div>
              </div>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-text-secondary">{skill.name}</span>
                      <span className="text-xs font-mono text-text-muted">{skill.level}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-bar-fill"
                        style={{ 
                          width: gridVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 0.15 + skillIndex * 0.1}s`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technology Tags */}
        <div ref={tagsRef} className={`text-center reveal ${tagsVisible ? 'visible' : ''}`}>
          <h3 className="text-lg font-semibold text-text-primary mb-8">Technologies I Work With</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, i) => (
              <span
                key={tech}
                className="px-4 py-2.5 text-sm font-medium text-text-secondary bg-dark-card border border-dark-border rounded-xl hover:border-primary/40 hover:text-primary-light hover:bg-primary/5 transition-all duration-300 cursor-default hover:-translate-y-0.5"
                style={{ transitionDelay: `${i * 0.03}s` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
