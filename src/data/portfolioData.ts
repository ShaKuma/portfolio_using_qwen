// Centralized portfolio data that can be used by both components and chatbot

export const personalInfo = {
  name: "Shashi Kumar",
  email: "Shashikmr01991@gmail.com",
  phone: "+91 9940342772",
  location: "Noida, India",
  linkedin: "linkedin.com/in/shashi-kumar-6b955b80",
  github: "github.com/ShaKuma",
  education: "B.Tech CSE from Lovely Professional University (7.87/10)",
  certification: "AI/ML certified from IIT Delhi (6 months, Feb-Aug 2024)",
};

export const currentRole = {
  title: "Associate Lead Software Engineer",
  company: "TIS: FIS (Fidelity Information Services)",
  period: "June 2020 - Present",
  achievements: [
    "Architected & developed Model Context Protocol (MCP) servers for GitHub, JIRA, Jenkins, Web Services, Splunk, Windows RDP, and PDF Creator — integrated with VS Code to enable AI-powered development workflows across the organization.",
    "Designed & built an enterprise-grade Web UI for an Organization-Wide AI ChatBot System, integrating MCP servers to orchestrate seamless external service calls across JIRA, GitHub, Wiki, Jenkins, and more.",
    "Leveraged the A2A (Agent-to-Agent) open-source protocol for multi-turn agent conversations, cross-agent collaboration, and parallel agent invocation — enabling complex task decomposition across specialized AI agents.",
    "Implemented Vector Embeddings to create persistent per-user agent memory, delivering context-aware, personalized interactions with long-term recall capabilities.",
    "Engineered dynamic model routing — allowing users to leverage multiple LLMs simultaneously based on prompt complexity, query type, and performance requirements.",
    "Built robust security guardrails to prevent PII and sensitive data leakage to external LLMs, ensuring only anonymized data leaves the organization boundary.",
    "Implemented OWASP Top 10 security remediations specifically tailored for AI agents, hardening the system against prompt injection, data poisoning, and adversarial attacks.",
    "Developed Early Warning System for fraud account detection in payment processing, reducing fraudulent transactions significantly.",
    "Implemented ANN (LSTM) model for future sales prediction, enabling data-driven business forecasting.",
    "Responsible for end to end product delivery using automated jenkins jobs",
    "Efficient in configuring and deploying new web apps on IIS",
    "Handling resources and mentoring them on the technology and business model",
    "Using Agile methodologies, involved in web app development using c#, React, Jquery, Javascript, CSS",
    "Knowledge of messaging queues such as Kafka and IBM websphere",
    "Responsible for automation of several jobs using Jenkins.",
    "Responsible for creating automated Smoke testing job using selenium driver for website",
    "Engaged in migration of products to upper versions and cloud",
    "Responsible for handling client calls and requirement discussions",
    "Developed framework for integration of Global payments authorization API.",
    "Actively participated in hiring process of candidates for several Job profiles",
  ],
};

export const previousExperience = [
  {
    title: "Associate",
    company: "Cognizant Technology Solutions",
    period: "June 2017 - June 2020",
    achievements: [
      "Saved $32K quarterly via LDAP automation",
      "Created Report Generator using Windows Service",
      "Implemented Automated Mail Notification system",
    ],
  },
  {
    title: "Programmer Analyst",
    company: "Cognizant Technology Solutions",
    period: "June 2014 - June 2017",
    achievements: [
      "Built automation systems",
      "Created Automated Reminder Mail service",
      "Implemented Excel Macros for data validation",
    ],
  },
];

export const skills = {
  frontend: [
    { name: "ReactJS", level: 90 },
    { name: "JavaScript/jQuery", level: 95 },
    { name: "ASP.NET MVC", level: 92 },
    { name: "HTML/CSS/AJAX", level: 95 },
  ],
  backend: [
    { name: "C#/.NET", level: 95 },
    { name: "Python", level: 85 },
    { name: "C/C++", level: 80 },
    { name: "Java", level: 75 },
    { name: "Web Services", level: 92 },
  ],
  aiml: [
    { name: "TensorFlow/PyTorch", level: 82 },
    { name: "YOLOv8", level: 78 },
    { name: "Hugging Face", level: 80 },
    { name: "LSTM/RNN/NLP", level: 82 },
    { name: "LLMs", level: 75 },
  ],
  devops: [
    { name: "Jenkins", level: 90 },
    { name: "Kafka", level: 85 },
    { name: "SQL Server", level: 92 },
    { name: "Git/TFS", level: 90 },
    { name: "Grafana/Prometheus", level: 82 },
  ],
};

