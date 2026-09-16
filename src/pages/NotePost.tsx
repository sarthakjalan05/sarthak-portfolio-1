import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { NOTES } from '../data/notes';
import { Calendar, Clock, ArrowLeft, Tag, Share2, BookOpen } from 'lucide-react';

export const NotePost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const accent = '#9aa5b1'; // Citadel Silver

  const note = NOTES.find((n) => n.slug === slug);

  if (!note) {
    return <Navigate to="/notes" replace />;
  }

  // Parse markdown-like blocks cleanly without external bloat
  const renderFormattedBody = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBlockLines: string[] = [];
    let codeLanguage = '';

    lines.forEach((line, idx) => {
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre
              key={`code-${idx}`}
              className="p-4 sm:p-5 my-6 rounded bg-[#070503] border border-[rgba(201,168,76,0.3)] text-xs sm:text-sm font-mono text-[#f0e6d2] overflow-x-auto"
            >
              <code>{codeBlockLines.join('\n')}</code>
            </pre>
          );
          codeBlockLines = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
          codeLanguage = line.trim().replace('```', '');
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockLines.push(line);
        return;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h3
            key={`h3-${idx}`}
            className="font-cinzel-dec text-lg sm:text-xl md:text-2xl text-[var(--parchment)] font-bold mt-8 mb-3"
          >
            {line.replace('### ', '')}
          </h3>
        );
        return;
      }

      if (line.startsWith('> ')) {
        elements.push(
          <blockquote
            key={`quote-${idx}`}
            className="border-l-2 border-[var(--gold)] pl-4 my-5 italic font-garamond text-lg text-[var(--parchment)]/90 bg-[var(--gold)]/5 py-2 pr-3"
          >
            {line.replace('> ', '')}
          </blockquote>
        );
        return;
      }

      if (line.startsWith('- ')) {
        elements.push(
          <li
            key={`li-${idx}`}
            className="font-garamond text-base sm:text-lg text-[var(--ash)] ml-6 list-disc mb-2"
          >
            {line.replace('- ', '')}
          </li>
        );
        return;
      }

      if (line.trim().length > 0) {
        elements.push(
          <p
            key={`p-${idx}`}
            className="font-garamond text-base sm:text-lg text-[var(--ash)] leading-[1.85] mb-4"
          >
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div
      className="realm-page relative overflow-hidden"
      style={{ '--accent': accent } as React.CSSProperties}
    >
      {/* Atmospheric Background Layers */}
      <div className="realm-bg-texture" />
      <div className="realm-bg-vignette" />

      {/* Breadcrumb Bar */}
      <div className="relative z-10 max-w-4xl mx-auto mb-6 px-2">
        <Link
          to="/notes"
          className="inline-flex items-center gap-2 font-cinzel text-xs uppercase tracking-widest text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors py-2"
        >
          <ArrowLeft size={14} />
          <span>Return to All Notes</span>
        </Link>
      </div>

      <PageHeader
        sectionLabel="Maester's Note"
        eyebrow="THE CITADEL · ARCHIVES OF OLDTOWN"
        title="Dispatched"
        titleEm="Scroll"
        motto="Knowledge Is a Chain Unbroken"
        subtitle={note.excerpt}
        accent={accent}
        sigilRune="📜"
      />

      {/* Main Post Article */}
      <article className="relative z-10 max-w-4xl mx-auto px-2 sm:px-4">
        <div
          className="fade-up realm-card relative p-7 sm:p-12 border bg-[#0d0a07]/95 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.85)]"
          style={{
            borderColor: 'rgba(154, 165, 177, 0.4)',
          }}
        >
          {/* Corner Ornaments */}
          <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

          {/* Meta Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[rgba(154,165,177,0.25)]">
            <div className="flex items-center gap-4 text-xs font-cinzel text-[var(--gold-light)]">
              <span className="flex items-center gap-2">
                <Calendar size={15} className="text-[var(--gold)]" />
                {note.date}
              </span>
              <span className="text-[var(--gold-dim)]">◆</span>
              <span className="flex items-center gap-2 text-[var(--ash)]">
                <Clock size={15} />
                {note.readingTime}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {note.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-cinzel uppercase px-2.5 py-1 bg-[#18130e] text-[var(--parchment)] border border-[rgba(154,165,177,0.3)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Article Title */}
          <h1 className="font-cinzel-dec text-2xl sm:text-3xl md:text-4xl text-[var(--parchment)] font-bold mb-6 leading-tight">
            {note.title}
          </h1>

          <div className="got-divider mb-8" style={{ justifyContent: 'flex-start' }}>
            <span className="got-divider-line" style={{ maxWidth: '60px', background: `linear-gradient(to right, transparent, ${accent})` }} />
            <span className="got-divider-diamond" style={{ background: accent }} />
            <span className="got-divider-line right" style={{ maxWidth: '60px', background: `linear-gradient(to left, transparent, ${accent})` }} />
          </div>

          {/* Formatted Body */}
          <div className="article-body font-garamond">{renderFormattedBody(note.body)}</div>

          {/* Author Sign-off */}
          <div className="mt-12 pt-8 border-t border-[rgba(154,165,177,0.25)] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-[var(--gold)] font-semibold block mb-1">
                Written &amp; Transcribed by
              </span>
              <h4 className="font-cinzel-dec text-lg font-bold text-[var(--parchment)]">
                Sarthak Jalan
              </h4>
              <p className="font-garamond text-xs text-[var(--ash)]">
                Full-Stack Developer &amp; AI Engineer · Vellore Institute of Technology
              </p>
            </div>

            <Link
              to="/notes"
              className="got-cta-ghost text-xs tracking-wider py-2.5 px-5 flex items-center gap-2"
              style={{
                borderColor: 'rgba(154, 165, 177, 0.5)',
                color: 'var(--parchment)',
              }}
            >
              <ArrowLeft size={14} />
              <span>Back to All Notes</span>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};
