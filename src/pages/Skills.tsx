import React, { useEffect, useRef, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { CORE_SKILLS, SECONDARY_SKILLS } from '../data/skills';
import { Cpu, Layers, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { RESUME_PATH, RESUME_FILENAME } from '../config/constants';

export const Skills: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const [showArsenal, setShowArsenal] = useState(false);

  useEffect(() => {
    const cards = document.querySelectorAll('.skill-card');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, (i % 4) * 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  const accent = '#00f0ff'; // Cyber Cyan

  return (
    <div className="realm-page relative overflow-hidden" style={{ '--accent': accent } as React.CSSProperties}>
      {/* Background Grid & Glow */}
      <div className="realm-bg-texture" />
      <div className="realm-bg-vignette" />

      <PageHeader
        sectionLabel="TECHNICAL CAPABILITIES"
        eyebrow="SYS://SKILLS.MATRIX"
        title="Technical"
        titleEm="Skills"
        motto="ARCHITECTURE // EFFICIENCY // ROBUSTNESS"
        subtitle="Core programming languages, relational databases, distributed systems, and edge machine learning toolchains."
        accent={accent}
        sigilRune="✦"
      />

      {/* Main Content Sections */}
      <div className="relative z-10">
        {/* CORE SKILLS SECTION */}
        <div className="mb-20">
          <div className="flex items-center justify-center gap-3 mb-10">
            <Cpu size={18} className="text-[var(--cyan)]" />
            <h2 className="font-chakra text-[11px] tracking-[0.35em] uppercase text-[var(--cyan)] font-bold">
              Core Technical Competencies
            </h2>
            <Cpu size={18} className="text-[var(--cyan)]" />
          </div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 max-w-5xl mx-auto px-2">
            {CORE_SKILLS.map((grp) => (
              <div
                key={grp.title}
                className="skill-card fade-up relative p-8 sm:p-9 border bg-[#0d1017]/95 backdrop-blur-md text-center group hover:border-[var(--cyan)] transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.85)]"
                style={{ borderColor: 'rgba(0, 240, 255, 0.28)' }}
              >
                {/* Corner brackets */}
                <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
                <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
                <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
                <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

                {/* Subsystem crest */}
                <div className="w-14 h-14 mx-auto mb-5 rounded border border-[var(--cyan-dim)] flex items-center justify-center bg-[#07080c] text-[var(--cyan)] text-2xl shadow-[0_0_20px_rgba(0,240,255,0.2)] group-hover:scale-105 group-hover:border-[var(--cyan)] transition-transform duration-300">
                  {grp.sigil}
                </div>

                <h3 className="font-orbitron text-lg sm:text-xl text-[var(--text)] mb-2 font-bold">
                  {grp.title}
                </h3>

                <p className="font-chakra text-xs text-[var(--cyan)] tracking-wider uppercase mb-5">
                  {grp.motto}
                </p>

                <div className="got-divider max-w-[120px] mx-auto mb-6">
                  <div className="got-divider-line" />
                  <div className="got-divider-diamond" />
                  <div className="got-divider-line right" />
                </div>

                {/* Skill Badges */}
                <div className="flex flex-wrap justify-center gap-2">
                  {grp.skills.map((skill) => (
                    <div
                      key={skill}
                      className="font-chakra text-xs tracking-wider uppercase px-3 py-1.5 bg-[#07080c] border border-[rgba(0,240,255,0.25)] text-[var(--text)] font-semibold rounded transition-colors group-hover:border-[var(--cyan)]"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Download resume CTA */}
          <div className="fade-up mt-12 text-center">
            <p className="font-space text-sm text-[var(--text-muted)] inline-flex items-center gap-2">
              <span>Looking for complete proficiency scores?</span>
              <a
                href={RESUME_PATH}
                download={RESUME_FILENAME}
                className="text-[var(--cyan)] hover:text-white underline underline-offset-4 decoration-[var(--cyan-dim)] hover:decoration-[var(--cyan)] transition-colors font-chakra text-xs uppercase tracking-wider inline-flex items-center gap-1.5"
              >
                <FileText size={13} />
                <span>Download Resume PDF</span>
              </a>
            </p>
          </div>

          {/* Toggle Button for Extended Arsenal */}
          <div className="fade-up mt-8 text-center">
            <button
              type="button"
              onClick={() => setShowArsenal((prev) => !prev)}
              className="cyber-ghost inline-flex items-center gap-3 px-6 sm:px-8 py-3 text-xs font-chakra tracking-[0.2em] uppercase border border-[rgba(0,240,255,0.4)] hover:border-[var(--cyan)] hover:bg-[rgba(0,240,255,0.08)] transition-all cursor-pointer"
              aria-expanded={showArsenal}
            >
              <Layers size={15} className="text-[var(--cyan)]" />
              <span>{showArsenal ? 'Conceal Extended Matrix' : 'Reveal Extended Technology Matrix (Frameworks & Tooling)'}</span>
              {showArsenal ? (
                <ChevronUp size={14} className="text-[var(--cyan)]" />
              ) : (
                <ChevronDown size={14} className="text-[var(--cyan)]" />
              )}
            </button>
          </div>
        </div>

        {/* SECONDARY GROUP */}
        {showArsenal && (
          <div
            ref={secondaryRef}
            className="pt-14 max-w-7xl mx-auto px-2 animate-in fade-in slide-in-from-top-4 duration-300"
            style={{
              borderTop: `1px solid color-mix(in srgb, ${accent} 25%, transparent)`,
            }}
          >
            <div className="text-center mb-10">
              <span className="font-chakra text-[11px] tracking-[0.3em] text-[var(--cyan)] uppercase block mb-2">
                SYS://EXTENDED.LIBRARIES
              </span>
              <h2 className="font-orbitron text-xl sm:text-2xl text-[var(--text)] mb-3 font-bold">
                Supporting Libraries &amp; Infrastructure
              </h2>
              <p className="font-space text-sm text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
                Applied toolchains, numerical computation libraries, model inference engines, and container runtime environments.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
              {SECONDARY_SKILLS.map((grp) => (
                <div
                  key={grp.title}
                  className="p-6 border border-[rgba(0,240,255,0.25)] bg-[#0d1017]/90 relative group hover:border-[var(--cyan)] hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300 rounded"
                >
                  {/* Corner brackets */}
                  <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
                  <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
                  <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
                  <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-xl text-[var(--cyan)] shrink-0">
                      {grp.sigil}
                    </span>
                    <h3 className="font-orbitron text-xs tracking-wider uppercase text-[var(--text)] group-hover:text-[var(--cyan)] transition-colors font-bold leading-tight">
                      {grp.title}
                    </h3>
                  </div>

                  <div className="h-[1px] bg-gradient-to-r from-[var(--cyan)] to-transparent mb-3 opacity-40 group-hover:opacity-100 transition-opacity" />

                  <p className="font-space text-xs text-[var(--text-muted)] mb-4 leading-relaxed">
                    {grp.motto || 'Supporting toolchain'}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {grp.skills.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-chakra tracking-wider px-2 py-1 bg-[#07080c] border border-[rgba(0,240,255,0.25)] text-[var(--text)] rounded font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
