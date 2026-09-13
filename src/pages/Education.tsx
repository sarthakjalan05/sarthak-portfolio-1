import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { EDUCATION_DATA } from '../data/education';
import { Scroll, Award, BookOpen, Layers } from 'lucide-react';

export const Education: React.FC = () => {
  const accent = '#c8bfb0'; // Citadel Maester Parchment / Silver

  return (
    <div className="realm-page relative overflow-hidden" style={{ '--accent': accent } as React.CSSProperties}>
      {/* Atmospheric Background Layers */}
      <div className="realm-bg-texture" />
      <div className="realm-bg-vignette" />

      <PageHeader
        eyebrow="THE CITADEL OF OLDTOWN · ARCHIVES"
        title="Scholarly Scroll of"
        titleEm="The Citadel"
        motto="Knowledge Is a Chain Unbroken"
        subtitle='"Knowledge is a chain unbroken." Records of foundational study, distributed systems theory, and automation architectures at Vellore Institute of Technology.'
        accent={accent}
        sigilRune="⛓"
      />

      {/* Illuminated Manuscript Single Card */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <div
          className="fade-up realm-card relative p-6 sm:p-10 md:p-14 border bg-[#0d0c0a]/95 backdrop-blur-md shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden"
          style={{
            '--accent': '#e8c97a',
            borderColor: 'rgba(200, 191, 176, 0.4)',
          } as React.CSSProperties}
          data-delay="100"
        >
          {/* Corner brackets */}
          <span className="corner corner-tl" style={{ '--accent': '#e8c97a' } as React.CSSProperties} />
          <span className="corner corner-tr" style={{ '--accent': '#e8c97a' } as React.CSSProperties} />
          <span className="corner corner-bl" style={{ '--accent': '#e8c97a' } as React.CSSProperties} />
          <span className="corner corner-br" style={{ '--accent': '#e8c97a' } as React.CSSProperties} />

          {/* Maester Archival Seal Top Stamp */}
          <div className="flex flex-col items-center justify-center mb-6 sm:mb-8">
            <div
              className="w-16 sm:w-20 h-16 sm:h-20 rounded-full border-2 flex items-center justify-center mb-3 sm:mb-4 bg-[#171512] transition-transform duration-300 hover:scale-105"
              style={{
                borderColor: '#c8bfb0',
                color: '#e8c97a',
                boxShadow: '0 0 25px rgba(200,191,176,0.25)',
              }}
            >
              <Scroll size={32} className="sm:w-9 sm:h-9" />
            </div>
            <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[#e8c97a] text-center">
              Conferred by Vellore Institute of Technology
            </span>
          </div>

          {/* Institution & Degree with Fluid Clamp */}
          <div className="text-center mb-8">
            <h2 className="font-cinzel-dec text-[clamp(20px,4vw,36px)] text-[var(--parchment)] font-bold mb-2 leading-tight">
              {EDUCATION_DATA.institution}
            </h2>
            <div className="got-divider max-w-sm mx-auto my-4">
              <div className="got-divider-line" style={{ background: 'linear-gradient(to right, transparent, #c8bfb0)' }} />
              <div className="got-divider-diamond" style={{ background: '#c8bfb0' }} />
              <div className="got-divider-line right" style={{ background: 'linear-gradient(to left, transparent, #c8bfb0)' }} />
            </div>
            <h3 className="font-cinzel text-xs sm:text-sm md:text-base tracking-widest uppercase text-[#e8c97a] font-semibold mb-2">
              {EDUCATION_DATA.degree}
            </h3>
            <p className="font-fell italic text-sm sm:text-base md:text-lg text-[var(--parchment)] max-w-xl mx-auto">
              Specialization in {EDUCATION_DATA.specialization.replace('Bachelor of Technology (B.Tech) in ', '')}
            </p>
          </div>

          {/* Tenure & Location */}
          <div
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 py-3 px-4 sm:px-6 my-6 bg-[#12100d] text-[11px] sm:text-xs font-cinzel tracking-wider text-[var(--ash)]"
            style={{
              borderTop: `1px solid color-mix(in srgb, ${accent} 30%, transparent)`,
              borderBottom: `1px solid color-mix(in srgb, ${accent} 30%, transparent)`,
            }}
          >
            <span>PERIOD: {EDUCATION_DATA.period}</span>
            <span className="hidden sm:inline">·</span>
            <span>LOCATION: {EDUCATION_DATA.location}</span>
          </div>

          {/* Manuscript Highlights */}
          <div className="space-y-4 my-8">
            <h4 className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#c8bfb0] flex items-center gap-2">
              <BookOpen size={15} className="text-[#e8c97a] shrink-0" />
              Links in the Chain (Curricular Focus)
            </h4>
            <div className="space-y-2.5 sm:space-y-3">
              {EDUCATION_DATA.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 sm:p-3.5 border border-[#2e2820] bg-[#14120e] text-xs sm:text-sm font-fell text-[var(--ash)] hover:border-[#e8c97a]/40 hover:bg-[#1a1712] hover:text-[var(--parchment)] hover:translate-x-1 transition-all duration-300 cursor-default"
                >
                  <span className="text-[#e8c97a] mt-0.5 shrink-0">✦</span>
                  <span className="leading-relaxed">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Wax seal watermark mark */}
          <div className="text-center pt-2">
            <span className="font-cinzel text-[10px] tracking-[0.35em] text-[#6d6455] uppercase block">
              Archives of Oldtown · Validated Record
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
