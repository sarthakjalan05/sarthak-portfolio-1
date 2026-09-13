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
    <div className="realm-page relative overflow-hidden" style={{ '--accent': accent } as React.CSSProperties}>
      {/* Atmospheric Background Layers */}
      <div className="realm-bg-texture" />
      <div className="realm-bg-vignette" />

      <PageHeader
        eyebrow="HOUSE LANNISTER · CASTERLY ROCK"
        title="Ledger of"
        titleEm="Deeds & Service"
        motto="Hear Me Roar"
        subtitle='"A Lannister always delivers what is promised." A battle-tested record of engineering production platforms, AI models, and measurable outcomes.'
        accent={accent}
        sigilRune="🦁"
      />

      {/* Vertical Timeline */}
      <div ref={containerRef} className="relative z-10 max-w-5xl mx-auto px-2 sm:px-4 md:px-6">
        {/* Continuous Center / Left Connector Line */}
        <div
          className="absolute left-6 md:left-1/2 top-2 bottom-2 w-[2px] -translate-x-1/2 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, transparent, ${accent} 6%, ${accent} 94%, transparent)`,
            boxShadow: `0 0 14px color-mix(in srgb, ${accent} 45%, transparent)`,
          }}
        />

        {/* Timeline Entries with Fixed, Equal Vertical Gaps */}
        <div className="flex flex-col gap-12 sm:gap-14 md:gap-16">
          {EXPERIENCES.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={item.id}
                className="timeline-entry fade-up relative flex flex-col md:flex-row items-start w-full group/entry"
                data-delay={idx * 150}
              >
                {/* Timeline Diamond Marker at fixed alignment */}
                <div
                  className="absolute left-6 md:left-1/2 -translate-x-1/2 top-7 z-20 w-7 h-7 rotate-45 flex items-center justify-center border transition-all duration-300 group-hover/entry:scale-125 group-hover/entry:shadow-lg"
                  style={{
                    background: '#0a0705',
                    borderColor: accent,
                    boxShadow: `0 0 16px color-mix(in srgb, ${accent} 70%, transparent)`,
                  }}
                >
                  <span
                    className="-rotate-45 text-[10px] font-bold transition-all duration-300 group-hover/entry:text-[#ffde7a]"
                    style={{ color: accent }}
                  >
                    ✦
                  </span>
                </div>

                {/* Horizontal Connector Stem (Mobile: left line to card) */}
                <div
                  className="md:hidden absolute left-6 top-[39px] w-8 h-px z-10 pointer-events-none"
                  style={{
                    background: `linear-gradient(to right, ${accent}, color-mix(in srgb, ${accent} 30%, transparent))`,
                  }}
                />

                {/* Horizontal Connector Stem (Desktop: center marker to card) */}
                <div
                  className={`hidden md:block absolute top-[39px] h-px z-10 w-9 pointer-events-none ${
                    isEven ? 'right-[calc(50%+14px)]' : 'left-[calc(50%+14px)]'
                  }`}
                  style={{
                    background: isEven
                      ? `linear-gradient(to left, ${accent}, color-mix(in srgb, ${accent} 30%, transparent))`
                      : `linear-gradient(to right, ${accent}, color-mix(in srgb, ${accent} 30%, transparent))`,
                  }}
                />

                {/* Content Card Box */}
                <div
                  className={`realm-card w-[calc(100%-54px)] sm:w-[calc(100%-62px)] ml-14 sm:ml-16 md:ml-0 md:w-[calc(50%-44px)] p-6 sm:p-8 border bg-[#140e00]/95 backdrop-blur-sm relative transition-all duration-300 cursor-pointer ${
                    isEven ? 'md:mr-auto' : 'md:ml-auto'
                  }`}
                  style={{
                    '--accent': accent,
                    borderColor: `color-mix(in srgb, ${accent} 40%, transparent)`,
                  } as React.CSSProperties}
                >
                  {/* Corner brackets */}
                  <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
                  <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
                  <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
                  <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

                  {/* Period & Location badge */}
                  <div className="flex flex-wrap items-center gap-3 text-xs font-cinzel text-[var(--ash)] mb-3">
                    <span className="flex items-center gap-1.5 text-[var(--gold)] font-semibold">
                      <Calendar size={13} />
                      {item.period}
                    </span>
                    <span className="opacity-40">·</span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} />
                      {item.locationType}
                    </span>
                  </div>

                  {/* Role & Company */}
                  <h2 className="font-cinzel-dec text-xl sm:text-2xl font-bold text-[var(--parchment)] mb-1 transition-all duration-300 group-hover/entry:text-[#ffde7a]">
                    {item.role}
                  </h2>
                  <h3
                    className="font-cinzel text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold mb-4 transition-all duration-300 group-hover/entry:text-[#ffd700]"
                    style={{ color: accent }}
                  >
                    {item.company}
                  </h3>

                  {/* Themed Divider between header block and description */}
                  <div
                    className="got-divider mb-4"
                    style={{ width: 'auto', justifyContent: 'flex-start' }}
                  >
                    <div
                      className="got-divider-line"
                      style={{
                        width: '42px',
                        maxWidth: '42px',
                        flex: 'none',
                        background: `linear-gradient(to right, transparent, ${accent})`,
                      }}
                    />
                    <div
                      className="got-divider-diamond"
                      style={{ background: accent }}
                    />
                    <div
                      className="got-divider-line right"
                      style={{
                        width: '42px',
                        maxWidth: '42px',
                        flex: 'none',
                        background: `linear-gradient(to left, transparent, ${accent})`,
                      }}
                    />
                  </div>

                  {/* Summary copy */}
                  <p className="font-fell italic text-sm sm:text-base text-[var(--parchment)] leading-relaxed mb-5 transition-all duration-300 group-hover/entry:text-[#e8d5b5]">
                    {item.description}
                  </p>

                  {/* Detailed Points */}
                  <ul className="space-y-2.5 mb-6 text-xs sm:text-sm font-fell text-[var(--ash)]">
                    {item.details.map((detail, dIdx) => (
                      <li
                        key={dIdx}
                        className="flex items-start gap-2.5 transition-all duration-300 group-hover/entry:text-[#f0d8a0]"
                      >
                        <CheckCircle
                          size={14}
                          className="shrink-0 mt-1 transition-all duration-300"
                          style={{ color: accent }}
                        />
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technology Tags */}
                  <div
                    className="flex flex-wrap gap-2 pt-3.5 mt-2"
                    style={{
                      borderTop: `1px solid color-mix(in srgb, ${accent} 25%, transparent)`,
                    }}
                  >
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-cinzel text-[10px] tracking-wider uppercase px-2.5 py-1 bg-[#1e1500] text-[var(--parchment)] transition-all duration-300 hover:text-[#ffde7a]"
                        style={{
                          border: `1px solid color-mix(in srgb, ${accent} 35%, transparent)`,
                        }}
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
