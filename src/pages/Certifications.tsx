import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { CERTIFICATIONS } from '../data/certifications';
import { ExternalLink, Award } from 'lucide-react';

export const Certifications: React.FC = () => {
  // House Greyjoy's signature gold/bronze accent
  const accent = '#b8a040';

  return (
    <div className="realm-page relative overflow-hidden" style={{ '--accent': accent } as React.CSSProperties}>
      {/* Atmospheric Background Layers */}
      <div className="realm-bg-texture" />
      <div className="realm-bg-vignette" />

      <PageHeader
        eyebrow="HOUSE GREYJOY · PYKE"
        title="The Iron Price of"
        titleEm="Earned Credentials"
        motto="We Do Not Sow"
        subtitle='"The ironborn take nothing they haven’t paid the price for — credentials earned, not given." Rigorous technical certifications won through dedicated study, full-stack implementations, and verified mastery.'
        accent={accent}
        sigilRune="⚔"
      />

      {/* Row of 'Iron Price Paid' Badges with Staggered Entrance */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {CERTIFICATIONS.map((cert, idx) => (
          <div
            key={cert.id}
            className="fade-up realm-card relative p-6 sm:p-8 border bg-[#080b12]/90 backdrop-blur-sm flex flex-col justify-between group shadow-[0_0_35px_rgba(0,0,0,0.8)]"
            style={{
              '--accent': accent,
              borderColor: 'rgba(184, 160, 64, 0.35)',
            } as React.CSSProperties}
            data-delay={idx * 120}
          >
            {/* Corner brackets */}
            <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
            <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
            <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
            <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

            <div>
              {/* Badge Icon Top */}
              <div className="flex items-center justify-between mb-6">
                <div
                  className="w-12 h-12 rounded-full border flex items-center justify-center bg-[#121620] group-hover:scale-105 transition-transform duration-300"
                  style={{
                    borderColor: accent,
                    color: accent,
                    boxShadow: '0 0 15px rgba(184, 160, 64, 0.3)',
                  }}
                >
                  <Award size={24} />
                </div>
                {cert.score && (
                  <span
                    className="font-cinzel text-xs uppercase px-2.5 py-1 border border-[#4a4020] bg-[#141208] font-semibold"
                    style={{ color: accent }}
                  >
                    {cert.score}
                  </span>
                )}
              </div>

              {/* Issuer Eyebrow */}
              <p className="font-cinzel text-[10px] tracking-[0.3em] uppercase text-[var(--ash)] mb-2">
                ISSUED BY: {cert.issuer}
              </p>

              {/* Title */}
              <h3 className="font-cinzel-dec text-base sm:text-lg font-bold text-[var(--parchment)] mb-3 leading-snug">
                {cert.title}
              </h3>

              <div className="got-divider max-w-[100px] mb-4">
                <div className="got-divider-line" style={{ background: `linear-gradient(to right, transparent, ${accent})` }} />
                <div className="got-divider-diamond" style={{ background: accent }} />
                <div className="got-divider-line right" style={{ background: `linear-gradient(to left, transparent, ${accent})` }} />
              </div>

              {/* Oath Statement */}
              <p className="font-fell italic text-xs sm:text-sm text-[var(--ash)] leading-relaxed mb-6">
                "{cert.oath}"
              </p>
            </div>

            {/* External Link Button */}
            <div
              className="pt-4 mt-2"
              style={{
                borderTop: `1px solid color-mix(in srgb, ${accent} 25%, transparent)`,
              }}
            >
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="got-cta-ghost w-full justify-center text-xs py-2.5 min-h-[44px]"
                style={{
                  borderColor: 'rgba(184, 160, 64, 0.5)',
                  color: accent,
                }}
                aria-label={`Verify Credential for ${cert.title}`}
              >
                <span>Verify Credential</span>
                <ExternalLink size={13} className="shrink-0" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
