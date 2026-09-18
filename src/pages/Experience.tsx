import React, { useEffect, useRef } from 'react';
import { PageHeader } from '../components/PageHeader';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { EXPERIENCES } from '../data/experience';
import { Briefcase, MapPin, Calendar, CheckCircle2, FileText } from 'lucide-react';
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

  const accent = '#00f0ff'; // Cyber Cyan

  const metrics = [
    { label: 'ML Model Precision', value: 98.78, decimals: 2, suffix: '%', note: 'Exerted force predictions' },
    { label: 'Dataset Volume', value: 1000000, suffix: '+', note: 'Experimental training records' },
    { label: 'Algorithmic Matches', value: 10000, suffix: '+', note: 'High-throughput matching routes' },
    { label: 'Production Platforms', value: 2, suffix: ' Deployed', note: 'Full-stack MERN & ML backends' },
  ];

  return (
    <div className="realm-page relative overflow-hidden" style={{ '--accent': accent } as React.CSSProperties}>
      {/* Background Grid & Glow */}
      <div className="realm-bg-texture" />
      <div className="realm-bg-vignette" />

      <PageHeader
        sectionLabel="SYSTEMS ENGINEERING"
        eyebrow="SYS://EXPERIENCE.LOG"
        title="Work"
        titleEm="Experience"
        motto="DEPLOY // SCALE // EXECUTE"
        subtitle="Production engineering, distributed microservices, and AI/ML model deployment under live commercial workloads."
        accent={accent}
        sigilRune="✦"
      />

      {/* Production Metrics Strip */}
      <div className="relative z-10 max-w-5xl mx-auto px-2 sm:px-4 md:px-6 mb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {metrics.map((stat, idx) => (
            <div
              key={idx}
              className="fade-up realm-card relative p-3.5 border text-center bg-[#0d1017]/90 backdrop-blur-md"
              style={{
                borderColor: `color-mix(in srgb, ${accent} 25%, transparent)`,
              }}
              data-delay={idx * 80}
            >
              <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
              <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />
              <p className="font-chakra text-[10px] uppercase tracking-widest text-[var(--cyan)] mb-1 font-semibold">
                {stat.label}
              </p>
              <div className="font-orbitron text-base sm:text-lg font-bold text-[var(--text)] my-0.5">
                <AnimatedCounter
                  value={stat.value}
                  decimals={stat.decimals || 0}
                  suffix={stat.suffix}
                />
              </div>
              <p className="font-space text-[12px] text-[var(--text-muted)] leading-tight">
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

        {/* Timeline Entries */}
        <div className="flex flex-col gap-12 sm:gap-14 md:gap-16">
          {EXPERIENCES.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={item.id}
                className="timeline-entry fade-up relative flex flex-col md:flex-row items-start w-full group/entry"
                data-delay={idx * 150}
              >
                {/* Timeline Diamond Marker */}
                <div
                  className="absolute left-6 md:left-1/2 -translate-x-1/2 top-7 z-20 w-7 h-7 rotate-45 flex items-center justify-center border transition-all duration-300 group-hover/entry:scale-125"
                  style={{
                    background: '#07080c',
                    borderColor: accent,
                    boxShadow: `0 0 16px color-mix(in srgb, ${accent} 70%, transparent)`,
                  }}
                >
                  <span
                    className="-rotate-45 text-[10px] font-bold transition-all duration-300 group-hover/entry:text-white"
                    style={{ color: accent }}
                  >
                    ✦
                  </span>
                </div>

                {/* Horizontal Connector Stem (Mobile) */}
                <div
                  className="md:hidden absolute left-6 top-[39px] w-8 h-px z-10 pointer-events-none"
                  style={{
                    background: `linear-gradient(to right, ${accent}, color-mix(in srgb, ${accent} 30%, transparent))`,
                  }}
                />

                {/* Horizontal Connector Stem (Desktop) */}
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
                  className={`realm-card w-[calc(100%-54px)] sm:w-[calc(100%-62px)] ml-14 sm:ml-16 md:ml-0 md:w-[calc(50%-44px)] p-6 sm:p-8 border bg-[#0d1017]/95 backdrop-blur-md relative transition-all duration-300 cursor-pointer ${
                    isEven ? 'md:mr-auto' : 'md:ml-auto'
                  }`}
                  style={{
                    '--accent': accent,
                    borderColor: `color-mix(in srgb, ${accent} 35%, transparent)`,
                  } as React.CSSProperties}
                >
                  {/* Corner brackets */}
                  <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
                  <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
                  <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
                  <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

                  {/* Period & Location */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm font-chakra mb-5 pb-4 border-b border-[rgba(0,240,255,0.2)]">
                    <span className="flex items-center gap-2 text-[var(--cyan)] font-bold tracking-wider uppercase drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]">
                      <Calendar size={14} className="shrink-0" />
                      {item.period}
                    </span>
                    <span className="hidden sm:block text-[var(--cyan-dim)] opacity-60">◆</span>
                    <span className="flex items-center gap-2 text-[var(--text-muted)] font-semibold">
                      <MapPin size={14} className="shrink-0" />
                      {item.locationType}
                    </span>
                  </div>

                  {/* Role & Company */}
                  <h2 className="font-orbitron text-lg sm:text-xl font-bold text-[var(--text)] mb-1 transition-all duration-300 group-hover/entry:text-[var(--cyan)]">
                    {item.role}
                  </h2>
                  <h3
                    className="font-chakra text-sm sm:text-base font-semibold mb-4 tracking-wide"
                    style={{ color: accent }}
                  >
                    {item.company}
                  </h3>

                  {/* Description */}
                  <p className="font-space text-sm sm:text-base text-[var(--text-muted)] leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <ul className="space-y-3 mb-6">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-3">
                        <CheckCircle2
                          size={16}
                          className="shrink-0 mt-1 transition-transform group-hover/entry:scale-110"
                          style={{ color: accent }}
                        />
                        <span className="font-space text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-[rgba(0,240,255,0.15)]">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[11px] font-chakra font-medium tracking-wider uppercase border rounded"
                        style={{
                          color: 'var(--text)',
                          borderColor: `color-mix(in srgb, ${accent} 30%, transparent)`,
                          backgroundColor: 'rgba(0, 240, 255, 0.05)',
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

      {/* Bottom Download Resume Call to Action */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 mt-20 text-center">
        <div
          className="fade-up realm-card p-8 border bg-[#0d1017]/95 backdrop-blur-md relative inline-block max-w-xl mx-auto"
          style={{
            borderColor: `color-mix(in srgb, ${accent} 35%, transparent)`,
          }}
        >
          <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

          <h3 className="font-orbitron text-lg sm:text-xl font-bold text-[var(--text)] mb-2">
            Complete Systems Dossier
          </h3>
          <p className="font-space text-sm text-[var(--text-muted)] mb-6 max-w-md mx-auto">
            Review detailed technical specifications, project architecture metrics, and full career timeline in PDF format.
          </p>
          <a
            href={RESUME_PATH}
            download={RESUME_FILENAME}
            className="got-cta-btn inline-flex items-center gap-2"
          >
            <FileText size={15} />
            <span>Download Resume PDF</span>
          </a>
        </div>
      </div>
    </div>
  );
};
