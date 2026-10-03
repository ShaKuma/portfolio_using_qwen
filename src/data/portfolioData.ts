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
  company: "FIS (Fidelity Information Services)",
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