export const projects = [
  {
    title: "Enterprise AI ChatBot Platform",
    description: "Designed & built an organization-wide AI ChatBot Web UI integrated with MCP servers for orchestrating calls to JIRA, GitHub, Wiki, Jenkins, and more. Features A2A protocol for multi-turn agent conversations, cross-agent collaboration, and parallel agent invocation.",
    tags: ["React", "LLMs", "A2A Protocol", "MCP", "Vector DB"],
  },
  {
    title: "MCP Servers Ecosystem",
    description: "Architected Model Context Protocol (MCP) servers for GitHub, JIRA, Jenkins, Web Services, Splunk, Windows RDP, and PDF Creator integrated with VS Code to enable AI-powered development workflows.",
    tags: ["MCP", "VS Code", "GitHub API", "Jenkins", "Splunk"],
  },
  {
    title: "AI Agent Security & Guardrails",
    description: "Engineered robust security guardrails to prevent PII/sensitive data leakage to external LLMs. Implemented OWASP Top 10 remediations for AI agents with anonymous data transmission and vector-based per-user agent memory.",
    tags: ["OWASP", "Security", "Vector Embeddings", "LLMs", "PII Protection"],
  },
  {
    title: "Auto-Refresh Member Service",
    description: "Background window service for auto-refreshing members list in database based on Active Directory changes using LDAP Protocol. Saved $32K quarterly.",
    tags: ["C#", "LDAP", "Threading", "Data Structures"],
  },
  {
    title: "Insta Quote - Insurance App",
    description: "Android prototype for insurance domain — scanning barcodes to fetch product details and searching best insurance policies. Won Hackathon challenge across Cognizant worldwide and moved to real-time implementation.",
    tags: ["Android SDK", "Java", "Barcode Scanner", "Insurance"],
  },
  {
    title: "LSTM Sales Prediction & NLP",
    description: "Implemented ANN (LSTM) for future sales prediction. Built text sentiment analysis on Amazon reviews using LSTM. Used Hugging Face transformers for text generation and text-to-speech pipelines.",
    tags: ["Python", "TensorFlow", "LSTM", "Hugging Face", "NLP"],
  },
];

export const achievements = [
  "Saved $32K+ quarterly through automation",
  "Won Cognizant worldwide Hackathon with Insta Quote Android app",
  "Client Service Appreciation for C++ reverse engineering",
];

// Function to generate dynamic context for chatbot
export function generateChatbotContext(): string {
  const skillsText = Object.entries(skills)
    .map(([category, items]) => {
      const skillList = items.map(s => `${s.name}`).join(", ");
      return `${category}: ${skillList}`;
    })
    .join("\n");

  const projectsText = projects
    .map(p => `- ${p.title}: ${p.description}`)
    .join("\n");

  const currentRoleText = `${currentRole.title} at ${currentRole.company} (${currentRole.period})
Key Projects and Achievements:
${currentRole.achievements.map(a => `- ${a}`).join("\n")}`;

  const previousExperienceText = previousExperience
    .map(exp => `${exp.title} at ${exp.company} (${exp.period})
${exp.achievements.map(a => `- ${a}`).join("\n")}`)
    .join("\n\n");

  return `You are an AI assistant for Shashi Kumar's portfolio. Answer questions using ONLY the facts below.

PERSONAL INFORMATION:
Name: ${personalInfo.name}
Email: ${personalInfo.email}
Phone: ${personalInfo.phone}
Location: ${personalInfo.location}
LinkedIn: ${personalInfo.linkedin}
GitHub: ${personalInfo.github}
Education: ${personalInfo.education}
AI/ML Certification: ${personalInfo.certification}

CURRENT ROLE:
${currentRoleText}

PREVIOUS EXPERIENCE:
${previousExperienceText}

SKILLS:
${skillsText}

PROJECTS:
${projectsText}

ACHIEVEMENTS:
${achievements.map(a => `- ${a}`).join("\n")}

EXAMPLES:
Q: What is your name?
A: My name is ${personalInfo.name}.

Q: How much experience do you have?
A: Shashi has 11+ years of experience as a full stack developer.

Q: Where did you study AI/ML?
A: Shashi completed AI/ML certification from IIT Delhi (6 months, Feb-Aug 2024).

Q: What is your current role?
A: Shashi is an ${currentRole.title} at ${currentRole.company} since ${currentRole.period}.

Q: What projects is he working on at TIS: FIS?
A: At TIS: FIS, Shashi is working on several major projects including: 1) MCP Servers ecosystem for GitHub, JIRA, Jenkins, Splunk, Windows RDP, and PDF Creator integrated with VS Code, 2) Enterprise AI ChatBot Platform with A2A protocol for multi-agent conversations, 3) Vector Embeddings for per-user agent memory, 4) Security guardrails for PII protection, and 5) OWASP Top 10 security implementations for AI agents.

RULES:
- When asked about projects, ALWAYS list specific project names and details
- Provide detailed answers with specific examples
- Be comprehensive but concise (3-5 sentences for detailed questions)
- Use ONLY the facts above
- Never repeat the question
- Never say "hey" or greet
- If you don't know, say "I don't have that information"

Q:`;
}
