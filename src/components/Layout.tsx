import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, Mail, Linkedin, Github, ExternalLink, Scroll, Copy, Check, Search, Sparkles } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { CommandPalette } from './CommandPalette';
import { EmberCursor } from './EmberCursor';
import { RESUME_PATH, RESUME_FILENAME } from '../config/constants';

interface LayoutProps {
  children: React.ReactNode;
}

const ROUTE_META: Record<string, { title: string; desc: string }> = {
  '/': {
    title: 'The Realm of Sarthak Jalan | Full-Stack & AI Engineer',
    desc: 'The personal realm of Sarthak Jalan — Full-Stack Developer and AI Engineer, forged in the Game of Thrones visual aesthetic.',
  },
  '/about': {
    title: 'About Sarthak Jalan — Beyond the Houses',
    desc: 'Beyond the houses — meet Sarthak Jalan: Full-Stack Engineer and AI/ML practitioner building intelligent web applications and machine learning systems.',
  },
  '/experience': {
    title: 'Experience — House Lannister | Sarthak Jalan',
    desc: "Sarthak Jalan's professional experience — House Lannister's ledger of deeds, engineering production platforms and predictive ML systems.",
  },
  '/projects': {
    title: 'Projects — House Targaryen | Sarthak Jalan',
    desc: "Sarthak Jalan's featured projects — House Targaryen's armory: Oral Cancer MedTech, VitalVision, and Serenity multimodal AI therapist.",
  },
  '/projects/oral-cancer-medtech': {
    title: 'Oral Cancer MedTech Case Study | Sarthak Jalan',
    desc: 'Deep dive into on-device TFLite neural risk assessment, sub-115ms edge inference, and clinical screening architectures.',
  },
  '/projects/vitalvision': {
    title: 'VitalVision Case Study | Sarthak Jalan',
    desc: 'Clinical AI triage and conversational assistant case study with PyTorch, Firebase, and responsive patient routing.',
  },
  '/projects/serenity': {
    title: 'Serenity AI Companion Case Study | Sarthak Jalan',
    desc: '60/40 multimodal affective therapeutic AI case study combining acoustic vocal features and facial valence detection.',
  },
  '/notes': {
    title: "The Maester's Notes — Technical Scrolls | Sarthak Jalan",
    desc: 'Technical essays on TFLite quantization, multimodal affective fusion, and scaling MERN microservices across the realm.',
  },
  '/notes/optimizing-tflite-edge-inference': {
    title: 'Optimizing TFLite for Edge Diagnostics | The Maester’s Notes',
    desc: 'Engineering sub-5MB quantized neural networks for real-time mobile clinical screening with zero cloud round-trips.',
  },
  '/notes/multimodal-affective-fusion-60-40': {
    title: 'Calibrating 60/40 Multimodal Affective Fusion | The Maester’s Notes',
    desc: 'Balancing acoustic vocal inflections against facial Action Units to eliminate emotion misclassification in therapeutic agents.',
  },
  '/notes/scaling-mern-microservices-westeros': {
    title: 'Architectural Patterns for MERN Microservices | The Maester’s Notes',
    desc: 'Connection pooling, ESR compound indexing, and Redis background queues for high-throughput Node.js architectures.',
  },
  '/character-sheet': {
    title: 'RPG Character Sheet & Codex | Sarthak Jalan',
    desc: 'Downloadable RPG-themed character sheet codex featuring Sarthak’s attributes, combat stats, relics, and achievements.',
  },
  '/skills': {
    title: 'Skills — House Baratheon | Sarthak Jalan',
    desc: "The stag's strength catalogued — Sarthak Jalan's mastery in Python, Java, MySQL, AWS, React, and machine learning pipelines.",
  },
  '/education': {
    title: 'Education — The Citadel | Sarthak Jalan',
    desc: 'The Citadel archives — Sarthak Jalan studying Computer Science with Cloud Computing & Automation specialization at Vellore Institute of Technology.',
  },
  '/certifications': {
    title: 'Certifications — House Greyjoy | Sarthak Jalan',
    desc: "Sarthak Jalan's verified credentials — House Greyjoy's iron price paid in MERN full-stack, cloud computing, and computer networking.",
  },
  '/achievements': {
    title: 'Achievements — House Tyrell | Sarthak Jalan',
    desc: 'Roses that climb — Sarthak Jalan as Matrix Club Technical Lead, two-time Health Hackathon Finalist, and Hacktoberfest contributor.',
  },
  '/contact': {
    title: 'Contact — House Stark | Sarthak Jalan',
    desc: 'Send a raven to Winterfell — contact Sarthak Jalan for engineering opportunities, partnerships, and collaborations.',
  },
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const location = useLocation();

  const copyEmailToClipboard = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const email = 'sarthakjalan06@gmail.com';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3500);
  };

  const handleEmailClick = () => {
    copyEmailToClipboard();
    try {
      window.open('mailto:sarthakjalan06@gmail.com', '_blank');
    } catch {
      // Handled by clipboard fallback
    }
  };

  // Route change: update title & meta description, scroll to top
  useEffect(() => {
    const meta = ROUTE_META[location.pathname] || {
      title: 'Beyond the Wall — 404 | Sarthak Jalan',
      desc: 'You have wandered beyond the Wall into unchartered icy wastes.',
    };

    document.title = meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', meta.desc);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', meta.title);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', meta.desc);
    }
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', '/images/og-default.jpg');
    }

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Universal IntersectionObserver for .fade-up animations across all pages
  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.fade-up:not(.visible)');
      if (!elements.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              const delay = el.dataset.delay ? parseInt(el.dataset.delay, 10) : 0;
              if (delay > 0) {
                setTimeout(() => el.classList.add('visible'), delay);
              } else {
                el.classList.add('visible');
              }
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
      );

      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, 60);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Realm' },
    { to: '/about', label: 'About' },
    { to: '/experience', label: 'Experience' },
    { to: '/projects', label: 'Projects' },
    { to: '/notes', label: 'Notes' },
    { to: '/skills', label: 'Skills' },
    { to: '/education', label: 'Education' },
    { to: '/certifications', label: 'Certifications' },
    { to: '/achievements', label: 'Achievements' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-[#050403] text-[var(--parchment)] relative selection:bg-[var(--gold)] selection:text-[var(--ink)]">
      {/* Ember Cursor particle trail (desktop only) */}
      <EmberCursor />

      {/* Send a Raven Command Palette (Cmd/Ctrl + K) */}
      <CommandPalette />

      {/* Global Grain & Vignette */}
      <div className="got-grain" />
      <div className="got-vignette" />

      {/* Persistent Site-wide Navigation */}
      <header
        className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#050403]/85 transition-all duration-300"
        style={{ borderBottom: '1px solid color-mix(in srgb, var(--gold-dim) 35%, transparent)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            viewTransition
            className="flex items-center gap-2 group text-decoration-none min-h-[44px]"
            aria-label="Sarthak Jalan Home"
          >
            <span className="font-cinzel-dec text-base sm:text-lg tracking-[0.2em] text-[var(--gold)] uppercase group-hover:text-[var(--gold-light)] transition-colors">
              Sarthak Jalan
            </span>
            <span className="text-xs text-[var(--gold-dim)] font-cinzel tracking-widest hidden sm:inline-block">
              · Realm
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-4 2xl:gap-6" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                viewTransition
                className={({ isActive }) =>
                  `font-cinzel text-xs tracking-[0.2em] uppercase transition-colors relative min-h-[44px] flex items-center px-1 cursor-pointer ${
                    isActive
                      ? 'text-[var(--gold-light)] font-semibold'
                      : 'text-[var(--ash)] hover:text-[var(--gold-light)]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-2 left-0 right-0 h-[2px] bg-[var(--gold)] shadow-[0_0_8px_var(--gold)]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Actions: Command Palette ⌘K, Resume Scroll, and Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5">
            {/* Command Palette Trigger Button */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 border border-[var(--gold-dim)]/40 hover:border-[var(--gold)] bg-[#120d08] text-[var(--gold-light)] font-cinzel text-xs tracking-wider transition-all hover:bg-[var(--gold)]/10 cursor-pointer min-h-[38px]"
              title="Search the realm (Press ⌘K or Ctrl+K)"
              aria-label="Search the realm with Command K"
            >
              <Search size={13} className="text-[var(--gold)] shrink-0" />
              <span className="hidden sm:inline">Raven</span>
              <kbd className="text-[10px] bg-[#1e160e] border border-[var(--gold-dim)]/40 px-1 py-0.5 text-[var(--gold)] rounded-sm">
                ⌘K
              </kbd>
            </button>

            {/* Resume Button */}
            <a
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              className="got-cta-ghost text-[10px] tracking-[0.25em] py-2 px-3 hidden lg:inline-flex items-center gap-1.5 min-h-[38px]"
              title="Download Curriculum Vitae Scroll"
              aria-label="Download Sarthak Jalan Resume Scroll"
            >
              <Scroll size={13} className="text-[var(--gold)] shrink-0" />
              <span>Scroll</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className="xl:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 border border-[var(--gold-dim)] text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-colors cursor-pointer"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Off-canvas Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Routed Content */}
      <main className="relative z-10">{children}</main>

      {/* Persistent Footer */}
      <footer
        className="relative z-20 bg-gradient-to-b from-[#0a0805] to-[#050403] py-20 sm:py-28 px-4 sm:px-8 overflow-hidden"
        style={{ borderTop: '2px solid color-mix(in srgb, var(--gold) 45%, transparent)' }}
      >
        <div className="relative max-w-7xl mx-auto">
          {/* Top: Ornamental Divider */}
          <div className="flex items-center justify-center gap-6 mb-14 sm:mb-20">
            <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent to-[#c8a860]" />
            <span className="text-xl sm:text-2xl text-[#e8c97a] drop-shadow-[0_0_12px_rgba(232,201,122,0.4)]">✦</span>
            <div className="flex-1 h-[1.5px] bg-gradient-to-l from-transparent to-[#c8a860]" />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-14 mb-16 sm:mb-20">
            {/* Left: Avatar Badge & Name + Description */}
            <div className="flex flex-col items-start justify-start md:col-span-1">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#e8c97a] via-[#d4b860] to-[#c8a860] flex items-center justify-center text-[#050403] font-cinzel-dec font-bold text-base tracking-wider shadow-lg shadow-[#e8c97a]/30">
                  SJ
                </div>
                <div>
                  <h2 className="font-cinzel-dec text-2xl font-bold text-[var(--gold-light)] tracking-wide">
                    Sarthak
                  </h2>
                  <p className="font-cinzel text-xs tracking-[0.2em] text-[#c8a860] uppercase font-semibold">
                    Jalan
                  </p>
                </div>
              </div>
              <p className="font-garamond text-sm text-[var(--ash)] leading-[1.75] max-w-sm mb-4">
                Full-Stack Engineer &amp; AI Architect. Building resilient intelligent systems across the realms of code and consciousness.
              </p>

              {/* Quick Search Shortcut Trigger */}
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
                className="inline-flex items-center gap-2 text-xs font-cinzel text-[var(--gold-dim)] hover:text-[var(--gold)] transition-colors"
              >
                <Search size={12} className="text-[var(--gold)]" />
                <span>Press ⌘K or Ctrl+K to send a raven</span>
              </button>
            </div>

            {/* Center: Main Navigation */}
            <div className="md:col-span-1">
              <h3 className="font-cinzel text-[11px] sm:text-xs tracking-[0.35em] text-[#e8c97a] uppercase font-bold mb-6 block">
                ✦ Citadel Navigation
              </h3>
              <nav className="grid grid-cols-2 gap-3 text-xs sm:text-sm font-cinzel">
                <Link to="/about" viewTransition className="text-[var(--ash)] hover:text-[#e8c97a] transition-colors">
                  About Sarthak
                </Link>
                <Link to="/experience" viewTransition className="text-[var(--ash)] hover:text-[#e8c97a] transition-colors">
                  Experience
                </Link>
                <Link to="/projects" viewTransition className="text-[var(--ash)] hover:text-[#e8c97a] transition-colors">
                  Projects
                </Link>
                <Link to="/notes" viewTransition className="text-[var(--gold-light)] hover:text-[var(--gold)] transition-colors font-semibold">
                  Maester Notes
                </Link>
                <Link to="/skills" viewTransition className="text-[var(--ash)] hover:text-[#e8c97a] transition-colors">
                  Skills Arsenal
                </Link>
                <Link to="/achievements" viewTransition className="text-[var(--ash)] hover:text-[#e8c97a] transition-colors">
                  Achievements
                </Link>
                <Link to="/education" viewTransition className="text-[var(--ash)] hover:text-[#e8c97a] transition-colors">
                  Education
                </Link>
                <Link to="/contact" viewTransition className="text-[var(--ash)] hover:text-[#e8c97a] transition-colors">
                  House Stark (Contact)
                </Link>
                <Link
                  to="/character-sheet"
                  viewTransition
                  className="col-span-2 text-[var(--gold-dim)] hover:text-[var(--gold)] transition-colors flex items-center gap-1.5 text-xs italic"
                >
                  <Sparkles size={11} className="text-[var(--gold)]" />
                  <span>RPG Character Sheet (Easter Egg)</span>
                </Link>
              </nav>
            </div>

            {/* Right: Connect & CTA */}
            <div className="md:col-span-1">
              <h3 className="font-cinzel text-[11px] sm:text-xs tracking-[0.35em] text-[#e8c97a] uppercase font-bold mb-6 block">
                ✦ Dispatch
              </h3>
              <div className="flex flex-col gap-3.5">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleEmailClick}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-cinzel text-[var(--ash)] hover:text-[#e8c97a] transition-colors"
                  >
                    <Mail size={14} className="text-[var(--gold)]" />
                    <span>{copiedEmail ? 'Email Copied!' : 'sarthakjalan06@gmail.com'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={copyEmailToClipboard}
                    className="p-1 text-[var(--ash)] hover:text-[var(--gold)]"
                    title="Copy email to clipboard"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  </button>
                </div>

                <a
                  href="https://www.linkedin.com/in/sarthak-jalan-7685a7285/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-cinzel text-[var(--ash)] hover:text-[#e8c97a] transition-colors"
                >
                  <Linkedin size={14} className="text-[var(--gold)]" />
                  <span>LinkedIn Profile</span>
                </a>

                <a
                  href="https://github.com/sarthakjalan05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-cinzel text-[var(--ash)] hover:text-[#e8c97a] transition-colors"
                >
                  <Github size={14} className="text-[var(--gold)]" />
                  <span>GitHub Armory</span>
                </a>
              </div>
            </div>
          </div>

          {/* Resume CTA Button */}
          <div className="flex justify-center mb-14 sm:mb-18">
            <a
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              className="got-cta-btn min-h-[50px] px-8 sm:px-12 py-3 flex items-center justify-center gap-3 text-xs tracking-[0.25em] font-cinzel font-semibold shadow-[0_0_25px_rgba(201,168,76,0.35)] hover:shadow-[0_0_40px_rgba(201,168,76,0.55)] transition-all"
              aria-label="Download Sarthak Jalan Resume PDF"
            >
              <Scroll size={17} className="shrink-0" />
              <span>DOWNLOAD THE SCROLL</span>
            </a>
          </div>

          {/* Dividers */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#c8a860]/40 to-transparent mb-8" />

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs font-cinzel text-[var(--ash)]">
            <p className="tracking-[0.25em] uppercase text-[#e8c97a]">
              © {new Date().getFullYear()} SARTHAK JALAN · ALL RIGHTS RESERVED
            </p>
            <p className="text-[#c8a860]">
              VIT Vellore · Remote Ready
            </p>
          </div>
        </div>
      </footer>

      {/* Email Copied Notification Toast */}
      {copiedEmail && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 bg-[#0f0c08] border border-[#c8a860] text-[var(--parchment)] shadow-[0_0_30px_rgba(200,168,96,0.45)] backdrop-blur-md rounded-none transition-all"
        >
          <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center shrink-0">
            <Check size={14} className="text-emerald-400" />
          </span>
          <div className="flex flex-col">
            <span className="font-cinzel text-xs uppercase tracking-wider text-[#e8c97a] font-semibold">
              Email Address Copied
            </span>
            <span className="font-garamond text-sm text-[var(--parchment)]">
              sarthakjalan06@gmail.com
            </span>
          </div>
        </aside>
      )}
    </div>
  );
};
