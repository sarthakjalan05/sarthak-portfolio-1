import React from 'react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon?: React.ReactNode;
  heading: string;
  body: string;
  ctaText?: string;
  ctaLink?: string;
  onCtaClick?: () => void;
  accentColor?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  heading,
  body,
  ctaText = 'Return to System Root',
  ctaLink = '/',
  onCtaClick,
  accentColor = 'var(--cyan)',
}) => {
  return (
    <div
      className="fade-up realm-card relative flex flex-col items-center justify-center text-center p-6 sm:p-10 md:p-14 border max-w-2xl mx-auto my-8 overflow-hidden rounded bg-[#0d1017]/95"
      style={{
        '--accent': accentColor,
        borderColor: `rgba(0, 240, 255, 0.3)`,
        boxShadow: `0 0 50px rgba(0, 0, 0, 0.9), 0 0 25px rgba(0, 240, 255, 0.1)`,
      } as React.CSSProperties}
    >
      {/* Corner brackets */}
      <span className="corner corner-tl" style={{ '--accent': accentColor } as React.CSSProperties} />
      <span className="corner corner-tr" style={{ '--accent': accentColor } as React.CSSProperties} />
      <span className="corner corner-bl" style={{ '--accent': accentColor } as React.CSSProperties} />
      <span className="corner corner-br" style={{ '--accent': accentColor } as React.CSSProperties} />

      {/* Decorative Top Line */}
      <div className="flex items-center gap-3 mb-6">
        <span
          className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--cyan)]"
        />
        <span className="text-xs font-chakra text-[var(--cyan)] tracking-widest uppercase">
          SYS://STANDBY
        </span>
        <span
          className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--cyan)]"
        />
      </div>

      {/* Icon slot */}
      {icon && (
        <div
          className="mb-5 p-4 rounded border border-[rgba(0,240,255,0.3)] bg-[#07080c] flex items-center justify-center text-[var(--cyan)] shadow-[0_0_20px_rgba(0,240,255,0.2)]"
        >
          {icon}
        </div>
      )}

      {/* Heading */}
      <h2
        className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold tracking-wider mb-4 text-[var(--text)]"
      >
        {heading}
      </h2>

      <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent mb-6" />

      {/* Body text */}
      <p className="font-space text-xs sm:text-sm text-[var(--text-muted)] max-w-lg mb-8 leading-relaxed">
        {body}
      </p>

      {/* CTA Button */}
      {ctaLink ? (
        <Link
          to={ctaLink}
          className="got-cta-btn min-h-[44px] px-8 py-2.5 font-chakra text-xs tracking-wider uppercase font-bold rounded shadow-[0_0_20px_rgba(0,240,255,0.25)]"
          style={{ background: 'var(--cyan)', color: '#07080c' }}
        >
          {ctaText}
        </Link>
      ) : onCtaClick ? (
        <button
          onClick={onCtaClick}
          className="got-cta-btn min-h-[44px] px-8 py-2.5 font-chakra text-xs tracking-wider uppercase font-bold rounded shadow-[0_0_20px_rgba(0,240,255,0.25)] cursor-pointer"
          style={{ background: 'var(--cyan)', color: '#07080c' }}
        >
          {ctaText}
        </button>
      ) : null}
    </div>
  );
};
