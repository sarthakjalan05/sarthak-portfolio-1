import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { CERTIFICATIONS } from '../data/certifications';
import { ExternalLink, Award, CheckCircle2 } from 'lucide-react';

export const Certifications: React.FC = () => {
  const accent = '#00f0ff'; // Cyber Cyan

  return (
    <div className="realm-page relative overflow-hidden" style={{ '--accent': accent } as React.CSSProperties}>
      {/* Background Grid & Glow */}
      <div className="realm-bg-texture" />
      <div className="realm-bg-vignette" />

      <PageHeader
        sectionLabel="VERIFIED CERTIFICATIONS"
        eyebrow="SYS://VERIFIED.CREDENTIALS"
        title="Technical"
        titleEm="Certifications"
        motto="VERIFY // VALIDATE // EXECUTE"
        subtitle="Accredited technical credentials earned through practical evaluations, algorithmic assessments, and validated machine learning workflows."
        accent={accent}
        sigilRune="✦"
      />

      {/* Grid of Verified Credentials */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 max-w-6xl mx-auto px-2">
        {CERTIFICATIONS.map((cert, idx) => (
          <div
            key={cert.id}
            className="fade-up realm-card relative p-8 sm:p-9 border bg-[#0d1017]/95 backdrop-blur-md flex flex-col justify-between group shadow-[0_0_35px_rgba(0,0,0,0.85)] rounded"
            style={{
              '--accent': accent,
              borderColor: 'rgba(0, 240, 255, 0.28)',
            } as React.CSSProperties}
            data-delay={idx * 100}
          >
            {/* Corner brackets */}
            <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
            <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
            <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
            <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

            <div>
              {/* Badge Icon Top */}
              <div className="flex items-center justify-between mb-5">
                <div
                  className="w-12 h-12 rounded border border-[var(--cyan-dim)] flex items-center justify-center bg-[#07080c] group-hover:scale-105 transition-transform duration-300"
                  style={{
                    color: accent,
                    boxShadow: '0 0 15px rgba(0, 240, 255, 0.25)',
                  }}
                >
                  <Award size={22} />
                </div>
                {cert.score && (
                  <span
                    className="font-chakra text-xs uppercase px-2.5 py-1 border border-[rgba(0,240,255,0.3)] bg-[#07080c] font-semibold text-[var(--cyan)] rounded"
                  >
                    {cert.score}
                  </span>
                )}
              </div>

              {/* Issuer Eyebrow */}
              <p className="font-chakra text-[10px] tracking-[0.25em] uppercase text-[var(--cyan-dim)] mb-2 font-semibold">
                ISSUER: {cert.issuer}
              </p>

              {/* Title */}
              <h3 className="font-orbitron text-base sm:text-lg font-bold text-[var(--text)] mb-3 leading-snug group-hover:text-[var(--cyan)] transition-colors">
                {cert.title}
              </h3>

              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-px bg-[var(--cyan)]" />
                <span className="w-1 h-1 rounded-full bg-[var(--cyan)]" />
                <span className="w-8 h-px bg-gradient-to-r from-[var(--cyan)] to-transparent" />
              </div>

              {/* Verification Statement */}
              <p className="font-space text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                {cert.oath}
              </p>
            </div>

            {/* External Link Button */}
            <div
              className="pt-4 mt-2 border-t border-[rgba(0,240,255,0.18)]"
            >
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-ghost w-full justify-center text-xs py-2 px-4 flex items-center gap-2"
                style={{ borderColor: 'rgba(0, 240, 255, 0.35)', color: 'var(--text)' }}
              >
                <CheckCircle2 size={13} className="text-[var(--cyan)]" />
                <span>Verify Credential</span>
                <ExternalLink size={12} className="opacity-70" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
