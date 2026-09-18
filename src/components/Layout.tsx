import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, Mail, Linkedin, Github, FileText, Copy, Check, Search, Sparkles } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { CommandPalette } from './CommandPalette';
import { EmberCursor } from './EmberCursor';
import { RESUME_PATH, RESUME_FILENAME } from '../config/constants';

interface LayoutProps {
  children: React.ReactNode;
}

const ROUTE_META: Record<string, { title: string; desc: string }> = {
  '/': {
    title: 'Sarthak Jalan | Full-Stack & AI Systems Engineer',
    desc: 'Portfolio and engineering dossier of Sarthak Jalan — Full-Stack Developer and AI/ML Engineer building high-throughput web applications and edge intelligence platforms.',
  },
  '/about': {
    title: 'About Sarthak Jalan | Systems & AI Engineer',
    desc: 'Meet Sarthak Jalan: Full-Stack Engineer and AI/ML practitioner building intelligent web applications and machine learning systems.',
  },
  '/experience': {
    title: 'Experience | Sarthak Jalan · Work History',
    desc: "Sarthak Jalan's professional engineering experience — production platforms, predictive ML pipelines at Weatherford, and full-stack software development.",
  },
  '/projects': {
    title: 'Projects Matrix | Sarthak Jalan · Applied AI',
    desc: "Sarthak Jalan's featured projects: Oral Cancer MedTech edge inference, VitalVision clinical triage, and Serenity multimodal AI assistant.",
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
    title: 'Technical Notes & Engineering Articles | Sarthak Jalan',
    desc: 'Technical essays on TFLite quantization, multimodal affective fusion, and scaling MERN microservices in production.',
  },
  '/notes/optimizing-tflite-edge-inference': {
    title: 'Optimizing TFLite for Edge Diagnostics | Technical Notes',
    desc: 'Engineering sub-5MB quantized neural networks for real-time mobile clinical screening with zero cloud round-trips.',
  },
  '/notes/multimodal-affective-fusion-60-40': {
    title: 'Calibrating 60/40 Multimodal Affective Fusion | Technical Notes',
    desc: 'Balancing acoustic vocal inflections against facial Action Units to eliminate emotion misclassification in therapeutic agents.',
  },
  '/notes/scaling-mern-microservices-westeros': {
    title: 'Architectural Patterns for MERN Microservices | Technical Notes',
    desc: 'Connection pooling, ESR compound indexing, and Redis background queues for high-throughput Node.js architectures.',
  },
  '/character-sheet': {
    title: 'System Attributes & Stats | Sarthak Jalan',
    desc: 'Engineering telemetry and attributes dossier featuring Sarthak’s capabilities, technology stats, and benchmarks.',
  },
  '/skills': {
    title: 'Technical Skills Matrix | Sarthak Jalan',
    desc: "Sarthak Jalan's technical competency matrix across Python, Java, MySQL, AWS, React, PyTorch, and machine learning pipelines.",
  },
  '/education': {
    title: 'Academic Records | Sarthak Jalan · VIT',
    desc: 'Academic records — Sarthak Jalan studying Computer Science with Cloud Computing & Automation specialization at Vellore Institute of Technology.',
  },
  '/certifications': {
    title: 'Certifications & Accreditations | Sarthak Jalan',
    desc: "Sarthak Jalan's verified credentials in MERN full-stack, cloud computing, and neural network engineering.",
  },
  '/achievements': {
    title: 'Achievements & Benchmarks | Sarthak Jalan',
    desc: 'Competitive milestones — Sarthak Jalan as Matrix Club Technical Lead, two-time Health Hackathon Finalist, and Flipkart GRiD top percentile.',
  },
  '/contact': {
    title: 'Contact Terminal & Uplink | Sarthak Jalan',
    desc: 'Direct communication uplink — contact Sarthak Jalan for engineering opportunities, partnerships, and collaborations.',
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
    setTimeout(() => setCopiedEmail(false), 3000);
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
      title: 'SYS://404 · Route Not Found | Sarthak Jalan',
      desc: 'The requested transmission route does not exist on this node.',
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
    { to: '/', label: 'Root' },
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
    <div className="min-h-screen bg-[#07080c] text-[var(--text)] relative selection:bg-[var(--cyan)] selection:text-[#07080c]">
      {/* Cyber Particle Cursor (desktop only) */}
      <EmberCursor />

      {/* Command Palette (Cmd/Ctrl + K) */}
      <CommandPalette />

      {/* Animated Cyber Grid & Vignette */}
      <div className="cyber-grid" />
      <div className="got-vignette" />

      {/* Persistent Navigation */}
      <header
        className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#07080c]/90 border-b border-[rgba(0,240,255,0.2)] transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            viewTransition
            className="flex items-center gap-2 group text-decoration-none min-h-[44px]"
            aria-label="Sarthak Jalan Home"
          >
            <span className="font-orbitron text-base sm:text-lg tracking-wider text-[var(--cyan)] font-extrabold uppercase group-hover:text-white transition-colors">
              SARTHAK JALAN
            </span>
            <span className="text-[10px] text-[var(--cyan-dim)] font-chakra tracking-widest hidden sm:inline-block uppercase">
              // SYS.01
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-4 2xl:gap-5" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                viewTransition
                className={({ isActive }) =>
                  `font-chakra text-xs tracking-wider uppercase transition-colors relative min-h-[44px] flex items-center px-1.5 cursor-pointer font-semibold ${
                    isActive
                      ? 'text-[var(--cyan)]'
                      : 'text-[var(--text-muted)] hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-2 left-0 right-0 h-[2px] bg-[var(--cyan)] shadow-[0_0_10px_var(--cyan)]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Actions: Command Palette ⌘K, Resume, and Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            {/* Command Palette Trigger */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 border border-[rgba(0,240,255,0.3)] hover:border-[var(--cyan)] bg-[#0d1017] text-[var(--cyan)] font-chakra text-xs tracking-wider transition-all hover:bg-[rgba(0,240,255,0.08)] cursor-pointer min-h-[38px] rounded"
              title="Search system modules (Press ⌘K or Ctrl+K)"
              aria-label="Search with Command K"
            >
              <Search size={13} className="text-[var(--cyan)] shrink-0" />
              <span className="hidden sm:inline">CMD</span>
              <kbd className="text-[10px] bg-[#07080c] border border-[rgba(0,240,255,0.25)] px-1 py-0.5 text-[var(--cyan)] rounded">
                ⌘K
              </kbd>
            </button>

            {/* Resume Button */}
            <a
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              className="cyber-ghost text-[10px] tracking-wider py-1.5 px-3 hidden lg:inline-flex items-center gap-1.5 min-h-[38px] rounded"
              style={{ borderColor: 'rgba(0, 240, 255, 0.4)', color: 'var(--text)' }}
              title="Download Technical Resume PDF"
              aria-label="Download Sarthak Jalan Resume PDF"
            >
              <FileText size={13} className="text-[var(--cyan)] shrink-0" />
              <span>RESUME</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className="xl:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 border border-[rgba(0,240,255,0.3)] text-[var(--cyan)] hover:bg-[rgba(0,240,255,0.1)] transition-colors cursor-pointer rounded"
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
        className="relative z-20 bg-[#07080c] border-t border-[rgba(0,240,255,0.25)] py-16 sm:py-20 px-4 sm:px-8 overflow-hidden"
      >
        <div className="relative max-w-7xl mx-auto">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-14 mb-14">
            {/* Left: Brand + Description */}
            <div className="flex flex-col items-start justify-start md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded border border-[var(--cyan-dim)] bg-[#0d1017] flex items-center justify-center text-[var(--cyan)] font-orbitron font-bold text-sm shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                  SJ
                </div>
                <div>
                  <h2 className="font-orbitron text-xl font-bold text-[var(--text)] tracking-wider">
                    SARTHAK JALAN
                  </h2>
                  <p className="font-chakra text-[11px] tracking-widest text-[var(--cyan)] uppercase font-semibold">
                    AI &amp; Distributed Systems Engineer
                  </p>
                </div>
              </div>
              <p className="font-space text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed max-w-sm mb-4">
                Developing low-latency edge machine learning platforms, full-stack microservices, and multimodal clinical triage systems.
              </p>

              {/* Quick Search Trigger */}
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
                className="inline-flex items-center gap-2 text-xs font-chakra text-[var(--cyan)] hover:text-white transition-colors"
              >
                <Search size={12} className="text-[var(--cyan)]" />
                <span>Press ⌘K or Ctrl+K for quick command lookup</span>
              </button>
            </div>

            {/* Center: System Index Navigation */}
            <div className="md:col-span-1">
              <h3 className="font-chakra text-[11px] sm:text-xs tracking-[0.25em] text-[var(--cyan)] uppercase font-bold mb-5 block">
                SYS://SYSTEM.INDEX
              </h3>
              <nav className="grid grid-cols-2 gap-2.5 text-xs font-chakra">
                <Link to="/about" viewTransition className="text-[var(--text-muted)] hover:text-white transition-colors">
                  About Engineer
                </Link>
                <Link to="/experience" viewTransition className="text-[var(--text-muted)] hover:text-white transition-colors">
                  Experience Log
                </Link>
                <Link to="/projects" viewTransition className="text-[var(--text-muted)] hover:text-white transition-colors">
                  Projects Matrix
                </Link>
                <Link to="/notes" viewTransition className="text-[var(--cyan)] hover:text-white transition-colors font-semibold">
                  Technical Notes
                </Link>
                <Link to="/skills" viewTransition className="text-[var(--text-muted)] hover:text-white transition-colors">
                  Skills Matrix
                </Link>
                <Link to="/achievements" viewTransition className="text-[var(--text-muted)] hover:text-white transition-colors">
                  Achievements
                </Link>
                <Link to="/education" viewTransition className="text-[var(--text-muted)] hover:text-white transition-colors">
                  Academic Records
                </Link>
                <Link to="/contact" viewTransition className="text-[var(--text-muted)] hover:text-white transition-colors">
                  Contact Terminal
                </Link>
                <Link
                  to="/character-sheet"
                  viewTransition
                  className="col-span-2 text-[var(--cyan-dim)] hover:text-[var(--cyan)] transition-colors flex items-center gap-1.5 text-xs pt-1"
                >
                  <Sparkles size={11} className="text-[var(--cyan)]" />
                  <span>Engineering Attribute Sheet (Easter Egg)</span>
                </Link>
              </nav>
            </div>

            {/* Right: Direct Transmission Channels */}
            <div className="md:col-span-1">
              <h3 className="font-chakra text-[11px] sm:text-xs tracking-[0.25em] text-[var(--cyan)] uppercase font-bold mb-5 block">
                SYS://COMMUNICATION.UPLINK
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleEmailClick}
                    className="inline-flex items-center gap-2 text-xs font-space text-[var(--text-muted)] hover:text-white transition-colors"
                  >
                    <Mail size={13} className="text-[var(--cyan)]" />
                    <span>{copiedEmail ? 'Email Copied!' : 'sarthakjalan06@gmail.com'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={copyEmailToClipboard}
                    className="p-1 text-[var(--text-muted)] hover:text-[var(--cyan)]"
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
                  className="inline-flex items-center gap-2 text-xs font-space text-[var(--text-muted)] hover:text-white transition-colors"
                >
                  <Linkedin size={13} className="text-[var(--cyan)]" />
                  <span>LinkedIn Profile</span>
                </a>

                <a
                  href="https://github.com/sarthakjalan05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-space text-[var(--text-muted)] hover:text-white transition-colors"
                >
                  <Github size={13} className="text-[var(--cyan)]" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>
          </div>

          {/* Resume CTA Button */}
          <div className="flex justify-center mb-12">
            <a
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              className="got-cta-btn min-h-[46px] px-8 sm:px-10 py-2.5 flex items-center justify-center gap-2.5 text-xs tracking-wider font-chakra font-bold rounded shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_35px_rgba(0,240,255,0.45)] transition-all"
              style={{ background: 'var(--cyan)', color: '#07080c' }}
              aria-label="Download Sarthak Jalan Resume PDF"
            >
              <FileText size={15} className="shrink-0" />
              <span>DOWNLOAD RESUME DOSSIER (PDF)</span>
            </a>
          </div>

          {/* Bottom Divider & Copyright */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[rgba(0,240,255,0.25)] to-transparent mb-6" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs font-chakra text-[var(--text-muted)]">
            <p className="tracking-widest uppercase text-[var(--cyan)]">
              © {new Date().getFullYear()} SARTHAK JALAN · ALL RIGHTS RESERVED
            </p>
            <p className="text-[var(--text-muted)]">
              BANGALORE &amp; VELLORE, INDIA · REMOTE READY
            </p>
          </div>
        </div>
      </footer>

      {/* Email Copied Toast */}
      {copiedEmail && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#0d1017] border border-[var(--cyan)] text-[var(--text)] shadow-[0_0_25px_rgba(0,240,255,0.35)] backdrop-blur-md rounded transition-all"
        >
          <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-400 flex items-center justify-center shrink-0">
            <Check size={12} className="text-emerald-400" />
          </span>
          <div className="flex flex-col">
            <span className="font-chakra text-xs uppercase tracking-wider text-[var(--cyan)] font-semibold">
              Email Copied
            </span>
            <span className="font-space text-xs text-[var(--text)]">
              sarthakjalan06@gmail.com
            </span>
          </div>
        </aside>
      )}
    </div>
  );
};
