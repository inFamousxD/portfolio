import { WorkExperience, Project, Skill } from '../types';

// ============================================================================
// WORK EXPERIENCE
// ============================================================================

export const WORK_EXPERIENCES: WorkExperience[] = [
    {
        id: 'qualitia',
        company: 'Qualitia Software',
        role: 'Software Engineer, Fullstack/UI Developer',
        period: 'November 2022 - July 2023',
        location: 'Pune, India',
        description: [
            'Zero-to-One Product Development: Architected and delivered a cross-platform ElectronJS application for automating web/native/android testing in a test-driven development environment',
            'Performance Optimization: Leveraged ReactJS, Redux, and data streaming algorithms to achieve a 300% improvement in scroll and navigation performance',
            'Advanced Code Editor: Built an in-app code editor with unified UI language, enabling seamless switching between Tabular (Easy) and Code-based (Advanced) modes, featuring O(log n) keyword recommendation with nested search',
        ],
        techStack: [
            'TypeScript',
            'ReactJS',
            'NodeJS',
            'SQL',
            'ElectronJS',
            'PostgreSQL',
            'REST APIs',
        ],
    },
    {
        id: 'persistent',
        company: 'Persistent Systems',
        role: 'Software Engineer',
        period: 'January 2021 - November 2022',
        location: 'Pune, India',
        description: [
            'Enterprise Salesforce Development: Built comprehensive Salesforce system from the ground up, collaborating with multiple teams in an agile environment',
            'Custom Architecture Design: Worked closely with Salesforce Architects to develop efficient application flows, custom interfaces, and scalable solutions',
            'Performance Engineering: Created scalable Apex library for batch processing that improved performance by 80%',
        ],
        techStack: [
            'Salesforce Developer',
            'Apex',
            'Lightning Web Components',
            'SOQL',
            'Java',
            'SpringBoot',
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
];

// ============================================================================
// SKILLS
// ============================================================================

export const SKILLS: Skill[] = [
    {
        category: 'WEB',
        items: ['ReactJS', 'NodeJS', 'AngularJS', 'Django', 'SpringBoot'],
        highlighted: ['ReactJS', 'NodeJS'],
    },
    {
        category: 'LANGUAGES',
        items: ['TypeScript/JavaScript', 'Python', 'C/C++', 'C#', 'Java'],
        highlighted: ['TypeScript/JavaScript'],
    },
    {
        category: 'DATABASES',
        items: ['MySQL', 'MongoDB', 'PostgreSQL', 'SQLite', 'Redis', 'Cassandra'],
    },
    {
        category: 'RESEARCH',
        items: [
            'High Performance Computing',
            'Optimization',
            'Cloud',
            'Schedulers',
            'Operating Systems',
            'Scalability',
        ],
    },
    {
        category: 'CLOUD',
        items: [
            'Kubernetes',
            'Docker',
            'AWS: EC2, ECS, ELB, S3',
            'Terraform',
            'Jenkins',
            'Grafana',
            'Loki',
            'Prometheus',
        ],
        highlighted: ['Kubernetes', 'Docker'],
    },
];

// ============================================================================
// CONTACT INFO
// ============================================================================

export const CONTACT_INFO = {
    email: 'aaditya.mankar.x7@gmail.com',
    linkedin: 'https://www.linkedin.com/in/aaditya-mankar-x7/',
    github: 'https://github.com/inFamousxD',
    resume:
        'https://drive.google.com/file/d/1W4NaQrrWpivMRdiTns_uS9yUvxbGmj9C/view?usp=sharing',
};
