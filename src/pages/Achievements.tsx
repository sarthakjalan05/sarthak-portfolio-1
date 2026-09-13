import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ACHIEVEMENTS } from '../data/achievements';
import { Trophy, ExternalLink, Flower2, Sparkles, Users } from 'lucide-react';

export const Achievements: React.FC = () => {
  const accent = '#5a9e48'; // Tyrell Rose Green

  return (
    <div className="realm-page relative overflow-hidden" style={{ '--accent': accent } as React.CSSProperties}>
      {/* Atmospheric Background Layers */}
      <div className="realm-bg-texture" />
      <div className="realm-bg-vignette" />

      <PageHeader
        sectionLabel="Achievements"
        eyebrow="HOUSE TYRELL · HIGHGARDEN"
        title="Banners of"
        titleEm="Growth & Leadership"
        motto="Growing Strong"
        subtitle='"Roses that climb — leadership, hackathons, growth beyond the classroom." Milestones in student leadership, competitive medical hackathons, and open source.'
        accent={accent}
        sigilRune="🌹"
      />

      {/* Achievement Cards with Staggered Entrance */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 max-w-5xl mx-auto px-2">
        {ACHIEVEMENTS.map((item, idx) => (
          <div
            key={item.id}
            className="fade-up realm-card relative p-8 sm:p-10 border bg-[#050c04]/90 backdrop-blur-sm flex flex-col justify-between group shadow-[0_0_35px_rgba(0,0,0,0.8)]"
            style={{
              '--accent': accent,
              borderColor: 'rgba(90, 158, 72, 0.35)',
            } as React.CSSProperties}
            data-delay={idx * 150}
          >
            {/* Corner brackets */}
            <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
            <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
            <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
            <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

            {/* Subtle floral watermark in corner */}
            <div className="absolute top-4 right-4 opacity-15 pointer-events-none group-hover:opacity-30 transition-opacity text-[#5a9e48]">
              <Flower2 size={44} />
            </div>

            <div>
              {/* Badge & Period Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pr-10">
                <span
                  className="font-cinzel text-xs uppercase px-3 py-1 border border-[#22441a] bg-[#0c1f09] font-semibold flex items-center gap-1.5"
                  style={{ color: accent }}
                >
                  <span>🌿</span>
                  <span>{item.badge}</span>
                </span>
                <span className="font-cinzel text-xs text-[var(--gold-dim)] shrink-0">
                  {item.period}
                </span>
              </div>

              {/* Title & Organization */}
              <h3 className="font-cinzel-dec text-lg sm:text-xl md:text-2xl font-bold text-[var(--parchment)] mb-2 leading-tight">
                {item.title}
              </h3>
              <p
                className="font-cinzel text-xs tracking-wider uppercase font-semibold mb-4"
                style={{ color: accent }}
              >
                {item.organization}
              </p>

              <div className="got-divider max-w-[120px] mb-4">
                <div className="got-divider-line" style={{ background: `linear-gradient(to right, transparent, ${accent})` }} />
                <div className="got-divider-diamond" style={{ background: accent }} />
                <div className="got-divider-line right" style={{ background: `linear-gradient(to left, transparent, ${accent})` }} />
              </div>

              <p className="font-garamond text-base sm:text-lg text-[var(--ash)] leading-[1.75] mb-6">
                {item.description}
              </p>
            </div>

            {/* Link if available */}
            {item.url ? (
              <div
                className="pt-4 mt-2"
                style={{
                  borderTop: `1px solid color-mix(in srgb, ${accent} 25%, transparent)`,
                }}
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="got-cta-ghost w-full justify-center text-xs py-2.5 min-h-[44px]"
                  style={{
                    borderColor: 'rgba(90, 158, 72, 0.5)',
                    color: accent,
                  }}
                  aria-label={`Inspect Ledger for ${item.title}`}
                >
                  <span>Inspect Ledger & Proof</span>
                  <ExternalLink size={13} className="shrink-0" />
                </a>
              </div>
            ) : (
              <div
                className="pt-4 mt-2 flex items-center justify-center gap-2 min-h-[44px] text-xs font-cinzel text-[var(--gold-dim)]"
                style={{
                  borderTop: `1px solid color-mix(in srgb, ${accent} 25%, transparent)`,
                }}
              >
                <span>Executive Order Bestowed</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
