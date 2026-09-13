import React, { useEffect, useRef } from 'react';
import { PageHeader } from '../components/PageHeader';
import { CORE_SKILLS, SECONDARY_SKILLS } from '../data/skills';
import { Shield, Sparkles, Cpu, Layers } from 'lucide-react';

export const Skills: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = document.querySelectorAll('.skill-card');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, (i % 4) * 120);
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  const accent = '#c9a84c'; // Baratheon Gold

  return (
    <div className="realm-page relative overflow-hidden" style={{ '--accent': accent } as React.CSSProperties}>
      {/* Atmospheric Background Layers */}
      <div className="realm-bg-texture" />
      <div className="realm-bg-vignette" />

      <PageHeader
        eyebrow="HOUSE BARATHEON · STORM'S END"
        title="Arsenal of"
        titleEm="Arms & Mastery"
        motto="Ours Is The Fury"
        subtitle='"The stag&apos;s strength, catalogued." Primary weapons of programming, relational databases, and enterprise cloud systems tempered in production.'
        accent={accent}
        sigilRune="⚔"
      />

      {/* Main Content Sections */}
      <div className="relative z-10">
        {/* CORE SKILLS SECTION (Coat-of-Arms style banner cards) */}
        <div className="mb-20">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Shield size={18} className="text-[var(--gold)]" />
          <h2 className="font-cinzel text-xs tracking-[0.4em] uppercase text-[var(--gold)] font-bold">
            Core Masteries & Foundation
          </h2>
          <Shield size={18} className="text-[var(--gold)]" />
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {CORE_SKILLS.map((grp) => (
            <div
              key={grp.title}
              className="skill-card fade-up relative p-8 border bg-[#120f08]/90 backdrop-blur-sm text-center group hover:border-[var(--gold)] transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
              style={{ borderColor: 'rgba(201, 168, 76, 0.35)' }}
            >
              {/* Corner brackets */}
              <span className="corner corner-tl" />
              <span className="corner corner-tr" />
              <span className="corner corner-bl" />
              <span className="corner corner-br" />

              {/* Coat-of-arms crest */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-[var(--gold-dim)] flex items-center justify-center bg-[#1c160a] text-[var(--gold)] text-2xl shadow-[0_0_20px_rgba(201,168,76,0.2)] group-hover:scale-110 group-hover:border-[var(--gold)] transition-transform duration-300">
                {grp.sigil}
              </div>

              <h3 className="font-cinzel-dec text-lg sm:text-xl text-[var(--parchment)] mb-2">
                {grp.title}
              </h3>

              <p className="font-fell italic text-xs text-[var(--gold-dim)] mb-6">
                {grp.motto}
              </p>

              <div className="got-divider max-w-[120px] mx-auto mb-6">
                <div className="got-divider-line" />
                <div className="got-divider-diamond" />
                <div className="got-divider-line right" />
              </div>

              {/* Skill Badges */}
              <div className="flex flex-wrap justify-center gap-2.5">
                {grp.skills.map((skill) => (
                  <div
                    key={skill}
                    className="font-cinzel text-xs tracking-wider uppercase px-4 py-2 bg-[#201809] border border-[var(--gold-dim)] text-[var(--parchment)] font-semibold shadow-inner transition-colors group-hover:border-[var(--gold)]"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECONDARY "ALSO WORKED WITH" GROUP (Visually Distinct & Secondary) */}
      <div
        ref={secondaryRef}
        className="pt-10 max-w-6xl mx-auto"
        style={{
          borderTop: `1px solid color-mix(in srgb, ${accent} 30%, transparent)`,
        }}
      >
        <div className="text-center mb-8">
          <span className="font-cinzel text-[11px] tracking-[0.35em] text-[#9c917f] uppercase block mb-1">
            Secondary Domain Battlegrounds
          </span>
          <h2 className="font-cinzel-dec text-xl sm:text-2xl text-[var(--parchment)]">
            Also Worked With
          </h2>
          <p className="font-fell italic text-sm text-[var(--ash)] max-w-xl mx-auto mt-2">
            Ecosystems, neural libraries, and server frameworks forged across applied machine learning and full-stack projects.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SECONDARY_SKILLS.map((grp) => (
            <div
              key={grp.title}
              className="skill-card fade-up p-5 border border-[#2b241a] bg-[#0c0a07]/80 relative group hover:border-[#524531] transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base text-[var(--gold-dim)] group-hover:text-[var(--gold)] transition-colors">
                  {grp.sigil}
                </span>
                <h3 className="font-cinzel text-xs tracking-wider uppercase text-[var(--ash)] group-hover:text-[var(--parchment)] transition-colors font-semibold">
                  {grp.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {grp.skills.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] font-cinzel tracking-wide px-2 py-1 bg-[#14100b] border border-[#2b241a] text-[#c8bfb0] rounded-none"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};
