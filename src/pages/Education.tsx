import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { EDUCATION_DATA } from '../data/education';
import { GraduationCap, BookOpen, Cpu } from 'lucide-react';

export const Education: React.FC = () => {
  const accent = '#00f0ff'; // Cyber Cyan

  return (
    <div className="realm-page relative overflow-hidden" style={{ '--accent': accent } as React.CSSProperties}>
      {/* Background Grid & Glow */}
      <div className="realm-bg-texture" />
      <div className="realm-bg-vignette" />

      <PageHeader
        sectionLabel="ACADEMIC BACKGROUND"
        eyebrow="SYS://ACADEMICS.CREDENTIALS"
        title="Formal"
        titleEm="Education"
        motto="THEORY // ALGORITHMS // SYSTEMS ARCHITECTURE"
        subtitle="Foundational computer science, distributed architectures, database systems, and algorithms at Vellore Institute of Technology."
        accent={accent}
        sigilRune="✦"
      />

      {/* Cyber Academic Record Panel */}
      <div className="relative z-10 max-w-4xl mx-auto px-2">
        <div
          className="fade-up realm-card relative p-8 sm:p-12 md:p-14 border bg-[#0d1017]/95 backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.85)] rounded overflow-hidden"
          style={{
            borderColor: 'rgba(0, 240, 255, 0.35)',
          }}
          data-delay="100"
        >
          {/* Corner HUD brackets */}
          <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

          {/* Academic crest */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div
              className="w-16 h-16 rounded border border-[var(--cyan-dim)] flex items-center justify-center mb-3 bg-[#07080c] transition-transform duration-300 hover:scale-105"
              style={{
                color: accent,
                boxShadow: '0 0 25px rgba(0,240,255,0.25)',
              }}
            >
              <GraduationCap size={32} />
            </div>
            <span className="font-chakra text-[11px] tracking-[0.3em] uppercase text-[var(--cyan)] text-center font-semibold">
              ACCREDITED DEGREE PROGRAM
            </span>
          </div>

          {/* Institution & Degree */}
          <div className="text-center mb-8">
            <h2 className="font-orbitron text-2xl sm:text-3xl text-[var(--text)] font-extrabold mb-2 leading-tight">
              {EDUCATION_DATA.institution}
            </h2>
            <div className="flex items-center justify-center gap-3 my-4">
              <span className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--cyan)]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" />
              <span className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--cyan)]" />
            </div>
            <h3 className="font-chakra text-sm sm:text-base tracking-widest uppercase text-[var(--cyan)] font-semibold mb-2">
              {EDUCATION_DATA.degree}
            </h3>
            <p className="font-space text-sm sm:text-base text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
              Specialization in {EDUCATION_DATA.specialization.replace('Bachelor of Technology (B.Tech) in ', '')}
            </p>
          </div>

          {/* Tenure & Location */}
          <div
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 py-3.5 px-6 my-6 bg-[#07080c] text-xs sm:text-sm font-chakra tracking-wider text-[var(--text-muted)] border-y border-[rgba(0,240,255,0.2)] rounded"
          >
            <span>TIMELINE: {EDUCATION_DATA.period}</span>
            <span className="hidden sm:inline text-[var(--cyan)]">·</span>
            <span>CAMPUS: {EDUCATION_DATA.location}</span>
          </div>

          {/* Curricular Focus */}
          <div className="space-y-4 my-8">
            <h4 className="font-chakra text-xs sm:text-sm uppercase tracking-[0.25em] text-[var(--text)] font-semibold flex items-center gap-2.5">
              <BookOpen size={16} className="text-[var(--cyan)] shrink-0" />
              <span>Core Curricular Focus &amp; Foundations</span>
            </h4>
            <div className="space-y-3">
              {EDUCATION_DATA.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 bg-[#07080c]/60 border border-[rgba(0,240,255,0.15)] rounded"
                >
                  <Cpu size={16} className="text-[var(--cyan)] mt-0.5 shrink-0" />
                  <p className="font-space text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    {h}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
