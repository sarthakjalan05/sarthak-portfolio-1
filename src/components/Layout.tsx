import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, Mail, Phone, Linkedin, Github, ExternalLink } from 'lucide-react';
import { MobileMenu } from './MobileMenu';

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
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#050403]/85 border-b border-[var(--gold-dim)]/30 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group text-decoration-none"
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
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-cinzel text-xs tracking-[0.25em] uppercase transition-colors relative py-1 ${
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
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--gold)] shadow-[0_0_8px_var(--gold)]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className="p-2 border border-[var(--gold-dim)] text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-colors"
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
      <footer className="relative z-20 border-t border-[var(--gold-dim)]/40 bg-[#070504] py-14 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Flanked Divider */}
          <div className="got-divider max-w-sm mx-auto mb-8">
            <div className="got-divider-line" />
            <div className="got-divider-diamond" />
            <div className="got-divider-line right" />
          </div>

          <p className="font-cinzel-dec text-lg sm:text-xl text-[var(--gold)] tracking-widest uppercase mb-2">
            The Realm of Sarthak Jalan
          </p>
          <p className="font-fell italic text-sm sm:text-base text-[var(--ash)] max-w-xl mx-auto mb-6">
            "When you play the game of code, you build for resilience, intelligence, and permanence."
          </p>

          {/* Contact & Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-8 text-xs font-cinzel tracking-widest text-[var(--parchment)]">
            <a
              href="mailto:sarthakjalan06@gmail.com"
              className="flex items-center gap-2 hover:text-[var(--gold)] transition-colors"
            >
              <Mail size={15} className="text-[var(--gold)]" />
              <span>sarthakjalan06@gmail.com</span>
            </a>
            <a
              href="tel:+919874255221"
              className="flex items-center gap-2 hover:text-[var(--gold)] transition-colors"
            >
              <Phone size={15} className="text-[var(--gold)]" />
              <span>+91-9874255221</span>
            </a>
            <a
              href="https://linkedin.com/in/sarthak-jalan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[var(--gold)] transition-colors"
            >
              <Linkedin size={15} className="text-[var(--gold)]" />
              <span>LinkedIn</span>
              <ExternalLink size={12} className="opacity-70" />
            </a>
            <a
              href="https://github.com/sarthakjalan05"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[var(--gold)] transition-colors"
            >
              <Github size={15} className="text-[var(--gold)]" />
              <span>GitHub</span>
              <ExternalLink size={12} className="opacity-70" />
            </a>
          </div>

          <p className="font-cinzel text-[10px] tracking-[0.3em] text-[#7a6f5e] uppercase">
            © {new Date().getFullYear()} Sarthak Jalan · All Rights Sworn Across the Realm
          </p>
        </div>
      </footer>
    </div>
  );
};
