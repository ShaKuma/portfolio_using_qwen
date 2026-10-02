import { useInView } from '../hooks/useInView';
import DataFlowAnimation from './DataFlowAnimation';

const skillCategories = [
  {
    title: 'Frontend & Web',
    icon: 'fa-laptop-code',
    gradient: 'from-violet-500 to-purple-500',
    skills: [
      { name: 'ReactJS', level: 90 },
      { name: 'JavaScript / jQuery', level: 95 },
      { name: 'ASP.NET MVC', level: 92 },
      { name: 'HTML / CSS / AJAX', level: 95 },
      { name: 'JSON / Web APIs', level: 90 },
    ],
  },
  {
    title: 'Backend & Languages',
    icon: 'fa-server',
    gradient: 'from-pink-500 to-rose-500',
    skills: [
      { name: 'C# / .NET', level: 95 },
      { name: 'Python', level: 85 },
      { name: 'C / C++', level: 80 },
      { name: 'Java', level: 75 },
      { name: 'Web Services / REST', level: 92 },
    ],
  },
  {
    title: 'AI / Machine Learning',
    icon: 'fa-brain',
    gradient: 'from-amber-500 to-orange-500',
    skills: [
      { name: 'TensorFlow / PyTorch', level: 82 },
      { name: 'YOLOv8 / Computer Vision', level: 78 },
      { name: 'Hugging Face Transformers', level: 80 },
      { name: 'LSTM / RNN / NLP', level: 82 },
      { name: 'LLMs / Transfer Learning', level: 75 },
    ],
  },
  {
    title: 'DevOps & Tools',
    icon: 'fa-cloud',
    gradient: 'from-emerald-500 to-teal-500',
    skills: [
      { name: 'Jenkins / CI-CD', level: 90 },
      { name: 'Kafka / Messaging Queues', level: 85 },
      { name: 'SQL Server', level: 92 },
      { name: 'GIT / TFS', level: 90 },
      { name: 'Grafana / Prometheus / Splunk', level: 82 },
    ],
  },
];

const technologies = [
  'ReactJS', 'ASP.NET', 'C#', 'Python', 'JavaScript', 'jQuery',
  'SQL Server', 'TensorFlow', 'PyTorch', 'Jenkins', 'Kafka', 'Docker',
  'Web API', 'MVC', 'GIT', 'JIRA', 'Grafana', 'Prometheus',
  'YOLOv8', 'Hugging Face', 'Selenium', 'LDAP', 'IIS', 'Arduino',
];

export default function Skills() {
  const { ref: headerRef, isInView: headerVisible } = useInView();
  const { ref: gridRef, isInView: gridVisible } = useInView();
  const { ref: tagsRef, isInView: tagsVisible } = useInView();

  return (
    <section id="skills" className="py-16 lg:py-24 relative">
      <div className="section-divider"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Section Header */}
        <div ref={headerRef} className={`text-center mb-12 reveal ${headerVisible ? 'visible' : ''}`}>
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary-light bg-primary/10 rounded-full mb-5 border border-primary/20">
            Skills & Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
            Technologies I work with daily to build robust, scalable applications and AI solutions
          </p>
          <div className="mt-4 w-16 h-1 gradient-bg rounded-full mx-auto"></div>
        </div>

        {/* Skill Categories Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className={`glass-card card-glow rounded-2xl p-6 lg:p-8 reveal ${gridVisible ? 'visible' : ''} relative overflow-hidden`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              {/* Data flow animation for AI/ML category */}
              {category.title === 'AI / Machine Learning' && (
                <div className="absolute inset-0 opacity-20">
                  <DataFlowAnimation />
                </div>
              )}
              
              <div className="relative z-10">
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
