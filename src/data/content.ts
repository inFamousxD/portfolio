import { WorkExperience, Project, Skill } from '../types';

// ============================================================================
// WORK EXPERIENCE
// ============================================================================

export const WORK_EXPERIENCES: WorkExperience[] = [
    {
        id: 'uga-research',
        company: 'University of Georgia',
        role: 'Research Assistant',
        period: 'August 2023 - December 2025',
        location: 'Athens, GA, USA',
        description: [
            'Workflow Orchestration: Developed a comprehensive workflow orchestration engine using NodeJS (TypeScript) with Kubernetes-based scheduling and cluster management',
            'Benchmark and Scheduler Engine: Built a benchmark and scheduler engine for parallel scheduling with custom scheduling algorithms using TypeScript (NodeJS) and Python',
            'Performance Metrics System: Built containers powered by a C++ performance metrics extraction tool capable of polling at 500ms intervals to SQLite database',
            'Machine Learning for Resource Prediction: Trained lightweight custom ML/Math models achieving 92% accuracy for resource prediction on heterogeneous machines',
            'Cost Optimization: Engineered a simulation platform for cluster sizing using Branch-and-Bound + Scheduler Policy Comparator in C++, achieving 45% average cost savings compared to ad-hoc sizing',
            'Interactive Visualizations: Created an interface for workflow execution, simulation, and interactive metrics visualizations using D3.js charts in ReactJS (TypeScript)',
        ],
        techStack: [
            'Kubernetes',
            'Docker',
            'Python',
            'C++',
            'NodeJS',
            'ReactJS',
            'TypeScript',
            'Grafana',
            'Prometheus',
            'Loki',
            'SQLite',
        ],
    },
    {
        id: 'qualitia',
        company: 'Qualitia Software',
        role: 'Software Engineer II, Full-Stack',
        period: 'November 2022 - July 2023',
        location: 'Pune, India',
        description: [
            'High-Performance UI: Engineered high-performance React components with pure CSS animations while collaborating with the UX team',
            'Performance Optimization: Built a tabular code editor with dynamic cell streaming achieving 300% performance gain in server-client communication',
            'Infrastructure Efficiency: Minimized EC2 CPU utilization by 30% through API optimization with Express/GraphQL and Redis caching strategies',
            'Quality Assurance: Maintained 90%+ code coverage for React components using Enzyme and established CI/CD mandates with GitHub Actions',
            'UI/UX Leadership: Led design initiatives with customers, creating effective prototypes in Figma and React Storybook with same-day deployments',
        ],
        techStack: [
            'ReactJS',
            'NodeJS',
            'ElectronJS',
            'TypeScript',
            'SQL',
            'PostgreSQL',
            'Redis',
            'GraphQL',
            'Express',
        ],
    },
    {
        id: 'persistent',
        company: 'Persistent Systems',
        role: 'Software Engineer',
        period: 'January 2021 - November 2022',
        location: 'Pune, India',
        description: [
            'Lightning Web Components: Designed pixel-perfect interfaces using Salesforce Lightning Web Components with JavaScript and pure CSS following SF Design Principles',
            'Data Visualization: Built extended Salesforce data visualization using ReactJS, D3.js, and Tailwind CSS in Lightning Container Components',
            'API Optimization: Architected Apex API data pipelines leading to 25% operational and DB transaction cost savings while increasing responsiveness',
            'Caching Solutions: Engineered custom in-memory caching solutions to reduce API calls and DB reads with secure external database caches',
        ],
        techStack: [
            'Salesforce',
            'Lightning Web Components',
            'JavaScript',
            'Apex',
            'ReactJS',
            'D3.js',
            'SOQL',
            'Tailwind CSS',
        ],
    },
];

// ============================================================================
// PROJECTS
// ============================================================================

export const PROJECTS: Project[] = [
    {
        id: 'genscale',
        title: 'GenScale',
        subtitle: 'BioInformatics Benchmark and Portfolio Scheduling Platform',
        description:
            'Engineered a high-performance benchmarking platform that revolutionizes how genomic tools operate at scale on cloud infrastructure through Kubernetes orchestration',
        achievements: [
            'Advanced Kubernetes Integration: Developed a custom scheduler paired with a data parallelization engine that reduced processing times by 45-80% for complex genomic workflows',
            'High-Precision Telemetry: Created a C++ metrics collection system capable of multi-threaded data polling at 500ms intervals, enabling real-time performance monitoring',
            'Comprehensive Visualization Suite: Implemented data processing and visualization pipeline using Python, D3.js, and Grafana dashboards to transform raw metrics into actionable insights',
            'Intelligent Workload Optimization: Pioneered machine learning-based resource allocation that prevents cluster crashes with 1.5x greater efficiency than traditional AIMD and MIMD approaches',
            'Enhanced Parallelization Capabilities: Implemented auto data parallelization and nested parallel workflow execution to maximize computational resource utilization',
        ],
        techStack: [
            'Kubernetes',
            'NodeJS',
            'ReactJS',
            'Terraform',
            'Docker',
            'Grafana',
            'Loki',
            'TypeScript',
            'C++',
            'Python',
            'Bash',
        ],
        links: {
            blog: 'https://chameleoncloud.org/blog/2024/12/30/minimizing-out-of-memory-failures-in-genomics-workflow-execution/',
        },
    },
    {
        id: 'aircraft-route',
        title: 'Aircraft Route Plotting and Search Pattern Optimization',
        subtitle: 'Smart India Hackathon 2020 Winner',
        description:
            'Developed a comprehensive aircraft trajectory simulation and visualization system using geological and weather data',
        achievements: [
            'Mathematical Modeling: Developed a math trajectory model for simulating aircraft trajectories in Python using geological and weather data from NOAA API',
            'MVC Architecture: Used MVC architecture patterns to create APIs using NodeJS and Express for interfacing with math model and user interface',
            'Interactive Visualizations: Built interactive visualizations using D3.js, Three.js, Anime.js, and Mapbox for flight paths, simulation, and weather in ReactJS',
            'National Recognition: Winning solution of Smart India Hackathon 2020',
        ],
        techStack: [
            'ReactJS',
            'NodeJS',
            'MongoDB',
            'Python',
            'D3.js',
            'Three.js',
            'Mapbox',
            'Express',
        ],
    },
];

