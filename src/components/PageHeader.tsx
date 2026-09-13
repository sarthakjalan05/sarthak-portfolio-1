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
  accent = 'var(--gold)',
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
      {/* 0. Plain-English Section Identifier for universal clarity */}
      {sectionLabel && (
        <div className="flex items-center justify-center mb-3.5">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-cinzel font-semibold tracking-[0.25em] uppercase border select-none"
            style={{
              color: accent,
              borderColor: `color-mix(in srgb, ${accent} 40%, transparent)`,
              backgroundColor: `color-mix(in srgb, ${accent} 8%, #080604)`,
              boxShadow: `0 0 14px color-mix(in srgb, ${accent} 12%, transparent)`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: accent,
                boxShadow: `0 0 6px ${accent}`,
              }}
            />
            {sectionLabel}
          </span>
        </div>
      )}

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

      {/* 4. House Motto Quote & Symmetrically Centered Divider */}
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
            className="font-cinzel-dec text-base sm:text-lg md:text-xl uppercase block text-center"
            style={{
              color: accent,
              textShadow: `0 0 20px color-mix(in srgb, ${accent} 40%, transparent)`,
              letterSpacing: '0.12em',
              margin: '0 auto',
            }}
          >
            "{cleanedMotto}"
          </span>
          <div
            className="flex items-center justify-center gap-3 mt-2.5 mx-auto"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              width: 'auto',
              margin: '10px auto 0 auto',
            }}
          >
            <span
              className="divider-line"
              style={{
                display: 'block',
                width: '56px',
                minWidth: '56px',
                maxWidth: '56px',
                flex: '0 0 56px',
                height: '1px',
                background: `linear-gradient(to right, transparent, ${accent})`,
                margin: 0,
                padding: 0,
              }}
            />
            <span
              className="divider-diamond"
              style={{
                display: 'block',
                width: '6px',
                minWidth: '6px',
                maxWidth: '6px',
                height: '6px',
                minHeight: '6px',
                maxHeight: '6px',
                flex: '0 0 6px',
                background: accent,
                transform: 'rotate(45deg)',
                flexShrink: 0,
                margin: 0,
                padding: 0,
              }}
            />
            <span
              className="divider-line right"
              style={{
                display: 'block',
                width: '56px',
                minWidth: '56px',
                maxWidth: '56px',
                flex: '0 0 56px',
                height: '1px',
                background: `linear-gradient(to left, transparent, ${accent})`,
                margin: 0,
                padding: 0,
              }}
            />
          </div>
        </div>
      )}

      {/* 5. Subtitle / Body Copy */}
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
          className="font-fell italic text-[clamp(15px,1.8vw,20px)] text-[var(--ash)] leading-relaxed px-4 text-center"
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
