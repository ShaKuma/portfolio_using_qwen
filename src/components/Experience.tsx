import { useInView } from '../hooks/useInView';

const experiences = [
  {
    role: 'Associate Lead Software Engineer',
    company: 'TIS: FIS (Fidelity Information Services)',
    period: 'June 2020 - Present',
    description: 'Finance Project – Project is aimed at accepting and processing payments in TSYS credit cards. Application accepts payment from an array of channels such as IVR, Call Center, Website, Mobile application. It is also involved in end of the day payment settlement through Sql Jobs while coordinating with acquirer and issuer.',
    achievements: [
      'Architected & developed Model Context Protocol (MCP) servers for GitHub, JIRA, Jenkins, Web Services, Splunk, Windows RDP, and PDF Creator — integrated with VS Code to enable AI-powered development workflows across the organization.',
      'Designed & built an enterprise-grade Web UI for an Organization-Wide AI ChatBot System, integrating MCP servers to orchestrate seamless external service calls across JIRA, GitHub, Wiki, Jenkins, and more.',
      'Leveraged the A2A (Agent-to-Agent) open-source protocol for multi-turn agent conversations, cross-agent collaboration, and parallel agent invocation — enabling complex task decomposition across specialized AI agents.',
      'Implemented Vector Embeddings to create persistent per-user agent memory, delivering context-aware, personalized interactions with long-term recall capabilities.',
      'Engineered dynamic model routing — allowing users to leverage multiple LLMs simultaneously based on prompt complexity, query type, and performance requirements.',
      'Built robust security guardrails to prevent PII and sensitive data leakage to external LLMs, ensuring only anonymized data leaves the organization boundary.',
      'Implemented OWASP Top 10 security remediations specifically tailored for AI agents, hardening the system against prompt injection, data poisoning, and adversarial attacks.',
      'Developed Early Warning System for fraud account detection in payment processing, reducing fraudulent transactions significantly.',
      'Implemented ANN (LSTM) model for future sales prediction, enabling data-driven business forecasting.',
      'Responsible for end to end product delivery using automated jenkins jobs',
      'Efficient in configuring and deploying new web apps on IIS',
      'Handling resources and mentoring them on the technology and business model',
      'Using Agile methodologies, involved in web app development using c#, React, Jquery, Javascript, CSS',
      'Knowledge of messaging queues such as Kafka and IBM websphere',
      'Responsible for automation of several jobs using Jenkins.',
      'Responsible for creating automated Smoke testing job using selenium driver for website',
      'Engaged in migration of products to upper versions and cloud',
      'Responsible for handling client calls and requirement discussions',
      'Developed framework for integration of Global payments authorization API.',
      'Actively participated in hiring process of candidates for several Job profiles',
    ],
    tech: ['Python', 'React', 'LLMs', 'MCP', 'A2A Protocol', 'Vector Embeddings', 'Jenkins', 'Kafka', 'C#', 'SQL Server', 'LSTM', 'OWASP Security', 'VS Code Integration'],
  },
  {
    role: 'Associate',
    company: 'Cognizant Technology Solutions',
    period: 'June 2017 - June 2020',
    description: 'Finance Project – Project aimed at estimating the number of human resource and hardware/software required yearly for running the project. Based on the above inputs system also calculated the revenue cost generated on project monthly, Quarterly and yearly.',
    achievements: [
      'Responsible for web application development using ASP.NET, MVC, Web Services.',
      'Writing batch jobs and application development related database queries using SQL Server.',
      'Performing code reviews and providing checklists for correcting the code.',
      'Using TFS source control for managing the source code and responsible for code merging and maintenance.',
      'Interacting with clients for collecting and understanding the change requests. Post this working closely with BA to implement the modules.',
      'Created Report generator, using Windows service for generating large reports based on the user requests.',
      'Implemented Automated Mail Notification system which was used for sending mails after generating bulk reports based on customer requests.',
      'Worked on a module, which handled compression of multiple files which were sent across the network.',
      'Maintenance and creation of documents at different development phases such as BRD, Design Docs, Test cases, Bug Reports.',
      'Worked on Code optimization and refactoring based on CAST/SAST/DAST reports for making the application stable and secure.',
      'Created file upload and download functionality using enterprise content management system. Process was written using AJAX, JSON, ASP.NET where files were sent and received from the ECM System.',
      'Implemented Report generation module which generated the report using Excel file and was sent across the network for download.',
    ],
    tech: ['ASP.NET', 'MVC', 'Web Services', 'SQL Server', 'TFS', 'AJAX', 'JSON', 'LDAP', 'Windows Service', 'ECM'],
  },
  {
    role: 'Programmer Analyst',
    company: 'Cognizant Technology Solutions',
    period: 'June 2014 - June 2017',
    description: 'Finance Project – Project aimed at calculating profit gained after performing automation using different technologies. It was an Innovation Management system, which handled the flow from creating an innovation title to approval and final implementation. After the implementation system was calculating the dollars saved.',
    achievements: [
      'Adhering to Agile Methodologies during web application development.',
      'Responsible for writing batch jobs using shell script and PL/SQL.',
      'Coordinating with clients to collect enhancement issues, analysing root cause and assisting in providing efficient resolution in a timely manner.',
      'Responsible for handling change requests as a part of development in different sprints.',
      'Responsible for creation and maintenance of documents such as BRD, design docs, unit test cases.',
      'Used ASP.NET MVC, jQuery, JavaScript, SQL Server as implementing technology for the module.',
      'Created Automated Reminder Mail service using in-built .NET components.',
      'Learned and implemented Macros in excel sheet for generating and validating the data from backend.',
    ],
    tech: ['ASP.NET MVC', 'jQuery', 'JavaScript', 'SQL Server', 'PL/SQL', 'Shell Script', '.NET'],
  },
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
