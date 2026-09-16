export interface House {
  id: string;
  name: string;
  section?: string;
  seat: string;
  words: string;
  region: string;
  sigil: string;
  colors: string[];
  accent: string;
  description: string;
  sigil_url: string;
  bg: string;
  borderColor: string;
  route?: string;
  isNavigable: boolean;
  routingLabel?: string;
}

export interface Chapter {
  id: string;
  progress: [number, number];
  title: string;
  subtitle: string;
  body: string;
  sigil: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  locationType: string;
  period: string;
  description: string;
  details: string[];
  tags: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  date: string;
  url: string;
  stack: string[];
  summary: string;
  description: string;
  problem?: string;
  approach?: string;
  architecture?: string;
  outcome?: string;
  keyMetrics?: Array<{ label: string; value: string; numValue?: number; suffix?: string }>;
  githubUrl?: string;
  liveUrl?: string;
}

export interface NoteItem {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  excerpt: string;
  tags: string[];
  body: string;
}

export interface SkillGroup {
  title: string;
  sigil: string;
  skills: string[];
  isCore: boolean;
  motto?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  specialization: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  score?: string;
  url: string;
  oath: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  url?: string;
  description: string;
  extendedDetails?: string;
  badge: string;
}
