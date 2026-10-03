import { useInView } from '../hooks/useInView';
import { useState, useRef, useEffect } from 'react';
import { skills } from '../data/portfolioData';

interface SkillCategory {
  title: string;
  icon: string;
  gradient: string;
  glowColor: string;
  skills: Array<{ name: string; level: number }>;
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend & Web',
    icon: 'fa-laptop-code',
    gradient: 'from-violet-500 to-purple-500',
    glowColor: 'violet',
    skills: skills.frontend,
  },
  {
    title: 'Backend & Languages',
    icon: 'fa-server',
    gradient: 'from-pink-500 to-rose-500',
    glowColor: 'pink',
    skills: skills.backend,
  },
  {
    title: 'AI / Machine Learning',
    icon: 'fa-brain',
    gradient: 'from-amber-500 to-orange-500',
    glowColor: 'amber',
    skills: skills.aiml,
  },
  {
    title: 'DevOps & Tools',
    icon: 'fa-cloud',
    gradient: 'from-emerald-500 to-teal-500',
    glowColor: 'emerald',
    skills: skills.devops,
  },
];

const technologies = [
  'ReactJS', 'ASP.NET', 'C#', 'Python', 'JavaScript', 'jQuery',
  'SQL Server', 'TensorFlow', 'PyTorch', 'Jenkins', 'Kafka', 'Docker',
  'Web API', 'MVC', 'GIT', 'JIRA', 'Grafana', 'Prometheus',
  'YOLOv8', 'Hugging Face', 'Selenium', 'LDAP', 'IIS', 'Arduino',
];

function SkillCard({ category, index, isVisible }: { category: SkillCategory; index: number; isVisible: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const getRotation = () => {
    if (!cardRef.current || !isHovered) return { rotateX: 0, rotateY: 0 };
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (mousePos.y - centerY) / 20;
    const rotateY = (centerX - mousePos.x) / 20;
    return { rotateX, rotateY };
  };

  const { rotateX, rotateY } = getRotation();

  return (
    <div
      ref={cardRef}
      className={`reveal ${isVisible ? 'visible' : ''} relative group`}
      style={{ 
        transitionDelay: `${index * 0.15}s`,
        perspective: '1000px'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
    >
      {/* Animated border gradient */}
      <div 
        className={`absolute -inset-0.5 bg-gradient-to-r ${category.gradient} rounded-2xl opacity-0 group-hover:opacity-75 blur transition duration-500`}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      />
      
      {/* Main card */}
      <div
        className="relative glass-card rounded-2xl p-6 lg:p-8 overflow-hidden h-full"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: isHovered ? 'none' : 'transform 0.5s ease-out',
        }}
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${category.gradient} opacity-20`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Mouse follower glow */}
        {isHovered && (
          <div
            className={`absolute w-64 h-64 rounded-full bg-gradient-to-r ${category.gradient} opacity-10 blur-3xl pointer-events-none transition-all duration-300`}
            style={{
              left: mousePos.x - 128,
              top: mousePos.y - 128,
            }}
          />
        )}

        <div className="relative z-10">
          {/* Header with icon */}
          <div className="flex items-center gap-4 mb-8">
            <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <i className={`fas ${category.icon} text-white text-xl`}></i>
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${category.gradient} opacity-50 blur-xl group-hover:opacity-75 transition-opacity`} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-text-primary group-hover:gradient-text-static transition-all">
                {category.title}
              </h3>
              <p className="text-xs text-text-muted">{category.skills.length} technologies</p>
            </div>
          </div>

          {/* Skills grid with hexagonal indicators */}
          <div className="space-y-4">
            {category.skills.map((skill, skillIndex) => (
              <div 
                key={skill.name}
                className="group/skill relative"
                style={{
                  animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.15 + skillIndex * 0.1}s both` : 'none'
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text-secondary group-hover/skill:text-text-primary transition-colors">
                    {skill.name}
                  </span>
                  <div className="flex items-center gap-2">
                    {/* Skill level dots */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            i < Math.ceil(skill.level / 20)
                              ? `bg-gradient-to-r ${category.gradient} shadow-lg`
                              : 'bg-dark-border'
                          }`}
                          style={{
                            animationDelay: `${skillIndex * 0.1 + i * 0.05}s`
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-mono text-text-muted w-8 text-right">{skill.level}%</span>
                  </div>
                </div>
                
                {/* Animated skill bar */}
                <div className="relative h-1.5 bg-dark-bg/50 rounded-full overflow-hidden backdrop-blur-sm">
                  <div
                    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${category.gradient} rounded-full transition-all duration-1000 ease-out`}
                    style={{ 
                      width: isVisible ? `${skill.level}%` : '0%',
                      transitionDelay: `${index * 0.15 + skillIndex * 0.1}s`
                    }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                  
                  {/* Glow effect */}
                  <div
                    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${category.gradient} rounded-full blur-sm opacity-50`}
                    style={{ 
                      width: isVisible ? `${skill.level}%` : '0%',
                      transitionDelay: `${index * 0.15 + skillIndex * 0.1}s`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

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

        {/* Skill Categories Grid with 3D Cards */}
        <div ref={gridRef} className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.title}
              category={category}
              index={index}
              isVisible={gridVisible}
            />
          ))}
        </div>

        {/* Technology Tags with Hover Effects */}
        <div ref={tagsRef} className={`text-center reveal ${tagsVisible ? 'visible' : ''}`}>
          <h3 className="text-lg font-semibold text-text-primary mb-8">Technologies I Work With</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, i) => (
              <div
                key={tech}
                className="relative group/tag"
                style={{ transitionDelay: `${i * 0.03}s` }}
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl opacity-0 group-hover/tag:opacity-50 blur transition duration-300" />
                
                {/* Tag */}
                <div className="relative px-4 py-2.5 text-sm font-medium text-text-secondary bg-dark-card border border-dark-border rounded-xl group-hover/tag:border-primary/40 group-hover/tag:text-primary-light group-hover/tag:bg-primary/5 transition-all duration-300 cursor-default group-hover/tag:-translate-y-1">
                  {tech}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
