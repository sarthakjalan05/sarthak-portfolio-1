import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { ACHIEVEMENTS } from '../data/achievements';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { Trophy, ExternalLink, FileText } from 'lucide-react';
import { RESUME_PATH, RESUME_FILENAME } from '../config/constants';

export const Achievements: React.FC = () => {
  const accent = '#00f0ff'; // Cyber Cyan
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const keyStats = [
    { label: 'LeetCode Contest Rating', value: 1550, suffix: '+', note: 'Top 30% Global Percentile' },
    { label: 'Algorithmic Problems', value: 400, suffix: '+', note: 'Data Structures & Algorithms' },
    { label: 'Hackathon Contenders', value: 400, suffix: '+', note: '1st Runner Up · Hack the Spring' },
    { label: 'National Rank Percentile', value: 10, prefix: 'Top ', suffix: '%', note: 'Flipkart GRiD 6.0' },
  ];

  return (
    <div className="realm-page relative overflow-hidden" style={{ '--accent': accent } as React.CSSProperties}>
      {/* Background Grid & Glow */}
      <div className="realm-bg-texture" />
      <div className="realm-bg-vignette" />

      <PageHeader
        sectionLabel="HONORS & BENCHMARKS"
        eyebrow="SYS://ACHIEVEMENTS.BENCHMARKS"
        title="Key"
        titleEm="Achievements"
        motto="EXCELLENCE // COMPETITION // INITIATIVE"
        subtitle="National hackathon podiums, competitive programming ratings, and community engineering leadership."
        accent={accent}
        sigilRune="//"
      />

      {/* Numeric Stat Counters Bar */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {keyStats.map((stat, idx) => (
            <div
              key={idx}
              className="fade-up realm-card relative p-3.5 border text-center bg-[#0d1017]/90 backdrop-blur-md rounded"
              style={{
                borderColor: 'rgba(0, 240, 255, 0.25)',
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
                  prefix={stat.prefix}
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

      {/* Achievement Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto px-4">
        {ACHIEVEMENTS.map((item, idx) => (
          <div
            key={item.id}
            className="fade-up realm-card relative p-6 sm:p-8 border bg-[#0d1017]/95 backdrop-blur-md flex flex-col justify-between group shadow-[0_0_35px_rgba(0,0,0,0.85)] rounded"
            style={{
              '--accent': accent,
              borderColor: 'rgba(0, 240, 255, 0.28)',
            } as React.CSSProperties}
            data-delay={idx * 120}
          >
            {/* Corner brackets */}
            <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
            <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
            <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
            <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

            <div>
              {/* Badge & Period Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span
                  className="font-chakra text-xs uppercase px-3 py-1 border border-[rgba(0,240,255,0.3)] bg-[#07080c] font-semibold flex items-center gap-1.5 rounded"
                  style={{ color: accent }}
                >
                  <Trophy size={13} />
                  <span>{item.badge}</span>
                </span>
                <span className="font-chakra text-xs text-[var(--text-muted)] tracking-wider">
                  {item.period}
                </span>
              </div>

              {/* Title & Organization */}
              <h3 className="font-orbitron text-base sm:text-lg font-bold text-[var(--text)] mb-1 group-hover:text-[var(--cyan)] transition-colors leading-snug">
                {item.title}
              </h3>
              <p
                className="font-chakra text-xs sm:text-sm font-semibold mb-4 tracking-wide"
                style={{ color: accent }}
              >
                {item.organization}
              </p>

              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-px bg-[var(--cyan)]" />
                <span className="w-1 h-1 rounded-full bg-[var(--cyan)]" />
                <span className="w-8 h-px bg-gradient-to-r from-[var(--cyan)] to-transparent" />
              </div>

              {/* Summary Description */}
              <p className="font-space text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Extended Details */}
              {item.extendedDetails && (
                <div className="mb-4 p-3 bg-[#07080c]/80 border border-[rgba(0,240,255,0.15)] rounded">
                  <p className="font-space text-xs text-[var(--text)]/90 leading-relaxed">
                    {item.extendedDetails}
                  </p>
                </div>
              )}
            </div>

            {/* External Link */}
            {item.url && (
              <div className="pt-3 mt-2 border-t border-[rgba(0,240,255,0.15)]">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-ghost w-full justify-center text-xs py-2 px-3 flex items-center gap-2 rounded font-chakra font-semibold"
                  style={{ borderColor: 'rgba(0, 240, 255, 0.35)', color: 'var(--text)' }}
                >
                  <span>Inspect Verification Record</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Complete resume banner */}
      <div className="fade-up mt-14 mb-8 text-center relative z-10">
        <p className="font-space text-sm text-[var(--text-muted)] inline-flex items-center gap-2">
          <span>Looking for competitive contest logs?</span>
          <a
            href={RESUME_PATH}
            download={RESUME_FILENAME}
            className="text-[var(--cyan)] hover:text-white underline underline-offset-4 decoration-[var(--cyan-dim)] hover:decoration-[var(--cyan)] transition-colors font-chakra text-xs uppercase tracking-wider inline-flex items-center gap-1.5"
          >
            <FileText size={13} />
            <span>Download Full Resume PDF</span>
          </a>
        </p>
      </div>
    </div>
  );
};
