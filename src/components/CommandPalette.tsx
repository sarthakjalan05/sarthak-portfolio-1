import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  ExternalLink,
  FileText,
  Flame,
  Crown,
  BookOpen,
  Scroll,
  Send,
  Github,
  Linkedin,
  Shield,
  X,
  Compass,
} from 'lucide-react';

interface SearchItem {
  id: string;
  title: string;
  category: 'Page' | 'Case Study' | 'Maester Scroll' | 'Action';
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

  // Listen for global open event
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
      title: 'Seat of the Realm (Home)',
      category: 'Page',
      description: 'The Seven Houses, Hero video, and navigation citadel.',
      route: '/',
      icon: <Crown size={15} className="text-[var(--gold)]" />,
      keywords: ['home', 'houses', 'landing', 'realm', 'seven kingdoms'],
    },
    {
      id: 'page-about',
      title: 'About Sarthak Jalan',
      category: 'Page',
      description: 'The Architect’s story, live GitHub campaign ledger, and background.',
      route: '/about',
      icon: <Compass size={15} className="text-[var(--gold)]" />,
      keywords: ['about', 'bio', 'who', 'sarthak', 'github', 'story'],
    },
    {
      id: 'page-experience',
      title: 'House Lannister · Experience',
      category: 'Page',
      description: 'Weatherford AI/ML engineering, Collabify.ai, and production ledgers.',
      route: '/experience',
      icon: <Shield size={15} className="text-[#d4a84b]" />,
      keywords: ['experience', 'work', 'job', 'weatherford', 'collabify', 'lannister'],
    },
    {
      id: 'page-projects',
      title: 'House Targaryen · Projects Armory',
      category: 'Page',
      description: 'Forged AI platforms, MedTech diagnostics, and clinical triage.',
      route: '/projects',
      icon: <Flame size={15} className="text-[#c0392b]" />,
      keywords: ['projects', 'armory', 'targaryen', 'code', 'software'],
    },
    {
      id: 'page-skills',
      title: 'House Baratheon · Skills & Arsenal',
      category: 'Page',
      description: 'Machine Learning, Full-Stack MERN, Cloud architectures, and tools.',
      route: '/skills',
      icon: <Shield size={15} className="text-[#c99700]" />,
      keywords: ['skills', 'arsenal', 'tech stack', 'python', 'react', 'baratheon'],
    },
    {
      id: 'page-notes',
      title: 'The Maester’s Notes · Technical Scrolls',
      category: 'Page',
      description: 'Deep dives on TFLite quantization, 60/40 affective fusion, and MERN.',
      route: '/notes',
      icon: <Scroll size={15} className="text-[#9aa5b1]" />,
      keywords: ['notes', 'blog', 'writing', 'articles', 'scrolls', 'citadel', 'maester'],
    },
    {
      id: 'page-character-sheet',
      title: 'RPG Character Sheet (Easter Egg)',
      category: 'Page',
      description: 'Downloadable character card with Sarthak’s attributes, feats, and stats.',
      route: '/character-sheet',
      icon: <Scroll size={15} className="text-[var(--gold)]" />,
      keywords: ['rpg', 'character', 'sheet', 'stats', 'easter egg', 'download', 'game'],
    },
    {
      id: 'page-education',
      title: 'The Citadel · Education',
      category: 'Page',
      description: 'Vellore Institute of Technology (VIT) CSE curriculum and academics.',
      route: '/education',
      icon: <BookOpen size={15} className="text-[#8e9aaf]" />,
      keywords: ['education', 'college', 'vit', 'degree', 'citadel', 'studies'],
    },
    {
      id: 'page-certifications',
      title: 'House Greyjoy · Certifications & Oaths',
      category: 'Page',
      description: 'AWS Cloud, Google Cloud, Deep Learning, and Postman honors.',
      route: '/certifications',
      icon: <Shield size={15} className="text-[#1b7a82]" />,
      keywords: ['certifications', 'aws', 'cloud', 'oaths', 'greyjoy', 'credentials'],
    },
    {
      id: 'page-achievements',
      title: 'House Tyrell · Achievements & Banners',
      category: 'Page',
      description: 'LeetCode 1550+, Hack the Spring Finalist, Flipkart GRiD 6.0.',
      route: '/achievements',
      icon: <Crown size={15} className="text-[#5a9e48]" />,
      keywords: ['achievements', 'leetcode', 'hackathon', 'awards', 'tyrell', 'honors'],
    },
    {
      id: 'page-contact',
      title: 'House Stark · Send a Raven (Contact)',
      category: 'Page',
      description: 'Dispatch messages directly to Sarthak via electronic raven.',
      route: '/contact',
      icon: <Send size={15} className="text-[#708090]" />,
      keywords: ['contact', 'email', 'raven', 'message', 'stark', 'reach'],
    },

    // Case Studies
    {
      id: 'case-oral-cancer',
      title: 'Case Study: Oral Cancer MedTech',
      category: 'Case Study',
      description: 'On-device TFLite neural risk assessment with sub-115ms latency.',
      route: '/projects/oral-cancer-medtech',
      icon: <Flame size={15} className="text-[#c0392b]" />,
      keywords: ['oral cancer', 'tflite', 'django', 'supabase', 'healthtech', 'medtech'],
    },
    {
      id: 'case-vitalvision',
      title: 'Case Study: VitalVision',
      category: 'Case Study',
      description: 'Intelligent medical conversational assistant and ML doctor triage.',
      route: '/projects/vitalvision',
      icon: <Flame size={15} className="text-[#c0392b]" />,
      keywords: ['vitalvision', 'triage', 'doctor', 'hospital', 'pytorch', 'firebase'],
    },
    {
      id: 'case-serenity',
      title: 'Case Study: Serenity AI Companion',
      category: 'Case Study',
      description: '60/40 acoustic-visual affective multimodal distress perception.',
      route: '/projects/serenity',
      icon: <Flame size={15} className="text-[#c0392b]" />,
      keywords: ['serenity', 'multimodal', 'emotion', 'therapy', 'gemini', 'deepgram'],
    },

    // Scrolls / Notes
    {
      id: 'note-tflite',
      title: 'Scroll: Optimizing TFLite for Edge Diagnostics',
      category: 'Maester Scroll',
      description: 'Quantizing neural weights to sub-5MB for zero cloud latency.',
      route: '/notes/optimizing-tflite-edge-inference',
      icon: <Scroll size={15} className="text-[var(--gold)]" />,
      keywords: ['tflite', 'quantization', 'mobile', 'edge ai', 'note', 'scroll'],
    },
    {
      id: 'note-affective',
      title: 'Scroll: Calibrating 60/40 Multimodal Affective Fusion',
      category: 'Maester Scroll',
      description: 'Weighting vocal acoustics against facial affect in therapeutic AI.',
      route: '/notes/multimodal-affective-fusion-60-40',
      icon: <Scroll size={15} className="text-[var(--gold)]" />,
      keywords: ['multimodal', 'fusion', 'affective', '60/40', 'gemini', 'scroll'],
    },
    {
      id: 'note-mern',
      title: 'Scroll: Architectural Patterns for MERN Services',
      category: 'Maester Scroll',
      description: 'Connection pooling, ESR indexing, and Redis workers in Node.js.',
      route: '/notes/scaling-mern-microservices-westeros',
      icon: <Scroll size={15} className="text-[var(--gold)]" />,
      keywords: ['mern', 'node', 'mongodb', 'redis', 'scaling', 'scroll'],
    },

    // Quick Actions
    {
      id: 'action-resume',
      title: 'Procure Valyrian Resume (PDF)',
      category: 'Action',
      description: 'Download Sarthak’s official curriculum vitae parchment.',
      action: () => {
        window.open('/resume/sarthak_resume.pdf', '_blank');
      },
      icon: <FileText size={15} className="text-[var(--gold)]" />,
      keywords: ['resume', 'cv', 'pdf', 'download', 'curriculum vitae'],
    },
    {
      id: 'action-github',
      title: 'Inspect GitHub Battlefield',
      category: 'Action',
      description: 'View public open source code, repositories, and commits.',
      action: () => {
        window.open('https://github.com/sarthakjalan05', '_blank');
      },
      icon: <Github size={15} className="text-[var(--parchment)]" />,
      keywords: ['github', 'code', 'git', 'repo', 'open source'],
    },
    {
      id: 'action-linkedin',
      title: 'Connect on LinkedIn Guild',
      category: 'Action',
      description: 'Professional networking and recommendations ledger.',
      action: () => {
        window.open('https://www.linkedin.com/in/sarthak-jalan-7685a7285/', '_blank');
      },
      icon: <Linkedin size={15} className="text-[#5dade2]" />,
      keywords: ['linkedin', 'social', 'network', 'profile'],
    },
    {
      id: 'action-email',
      title: 'Dispatch Email Raven Directly',
      category: 'Action',
      description: 'Send electronic dispatch to sarthakjalan05@gmail.com',
      action: () => {
        window.location.href = 'mailto:sarthakjalan05@gmail.com';
      },
      icon: <Send size={15} className="text-[var(--gold-light)]" />,
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
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Send a Raven Command Palette"
    >
      <div
        className="realm-card relative w-full max-w-2xl bg-[#0e0a07] border border-[var(--gold)]/60 shadow-[0_0_50px_rgba(201,168,76,0.25)] overflow-hidden flex flex-col"
        style={{ maxHeight: 'calc(100vh - 120px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner Ornaments */}
        <span className="corner corner-tl" />
        <span className="corner corner-tr" />
        <span className="corner corner-bl" />
        <span className="corner corner-br" />

        {/* Input Bar */}
        <div className="relative flex items-center gap-3 px-5 py-4 border-b border-[var(--gold-dim)]/40 bg-[#140e0a]">
          <Search size={18} className="text-[var(--gold)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Send a Raven — Search houses, scrolls, projects, or deeds..."
            className="w-full bg-transparent text-[var(--parchment)] placeholder-[var(--ash)]/70 text-sm sm:text-base font-cinzel outline-none tracking-wide"
            aria-label="Search the realm"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[var(--ash)] hover:text-[var(--parchment)] text-xs p-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-[var(--ash)] hover:text-[var(--parchment)] transition-colors"
            aria-label="Close command palette"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results List */}
        <div ref={listRef} className="overflow-y-auto p-2 divide-y divide-[var(--gold-dim)]/15">
          {filtered.length === 0 ? (
            <div className="p-8 text-center">
              <p className="font-cinzel text-xs uppercase tracking-widest text-[var(--gold-dim)]">
                No ravens found matching &quot;{query}&quot;
              </p>
              <p className="font-garamond text-xs text-[var(--ash)] mt-1">
                Try searching for &quot;Projects&quot;, &quot;Notes&quot;, &quot;Resume&quot;, or &quot;MedTech&quot;.
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
                  className={`flex items-center justify-between gap-3 p-3.5 rounded-sm cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[var(--gold)]/15 border-l-2 border-[var(--gold)] text-[var(--parchment)]'
                      : 'text-[var(--ash)] hover:bg-[#18120c] hover:text-[var(--parchment)]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded bg-[#1a140e] border border-[var(--gold-dim)]/40 shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-cinzel text-xs sm:text-sm font-bold text-[var(--parchment)] truncate">
                          {item.title}
                        </span>
                        <span className="font-cinzel text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#201812] border border-[var(--gold-dim)]/30 text-[var(--gold-light)] shrink-0">
                          {item.category}
                        </span>
                      </div>
                      <p className="font-garamond text-xs text-[var(--ash)] truncate mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.action ? (
                      <ExternalLink size={13} className="text-[var(--gold-dim)]" />
                    ) : (
                      <ArrowRight size={13} className="text-[var(--gold-dim)]" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 py-2.5 bg-[#090604] border-t border-[var(--gold-dim)]/30 flex items-center justify-between text-[10px] font-cinzel text-[var(--ash)]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[#1a140e] border border-[var(--gold-dim)]/30 rounded text-[var(--gold)]">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 bg-[#1a140e] border border-[var(--gold-dim)]/30 rounded text-[var(--gold)]">
                ↓
              </kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[#1a140e] border border-[var(--gold-dim)]/30 rounded text-[var(--gold)]">
                ↵
              </kbd>
              <span>Select</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[#1a140e] border border-[var(--gold-dim)]/30 rounded text-[var(--gold)]">
                ESC
              </kbd>
              <span>Dismiss</span>
            </span>
          </div>

          <span className="text-[var(--gold-dim)]">The Realm Search</span>
        </div>
      </div>
    </div>
  );
};
