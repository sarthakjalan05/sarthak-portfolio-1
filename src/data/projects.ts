import { ProjectItem } from '../types';

export const PROJECTS: ProjectItem[] = [
  {
    id: 'oral-cancer-medtech',
    title: 'Oral Cancer MedTech',
    date: 'Feb 2026',
    url: 'https://tinyurl.com/OralCancerProj',
    stack: ['React Native (Expo)', 'Django REST Framework', 'TensorFlow Lite', 'Supabase (PostgreSQL, Auth)'],
    summary: 'On-device TensorFlow Lite model provides instant AI risk assessment of oral lesions from photographic scans, ensuring diagnostic privacy.',
    description: 'A mobile clinical screening application running an optimized on-device TensorFlow Lite neural network. Delivers instant risk stratification and automated lesion categorization directly on the device with zero cloud latency. Generates exportable diagnostic health summaries while preserving user medical data inside encrypted on-device storage backed by Supabase Auth.',
  },
  {
    id: 'vitalvision',
    title: 'VitalVision',
    date: 'Feb 2025',
    url: 'https://tinyurl.com/VitalVisionProj',
    stack: ['React', 'Python', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'Firebase'],
    summary: 'Intelligent medical conversational assistant paired with an ML patient-doctor triage router based on pincode and clinical severity.',
    description: 'A responsive healthcare portal combining an empathetic medical chatbot with an ML-driven patient prioritization engine. Calculates triage severity scores in real time to route patients to nearby specialized medical practitioners based on geo-pincodes and clinical urgency. Features secure Firebase authentication and instant multi-device state synchronization.',
  },
  {
    id: 'serenity',
    title: 'Serenity — AI Therapeutic Companion',
    date: 'Feb 2026',
    url: 'https://tinyurl.com/therapybot',
    stack: ['React', 'TypeScript', 'FastAPI', 'SenseVoice', 'face-api.js', 'Gemini API', 'Deepgram'],
    summary: 'Privacy-first multimodal therapy companion fusing real-time vocal acoustics and facial affective signals (60/40 weighted).',
    description: 'Cutting-edge therapeutic intelligence system combining low-latency Deepgram / SenseVoice vocal tone analytics and on-client face-api.js affective recognition. Employs a calibrated 60/40 vocal-to-visual weighting model to detect emotional incongruence, psychological distress, and crisis language, responding with grounded, compassionate dialogue via Gemini models.',
  },
];
