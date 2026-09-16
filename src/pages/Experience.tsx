import React, { useEffect, useRef } from 'react';
import { PageHeader } from '../components/PageHeader';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { EXPERIENCES } from '../data/experience';
import { Briefcase, MapPin, Calendar, CheckCircle, Scroll } from 'lucide-react';
import { RESUME_PATH, RESUME_FILENAME } from '../config/constants';

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

  const lannisterStats = [
    { label: 'ML Model Precision', value: 98.78, decimals: 2, suffix: '%', note: 'Exerted force predictions' },
    { label: 'Dataset Volume', value: 1000000, suffix: '+', note: 'Experimental training records' },
    { label: 'Creator Matches', value: 10000, suffix: '+', note: 'High-throughput algorithmic routing' },
    { label: 'Commercial Deployments', value: 2, suffix: ' Platforms', note: 'Production MERN & ML backends' },
  ];

  return (
    <div className="realm-page relative overflow-hidden" style={{ '--accent': accent } as React.CSSProperties}>
      {/* Atmospheric Background Layers */}
      <div className="realm-bg-texture" />
      <div className="realm-bg-vignette" />

      <PageHeader
        sectionLabel="Experience"
        eyebrow="HOUSE LANNISTER · CASTERLY ROCK"
        title="Ledger of"
        titleEm="Deeds & Service"
        motto="Hear Me Roar"
        subtitle='"A Lannister always delivers what is promised." A battle-tested record of engineering production platforms, AI models, and measurable outcomes.'
        accent={accent}
        sigilRune="🦁"
      />

      {/* Lannister Measured Metrics Strip (Refined: Small & Secondary in visual weight relative to titles) */}
      <div className="relative z-10 max-w-5xl mx-auto px-2 sm:px-4 md:px-6 mb-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {lannisterStats.map((stat, idx) => (
            <div
              key={idx}
              className="fade-up realm-card relative p-3 sm:p-3.5 border text-center bg-[#140e00]/75 backdrop-blur-sm"
              style={{
                borderColor: `color-mix(in srgb, ${accent} 25%, transparent)`,
              }}
              data-delay={idx * 80}
            >
              <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
              <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />
              <p className="font-cinzel text-[9px] uppercase tracking-widest text-[#e8c97a]/80 mb-0.5 font-semibold">
                {stat.label}
              </p>
              <div className="font-cinzel text-base sm:text-lg font-bold text-[var(--parchment)] my-0.5">
                <AnimatedCounter
                  value={stat.value}
                  decimals={stat.decimals || 0}
                  suffix={stat.suffix}
                />
              </div>
              <p className="font-garamond text-[11px] text-[var(--ash)]/80 leading-tight">
                {stat.note}
              </p>
            </div>
          ))}
        </div>
      </div>

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

                  {/* Period & Location badge - PROMINENT DATE */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm sm:text-base font-cinzel mb-6 pb-5 border-b border-[var(--gold-dim)]/40">
                    <span className="flex items-center gap-2 text-[#ffde7a] font-bold tracking-wider uppercase drop-shadow-[0_0_8px_rgba(255,222,122,0.2)]">
                      <Calendar size={16} className="shrink-0" />
                      {item.period}
                    </span>
                    <span className="hidden sm:block text-[var(--gold-dim)] opacity-60">◆</span>
                    <span className="flex items-center gap-2 text-[var(--ash)] font-semibold">
                      <MapPin size={16} className="shrink-0" />
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
                  <p className="font-garamond text-lg text-[var(--parchment)] leading-[1.75] mb-6 transition-all duration-300 group-hover:text-[#e8d5b5]">
                    {item.description}
                  </p>

                  {/* Detailed Points */}
                  <ul className="space-y-3 mb-7 text-base font-garamond text-[var(--ash)] leading-[1.75]">
                    {item.details.map((detail, dIdx) => (
                      <li
                        key={dIdx}
                        className="flex items-start gap-3 transition-all duration-300 group-hover/entry:text-[#f0d8a0]"
                      >
                        <CheckCircle
                          size={18}
                          className="shrink-0 mt-0.5 transition-all duration-300"
                          style={{ color: accent }}
                        />
                        <span className="leading-[1.75]">{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technology Tags */}
                  <div
                    className="flex flex-wrap gap-3 pt-5 mt-6"
                    style={{
                      borderTop: `1.5px solid color-mix(in srgb, ${accent} 40%, transparent)`,
                    }}
                  >
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-cinzel text-xs sm:text-sm tracking-[0.15em] uppercase px-4 py-2 bg-gradient-to-br from-[#2a1f0f] to-[#1e1500] text-[#ffde7a] border-2 transition-all duration-300 hover:text-[#fff] hover:bg-gradient-to-br hover:from-[#3d2d15] hover:to-[#2a1f0f] hover:shadow-[0_0_20px_rgba(255,222,122,0.3)] hover:scale-110 font-semibold"
                        style={{
                          borderColor: `color-mix(in srgb, ${accent} 50%, transparent)`,
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

      {/* Low-key 'the full story lives here' signal */}
      <div className="fade-up mt-14 mb-8 text-center relative z-10">
        <p className="font-fell italic text-sm text-[var(--ash)] inline-flex items-center gap-2">
          <span>For the complete record,</span>
          <a
            href={RESUME_PATH}
            download={RESUME_FILENAME}
            className="text-[var(--gold)] hover:text-[var(--gold-light)] underline underline-offset-4 decoration-[var(--gold-dim)] hover:decoration-[var(--gold)] transition-colors not-italic font-cinzel text-xs uppercase tracking-wider inline-flex items-center gap-1"
          >
            <span>download the full resume</span>
            <span>&darr;</span>
          </a>
        </p>
      </div>
    </div>
  );
};
