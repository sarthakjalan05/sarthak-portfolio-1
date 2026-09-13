import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { CERTIFICATIONS } from '../data/certifications';
import { ExternalLink, Award } from 'lucide-react';

export const Certifications: React.FC = () => {
  // House Greyjoy's signature gold/bronze accent
  const accent = '#b8a040';

  return (
    <div className="realm-page">
      <PageHeader
        eyebrow="HOUSE GREYJOY · PYKE"
        title="The Iron Price of"
        titleEm="Earned Credentials"
        subtitle='"The ironborn take nothing they haven’t paid the price for — credentials earned, not given." Rigorous technical certifications won through dedicated study, full-stack implementations, and verified mastery.'
        accent={accent}
        sigilRune="⚔"
      />

      {/* Motto Banner */}
      <div className="text-center mb-16">
        <span
          className="font-cinzel-dec text-lg sm:text-xl tracking-widest uppercase block"
          style={{ color: accent, textShadow: `0 0 20px color-mix(in srgb, ${accent} 40%, transparent)` }}
        >
          "We Do Not Sow"
        </span>
        <div className="got-divider max-w-xs mx-auto mt-2">
          <div className="got-divider-line" style={{ background: `linear-gradient(to right, transparent, ${accent})` }} />
          <div className="got-divider-diamond" style={{ background: accent }} />
          <div className="got-divider-line right" style={{ background: `linear-gradient(to left, transparent, ${accent})` }} />
        </div>
        <p className="font-fell italic text-xs text-[var(--ash)] mt-2">
          Paid in dedication and code — credentials claimed through verified examination
        </p>
      </div>

      {/* Row of 'Iron Price Paid' Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {CERTIFICATIONS.map((cert) => (
          <div
            key={cert.id}
            className="relative p-7 sm:p-8 border bg-[#080b12]/90 backdrop-blur-sm flex flex-col justify-between group hover:border-[#b8a040] transition-all duration-300 shadow-[0_0_35px_rgba(0,0,0,0.8)]"
            style={{
              borderColor: 'rgba(184, 160, 64, 0.35)',
            }}
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
                  className="w-12 h-12 rounded-full border flex items-center justify-center bg-[#121620]"
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
              <h3 className="font-cinzel-dec text-lg sm:text-xl font-bold text-[var(--parchment)] mb-4 leading-snug">
                {cert.title}
              </h3>

              <div className="got-divider max-w-[100px] mb-4">
                <div className="got-divider-line" style={{ background: `linear-gradient(to right, transparent, ${accent})` }} />
                <div className="got-divider-diamond" style={{ background: accent }} />
                <div className="got-divider-line right" style={{ background: `linear-gradient(to left, transparent, ${accent})` }} />
              </div>

              {/* Oath Statement */}
              <p className="font-fell italic text-sm text-[var(--ash)] leading-relaxed mb-6">
                "{cert.oath}"
              </p>
            </div>

            {/* External Link Button */}
            <div className="pt-4 border-t border-[#262418]">
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="got-cta-ghost w-full justify-center text-xs py-2.5"
                style={{
                  borderColor: 'rgba(184, 160, 64, 0.5)',
                  color: accent,
                }}
              >
                <span>Verify Credential</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
