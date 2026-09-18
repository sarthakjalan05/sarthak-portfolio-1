import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { NOTES } from '../data/notes';
import { Clock, Calendar, ArrowRight, BookOpen, Tag, Terminal } from 'lucide-react';

export const Notes: React.FC = () => {
  const accent = 'var(--cyan)';

  return (
    <div
      className="realm-page relative overflow-hidden"
      style={{ '--accent': accent } as React.CSSProperties}
    >
      {/* Background Texture & Vignette */}
      <div className="realm-bg-texture" />
      <div className="realm-bg-vignette" />

      <PageHeader
        sectionLabel="TECHNICAL NOTES"
        eyebrow="SYS://ENGINEERING.PUBLICATIONS"
        title="Technical"
        titleEm="Notes & Articles"
        motto="Engineering dispatches on edge diagnostics, multimodal affective fusion, and distributed systems"
        subtitle="Architecture breakdowns, performance calibrations, and machine learning research papers authored by Sarthak Jalan."
        accent={accent}
        sigilRune="//"
      />

      {/* Ledger Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        {NOTES.map((note, idx) => (
          <article
            key={note.slug}
            className="fade-up realm-card relative p-6 sm:p-8 border border-[rgba(0,240,255,0.22)] bg-[#0d1017]/95 backdrop-blur-sm group rounded"
            style={{
              '--accent': accent,
            } as React.CSSProperties}
            data-delay={idx * 100}
          >
            {/* Corner HUD Brackets */}
            <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
            <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
            <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
            <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

            {/* Top Meta */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[rgba(0,240,255,0.15)]">
              <div className="flex items-center gap-3 text-xs font-chakra text-[var(--cyan)]">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-[var(--cyan)]" />
                  {note.date}
                </span>
                <span className="text-[var(--cyan-dim)]">/</span>
                <span className="flex items-center gap-1.5 text-[var(--text-muted)] font-space">
                  <Clock size={13} />
                  {note.readingTime}
                </span>
              </div>

              <span className="font-chakra text-[10px] uppercase tracking-wider text-[var(--cyan)] bg-[#07080c] px-2.5 py-0.5 border border-[rgba(0,240,255,0.25)] rounded flex items-center gap-1">
                <Terminal size={11} />
                <span>TECH.PAPER</span>
              </span>
            </div>

            {/* Note Title */}
            <h2 className="font-orbitron text-lg sm:text-xl md:text-2xl font-bold text-[var(--text)] mb-3 group-hover:text-[var(--cyan)] transition-colors leading-tight">
              <Link to={`/notes/${note.slug}`}>{note.title}</Link>
            </h2>

            {/* Excerpt */}
            <p className="font-space text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-5">
              {note.excerpt}
            </p>

            {/* Tags & Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[rgba(0,240,255,0.12)]">
              <div className="flex flex-wrap items-center gap-1.5">
                <Tag size={12} className="text-[var(--cyan-dim)] mr-1 shrink-0" />
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-chakra text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#07080c] text-[var(--text-muted)] border border-[rgba(0,240,255,0.2)] rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                to={`/notes/${note.slug}`}
                className="cyber-ghost text-xs tracking-wider py-2 px-4 self-start sm:self-auto inline-flex items-center gap-2 shrink-0 font-chakra font-semibold rounded"
                style={{
                  borderColor: 'rgba(0, 240, 255, 0.35)',
                  color: 'var(--cyan)',
                }}
              >
                <BookOpen size={13} />
                <span>Read Analysis</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
