import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, Mail, Phone, Linkedin, Github, ExternalLink, Scroll } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { RESUME_PATH, RESUME_FILENAME } from '../config/constants';

interface LayoutProps {
  children: React.ReactNode;
}

const ROUTE_META: Record<string, { title: string; desc: string }> = {
  '/': {
    title: 'The Realm of Sarthak Jalan | Full-Stack & AI Engineer',
    desc: 'The personal realm of Sarthak Jalan — Full-Stack Developer and AI Engineer, forged in the Game of Thrones visual aesthetic.',
  },
  '/experience': {
    title: 'Experience — House Lannister | Sarthak Jalan',
    desc: "Sarthak Jalan's professional experience — House Lannister's ledger of deeds, engineering production platforms and predictive ML systems.",
  },
  '/projects': {
    title: 'Projects — House Targaryen | Sarthak Jalan',
    desc: "Sarthak Jalan's featured projects — House Targaryen's armory: Oral Cancer MedTech, VitalVision, and Serenity multimodal AI therapist.",
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
  const location = useLocation();

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

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Universal IntersectionObserver for .fade-up animations across all pages
  useEffect(() => {
    // Short timeout to allow new route DOM elements to mount
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
    { to: '/experience', label: 'Experience' },
    { to: '/projects', label: 'Projects' },
    { to: '/skills', label: 'Skills' },
    { to: '/education', label: 'Citadel' },
    { to: '/certifications', label: 'Certifications' },
    { to: '/achievements', label: 'Achievements' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-[#050403] text-[var(--parchment)] relative selection:bg-[var(--gold)] selection:text-[var(--ink)]">
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
          <nav className="hidden md:flex items-center gap-5 lg:gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-cinzel text-xs tracking-[0.22em] uppercase transition-colors relative min-h-[44px] flex items-center px-1.5 py-1 ${
                    isActive
                      ? 'text-[var(--gold-light)] font-semibold'
                      : 'text-[var(--ash)] hover:text-[var(--gold-light)]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-2 left-0 right-0 h-[2px] bg-[var(--gold)] shadow-[0_0_8px_var(--gold)]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Action: Resume Scroll on Desktop & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              className="got-cta-ghost text-[10px] tracking-[0.25em] py-2 px-3.5 hidden lg:inline-flex items-center gap-1.5 min-h-[38px]"
              title="Download Curriculum Vitae Scroll"
              aria-label="Download Sarthak Jalan Resume Scroll"
            >
              <Scroll size={13} className="text-[var(--gold)] shrink-0" />
              <span>The Scroll</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 border border-[var(--gold-dim)] text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-colors"
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
        className="relative z-20 bg-[#070504] py-20 sm:py-28 px-4 sm:px-8 text-center overflow-hidden"
        style={{ borderTop: '1px solid color-mix(in srgb, var(--gold-dim) 40%, transparent)' }}
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
          {/* 1. Flanked Ornament Divider */}
          <div className="got-divider max-w-xs mx-auto mb-6 sm:mb-8">
            <div className="got-divider-line" />
            <div className="got-divider-diamond" />
            <div className="got-divider-line right" />
          </div>

          {/* 2. Prominent Wordmark Heading */}
          <h2 className="font-cinzel-dec text-2xl sm:text-3xl md:text-4xl text-[var(--gold)] font-bold tracking-[0.2em] sm:tracking-[0.24em] uppercase text-center pl-[0.2em] sm:pl-[0.24em] mb-4 sm:mb-5 drop-shadow-[0_0_25px_rgba(201,168,76,0.35)]">
            The Realm of Sarthak Jalan
          </h2>

          {/* 3. House Motto Quote */}
          <p className="font-fell italic text-base sm:text-lg md:text-xl text-[var(--ash)] max-w-2xl mx-auto leading-relaxed text-center mb-8 sm:mb-10 px-4">
            "When you play the game of code, you build for resilience, intelligence, and permanence."
          </p>

          {/* 4. Action Button: Resume Download CTA */}
          <div className="flex justify-center mb-10 sm:mb-12">
            <a
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              className="got-cta-btn min-h-[48px] px-8 sm:px-10 py-3.5 flex items-center justify-center gap-3 text-xs sm:text-sm tracking-[0.25em] shadow-[0_0_25px_rgba(201,168,76,0.3)] hover:shadow-[0_0_35px_rgba(201,168,76,0.5)] transition-all"
              aria-label="Download Sarthak Jalan Resume PDF"
            >
              <Scroll size={17} className="shrink-0" />
              <span>Download the Scroll (Resume PDF)</span>
            </a>
          </div>

          {/* 5. Contact & Social Group (Interactive icon-plus-label pills) */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5 max-w-4xl mx-auto mb-12 sm:mb-14 px-2">
            <a
              href="mailto:sarthakjalan06@gmail.com"
              className="group min-h-[44px] inline-flex items-center gap-2.5 px-4 py-2.5 bg-[#120d09]/75 hover:bg-[#1c140c] border border-[#2e261a] hover:border-[var(--gold)] hover:shadow-[0_0_20px_rgba(201,168,76,0.25)] hover:-translate-y-0.5 transition-all duration-300 text-xs font-cinzel tracking-wider text-[var(--parchment)] hover:text-[var(--gold-light)]"
              aria-label="Email Sarthak Jalan"
            >
              <span className="w-6 h-6 rounded-full border border-[#3e3424] group-hover:border-[var(--gold)] flex items-center justify-center bg-[#18110a] text-[var(--gold)] transition-colors shrink-0">
                <Mail size={13} />
              </span>
              <span className="truncate max-w-[210px] sm:max-w-none">sarthakjalan06@gmail.com</span>
            </a>

            <a
              href="tel:+919874255221"
              className="group min-h-[44px] inline-flex items-center gap-2.5 px-4 py-2.5 bg-[#120d09]/75 hover:bg-[#1c140c] border border-[#2e261a] hover:border-[var(--gold)] hover:shadow-[0_0_20px_rgba(201,168,76,0.25)] hover:-translate-y-0.5 transition-all duration-300 text-xs font-cinzel tracking-wider text-[var(--parchment)] hover:text-[var(--gold-light)]"
              aria-label="Call Sarthak Jalan"
            >
              <span className="w-6 h-6 rounded-full border border-[#3e3424] group-hover:border-[var(--gold)] flex items-center justify-center bg-[#18110a] text-[var(--gold)] transition-colors shrink-0">
                <Phone size={13} />
              </span>
              <span>+91-9874255221</span>
            </a>

            <a
              href="https://linkedin.com/in/sarthak-jalan"
              target="_blank"
              rel="noopener noreferrer"
              className="group min-h-[44px] inline-flex items-center gap-2.5 px-4 py-2.5 bg-[#120d09]/75 hover:bg-[#1c140c] border border-[#2e261a] hover:border-[var(--gold)] hover:shadow-[0_0_20px_rgba(201,168,76,0.25)] hover:-translate-y-0.5 transition-all duration-300 text-xs font-cinzel tracking-wider text-[var(--parchment)] hover:text-[var(--gold-light)]"
              aria-label="Sarthak Jalan on LinkedIn"
            >
              <span className="w-6 h-6 rounded-full border border-[#3e3424] group-hover:border-[var(--gold)] flex items-center justify-center bg-[#18110a] text-[var(--gold)] transition-colors shrink-0">
                <Linkedin size={13} />
              </span>
              <span>LinkedIn</span>
              <ExternalLink size={12} className="opacity-50 group-hover:opacity-100 group-hover:text-[var(--gold)] transition-all shrink-0 ml-0.5" />
            </a>

            <a
              href="https://github.com/sarthakjalan05"
              target="_blank"
              rel="noopener noreferrer"
              className="group min-h-[44px] inline-flex items-center gap-2.5 px-4 py-2.5 bg-[#120d09]/75 hover:bg-[#1c140c] border border-[#2e261a] hover:border-[var(--gold)] hover:shadow-[0_0_20px_rgba(201,168,76,0.25)] hover:-translate-y-0.5 transition-all duration-300 text-xs font-cinzel tracking-wider text-[var(--parchment)] hover:text-[var(--gold-light)]"
              aria-label="Sarthak Jalan on GitHub"
            >
              <span className="w-6 h-6 rounded-full border border-[#3e3424] group-hover:border-[var(--gold)] flex items-center justify-center bg-[#18110a] text-[var(--gold)] transition-colors shrink-0">
                <Github size={13} />
              </span>
              <span>GitHub</span>
              <ExternalLink size={12} className="opacity-50 group-hover:opacity-100 group-hover:text-[var(--gold)] transition-all shrink-0 ml-0.5" />
            </a>
          </div>

          {/* 6. Distinct Separated Closing Section: Copyright */}
          <div
            className="w-full max-w-2xl mx-auto pt-8 flex flex-col items-center justify-center text-center"
            style={{ borderTop: '1px solid color-mix(in srgb, var(--gold-dim) 25%, transparent)' }}
          >
            <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.25em] text-[#827563] uppercase">
              © {new Date().getFullYear()} Sarthak Jalan · All Rights Sworn Across the Realm
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
