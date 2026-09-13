import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { X, Shield } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { path: '/', label: 'The Realm (Home)', house: 'Overview' },
  { path: '/experience', label: 'Experience', house: 'House Lannister' },
  { path: '/projects', label: 'Projects', house: 'House Targaryen' },
  { path: '/skills', label: 'Skills & Arsenal', house: 'House Baratheon' },
  { path: '/education', label: 'Education', house: 'The Citadel' },
  { path: '/certifications', label: 'Certifications', house: 'House Greyjoy' },
  { path: '/achievements', label: 'Achievements', house: 'House Tyrell' },
  { path: '/contact', label: 'Contact', house: 'House Stark' },
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
    // Lock background scroll
    document.body.style.overflow = 'hidden';

    // Focus close button on open
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
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Off-canvas scroll / banner container */}
      <div
        ref={menuRef}
        className="relative z-10 w-full max-w-md bg-[#0a0705] border-l border-[var(--gold-dim)] h-full overflow-y-auto flex flex-col p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] animate-in slide-in-from-right duration-300"
      >
        {/* Corner Brackets */}
        <span className="corner corner-tl" />
        <span className="corner corner-tr" />
        <span className="corner corner-bl" />
        <span className="corner corner-br" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[var(--gold-dim)]/40 mb-6">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[var(--gold)]" />
            <span className="font-cinzel-dec text-sm tracking-widest text-[var(--gold)] uppercase">
              The Seven Kingdoms
            </span>
          </div>
          <button
            ref={firstFocusableRef}
            onClick={onClose}
            aria-label="Close navigation menu"
            className="p-2 text-[var(--ash)] hover:text-[var(--gold)] border border-[var(--gold-dim)]/40 hover:border-[var(--gold)] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 space-y-3">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center justify-between p-3.5 border transition-all duration-300 ${
                  isActive
                    ? 'border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold-light)]'
                    : 'border-[#2a2216] bg-[#120d09]/50 text-[var(--ash)] hover:border-[var(--gold-dim)] hover:text-[var(--parchment)] hover:bg-[#1a140d]'
                }`
              }
            >
              <div>
                <span className="font-cinzel text-xs sm:text-sm tracking-[0.2em] uppercase block font-semibold">
                  {item.label}
                </span>
                <span className="font-fell italic text-xs text-[var(--gold-dim)] group-hover:text-[var(--gold)] transition-colors">
                  {item.house}
                </span>
              </div>
              <span className="text-[var(--gold-dim)] group-hover:text-[var(--gold)] text-sm font-cinzel transition-transform group-hover:translate-x-1">
                →
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Banner Note */}
        <div className="pt-6 mt-6 border-t border-[var(--gold-dim)]/30 text-center">
          <div className="got-divider max-w-xs mx-auto mb-3">
            <div className="got-divider-line" />
            <div className="got-divider-diamond" />
            <div className="got-divider-line right" />
          </div>
          <p className="font-cinzel text-[10px] tracking-[0.25em] text-[var(--gold-dim)] uppercase">
            Sarthak Jalan · Portfolio
          </p>
          <p className="font-fell italic text-xs text-[#8a8070] mt-1">
            "A chronicle of code and craft"
          </p>
        </div>
      </div>
    </div>
  );
};