// ============================================================================
// SKILLS
// ============================================================================

export const SKILLS: Skill[] = [
    {
        category: 'LANGUAGES',
        items: ['TypeScript/JavaScript', 'C++/C', 'Python', 'Java', 'SQL', 'HTML', 'CSS'],
        highlighted: ['TypeScript/JavaScript', 'C++/C', 'Python'],
    },
    {
        category: 'FRAMEWORKS/LIBRARIES',
        items: [
            'ReactJS',
            'NodeJS',
            'Redux',
            'SpringBoot',
            'Angular',
            'Vue.js',
            'Matplotlib',
            'Pandas',
            'Numpy',
            'Scikit-Learn',
        ],
        highlighted: ['ReactJS', 'NodeJS'],
    },
    {
        category: 'CLOUD & DEVOPS',
        items: [
            'Kubernetes',
            'Docker',
            'AWS: EC2, ECS, ELB, S3',
            'Terraform',
            'Jenkins',
            'Grafana',
            'Loki',
            'Prometheus',
            'Github Actions',
        ],
        highlighted: ['Kubernetes', 'Docker', 'AWS'],
    },
    {
        category: 'DATABASES',
        items: ['MongoDB', 'MySQL', 'SQLite', 'Cassandra', 'Redis', 'PostgreSQL', 'DynamoDB'],
        highlighted: ['MongoDB', 'PostgreSQL'],
    },
    {
        category: 'TOOLS & CONCEPTS',
        items: [
            'Linux (UNIX)',
            'Bash',
            'Agile',
            'JSON',
            'XML',
            'APIs',
            'GraphQL',
            'REST',
            'Git',
            'Postman',
        ],
        highlighted: ['Linux (UNIX)', 'Git'],
    },
    {
        category: 'RESEARCH AREAS',
        items: [
            'High Performance Computing',
            'Optimization',
            'Cloud Computing',
            'Schedulers',
            'Operating Systems',
            'Scalability',
        ],
        highlighted: ['High Performance Computing', 'Cloud Computing'],
    },
];

// ============================================================================
// CONTACT INFO
// ============================================================================

export const CONTACT_INFO = {
    phone: '(762) 310-2015',
    email: 'aaditya.mankar.x7@gmail.com',
    location: 'Athens, GA',
    linkedin: 'https://www.linkedin.com/in/aaditya-mankar-x7/',
    github: 'https://github.com/inFamousxD',
    resume:
        'https://drive.google.com/file/d/1W4NaQrrWpivMRdiTns_uS9yUvxbGmj9C/view?usp=sharing',
};

// ============================================================================
// EDUCATION
// ============================================================================

export const EDUCATION = [
    {
        id: 'uga',
        institution: 'University of Georgia',
        degree: 'Master of Science, Computer Science',
        period: 'August 2023 - December 2025',
        location: 'Athens, GA, USA',
        gpa: '3.85/4.0',
        coursework: [
            'Data Structures and Algorithms',
            'Operating Systems',
            'Database Management Systems',
            'Advanced Cloud Computing',
            'Evolutionary Computing',
            'Software Engineering',
            'Advanced Software Security',
        ],
    },
    {
        id: 'sppu',
        institution: 'Savitribai Phule Pune University',
        degree: 'Bachelor of Engineering, Computer Engineering',
        period: 'July 2017 - July 2021',
        location: 'Pune, India',
    },
];

// ============================================================================
// ACCOMPLISHMENTS
// ============================================================================

export const ACCOMPLISHMENTS = [
    {
        title: 'Exploring novel adversarial attack strategies on android systems',
        type: 'Publication',
        organization: 'ICC 2022 — IEEE International Conference on Communications',
        link: 'https://ieeexplore.ieee.org/document/9838699',
    },
    {
        title: 'Team Lead and Winner',
        type: 'Hackathon',
        organization: 'National Smart India Hackathon 2020',
    },
    {
        title: 'Team Lead and Winner',
        type: 'Hackathon',
        organization: 'Regional NASA SpaceApps Hackathon 2020',
    },
    {
        title: 'Best Junior Developer, Rising Star, and MVP Developer',
        type: 'Award',
        organization: 'Persistent Systems',
        year: '2021, 2022',
    },
];