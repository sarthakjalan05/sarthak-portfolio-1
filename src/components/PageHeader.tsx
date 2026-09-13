import React from 'react';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  titleEm?: string;
  subtitle: string;
  accent?: string;
  sigilRune?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  titleEm,
  subtitle,
  accent = 'var(--gold)',
  sigilRune = '✦',
}) => {
  return (
    <header className="relative z-10 text-center mb-16 pt-4">
      {/* Eyebrow */}
      <p
        className="font-cinzel text-xs uppercase tracking-[0.45em] mb-4"
        style={{ color: accent }}
      >
        {eyebrow}
      </p>

      {/* Flanked ornament */}
      <div className="flex items-center justify-center gap-4 mb-5">
        <span
          className="block w-20 h-px"
          style={{ background: `linear-gradient(to right, transparent, ${accent})` }}
        />
        <span
          className="text-base"
          style={{ color: accent, filter: `drop-shadow(0 0 8px ${accent})` }}
        >
          {sigilRune}
        </span>
        <span
          className="block w-20 h-px"
          style={{ background: `linear-gradient(to left, transparent, ${accent})` }}
        />
      </div>

      {/* Main Title */}
      <h1 className="font-cinzel-dec text-3xl sm:text-5xl md:text-6xl font-bold text-[var(--parchment)] mb-4 tracking-wide leading-tight">
        {title} {titleEm && <em className="font-fell italic" style={{ color: accent }}>{titleEm}</em>}
      </h1>

      {/* Subtitle */}
      <p className="font-fell italic text-base sm:text-lg text-[var(--ash)] max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    </header>
  );
};
