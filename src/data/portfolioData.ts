// Centralized portfolio data that can be used by both components and chatbot

export const personalInfo = {
  name: "Shashi Kumar",
  email: "Shashikmr01991@gmail.com",
  phone: "+91 9940342772",
  location: "Noida, India",
  linkedin: "linkedin.com/in/shashi-kumar-6b955b80",
  github: "github.com/ShaKuma",
  education: "B.Tech CSE from Lovely Professional University",
  certification: "AI/ML certified from IIT Delhi (6 months, Feb-Aug 2024)",
};

export const currentRole = {
  title: "Associate Lead Software Engineer",
  company: "TIS: FIS (Fidelity Information Services)",
  period: "June 2020 - Present",
  projectDescription: "Finance Project – Project is aimed at accepting and processing payments in TSYS credit cards. Application accepts payment from an array of channels such as IVR, Call Center, Website, Mobile application. It is also involved in end of the day payment settlement through Sql Jobs while coordinating with acquirer and issuer.",
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
    description: "Finance Project – Project aimed at estimating the number of human resource and hardware/software required yearly for running the project. Based on the above inputs system also calculated the revenue cost generated on project monthly, Quarterly and yearly.",
    achievements: [
      "Responsible for web application development using ASP.NET, MVC, Web Services.",
      "Writing batch jobs and application development related database queries using SQL Server.",
      "Performing code reviews and providing checklists for correcting the code.",
      "Using TFS source control for managing the source code and responsible for code merging and maintenance.",
      "Interacting with clients for collecting and understanding the change requests. Post this working closely with BA to implement the modules.",
      "Created Report generator, using Windows service for generating large reports based on the user requests.",
      "Implemented Automated Mail Notification system which was used for sending mails after generating bulk reports based on customer requests.",
      "Worked on a module, which handled compression of multiple files which were sent across the network.",
      "Maintenance and creation of documents at different development phases such as BRD, Design Docs, Test cases, Bug Reports.",
      "Worked on Code optimization and refactoring based on CAST/SAST/DAST reports for making the application stable and secure.",
      "Created file upload and download functionality using enterprise content management system. Process was written using AJAX, JSON, ASP.NET where files were sent and received from the ECM System.",
      "Implemented Report generation module which generated the report using Excel file and was sent across the network for download.",
    ],
  },
  {
    title: "Programmer Analyst",
    company: "Cognizant Technology Solutions",
    period: "June 2014 - June 2017",
    description: "Finance Project – Project aimed at calculating profit gained after performing automation using different technologies. It was an Innovation Management system, which handled the flow from creating an innovation title to approval and final implementation. After the implementation system was calculating the dollars saved.",
    achievements: [
      "Adhering to Agile Methodologies during web application development.",
      "Responsible for writing batch jobs using shell script and PL/SQL.",
      "Coordinating with clients to collect enhancement issues, analysing root cause and assisting in providing efficient resolution in a timely manner.",
      "Responsible for handling change requests as a part of development in different sprints.",
      "Responsible for creation and maintenance of documents such as BRD, design docs, unit test cases.",
      "Used ASP.NET MVC, jQuery, JavaScript, SQL Server as implementing technology for the module.",
      "Created Automated Reminder Mail service using in-built .NET components.",
      "Learned and implemented Macros in excel sheet for generating and validating the data from backend.",
    ],
  },
];

export const skills = {
  frontend: [
    { name: "ReactJS", level: 90 },
    { name: "JavaScript/jQuery", level: 95 },
    { name: "ASP.NET MVC", level: 92 },
    { name: "HTML/CSS/AJAX", level: 95 },
    { name: "JSON", level: 90 },
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
    { name: "sklearn", level: 80 },
  ],
  devops: [
    { name: "Jenkins", level: 90 },
    { name: "Kafka", level: 85 },
    { name: "SQL Server", level: 92 },
    { name: "Git/TFS", level: 90 },
    { name: "Grafana/Prometheus/Splunk", level: 82 },
  ],
  other: [
    { name: "Windows OS", level: 95 },
    { name: "Android Mobile Development", level: 80 },
    { name: "Arduino Programming", level: 75 },
    { name: "IBM Websphere", level: 78 },
    { name: "Selenium", level: 82 },
  ],
};

export const aiMlKnowledge = {
  mlConcepts: "Regression, Classification, Clustering, Random Forest, Bagging, Boosting, Decision Tree",
  deepLearning: "ANN (for regression), CNN (Computer Vision), RNN & LSTM (sequence modelling), GNNs, Transformers",
  nlp: "Natural Language Processing, Text Sentiment Analysis, Text Generation",
  llms: "Basic understanding of Large Language Models, Hugging Face Transformers for text generation",
  frameworks: "TensorFlow, PyTorch, sklearn, Hugging Face Transformers",
  techniques: "Learning algorithms, optimizers, regularization techniques, transfer learning, training models on specific datasets",
  computerVision: "YOLOv8 for object detection, CNN for image processing",
  speech: "Speech recognition, text-to-speech pipeline using Hugging Face Transformers",
  projects: "LSTM model for text sentiment analysis on Amazon product reviews, Artificial Neural Networks implementation, Text generation using pre-trained models"
};

