import { SkillGroup } from '../types';

export const CORE_SKILLS: SkillGroup[] = [
  {
    title: 'Programming Languages',
    sigil: '⚔',
    motto: 'The Blade & Shield',
    isCore: true,
    skills: ['Python', 'Java'],
  },
  {
    title: 'Databases & Storage',
    sigil: '♜',
    motto: 'The Bedrock of the Realm',
    isCore: true,
    skills: ['MySQL (SQL)'],
  },
  {
    title: 'Frameworks & Cloud',
    sigil: '👑',
    motto: 'The Royal Strongholds',
    isCore: true,
    skills: ['GitHub', 'AWS (Amazon Web Services)'],
  },
];

export const SECONDARY_SKILLS: SkillGroup[] = [
  {
    title: 'Frontend & Mobile Ecosystems',
    sigil: '✦',
    motto: 'Forged across project battlegrounds',
    isCore: false,
    skills: ['React', 'React Native (Expo)', 'TypeScript', 'JavaScript'],
  },
  {
    title: 'Backend & Server Architectures',
    sigil: '⚒',
    motto: 'Engines of the realm',
    isCore: false,
    skills: ['Node.js', 'Express', 'Django REST Framework', 'FastAPI'],
  },
  {
    title: 'Machine Learning & Neural Engines',
    sigil: '🐉',
    motto: 'Intelligence awakened',
    isCore: false,
    skills: ['TensorFlow', 'TensorFlow Lite', 'Scikit-learn', 'PyTorch', 'Gemini API', 'face-api.js', 'SenseVoice'],
  },
  {
    title: 'Cloud & Backend Services',
    sigil: '🛡',
    motto: 'Sworn data fortifications',
    isCore: false,
    skills: ['Firebase', 'Supabase (PostgreSQL, Auth)', 'Deepgram'],
  },
];
