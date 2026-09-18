import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { X, Terminal, FileText, Search } from 'lucide-react';
import { RESUME_PATH, RESUME_FILENAME } from '../config/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { path: '/', label: 'System Root', sub: 'SYS://ROOT_OVERVIEW' },
  { path: '/about', label: 'About Engineer', sub: 'SYS://PROFILE_TELEMETRY' },
  { path: '/experience', label: 'Work Experience', sub: 'SYS://PRODUCTION_LOGS' },
  { path: '/projects', label: 'Projects Matrix', sub: 'SYS://DEPLOYED_SYSTEMS' },
  { path: '/notes', label: 'Engineering Notes', sub: 'SYS://TECHNICAL_PAPERS' },
  { path: '/skills', label: 'Skills & Capabilities', sub: 'SYS://TECH_MATRIX' },
  { path: '/education', label: 'Academic Records', sub: 'SYS://VIT_CREDENTIALS' },
  { path: '/certifications', label: 'Certifications', sub: 'SYS://ACCREDITATIONS' },
  { path: '/achievements', label: 'Achievements', sub: 'SYS://BENCHMARKS_HONORS' },
  { path: '/contact', label: 'Contact Terminal', sub: 'SYS://TRANSMISSION_UPLINK' },
  { path: '/character-sheet', label: 'System Codex', sub: 'SYS://ATTRIBUTES_EASTER_EGG' },
];

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Focus trap & ESC key handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      firstFocusableRef.current?.focus();
    }, 50);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Off-canvas cyber container */}
      <div
        ref={menuRef}
        className="relative z-10 w-full max-w-md bg-[#0d1017] border-l border-[rgba(0,240,255,0.3)] h-full overflow-y-auto flex flex-col p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.95)] animate-in slide-in-from-right duration-300"
      >
        {/* Corner Brackets */}
        <span className="corner corner-tl" style={{ '--accent': 'var(--cyan)' } as React.CSSProperties} />
        <span className="corner corner-tr" style={{ '--accent': 'var(--cyan)' } as React.CSSProperties} />
        <span className="corner corner-bl" style={{ '--accent': 'var(--cyan)' } as React.CSSProperties} />
        <span className="corner corner-br" style={{ '--accent': 'var(--cyan)' } as React.CSSProperties} />

        {/* Top Header */}
        <div
          className="flex items-center justify-between pb-4 mb-4 border-b border-[rgba(0,240,255,0.2)]"
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[var(--cyan)]" />
            <span className="font-chakra text-xs tracking-[0.25em] text-[var(--cyan)] uppercase font-semibold">
              SYS://NAVIGATION.INDEX
            </span>
          </div>
          <button
            ref={firstFocusableRef}
            onClick={onClose}
            aria-label="Close navigation menu"
            className="min-w-[40px] min-h-[40px] flex items-center justify-center p-2 text-[var(--text-muted)] hover:text-white border border-[rgba(0,240,255,0.25)] hover:border-[var(--cyan)] transition-colors rounded"
          >
            <X size={18} />
          </button>
        </div>

        {/* Command Palette Button */}
        <div className="mb-3">
          <button
            onClick={() => {
              onClose();
              window.dispatchEvent(new CustomEvent('open-command-palette'));
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 border border-[rgba(0,240,255,0.3)] bg-[#07080c] hover:border-[var(--cyan)] text-[var(--cyan)] font-chakra text-xs tracking-wider transition-colors cursor-pointer rounded"
          >
            <span className="flex items-center gap-2">
              <Search size={14} className="text-[var(--cyan)]" />
              <span>Execute Command (Search)</span>
            </span>
            <kbd className="px-1.5 py-0.5 bg-[#0d1017] border border-[rgba(0,240,255,0.3)] text-[10px] text-[var(--cyan)] rounded">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Resume Download Button */}
        <div className="mb-4">
          <a
            href={RESUME_PATH}
            download={RESUME_FILENAME}
            onClick={onClose}
            className="got-cta-btn w-full min-h-[42px] justify-center text-xs shadow-[0_0_20px_rgba(0,240,255,0.2)] rounded flex items-center gap-2 font-chakra uppercase tracking-wider"
            style={{ background: 'var(--cyan)', color: '#07080c' }}
          >
            <FileText size={14} />
            <span>Download Resume Dossier (PDF)</span>
          </a>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 space-y-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center justify-between min-h-[44px] px-3.5 py-2 border rounded transition-all duration-300 ${
                  isActive
                    ? 'border-[var(--cyan)] bg-[rgba(0,240,255,0.12)] text-[var(--text)] shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'border-[rgba(0,240,255,0.15)] bg-[#07080c]/60 text-[var(--text-muted)] hover:border-[var(--cyan-dim)] hover:text-white hover:bg-[#07080c]'
                }`
              }
            >
              <div>
                <span className="font-chakra text-xs tracking-wider uppercase block font-semibold">
                  {item.label}
                </span>
                <span className="font-space text-[11px] text-[var(--cyan-dim)] group-hover:text-[var(--cyan)] transition-colors">
                  {item.sub}
                </span>
              </div>
              <span className="text-[var(--cyan)] text-sm font-chakra transition-transform group-hover:translate-x-1">
                →
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Banner Note */}
        <div
          className="pt-4 mt-4 text-center border-t border-[rgba(0,240,255,0.2)]"
        >
          <p className="font-chakra text-[10px] tracking-[0.25em] text-[var(--cyan)] uppercase font-semibold">
            SARTHAK JALAN · SYSTEMS DOSSIER
          </p>
          <p className="font-space text-xs text-[var(--text-muted)] mt-0.5">
            Distributed Architectures &amp; Applied AI
          </p>
        </div>
      </div>
    </div>
  );
};
