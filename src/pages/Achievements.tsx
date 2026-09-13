import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ACHIEVEMENTS } from '../data/achievements';
import { Trophy, ExternalLink, Flower2, Sparkles, Users } from 'lucide-react';

export const Achievements: React.FC = () => {
  const accent = '#5a9e48'; // Tyrell Rose Green

  return (
    <div className="realm-page">
      <PageHeader
        eyebrow="HOUSE TYRELL · HIGHGARDEN"
        title="Banners of"
        titleEm="Growth & Leadership"
        subtitle='"Roses that climb — leadership, hackathons, growth beyond the classroom." Milestones in student leadership, competitive medical hackathons, and open source.'
        accent={accent}
        sigilRune="🌹"
      />

      {/* Tyrell Motto Banner */}
      <div className="text-center mb-16">
        <span
          className="font-cinzel-dec text-lg sm:text-xl tracking-widest uppercase block"
          style={{ color: accent, textShadow: `0 0 20px color-mix(in srgb, ${accent} 40%, transparent)` }}
        >
          "Growing Strong"
        </span>
        <div className="got-divider max-w-xs mx-auto mt-2">
          <div className="got-divider-line" style={{ background: `linear-gradient(to right, transparent, ${accent})` }} />
          <div className="got-divider-diamond" style={{ background: accent }} />
          <div className="got-divider-line right" style={{ background: `linear-gradient(to left, transparent, ${accent})` }} />
        </div>
      </div>

      {/* Achievement Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {ACHIEVEMENTS.map((item) => (
          <div
            key={item.id}
            className="relative p-7 sm:p-9 border bg-[#050c04]/90 backdrop-blur-sm flex flex-col justify-between group hover:border-[#5a9e48] transition-all duration-300 shadow-[0_0_35px_rgba(0,0,0,0.8)]"
            style={{
              borderColor: 'rgba(90, 158, 72, 0.35)',
            }}
          >
            {/* Corner brackets */}
            <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
            <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
            <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
            <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

            {/* Subtle floral watermark in corner */}
            <div className="absolute top-4 right-4 opacity-15 pointer-events-none group-hover:opacity-30 transition-opacity text-[#5a9e48]">
              <Flower2 size={48} />
            </div>

            <div>
              {/* Badge & Period Header */}
              <div className="flex items-center justify-between gap-3 mb-5 pr-10">
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
              <h3 className="font-cinzel-dec text-xl sm:text-2xl font-bold text-[var(--parchment)] mb-2">
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

              <p className="font-fell italic text-sm sm:text-base text-[var(--ash)] leading-relaxed mb-6">
                {item.description}
              </p>
            </div>

            {/* Link if available */}
            {item.url ? (
              <div className="pt-4 border-t border-[#173012]">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="got-cta-ghost w-full justify-center text-xs py-2.5"
                  style={{
                    borderColor: 'rgba(90, 158, 72, 0.5)',
                    color: accent,
                  }}
                >
                  <span>Inspect Ledger & Proof</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            ) : (
              <div className="pt-4 border-t border-[#173012] flex items-center justify-center gap-2 text-xs font-cinzel text-[var(--gold-dim)]">
                <span>Executive Order Bestowed</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
