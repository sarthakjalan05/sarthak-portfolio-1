import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  ExternalLink,
  FileText,
  Terminal,
  Cpu,
  BookOpen,
  Briefcase,
  Layers,
  Send,
  Github,
  Linkedin,
  Award,
  Trophy,
  X,
  User,
} from 'lucide-react';

interface SearchItem {
  id: string;
  title: string;
  category: 'Page' | 'Case Study' | 'Technical Note' | 'Action';
  description: string;
  route?: string;
  action?: () => void;
  icon: React.ReactNode;
  keywords: string[];
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Listen for global shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 60);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const items: SearchItem[] = [
    // Pages
    {
      id: 'page-home',
      title: 'System Root (Home)',
      category: 'Page',
      description: 'Hero telemetry, primary system modules, and architecture index.',
      route: '/',
      icon: <Terminal size={15} className="text-[var(--cyan)]" />,
      keywords: ['home', 'root', 'landing', 'start', 'index'],
    },
    {
      id: 'page-about',
      title: 'About Sarthak Jalan',
      category: 'Page',
      description: 'Engineer profile, live GitHub telemetry stream, and technical background.',
      route: '/about',
      icon: <User size={15} className="text-[var(--cyan)]" />,
      keywords: ['about', 'bio', 'who', 'sarthak', 'github', 'story'],
    },
    {
      id: 'page-experience',
      title: 'Experience Log · Work History',
      category: 'Page',
      description: 'Weatherford AI/ML engineering, Collabify.ai, and production deployments.',
      route: '/experience',
      icon: <Briefcase size={15} className="text-[var(--cyan)]" />,
      keywords: ['experience', 'work', 'job', 'weatherford', 'collabify', 'career'],
    },
    {
      id: 'page-projects',
      title: 'Projects Matrix · Applications',
      category: 'Page',
      description: 'Production AI platforms, Edge MedTech diagnostics, and clinical triage.',
      route: '/projects',
      icon: <Layers size={15} className="text-[var(--cyan)]" />,
      keywords: ['projects', 'apps', 'software', 'code', 'deployments'],
    },
    {
      id: 'page-skills',
      title: 'Technical Skills · Capabilities',
      category: 'Page',
      description: 'Machine Learning, Full-Stack MERN, Cloud architectures, and toolchains.',
      route: '/skills',
      icon: <Cpu size={15} className="text-[var(--cyan)]" />,
      keywords: ['skills', 'arsenal', 'tech stack', 'python', 'react', 'typescript'],
    },
    {
      id: 'page-notes',
      title: 'Technical Notes · Engineering Articles',
      category: 'Page',
      description: 'Deep dives on TFLite quantization, 60/40 affective fusion, and distributed MERN.',
      route: '/notes',
      icon: <BookOpen size={15} className="text-[var(--cyan)]" />,
      keywords: ['notes', 'blog', 'writing', 'articles', 'engineering', 'research'],
    },
    {
      id: 'page-character-sheet',
      title: 'System Stat Sheet (Easter Egg)',
      category: 'Page',
      description: 'Engineering attributes, skills matrix, and capability stats.',
      route: '/character-sheet',
      icon: <FileText size={15} className="text-[var(--cyan)]" />,
      keywords: ['rpg', 'character', 'sheet', 'stats', 'easter egg', 'attributes'],
    },
    {
      id: 'page-education',
      title: 'Academic Records · Education',
      category: 'Page',
      description: 'Vellore Institute of Technology (VIT) CSE curriculum and credentials.',
      route: '/education',
      icon: <BookOpen size={15} className="text-[var(--cyan)]" />,
      keywords: ['education', 'college', 'vit', 'degree', 'academics'],
    },
    {
      id: 'page-certifications',
      title: 'Certifications · Verified Credentials',
      category: 'Page',
      description: 'AWS Cloud, Google Cloud, Deep Learning, and Postman honors.',
      route: '/certifications',
      icon: <Award size={15} className="text-[var(--cyan)]" />,
      keywords: ['certifications', 'aws', 'cloud', 'credentials', 'licenses'],
    },
    {
      id: 'page-achievements',
      title: 'Achievements · Benchmarks & Honors',
      category: 'Page',
      description: 'LeetCode 1550+, Hack the Spring Finalist, Flipkart GRiD 6.0 Top 10%.',
      route: '/achievements',
      icon: <Trophy size={15} className="text-[var(--cyan)]" />,
      keywords: ['achievements', 'leetcode', 'hackathon', 'awards', 'rank'],
    },
    {
      id: 'page-contact',
      title: 'Contact Terminal · Transmission Uplink',
      category: 'Page',
      description: 'Dispatch messages directly to Sarthak via secure communication terminal.',
      route: '/contact',
      icon: <Send size={15} className="text-[var(--cyan)]" />,
      keywords: ['contact', 'email', 'message', 'reach', 'connect'],
    },

    // Case Studies
    {
      id: 'case-oral-cancer',
      title: 'Case Study: Oral Cancer MedTech',
      category: 'Case Study',
      description: 'On-device TFLite neural risk assessment with sub-115ms latency.',
      route: '/projects/oral-cancer-medtech',
      icon: <Layers size={15} className="text-[var(--magenta)]" />,
      keywords: ['oral cancer', 'tflite', 'django', 'supabase', 'healthtech', 'medtech'],
    },
    {
      id: 'case-vitalvision',
      title: 'Case Study: VitalVision',
      category: 'Case Study',
      description: 'Intelligent medical conversational assistant and ML doctor triage.',
      route: '/projects/vitalvision',
      icon: <Layers size={15} className="text-[var(--magenta)]" />,
      keywords: ['vitalvision', 'triage', 'doctor', 'hospital', 'pytorch', 'firebase'],
    },
    {
      id: 'case-serenity',
      title: 'Case Study: Serenity AI Companion',
      category: 'Case Study',
      description: '60/40 acoustic-visual affective multimodal distress perception.',
      route: '/projects/serenity',
      icon: <Layers size={15} className="text-[var(--magenta)]" />,
      keywords: ['serenity', 'multimodal', 'emotion', 'therapy', 'gemini', 'deepgram'],
    },

    // Notes
    {
      id: 'note-tflite',
      title: 'Note: Optimizing TFLite for Edge Diagnostics',
      category: 'Technical Note',
      description: 'Quantizing neural weights to sub-5MB for zero cloud latency.',
      route: '/notes/optimizing-tflite-edge-inference',
      icon: <FileText size={15} className="text-[var(--cyan)]" />,
      keywords: ['tflite', 'quantization', 'mobile', 'edge ai', 'note'],
    },
    {
      id: 'note-affective',
      title: 'Note: Calibrating 60/40 Multimodal Affective Fusion',
      category: 'Technical Note',
      description: 'Weighting vocal acoustics against facial affect in therapeutic AI.',
      route: '/notes/multimodal-affective-fusion-60-40',
      icon: <FileText size={15} className="text-[var(--cyan)]" />,
      keywords: ['multimodal', 'fusion', 'affective', '60/40', 'gemini'],
    },
    {
      id: 'note-mern',
      title: 'Note: Architectural Patterns for MERN Services',
      category: 'Technical Note',
      description: 'Connection pooling, ESR indexing, and Redis workers in Node.js.',
      route: '/notes/scaling-mern-microservices-westeros',
      icon: <FileText size={15} className="text-[var(--cyan)]" />,
      keywords: ['mern', 'node', 'mongodb', 'redis', 'scaling'],
    },

    // Quick Actions
    {
      id: 'action-resume',
      title: 'Download Resume Dossier (PDF)',
      category: 'Action',
      description: 'Download Sarthak Jalan’s complete technical curriculum vitae.',
      action: () => {
        window.open('/resume/sarthak_resume.pdf', '_blank');
      },
      icon: <FileText size={15} className="text-[var(--cyan)]" />,
      keywords: ['resume', 'cv', 'pdf', 'download', 'curriculum vitae'],
    },
    {
      id: 'action-github',
      title: 'Inspect GitHub Repositories',
      category: 'Action',
      description: 'View public open source code, repositories, and commits.',
      action: () => {
        window.open('https://github.com/sarthakjalan05', '_blank');
      },
      icon: <Github size={15} className="text-[var(--text)]" />,
      keywords: ['github', 'code', 'git', 'repo', 'open source'],
    },
    {
      id: 'action-linkedin',
      title: 'Connect on LinkedIn',
      category: 'Action',
      description: 'Professional networking and recommendations profile.',
      action: () => {
        window.open('https://www.linkedin.com/in/sarthak-jalan-7685a7285/', '_blank');
      },
      icon: <Linkedin size={15} className="text-[var(--cyan)]" />,
      keywords: ['linkedin', 'social', 'network', 'profile'],
    },
    {
      id: 'action-email',
      title: 'Send Direct Email',
      category: 'Action',
      description: 'Direct dispatch to sarthakjalan06@gmail.com',
      action: () => {
        window.location.href = 'mailto:sarthakjalan06@gmail.com';
      },
      icon: <Send size={15} className="text-[var(--cyan)]" />,
      keywords: ['email', 'mail', 'write', 'message'],
    },
  ];

  // Filtering
  const filtered = query.trim()
    ? items.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.keywords.some((k) => k.toLowerCase().includes(q))
        );
      })
    : items;

  const handleSelect = (item: SearchItem) => {
    setIsOpen(false);
    if (item.action) {
      item.action();
    } else if (item.route) {
      navigate(item.route);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex]);
      }
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('[data-selected="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command Terminal Palette"
    >
      <div
        className="realm-card relative w-full max-w-2xl bg-[#0d1017] border border-[rgba(0,240,255,0.45)] shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden flex flex-col rounded"
        style={{ maxHeight: 'calc(100vh - 120px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner Ornaments */}
        <span className="corner corner-tl" style={{ '--accent': 'var(--cyan)' } as React.CSSProperties} />
        <span className="corner corner-tr" style={{ '--accent': 'var(--cyan)' } as React.CSSProperties} />
        <span className="corner corner-bl" style={{ '--accent': 'var(--cyan)' } as React.CSSProperties} />
        <span className="corner corner-br" style={{ '--accent': 'var(--cyan)' } as React.CSSProperties} />

        {/* Input Bar */}
        <div className="relative flex items-center gap-3 px-5 py-4 border-b border-[rgba(0,240,255,0.2)] bg-[#07080c]">
          <Search size={18} className="text-[var(--cyan)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="SYS://SEARCH — Execute command, jump to page, or filter projects..."
            className="w-full bg-transparent text-[var(--text)] placeholder-[var(--text-muted)] text-sm sm:text-base font-chakra outline-none tracking-wide"
            aria-label="Search system modules"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[var(--text-muted)] hover:text-white text-xs p-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-[var(--text-muted)] hover:text-white transition-colors"
            aria-label="Close command palette"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results List */}
        <div ref={listRef} className="overflow-y-auto p-2 divide-y divide-[rgba(0,240,255,0.08)]">
          {filtered.length === 0 ? (
            <div className="p-8 text-center">
              <p className="font-chakra text-xs uppercase tracking-widest text-[var(--cyan)]">
                No commands found matching &quot;{query}&quot;
              </p>
              <p className="font-space text-xs text-[var(--text-muted)] mt-1">
                Try searching for &quot;Projects&quot;, &quot;Experience&quot;, &quot;Resume&quot;, or &quot;Skills&quot;.
              </p>
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  data-selected={isSelected}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={() => handleSelect(item)}
                  className={`flex items-center justify-between gap-3 p-3 rounded cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[rgba(0,240,255,0.12)] border-l-2 border-[var(--cyan)] text-[var(--text)]'
                      : 'text-[var(--text-muted)] hover:bg-[#07080c] hover:text-[var(--text)]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded bg-[#07080c] border border-[rgba(0,240,255,0.25)] shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-chakra text-xs sm:text-sm font-bold text-[var(--text)] truncate">
                          {item.title}
                        </span>
                        <span className="font-chakra text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#07080c] border border-[rgba(0,240,255,0.25)] text-[var(--cyan)] shrink-0">
                          {item.category}
                        </span>
                      </div>
                      <p className="font-space text-xs text-[var(--text-muted)] truncate mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.action ? (
                      <ExternalLink size={13} className="text-[var(--cyan)]" />
                    ) : (
                      <ArrowRight size={13} className="text-[var(--cyan)]" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 py-2.5 bg-[#07080c] border-t border-[rgba(0,240,255,0.2)] flex items-center justify-between text-[10px] font-chakra text-[var(--text-muted)]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[#0d1017] border border-[rgba(0,240,255,0.3)] rounded text-[var(--cyan)]">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 bg-[#0d1017] border border-[rgba(0,240,255,0.3)] rounded text-[var(--cyan)]">
                ↓
              </kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[#0d1017] border border-[rgba(0,240,255,0.3)] rounded text-[var(--cyan)]">
                ↵
              </kbd>
              <span>Execute</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[#0d1017] border border-[rgba(0,240,255,0.3)] rounded text-[var(--cyan)]">
                ESC
              </kbd>
              <span>Dismiss</span>
            </span>
          </div>

          <span className="text-[var(--cyan)] tracking-wider">SYS://CMD_NAV</span>
        </div>
      </div>
    </div>
  );
};
