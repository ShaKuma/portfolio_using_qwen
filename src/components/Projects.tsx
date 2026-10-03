import { useInView } from '../hooks/useInView';
import { useState, useRef } from 'react';
import { projects as portfolioProjects } from '../data/portfolioData';

// Map portfolio data to UI-specific properties
const projects = portfolioProjects.map((project, index) => ({
  ...project,
  icon: ['🤖', '🔌', '🛡️', '💰', '📱', '🧠'][index] || '💼',
  gradient: [
    'from-violet-600/20 to-purple-600/20',
    'from-blue-600/20 to-cyan-600/20',
    'from-emerald-600/20 to-teal-600/20',
    'from-amber-600/20 to-orange-600/20',
    'from-pink-600/20 to-rose-600/20',
    'from-green-600/20 to-lime-600/20',
  ][index] || 'from-gray-600/20 to-slate-600/20',
  glowColor: [
    'violet',
    'blue',
    'emerald',
    'amber',
    'pink',
    'green',
  ][index] || 'gray',
  featured: index < 3,
}));

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  isVisible: boolean;
}

function ProjectCard({ project, index, isVisible }: ProjectCardProps) {
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
    const rotateX = (mousePos.y - centerY) / 25;
    const rotateY = (centerX - mousePos.x) / 25;
    return { rotateX, rotateY };
  };

  const { rotateX, rotateY } = getRotation();

  return (
    <div
      ref={cardRef}
      className={`reveal ${isVisible ? 'visible' : ''} relative group`}
      style={{ 
        transitionDelay: `${index * 0.1}s`,
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
        className={`absolute -inset-0.5 bg-gradient-to-r ${project.gradient.replace('/20', '')} rounded-2xl opacity-0 group-hover:opacity-75 blur transition duration-500`}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      />
      
      {/* Main card */}
      <div
        className="relative glass-card card-glow rounded-2xl overflow-hidden h-full"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: isHovered ? 'none' : 'transform 0.5s ease-out',
        }}
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${project.gradient.replace('/20', '')} opacity-20`}
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
            className={`absolute w-64 h-64 rounded-full bg-gradient-to-r ${project.gradient.replace('/20', '')} opacity-10 blur-3xl pointer-events-none transition-all duration-300`}
            style={{
              left: mousePos.x - 128,
              top: mousePos.y - 128,
            }}
          />
        )}

        {/* Project Image/Icon Area */}
        <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
              backgroundSize: '20px 20px',
              animation: 'float 20s linear infinite',
            }} />
          </div>

          {/* Icon with enhanced animation */}
          <div className="relative z-10">
            <span className="text-7xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 ease-out drop-shadow-2xl">
              {project.icon}
            </span>
            {/* Icon glow */}
            <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient.replace('/20', '')} rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-primary to-accent rounded-full border border-white/20 backdrop-blur-sm shadow-lg">
              <i className="fas fa-star mr-1"></i>
              Featured
            </div>
          )}

          {/* Hover overlay with enhanced effects */}
          <div className="absolute inset-0 bg-dark-bg/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500">
            {/* Animated border */}
            <div className="absolute inset-0 border-2 border-white/10 rounded-lg m-4 group-hover:border-white/30 transition-colors duration-500" />
          </div>
        </div>

        {/* Content Area */}
        <div className="relative z-10 p-6">
          {/* Title with gradient hover */}
          <h3 className="text-lg font-bold text-text-primary mb-3 group-hover:gradient-text-static transition-all duration-300">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-text-muted mb-5 line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {/* Tags with staggered animation */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium text-text-muted bg-dark-bg/80 rounded-md border border-dark-border/50 group-hover:border-primary/30 group-hover:text-primary-light transition-all duration-300"
                style={{
                  animation: isVisible ? `fadeInUp 0.4s ease-out ${index * 0.1 + tagIndex * 0.05}s both` : 'none'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient.replace('/20', '')} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

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
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isVisible={gridVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
