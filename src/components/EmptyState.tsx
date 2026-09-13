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
  ctaText = 'Return to the Realm',
  ctaLink = '/',
  onCtaClick,
  accentColor = '#5ca0d3', // Night's Watch / Wall frost blue default
}) => {
  return (
    <div
      className="fade-up realm-card relative flex flex-col items-center justify-center text-center p-6 sm:p-10 md:p-14 border max-w-2xl mx-auto my-8 overflow-hidden"
      style={{
        '--accent': accentColor,
        borderColor: `color-mix(in srgb, ${accentColor} 30%, transparent)`,
        background: `radial-gradient(ellipse 80% 80% at 50% 50%, color-mix(in srgb, ${accentColor} 8%, #050403) 0%, #050403 100%)`,
        boxShadow: `0 0 50px rgba(0, 0, 0, 0.9), 0 0 30px color-mix(in srgb, ${accentColor} 12%, transparent)`,
      } as React.CSSProperties}
    >
      {/* Corner brackets */}
      <span className="corner corner-tl" style={{ '--accent': accentColor } as React.CSSProperties} />
      <span className="corner corner-tr" style={{ '--accent': accentColor } as React.CSSProperties} />
      <span className="corner corner-bl" style={{ '--accent': accentColor } as React.CSSProperties} />
      <span className="corner corner-br" style={{ '--accent': accentColor } as React.CSSProperties} />

      {/* Decorative Top Rune & Line */}
      <div className="flex items-center gap-3 mb-6">
        <span
          className="h-px w-16"
          style={{ background: `linear-gradient(to right, transparent, ${accentColor})` }}
        />
        <span className="text-xl" style={{ color: accentColor }}>
          ❄
        </span>
        <span
          className="h-px w-16"
          style={{ background: `linear-gradient(to left, transparent, ${accentColor})` }}
        />
      </div>

      {/* Icon slot */}
      {icon && (
        <div
          className="mb-5 p-4 rounded-full border flex items-center justify-center"
          style={{
            borderColor: `color-mix(in srgb, ${accentColor} 40%, transparent)`,
            background: `rgba(10, 7, 5, 0.7)`,
            color: accentColor,
            boxShadow: `0 0 25px color-mix(in srgb, ${accentColor} 25%, transparent)`,
          }}
        >
          {icon}
        </div>
      )}

      {/* Heading */}
      <h2
        className="font-cinzel-dec text-2xl md:text-4xl font-bold tracking-wide mb-4"
        style={{ color: 'var(--parchment)', textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}
      >
        {heading}
      </h2>

      {/* Divider */}
      <div className="got-divider max-w-xs mb-6">
        <div
          className="got-divider-line"
          style={{ background: `linear-gradient(to right, transparent, ${accentColor})` }}
        />
        <div className="got-divider-diamond" style={{ background: accentColor }} />
        <div
          className="got-divider-line right"
          style={{ background: `linear-gradient(to left, transparent, ${accentColor})` }}
        />
      </div>

      {/* Body text */}
      <p className="font-garamond text-base md:text-lg text-[#c8bfb0] max-w-lg mb-8 leading-[1.75]">
        {body}
      </p>

      {/* CTA Button */}
      {ctaLink ? (
        <Link to={ctaLink} className="got-cta-btn min-h-[44px]" style={{ background: accentColor, color: '#050403' }}>
          <span>⚔</span> {ctaText}
        </Link>
      ) : onCtaClick ? (
        <button
          onClick={onCtaClick}
          className="got-cta-btn min-h-[44px]"
          style={{ background: accentColor, color: '#050403' }}
        >
          <span>⚔</span> {ctaText}
        </button>
      ) : null}
    </div>
  );
};
