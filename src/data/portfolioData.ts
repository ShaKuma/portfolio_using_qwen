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
    "Built MCP servers for GitHub, JIRA, Jenkins, Splunk, Windows RDP, PDF Creator",
    "Created enterprise AI ChatBot with A2A protocol for multi-agent conversations",
    "Implemented vector embeddings for user memory and security guardrails for PII protection",
    "Developed fraud detection system and LSTM sales prediction model",
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
    .map(p => `- ${p.title}`)
    .join("\n");

  const experienceText = [
    `${currentRole.title} at ${currentRole.company} (${currentRole.period})`,
    ...previousExperience.map(exp => `${exp.title} at ${exp.company} (${exp.period})`),
  ].join("\n");

  return `You are a helpful AI assistant. Answer questions about Shashi Kumar using ONLY the facts below.

ABOUT SHASHI:
- Name: ${personalInfo.name}
- Experience: 11+ years full stack developer
- Current: ${currentRole.title} at ${currentRole.company}
- Location: ${personalInfo.location}
- Education: ${personalInfo.education}
- AI/ML: ${personalInfo.certification}

WORK HISTORY:
${experienceText}

SKILLS:
${skillsText}

PROJECTS:
${projectsText}

CONTACT:
- Email: ${personalInfo.email}
- Phone: ${personalInfo.phone}

IMPORTANT: Answer directly in 1-2 sentences. Do NOT repeat greetings. Do NOT make up information. If you don't know, say "I don't have that information."`;
}
