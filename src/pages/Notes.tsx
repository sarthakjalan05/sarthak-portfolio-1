import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { NOTES } from '../data/notes';
import { Scroll, Clock, Calendar, ArrowRight, BookOpen, Tag } from 'lucide-react';

export const Notes: React.FC = () => {
  const accent = '#9aa5b1'; // Citadel Silver / Parchment Slate

  return (
    <div
      className="realm-page relative overflow-hidden"
      style={{ '--accent': accent } as React.CSSProperties}
    >
      {/* Atmospheric Background Layers */}
      <div className="realm-bg-texture" />
      <div className="realm-bg-vignette" />

      <PageHeader
        sectionLabel="Maester's Notes"
        eyebrow="THE CITADEL · MAESTER'S ARCHIVES"
        title="Scrolls &"
        titleEm="Technical Dispatches"
        motto="Knowledge Is a Chain Unbroken"
        subtitle='"From the high towers of Oldtown to the modern cloud terminal." Technical analyses, machine learning architectures, and engineering dispatches by Sarthak Jalan.'
        accent={accent}
        sigilRune="📜"
      />

      {/* Ledger Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-2 sm:px-4 space-y-8">
        {NOTES.map((note, idx) => (
          <article
            key={note.slug}
            className="fade-up realm-card relative p-7 sm:p-9 border bg-[#0d0a07]/95 backdrop-blur-sm group"
            style={{
              '--accent': accent,
              borderColor: 'rgba(154, 165, 177, 0.35)',
            } as React.CSSProperties}
            data-delay={idx * 120}
          >
            {/* Corner Ornaments */}
            <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
            <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
            <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
            <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

            {/* Top Ledger Meta */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[rgba(154,165,177,0.2)]">
              <div className="flex items-center gap-3 text-xs font-cinzel text-[var(--gold-light)]">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-[var(--gold)]" />
                  {note.date}
                </span>
                <span className="text-[var(--gold-dim)]">◆</span>
                <span className="flex items-center gap-1.5 text-[var(--ash)]">
                  <Clock size={14} />
                  {note.readingTime}
                </span>
              </div>

              <span className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-[var(--ash)] bg-[#19140f] px-2.5 py-0.5 border border-[rgba(154,165,177,0.3)]">
                Dispatched by Sarthak
              </span>
            </div>

            {/* Note Title */}
            <h2 className="font-cinzel-dec text-xl sm:text-2xl font-bold text-[var(--parchment)] mb-3 group-hover:text-[var(--gold-light)] transition-colors leading-tight">
              <Link to={`/notes/${note.slug}`}>{note.title}</Link>
            </h2>

            {/* Excerpt */}
            <p className="font-garamond text-base sm:text-lg text-[var(--ash)] leading-[1.8] mb-6">
              {note.excerpt}
            </p>

            {/* Tags & Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[rgba(154,165,177,0.2)]">
              <div className="flex flex-wrap items-center gap-1.5">
                <Tag size={13} className="text-[var(--gold-dim)] mr-1 shrink-0" />
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-cinzel text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#14100b] text-[var(--parchment)] border border-[rgba(154,165,177,0.25)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                to={`/notes/${note.slug}`}
                className="got-cta-ghost text-xs tracking-wider py-2 px-4 self-start sm:self-auto inline-flex items-center gap-2 shrink-0"
                style={{
                  borderColor: 'rgba(154, 165, 177, 0.5)',
                  color: 'var(--parchment)',
                }}
              >
                <BookOpen size={14} />
                <span>Unroll Scroll</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
