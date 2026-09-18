import React, { useEffect, useRef, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { CORE_SKILLS, SECONDARY_SKILLS } from '../data/skills';
import { Shield, Sparkles, Cpu, Layers, Swords, ChevronDown, ChevronUp, Scroll } from 'lucide-react';
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
        sectionLabel="Skills"
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
        <div className="mb-24">
        <div className="flex items-center justify-center gap-4 mb-12">
          <Shield size={20} className="text-[var(--gold)]" />
          <h2 className="font-cinzel text-[11px] tracking-[0.4em] uppercase text-[var(--gold)] font-bold">
            Core Masteries & Foundation
          </h2>
          <Shield size={20} className="text-[var(--gold)]" />
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 max-w-5xl mx-auto px-2">
          {CORE_SKILLS.map((grp) => (
            <div
              key={grp.title}
              className="skill-card fade-up relative p-8 sm:p-10 border bg-[#120f08]/90 backdrop-blur-sm text-center group hover:border-[var(--gold)] transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
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

              <h3 className="font-cinzel-dec text-xl sm:text-2xl text-[var(--parchment)] mb-3">
                {grp.title}
              </h3>

              <p className="font-fell italic text-sm sm:text-base text-[#bda05e] mb-6">
                {grp.motto}
              </p>

              <div className="got-divider max-w-[120px] mx-auto mb-6">
                <div className="got-divider-line" />
                <div className="got-divider-diamond" />
                <div className="got-divider-line right" />
              </div>

              {/* Skill Badges */}
              <div className="flex flex-wrap justify-center gap-3">
                {grp.skills.map((skill) => (
                  <div
                    key={skill}
                    className="font-cinzel text-xs sm:text-sm tracking-wider uppercase px-4 py-2.5 bg-[#201809] border border-[var(--gold-dim)] text-[var(--parchment)] font-semibold shadow-inner transition-colors group-hover:border-[var(--gold)]"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Low-key 'the full story lives here' signal */}
        <div className="fade-up mt-12 text-center">
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

        {/* Themed Accordion Toggle to Reveal/Conceal Full Arsenal */}
        <div className="fade-up mt-8 text-center">
          <button
            type="button"
            onClick={() => setShowArsenal((prev) => !prev)}
            className="got-cta-ghost inline-flex items-center gap-3 px-6 sm:px-8 py-3 text-xs font-cinzel tracking-[0.25em] uppercase border border-[var(--gold-dim)]/60 hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 transition-all cursor-pointer"
            aria-expanded={showArsenal}
          >
            <Swords size={15} className="text-[var(--gold)]" />
            <span>{showArsenal ? 'Conceal Secondary Arsenal' : 'Reveal the Full Arsenal (Also Worked With)'}</span>
            {showArsenal ? (
              <ChevronUp size={14} className="text-[var(--gold)]" />
            ) : (
              <ChevronDown size={14} className="text-[var(--gold)]" />
            )}
          </button>
        </div>
      </div>

      {/* SECONDARY "ALSO WORKED WITH" GROUP (Collapsed by default behind disclosure) */}
      {showArsenal && (
        <div
          ref={secondaryRef}
          className="pt-16 max-w-7xl mx-auto px-2 animate-in fade-in slide-in-from-top-4 duration-300"
          style={{
            borderTop: `1px solid color-mix(in srgb, ${accent} 35%, transparent)`,
          }}
        >
          <div className="text-center mb-12">
            <span className="font-cinzel text-[11px] tracking-[0.35em] text-[#c8a860] uppercase block mb-2 drop-shadow-[0_0_8px_rgba(200,168,96,0.2)]">
              ✦ Secondary Domain Battlegrounds ✦
            </span>
            <h2 className="font-cinzel-dec text-2xl sm:text-3xl text-[var(--gold-light)] mb-4">
              Also Worked With
            </h2>
            <p className="font-garamond text-sm sm:text-base text-[var(--ash)] max-w-2xl mx-auto leading-relaxed">
              Supporting ecosystems, neural libraries, and server frameworks forged across applied machine learning and full-stack projects.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
            {SECONDARY_SKILLS.map((grp) => (
              <div
                key={grp.title}
                className="p-6 sm:p-7 border border-[#c8a860]/50 bg-gradient-to-br from-[#1a150d] to-[#0f0c08] relative group hover:border-[#e8c97a] hover:shadow-[0_0_25px_rgba(232,201,122,0.2)] transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.6)]"
              >
                {/* Corner brackets */}
                <span className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#e8c97a]/70 group-hover:border-[#e8c97a] transition-colors" />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#e8c97a]/70 group-hover:border-[#e8c97a] transition-colors" />
                <span className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#e8c97a]/70 group-hover:border-[#e8c97a] transition-colors" />
                <span className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#e8c97a]/70 group-hover:border-[#e8c97a] transition-colors" />

                <div className="flex items-start gap-3 mb-4">
                  <span className="text-xl sm:text-2xl text-[#e8c97a] shrink-0">
                    {grp.sigil}
                  </span>
                  <h3 className="font-cinzel text-sm tracking-[0.12em] uppercase text-[var(--parchment)] group-hover:text-[#e8c97a] transition-colors font-semibold leading-tight">
                    {grp.title}
                  </h3>
                </div>
                
                <div className="h-[1px] bg-gradient-to-r from-[#c8a860] to-transparent mb-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                
                <p className="font-garamond text-xs text-[var(--ash)] group-hover:text-[#e8c97a] transition-colors mb-4 leading-relaxed">
                  {grp.motto || 'Supporting technologies'}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {grp.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-cinzel tracking-[0.05em] px-2.5 py-1.5 bg-[#201809] border border-[#c8a860]/60 text-[#e8c97a] font-medium"
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
