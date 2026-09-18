import React from 'react';

interface PageHeaderProps {
  sectionLabel?: string;
  eyebrow: string;
  title: string;
  titleEm?: string;
  subtitle: string;
  accent?: string;
  sigilRune?: string;
  motto?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  sectionLabel,
  eyebrow,
  title,
  titleEm,
  subtitle,
  accent = 'var(--cyan)',
  sigilRune = '✦',
  motto,
}) => {
  // Clean motto from surrounding quotes if already provided
  const cleanedMotto = motto ? motto.replace(/^["'“]|["'”]$/g, '') : undefined;

  return (
    <header
      className="fade-up relative z-10 w-full flex flex-col items-center justify-center text-center pt-2 sm:pt-4 mx-auto"
      style={{
        marginBottom: 'var(--header-gap-bottom)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
      }}
    >
      {/* 0. Monospace System Eyebrow Tag */}
      <div className="flex items-center justify-center mb-3">
        <span
          className="inline-flex items-center gap-2 px-3 py-1 rounded text-[11px] sm:text-xs font-chakra font-semibold tracking-[0.25em] uppercase border select-none"
          style={{
            color: accent,
            borderColor: `color-mix(in srgb, ${accent} 40%, transparent)`,
            backgroundColor: 'rgba(13, 16, 23, 0.85)',
            boxShadow: `0 0 14px color-mix(in srgb, ${accent} 15%, transparent)`,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{
              backgroundColor: accent,
              boxShadow: `0 0 6px ${accent}`,
            }}
          />
          {eyebrow.startsWith('SYS://') ? eyebrow : `SYS://${eyebrow.toUpperCase()}`}
        </span>
      </div>

      {/* 1. Optional Sub-category or Section Tag */}
      {sectionLabel && (
        <p
          className="font-chakra text-[10px] sm:text-xs uppercase tracking-[0.35em] mb-3"
          style={{ color: 'var(--text-muted)' }}
        >
          {sectionLabel}
        </p>
      )}

      {/* 2. Cyber Neon Divider with Glowing Center Dot */}
      <div
        className="flex items-center justify-center gap-4"
        style={{ marginBottom: 'var(--header-gap-sigil)' }}
      >
        <span
          className="block w-16 sm:w-28 h-px"
          style={{ background: `linear-gradient(to right, transparent, ${accent})` }}
        />
        <span
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: accent,
            boxShadow: `0 0 10px ${accent}`,
          }}
        />
        <span
          className="block w-16 sm:w-28 h-px"
          style={{ background: `linear-gradient(to left, transparent, ${accent})` }}
        />
      </div>

      {/* 3. Major Page Title with Glitch Entrance Effect */}
      <h1
        className="title-glitch-entrance font-orbitron text-[clamp(28px,5vw,54px)] font-extrabold text-[var(--text)] tracking-wider leading-[1.12]"
        style={{
          marginBottom: 'var(--header-gap-title)',
          textShadow: `0 0 30px color-mix(in srgb, ${accent} 35%, transparent)`,
        }}
      >
        {title} {titleEm && <span style={{ color: accent }}>{titleEm}</span>}
      </h1>

      {/* 4. Technical Tagline & Divider */}
      {cleanedMotto && (
        <div
          className="w-full flex flex-col items-center justify-center text-center mx-auto"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'var(--header-gap-motto)',
            width: '100%',
          }}
        >
          <span
            className="font-chakra text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase block text-center"
            style={{
              color: accent,
              textShadow: `0 0 14px color-mix(in srgb, ${accent} 40%, transparent)`,
              margin: '0 auto',
            }}
          >
            {cleanedMotto}
          </span>
          <div
            className="flex items-center justify-center gap-3 mt-2.5 mx-auto"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              width: 'auto',
              margin: '8px auto 0 auto',
            }}
          >
            <span
              className="divider-line"
              style={{
                display: 'block',
                width: '50px',
                height: '1px',
                background: `linear-gradient(to right, transparent, ${accent})`,
              }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: accent,
                boxShadow: `0 0 8px ${accent}`,
              }}
            />
            <span
              className="divider-line right"
              style={{
                display: 'block',
                width: '50px',
                height: '1px',
                background: `linear-gradient(to left, transparent, ${accent})`,
              }}
            />
          </div>
        </div>
      )}

      {/* 5. Subtitle / Summary Description */}
      <div
        className="w-full flex justify-center items-center text-center mx-auto"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <p
          className="font-space text-[clamp(15px,1.5vw,18px)] text-[var(--text-muted)] leading-relaxed px-4 text-center"
          style={{
            maxWidth: '680px',
            width: '100%',
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block',
          }}
        >
          {subtitle}
        </p>
      </div>
    </header>
  );
};
