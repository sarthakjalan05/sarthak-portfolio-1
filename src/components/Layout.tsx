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
    { to: '/education', label: 'Education' },
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
        className="relative z-20 bg-gradient-to-b from-[#0a0805] to-[#050403] py-24 sm:py-32 md:py-40 px-4 sm:px-8 overflow-hidden"
        style={{ borderTop: '2px solid color-mix(in srgb, var(--gold) 45%, transparent)' }}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#e8c97a] opacity-3 blur-3xl rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Top: Ornamental Divider */}
          <div className="flex items-center justify-center gap-6 mb-16 sm:mb-24">
            <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent to-[#c8a860]" />
            <span className="text-2xl sm:text-3xl text-[#e8c97a] drop-shadow-[0_0_12px_rgba(232,201,122,0.4)]">✦</span>
            <div className="flex-1 h-[1.5px] bg-gradient-to-l from-transparent to-[#c8a860]" />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 mb-20 sm:mb-28">
            {/* Left: Avatar Badge & Name + Description */}
            <div className="flex flex-col items-start justify-start md:col-span-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#e8c97a] via-[#d4b860] to-[#c8a860] flex items-center justify-center text-[#050403] font-cinzel-dec font-bold text-lg tracking-wider shadow-lg shadow-[#e8c97a]/30">
                  SJ
                </div>
                <div>
                  <h2 className="font-cinzel-dec text-2xl sm:text-3xl font-bold text-[var(--gold-light)] tracking-wide drop-shadow-[0_0_15px_rgba(232,201,122,0.3)]">
                    Sarthak
                  </h2>
                  <p className="font-cinzel text-xs tracking-[0.2em] text-[#c8a860] uppercase font-semibold">
                    Jalan
                  </p>
                </div>
              </div>
              <p className="font-garamond text-base text-[var(--ash)] leading-[1.75] max-w-sm">
                Full-Stack Engineer & AI Architect. Building intelligent, resilient systems across the realms of code and consciousness.
              </p>
            </div>

            {/* Center: Main Navigation */}
            <div className="md:col-span-1">
              <h3 className="font-cinzel text-[11px] sm:text-xs tracking-[0.35em] text-[#e8c97a] uppercase font-bold mb-8 block drop-shadow-[0_0_10px_rgba(232,201,122,0.2)]">
                ✦ Navigation
              </h3>
              <nav className="flex flex-col gap-4 text-sm sm:text-base font-cinzel">
                <a 
                  href="/" 
                  className="text-[var(--ash)] hover:text-[#e8c97a] transition-all duration-300 hover:translate-x-1 flex items-center gap-2"
                >
                  <span className="text-[#e8c97a] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span className="group">About</span>
                </a>
                <a 
                  href="/skills" 
                  className="text-[var(--ash)] hover:text-[#e8c97a] transition-all duration-300 hover:translate-x-1 flex items-center gap-2"
                >
                  <span className="text-[#e8c97a] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Skills</span>
                </a>
                <a 
                  href="/projects" 
                  className="text-[var(--ash)] hover:text-[#e8c97a] transition-all duration-300 hover:translate-x-1 flex items-center gap-2"
                >
                  <span className="text-[#e8c97a] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Projects</span>
                </a>
                <a 
                  href="/experience" 
                  className="text-[var(--ash)] hover:text-[#e8c97a] transition-all duration-300 hover:translate-x-1 flex items-center gap-2"
                >
                  <span className="text-[#e8c97a] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Experience</span>
                </a>
              </nav>
            </div>

            {/* Right: Connect & CTA */}
            <div className="md:col-span-1">
              <h3 className="font-cinzel text-[11px] sm:text-xs tracking-[0.35em] text-[#e8c97a] uppercase font-bold mb-8 block drop-shadow-[0_0_10px_rgba(232,201,122,0.2)]">
                ✦ Connect
              </h3>
              <div className="flex flex-col gap-4">
                <a
                  href="mailto:sarthakjalan06@gmail.com"
                  className="inline-flex items-center gap-3 text-sm sm:text-base font-cinzel text-[var(--ash)] hover:text-[#e8c97a] transition-all duration-300 group"
                >
                  <span className="w-8 h-8 rounded-full border border-[#c8a860] flex items-center justify-center text-[#e8c97a] group-hover:bg-[#e8c97a]/10 group-hover:border-[#e8c97a] transition-all shrink-0">
                    ✉
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">Email</span>
                </a>
                <a
                  href="https://linkedin.com/in/sarthak-jalan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm sm:text-base font-cinzel text-[var(--ash)] hover:text-[#e8c97a] transition-all duration-300 group"
                >
                  <span className="w-8 h-8 rounded-full border border-[#c8a860] flex items-center justify-center text-[#e8c97a] group-hover:bg-[#e8c97a]/10 group-hover:border-[#e8c97a] transition-all shrink-0 font-bold text-xs">
                    in
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">LinkedIn</span>
                </a>
                <a
                  href="https://github.com/sarthakjalan05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm sm:text-base font-cinzel text-[var(--ash)] hover:text-[#e8c97a] transition-all duration-300 group"
                >
                  <span className="w-8 h-8 rounded-full border border-[#c8a860] flex items-center justify-center text-[#e8c97a] group-hover:bg-[#e8c97a]/10 group-hover:border-[#e8c97a] transition-all shrink-0">
                    ⚡
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Resume CTA Button - Prominent */}
          <div className="flex justify-center mb-20 sm:mb-28">
            <a
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              className="got-cta-btn min-h-[56px] px-10 sm:px-14 py-4 flex items-center justify-center gap-3 text-xs sm:text-sm tracking-[0.25em] font-cinzel font-semibold shadow-[0_0_30px_rgba(201,168,76,0.4)] hover:shadow-[0_0_50px_rgba(201,168,76,0.6)] transition-all duration-300 hover:scale-105 group"
              aria-label="Download Sarthak Jalan Resume PDF"
            >
              <Scroll size={20} className="shrink-0 group-hover:rotate-12 transition-transform" />
              <span>DOWNLOAD THE SCROLL</span>
            </a>
          </div>

          {/* Dividers */}
          <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#c8a860] to-transparent mb-10 sm:mb-16" />

          {/* Bottom Section: Copyright & Location - Bigger Text */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <p className="font-cinzel text-[11px] sm:text-xs tracking-[0.3em] text-[#e8c97a] uppercase font-semibold drop-shadow-[0_0_8px_rgba(232,201,122,0.2)]">
                © {new Date().getFullYear()} SARTHAK JALAN
              </p>
              <p className="font-garamond text-sm text-[var(--ash)] mt-2">
                All rights reserved across the realm
              </p>
            </div>
            <div className="flex flex-col items-center sm:items-end gap-1">
              <p className="font-cinzel text-sm sm:text-base text-[#c8a860] font-semibold">
                📍 VIT Vellore
              </p>
              <p className="font-cinzel text-[10px] sm:text-xs tracking-[0.2em] text-[#9e927f] uppercase">
                ECE (2023–2027) • Remote Ready
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
