import { ExperienceItem } from '../types';

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'weatherford',
    role: 'R&D Engineer (AI/ML) Intern',
    company: 'Weatherford International',
    locationType: 'On-site',
    period: 'Jun 2026 – Aug 2026',
    description: 'Developed a 2-way ML model to specify product design requirements and predict exerted forces, achieving 98.78% accuracy over a million-row dataset.',
    details: [
      'Architected and benchmarked bidirectional machine learning models (Python, Scikit-learn) translating complex product mechanical specifications into precise exerted force distributions.',
      'Trained and evaluated the system over an exhaustive 1,000,000+ row experimental dataset, attaining an industry-grade 98.78% predictive accuracy.',
      'Reduced simulation iteration latency by bridging CAD constraint parameters with rapid inference pipelines.',
    ],
    tags: ['Python', 'Scikit-learn', 'Machine Learning', 'R&D', 'Predictive Modeling'],
  },
  {
    id: 'collabify',
    role: 'Full-Stack Developer & AI Engineer',
    company: 'Collabify.ai',
    locationType: 'Remote',
    period: 'Dec 2024 – Dec 2025',
    description: 'Built and deployed a full-stack platform (MERN Stack, Node.js, React.js) connecting cottage-level industries with social media creators for product promotion.',
    details: [
      'Engineered the end-to-end web platform using React.js, Node.js, Express, and MongoDB to empower micro and cottage enterprises with direct influencer marketing.',
      'Designed responsive creator discovery workflows, automated collaboration agreements, and campaign tracking dashboards.',
      'Integrated intelligent recommendation matching algorithms aligning creator audience demographics with artisanal brand niches.',
    ],
    tags: ['MERN Stack', 'React.js', 'Node.js', 'Express', 'MongoDB', 'AI Integration'],
  },
];
