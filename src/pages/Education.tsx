import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { EDUCATION_DATA } from '../data/education';
import { Scroll, Award, BookOpen, Layers } from 'lucide-react';

export const Education: React.FC = () => {
  const accent = '#c8bfb0'; // Citadel Maester Parchment / Silver

  return (
    <div className="realm-page">
      <PageHeader
        eyebrow="THE CITADEL OF OLDTOWN · ARCHIVES"
        title="Scholarly Scroll of"
        titleEm="The Citadel"
        subtitle='"Knowledge is a chain unbroken." Records of foundational study, distributed systems theory, and automation architectures at Vellore Institute of Technology.'
        accent={accent}
        sigilRune="⛓"
      />

      {/* Citadel Motto */}
      <div className="text-center mb-16">
        <span
          className="font-cinzel-dec text-lg sm:text-xl tracking-widest uppercase block"
          style={{ color: '#e8c97a', textShadow: '0 0 20px rgba(232,201,122,0.3)' }}
        >
          "Knowledge Is a Chain Unbroken"
        </span>
        <div className="got-divider max-w-xs mx-auto mt-2">
          <div className="got-divider-line" style={{ background: 'linear-gradient(to right, transparent, #c8bfb0)' }} />
          <div className="got-divider-diamond" style={{ background: '#c8bfb0' }} />
          <div className="got-divider-line right" style={{ background: 'linear-gradient(to left, transparent, #c8bfb0)' }} />
        </div>
      </div>

      {/* Illuminated Manuscript Single Card */}
      <div className="max-w-3xl mx-auto">
        <div
          className="relative p-8 sm:p-14 border bg-[#0d0c0a] backdrop-blur-md shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden"
          style={{
            borderColor: 'rgba(200, 191, 176, 0.4)',
            boxShadow: '0 0 40px rgba(200, 191, 176, 0.1)',
          }}
        >
          {/* Corner brackets */}
          <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

          {/* Maester Archival Seal Top Stamp */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div
              className="w-20 h-20 rounded-full border-2 flex items-center justify-center mb-4 bg-[#171512]"
              style={{
                borderColor: '#c8bfb0',
                color: '#e8c97a',
                boxShadow: '0 0 25px rgba(200,191,176,0.25)',
              }}
            >
              <Scroll size={36} />
            </div>
            <span className="font-cinzel text-xs tracking-[0.4em] uppercase text-[#e8c97a]">
              Conferred by Vellore Institute of Technology
            </span>
          </div>

          {/* Institution & Degree */}
          <div className="text-center mb-8">
            <h2 className="font-cinzel-dec text-2xl sm:text-4xl text-[var(--parchment)] font-bold mb-2">
              {EDUCATION_DATA.institution}
            </h2>
            <div className="got-divider max-w-sm mx-auto my-4">
              <div className="got-divider-line" style={{ background: 'linear-gradient(to right, transparent, #c8bfb0)' }} />
              <div className="got-divider-diamond" style={{ background: '#c8bfb0' }} />
              <div className="got-divider-line right" style={{ background: 'linear-gradient(to left, transparent, #c8bfb0)' }} />
            </div>
            <h3 className="font-cinzel text-sm sm:text-base tracking-widest uppercase text-[#e8c97a] font-semibold mb-2">
              {EDUCATION_DATA.degree}
            </h3>
            <p className="font-fell italic text-base sm:text-lg text-[var(--parchment)] max-w-xl mx-auto">
              Specialization in {EDUCATION_DATA.specialization.replace('Bachelor of Technology (B.Tech) in ', '')}
            </p>
          </div>

          {/* Tenure & Location */}
          <div className="flex flex-wrap items-center justify-center gap-6 py-3 px-6 my-6 border-y border-[#3d372e] bg-[#12100d] text-xs font-cinzel tracking-wider text-[var(--ash)]">
            <span>PERIOD: {EDUCATION_DATA.period}</span>
            <span>·</span>
            <span>LOCATION: {EDUCATION_DATA.location}</span>
          </div>

          {/* Manuscript Highlights */}
          <div className="space-y-4 my-8">
            <h4 className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#c8bfb0] flex items-center gap-2">
              <BookOpen size={15} className="text-[#e8c97a]" />
              Links in the Chain (Curricular Focus)
            </h4>
            <div className="space-y-3">
              {EDUCATION_DATA.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 border border-[#2e2820] bg-[#14120e] text-sm font-fell text-[var(--ash)]"
                >
                  <span className="text-[#e8c97a] mt-0.5">✦</span>
                  <span className="leading-relaxed">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Wax seal watermark mark */}
          <div className="text-center pt-4">
            <span className="font-cinzel text-[10px] tracking-[0.35em] text-[#6d6455] uppercase block">
              Archives of Oldtown · Validated Record
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
