import React, { useEffect, useRef } from 'react';
import { PageHeader } from '../components/PageHeader';
import { EXPERIENCES } from '../data/experience';
import { Briefcase, MapPin, Calendar, CheckCircle } from 'lucide-react';

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('.timeline-entry');
    if (!cards) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  const accent = '#d4a84b'; // Lannister Gold

  return (
    <div className="realm-page">
      <PageHeader
        eyebrow="HOUSE LANNISTER · CASTERLY ROCK"
        title="Ledger of"
        titleEm="Deeds & Service"
        subtitle='"A Lannister always delivers what is promised." A battle-tested record of engineering production platforms, AI models, and measurable outcomes.'
        accent={accent}
        sigilRune="🦁"
      />

      {/* House Motto Banner */}
      <div className="text-center mb-16">
        <span
          className="font-cinzel-dec text-lg sm:text-xl tracking-widest uppercase block"
          style={{ color: accent, textShadow: `0 0 20px color-mix(in srgb, ${accent} 40%, transparent)` }}
        >
          "Hear Me Roar"
        </span>
        <div className="got-divider max-w-xs mx-auto mt-2">
          <div className="got-divider-line" style={{ background: `linear-gradient(to right, transparent, ${accent})` }} />
          <div className="got-divider-diamond" style={{ background: accent }} />
          <div className="got-divider-line right" style={{ background: `linear-gradient(to left, transparent, ${accent})` }} />
        </div>
      </div>

      {/* Vertical Timeline */}
      <div ref={containerRef} className="relative max-w-4xl mx-auto px-4 sm:px-0">
        {/* Central / Left-side connector line */}
        <div
          className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2"
          style={{
            background: `linear-gradient(to bottom, transparent, ${accent} 20%, ${accent} 80%, transparent)`,
            boxShadow: `0 0 12px color-mix(in srgb, ${accent} 50%, transparent)`,
          }}
        />

        <div className="space-y-12 sm:space-y-16">
          {EXPERIENCES.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={item.id}
                className={`timeline-entry fade-up relative flex flex-col sm:flex-row items-start group/entry ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Diamond Marker */}
                <div
                  className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-8 z-20 w-8 h-8 rounded-none rotate-45 flex items-center justify-center border transition-all duration-300 group-hover/entry:scale-125 group-hover/entry:shadow-lg"
                  style={{
                    background: '#0a0705',
                    borderColor: accent,
                    boxShadow: `0 0 16px color-mix(in srgb, ${accent} 70%, transparent)`,
                  }}
                >
                  <span className="-rotate-45 text-xs transition-all duration-300 group-hover/entry:text-[#ffde7a]" style={{ color: accent }}>
                    ✦
                  </span>
                </div>

                {/* Content Box */}
                <div
                  className={`w-full sm:w-[calc(50%-48px)] ml-14 sm:ml-0 p-6 sm:p-8 border bg-[#140e00]/90 backdrop-blur-sm relative transition-all duration-300 hover:shadow-[0_0_50px_rgba(212,168,75,0.25)] hover:bg-[#1a1200]/95 hover:border-[rgba(212,168,75,0.6)] group cursor-pointer transform hover:scale-[1.02] ${
                    isEven ? 'sm:text-left' : 'sm:text-left'
                  }`}
                  style={{
                    borderColor: `color-mix(in srgb, ${accent} 40%, transparent)`,
                  }}
                >
                  {/* Corner brackets */}
                  <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
                  <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
                  <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
                  <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

                  {/* Period & Location badge */}
                  <div className="flex flex-wrap items-center gap-3 text-xs font-cinzel text-[var(--ash)] mb-3">
                    <span className="flex items-center gap-1 text-[var(--gold)]">
                      <Calendar size={13} />
                      {item.period}
                    </span>
                    <span className="opacity-50">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} />
                      {item.locationType}
                    </span>
                  </div>

                  {/* Role & Company */}
                  <h2 className="font-cinzel-dec text-xl sm:text-2xl font-bold text-[var(--parchment)] mb-1 transition-all duration-300 group-hover:text-[#ffde7a]">
                    {item.role}
                  </h2>
                  <h3
                    className="font-cinzel text-sm tracking-[0.2em] uppercase font-semibold mb-4 transition-all duration-300 group-hover:text-[#ffd700]"
                    style={{ color: accent }}
                  >
                    {item.company}
                  </h3>

                  {/* Summary copy */}
                  <p className="font-fell italic text-base text-[var(--parchment)] leading-relaxed mb-5 transition-all duration-300 group-hover:text-[#e8d5b5]">
                    {item.description}
                  </p>

                  {/* Detailed Points */}
                  <ul className="space-y-2.5 mb-6 text-sm font-fell text-[var(--ash)]">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5 transition-all duration-300 group-hover:text-[#d4a84b] group-hover:translate-x-1">
                        <CheckCircle
                          size={14}
                          className="shrink-0 mt-1 transition-all duration-300 group-hover:scale-110"
                          style={{ color: accent }}
                        />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--gold-dim)]/30">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-cinzel text-[10px] tracking-wider uppercase px-2.5 py-1 bg-[#1e1500] border border-[var(--gold-dim)]/50 text-[var(--parchment)] transition-all duration-300 hover:bg-[var(--gold-dim)]/30 hover:border-[var(--gold-dim)] hover:text-[#ffde7a] cursor-pointer transform hover:scale-105"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
