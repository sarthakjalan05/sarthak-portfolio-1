import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { NOTES } from '../data/notes';
import { Calendar, Clock, ArrowLeft, Tag, BookOpen, Terminal } from 'lucide-react';

export const NotePost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const accent = 'var(--cyan)';

  const note = NOTES.find((n) => n.slug === slug);

  if (!note) {
    return <Navigate to="/notes" replace />;
  }

  // Parse markdown-like blocks
  const renderFormattedBody = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBlockLines: string[] = [];

    lines.forEach((line, idx) => {
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre
              key={`code-${idx}`}
              className="p-4 sm:p-5 my-6 rounded bg-[#07080c] border border-[rgba(0,240,255,0.3)] text-xs sm:text-sm font-mono text-[var(--cyan)] overflow-x-auto shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]"
            >
              <code>{codeBlockLines.join('\n')}</code>
            </pre>
          );
          codeBlockLines = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
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
            className="font-orbitron text-base sm:text-lg md:text-xl text-[var(--text)] font-bold mt-8 mb-3 tracking-wide"
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
            className="border-l-2 border-[var(--cyan)] pl-4 my-5 font-space text-sm sm:text-base text-[var(--text)]/90 bg-[rgba(0,240,255,0.06)] py-2.5 pr-3 rounded-r"
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
            className="font-space text-xs sm:text-sm text-[var(--text-muted)] ml-6 list-disc mb-2"
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
            className="font-space text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4"
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
      {/* Background Texture & Vignette */}
      <div className="realm-bg-texture" />
      <div className="realm-bg-vignette" />

      {/* Breadcrumb Bar */}
      <div className="relative z-10 max-w-4xl mx-auto mb-6 px-4">
        <Link
          to="/notes"
          className="inline-flex items-center gap-2 font-chakra text-xs uppercase tracking-wider text-[var(--cyan)] hover:text-white transition-colors py-2"
        >
          <ArrowLeft size={14} />
          <span>Return to All Technical Notes</span>
        </Link>
      </div>

      <PageHeader
        sectionLabel="TECHNICAL DISPATCH"
        eyebrow="SYS://RESEARCH.PAPER"
        title="Technical"
        titleEm="Analysis"
        motto="Engineering dispatches on edge diagnostics, multimodal affective fusion, and distributed systems"
        subtitle={note.excerpt}
        accent={accent}
        sigilRune="//"
      />

      {/* Main Post Article */}
      <article className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div
          className="fade-up realm-card relative p-6 sm:p-10 md:p-12 border border-[rgba(0,240,255,0.25)] bg-[#0d1017]/95 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.9)] rounded"
        >
          {/* Corner HUD Brackets */}
          <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

          {/* Meta Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-[rgba(0,240,255,0.15)]">
            <div className="flex items-center gap-4 text-xs font-chakra text-[var(--cyan)]">
              <span className="flex items-center gap-2">
                <Calendar size={14} className="text-[var(--cyan)]" />
                {note.date}
              </span>
              <span className="text-[var(--cyan-dim)]">/</span>
              <span className="flex items-center gap-2 text-[var(--text-muted)] font-space">
                <Clock size={14} />
                {note.readingTime}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {note.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-chakra uppercase px-2.5 py-0.5 bg-[#07080c] text-[var(--cyan)] border border-[rgba(0,240,255,0.25)] rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Article Title */}
          <h1 className="font-orbitron text-xl sm:text-2xl md:text-3xl text-[var(--text)] font-bold mb-6 leading-tight">
            {note.title}
          </h1>

          <div className="h-px bg-gradient-to-r from-[var(--cyan)] via-[var(--cyan-dim)] to-transparent mb-8" />

          {/* Formatted Body */}
          <div className="article-body font-space">{renderFormattedBody(note.body)}</div>

          {/* Author Sign-off */}
          <div className="mt-12 pt-6 border-t border-[rgba(0,240,255,0.15)] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="font-chakra text-[10px] uppercase tracking-wider text-[var(--cyan)] font-semibold block mb-1">
                AUTHORED BY
              </span>
              <h4 className="font-orbitron text-base font-bold text-[var(--text)]">
                Sarthak Jalan
              </h4>
              <p className="font-space text-xs text-[var(--text-muted)]">
                Full-Stack Developer &amp; AI Systems Engineer · Vellore Institute of Technology
              </p>
            </div>

            <Link
              to="/notes"
              className="cyber-ghost text-xs tracking-wider py-2 px-4 flex items-center gap-2 font-chakra font-semibold rounded"
              style={{
                borderColor: 'rgba(0, 240, 255, 0.35)',
                color: 'var(--cyan)',
              }}
            >
              <ArrowLeft size={13} />
              <span>Back to All Notes</span>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};
