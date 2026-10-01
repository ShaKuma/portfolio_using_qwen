const skillCategories = [
  {
    title: 'Frontend',
    icon: 'fa-laptop-code',
    color: 'from-blue-500 to-cyan-500',
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
    color: 'from-purple-500 to-pink-500',
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
    color: 'from-orange-500 to-red-500',
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
    color: 'from-green-500 to-emerald-500',
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
  return (
    <section id="skills" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary-light bg-primary/10 rounded-full mb-4">
            Skills & Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
            Technologies I work with daily to build robust, scalable applications
          </p>
        </div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {skillCategories.map((category) => (
            <div key={category.title} className="glass-card rounded-2xl p-6 lg:p-8 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                  <i className={`fas ${category.icon} text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-text-primary">{category.title}</h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm text-text-secondary">{skill.name}</span>
                      <span className="text-xs text-text-muted">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-dark-bg rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${category.color} transition-all duration-1000`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technology Tags */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-text-primary mb-6">Technologies I Work With</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 text-sm font-medium text-text-secondary bg-dark-surface border border-dark-border rounded-full hover:border-primary/50 hover:text-primary-light transition-all duration-200 cursor-default"
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
