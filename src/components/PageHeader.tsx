import React from 'react';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  titleEm?: string;
  subtitle: string;
  accent?: string;
  sigilRune?: string;
  motto?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  titleEm,
  subtitle,
  accent = 'var(--gold)',
  sigilRune = '✦',
  motto,
}) => {
  // Clean motto from surrounding quotes if already provided
  const cleanedMotto = motto ? motto.replace(/^["'“]|["'”]$/g, '') : undefined;

  return (
    <header
      className="fade-up relative z-10 text-center pt-2 sm:pt-4"
      style={{ marginBottom: 'var(--header-gap-bottom)' }}
    >
      {/* 1. House / Seat Eyebrow Label */}
      <p
        className="font-cinzel text-[10px] sm:text-xs uppercase tracking-[0.45em]"
        style={{ color: accent, marginBottom: 'var(--header-gap-eyebrow)' }}
      >
        {eyebrow}
      </p>

      {/* 2. Sigil Flanked Ornament */}
      <div
        className="flex items-center justify-center gap-4"
        style={{ marginBottom: 'var(--header-gap-sigil)' }}
      >
        <span
          className="block w-16 sm:w-24 h-px"
          style={{ background: `linear-gradient(to right, transparent, ${accent})` }}
        />
        <span
          className="text-base sm:text-lg"
          style={{ color: accent, filter: `drop-shadow(0 0 8px ${accent})` }}
        >
          {sigilRune}
        </span>
        <span
          className="block w-16 sm:w-24 h-px"
          style={{ background: `linear-gradient(to left, transparent, ${accent})` }}
        />
      </div>

      {/* 3. Main Title */}
      <h1
        className="font-cinzel-dec text-[clamp(26px,4.8vw,56px)] font-bold text-[var(--parchment)] tracking-wide leading-[1.15]"
        style={{ marginBottom: 'var(--header-gap-title)' }}
      >
        {title} {titleEm && <em className="font-fell italic font-normal" style={{ color: accent }}>{titleEm}</em>}
      </h1>

      {/* 4. House Motto Quote & Divider */}
      {cleanedMotto && (
        <div
          className="w-full flex flex-col items-center justify-center text-center mx-auto"
          style={{
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: 'var(--header-gap-motto)',
          }}
        >
          <div className="flex flex-col items-center justify-center text-center w-full max-w-lg mx-auto">
            <span
              className="font-cinzel-dec text-base sm:text-lg md:text-xl uppercase block text-center"
              style={{
                color: accent,
                textShadow: `0 0 20px color-mix(in srgb, ${accent} 40%, transparent)`,
                letterSpacing: '0.14em',
                paddingLeft: '0.14em',
              }}
            >
              "{cleanedMotto}"
            </span>
            <div
              className="got-divider flex items-center justify-center gap-3 mt-2.5 mx-auto"
              style={{ width: 'auto' }}
            >
              <div
                className="got-divider-line"
                style={{
                  width: '54px',
                  maxWidth: '54px',
                  flex: 'none',
                  height: '1px',
                  background: `linear-gradient(to right, transparent, ${accent})`,
                }}
              />
              <div
                className="got-divider-diamond"
                style={{
                  width: '6px',
                  height: '6px',
                  background: accent,
                  transform: 'rotate(45deg)',
                  flexShrink: 0,
                }}
              />
              <div
                className="got-divider-line right"
                style={{
                  width: '54px',
                  maxWidth: '54px',
                  flex: 'none',
                  height: '1px',
                  background: `linear-gradient(to left, transparent, ${accent})`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 5. Subtitle / Body Copy */}
      <p className="font-fell italic text-[clamp(14px,1.6vw,18px)] text-[var(--ash)] max-w-2xl mx-auto leading-relaxed px-3 sm:px-2">
        {subtitle}
      </p>
    </header>
  );
};