export const experienceSummary = [
  "11+ years of experience working as a full stack web application developer handling development to deployment",
  "Proven ability to use innovative methods for processing and troubleshooting problems providing cost-effective solutions",
  "Passionate about learning and quickly implementing new technologies as required",
  "Completed Machine Learning and Artificial Intelligence Course conducted by IIT Delhi (Duration – 6 months)"
];

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

export const education = [
  {
    degree: "B.Tech in Computer Science Engineering",
    institute: "Lovely Professional University",
    year: "2010-2014",
    score: "7.87/10 CGPA",
  },
  {
    degree: "HSC (Class 12th)",
    institute: "S.R. Century Public School (CBSE)",
    year: "2009",
    score: "80.2%",
  },
  {
    degree: "SSC (Class 10th)",
    institute: "S.R. Century Public School (CBSE)",
    year: "2007",
    score: "84.3%",
  },
];

export const certifications = [
  "Artificial Intelligence and Machine Learning for Industry - IIT Delhi (Feb-Aug 2024)",
  "Microsoft App fest, Jalandhar (Feb 2013)",
  "Microsoft Tech Days, Lovely Professional University (Oct 2010)",
  "C# Certification course - Lovely Centre for Skill Development (2013)",
  "Android Application Development - Lovely Centre for Skill Development (2013)",
];

export const courseProjects = [
  {
    title: "Implementing Sensor technology in automobiles with UI interface designed in android and online tracking",
    description: "Final year project. Aim was to switch the gears using sensors and displaying the status of the gear currently engaged on the android application. Communication between sensor and android device was done by the Bluetooth technology. Implementation of website using j2ee technology further connected to SQL Server database to keep the history of the location coordinates of the vehicle.",
  },
  {
    title: "Android application development - Thief Tracker",
    description: "Third year project. Aimed at searching the lost mobile phones, idea is to get the co-ordinates of the mobile phone through SMS and emails even if the person has changed his mobile number.",
  },
  {
    title: "Representation of graph through adjacency matrix using C Graphics",
    description: "Second year project. User interactive program giving him the exposure about the graph theory through adjacency matrix.",
  },
];

export function generateChatbotContext(): string {
  const skillsList = Object.entries(skills)
    .map(([category, items]) => `${category}: ${items.map(s => s.name).join(", ")}`)
    .join("; ");

  const projectsList = projects
    .map(p => `${p.title} (${p.tags.join(", ")})`)
    .join("; ");

  const achievementsList = currentRole.achievements.slice(0, 10).join("; ");

  return `Shashi Kumar Portfolio Data:

PERSONAL INFO:
Name: ${personalInfo.name}
Email: ${personalInfo.email}
Phone: ${personalInfo.phone}
Location: ${personalInfo.location}
LinkedIn: ${personalInfo.linkedin}
GitHub: ${personalInfo.github}

EXPERIENCE SUMMARY:
${experienceSummary.join("; ")}

EDUCATION:
${education.map(e => `${e.degree} from ${e.institute} (${e.year}) - ${e.score}`).join("; ")}

CERTIFICATIONS:
${certifications.join("; ")}

CURRENT ROLE:
${currentRole.title} at ${currentRole.company} (${currentRole.period})
Project: ${currentRole.projectDescription}
Key Achievements: ${achievementsList}

PREVIOUS EXPERIENCE:
${previousExperience.map(e => `${e.title} at ${e.company} (${e.period})`).join("; ")}

TECHNICAL SKILLS:
${skillsList}

AI/ML EXPERTISE (IIT Delhi Certified):
ML Concepts: ${aiMlKnowledge.mlConcepts}
Deep Learning: ${aiMlKnowledge.deepLearning}
NLP: ${aiMlKnowledge.nlp}
LLMs: ${aiMlKnowledge.llms}
Frameworks: ${aiMlKnowledge.frameworks}
Techniques: ${aiMlKnowledge.techniques}
Computer Vision: ${aiMlKnowledge.computerVision}
Speech: ${aiMlKnowledge.speech}
AI/ML Projects: ${aiMlKnowledge.projects}

PROJECTS:
${projectsList}

COURSE PROJECTS:
${courseProjects.map(p => `${p.title}: ${p.description}`).join("; ")}

MAJOR ACHIEVEMENTS:
${achievements.join("; ")}`;
}
