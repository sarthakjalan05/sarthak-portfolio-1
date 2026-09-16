import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { PROJECTS } from '../data/projects';
import {
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Flame,
  AlertTriangle,
  Cpu,
  Layers,
  Award,
  Calendar,
  CheckCircle,
  Github,
} from 'lucide-react';

export const ProjectCaseStudy: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const accent = '#c0392b'; // Targaryen Blood Crimson

  const projectIndex = PROJECTS.findIndex((p) => p.id === slug);
  const project = PROJECTS[projectIndex];

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const prevProject = projectIndex > 0 ? PROJECTS[projectIndex - 1] : null;
  const nextProject = projectIndex < PROJECTS.length - 1 ? PROJECTS[projectIndex + 1] : null;

  return (
    <div
      className="realm-page relative overflow-hidden"
      style={{ '--accent': accent } as React.CSSProperties}
    >
      {/* Atmospheric Background Layers */}
      <div className="realm-bg-texture" />
      <div className="realm-bg-vignette" />

      {/* Breadcrumb Bar */}
      <div className="relative z-10 max-w-5xl mx-auto mb-6 px-2">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 font-cinzel text-xs uppercase tracking-widest text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors py-2"
        >
          <ArrowLeft size={14} />
          <span>Return to Armory of Projects</span>
        </Link>
      </div>

      <PageHeader
        sectionLabel="Case Study"
        eyebrow="HOUSE TARGARYEN · DRAGONSTONE FORGE"
        title="Case Study:"
        titleEm={project.title}
        motto="Fire and Blood"
        subtitle={project.summary}
        accent={accent}
        sigilRune="🐉"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-2 sm:px-4 space-y-10">
        {/* Project Meta & External Links Bar */}
        <div
          className="fade-up realm-card relative p-6 sm:p-8 border bg-[#140202]/90 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            borderColor: 'rgba(192, 57, 43, 0.4)',
          }}
        >
          <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

          <div className="flex flex-wrap items-center gap-4 text-sm font-cinzel">
            <span className="flex items-center gap-2 text-[#ff9999] font-bold tracking-wider uppercase">
              <Calendar size={16} className="shrink-0" />
              {project.date}
            </span>
            <span className="text-[var(--gold-dim)]">◆</span>
            <span className="text-[var(--parchment)]">Targaryen Masterwork</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="got-cta-ghost text-xs py-2.5 px-5"
                style={{
                  borderColor: 'rgba(192, 57, 43, 0.6)',
                  color: 'var(--parchment)',
                }}
              >
                <Github size={14} />
                <span>Source Repository</span>
              </a>
            )}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="got-cta-btn text-xs py-2.5 px-6"
              style={{ background: accent, color: '#ffffff' }}
            >
              <span>Live Demonstration</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Key Metrics Banner */}
        {project.keyMetrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.keyMetrics.map((metric, idx) => (
              <div
                key={idx}
                className="fade-up realm-card relative p-5 border text-center bg-[#180303]/85"
                style={{
                  borderColor: 'rgba(192, 57, 43, 0.35)',
                }}
                data-delay={idx * 80}
              >
                <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
                <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />
                <p className="font-cinzel text-[10px] uppercase tracking-widest text-[#d87c7c] mb-2 font-semibold">
                  {metric.label}
                </p>
                <div className="font-cinzel-dec text-2xl sm:text-3xl font-bold text-[var(--parchment)]">
                  {metric.numValue !== undefined ? (
                    <AnimatedCounter
                      value={metric.numValue}
                      decimals={metric.numValue % 1 !== 0 ? 1 : 0}
                      suffix={metric.suffix}
                    />
                  ) : (
                    metric.value
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 1. Problem Subsection */}
        <section
          className="fade-up realm-card relative p-7 sm:p-10 border bg-[#110202]/95 backdrop-blur-sm"
          style={{ borderColor: 'rgba(192, 57, 43, 0.35)' }}
        >
          <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full border flex items-center justify-center bg-[#250505]"
              style={{ borderColor: accent, color: accent }}
            >
              <AlertTriangle size={18} />
            </div>
            <div>
              <span className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-[#d87c7c] font-semibold">
                Phase I · The Challenge
              </span>
              <h2 className="font-cinzel-dec text-xl sm:text-2xl text-[var(--parchment)] font-bold">
                Problem Domain
              </h2>
            </div>
          </div>

          <div className="got-divider mb-6" style={{ justifyContent: 'flex-start' }}>
            <div className="got-divider-line" style={{ maxWidth: '60px', background: `linear-gradient(to right, transparent, ${accent})` }} />
            <div className="got-divider-diamond" style={{ background: accent }} />
            <div className="got-divider-line right" style={{ maxWidth: '60px', background: `linear-gradient(to left, transparent, ${accent})` }} />
          </div>

          <p className="font-garamond text-base sm:text-lg text-[var(--ash)] leading-[1.8] max-w-4xl">
            {project.problem || project.description}
          </p>
        </section>

        {/* 2. Approach Subsection */}
        <section
          className="fade-up realm-card relative p-7 sm:p-10 border bg-[#110202]/95 backdrop-blur-sm"
          style={{ borderColor: 'rgba(192, 57, 43, 0.35)' }}
        >
          <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full border flex items-center justify-center bg-[#250505]"
              style={{ borderColor: accent, color: accent }}
            >
              <Flame size={18} />
            </div>
            <div>
              <span className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-[#d87c7c] font-semibold">
                Phase II · Engineering Strategy
              </span>
              <h2 className="font-cinzel-dec text-xl sm:text-2xl text-[var(--parchment)] font-bold">
                Technical Approach
              </h2>
            </div>
          </div>

          <div className="got-divider mb-6" style={{ justifyContent: 'flex-start' }}>
            <div className="got-divider-line" style={{ maxWidth: '60px', background: `linear-gradient(to right, transparent, ${accent})` }} />
            <div className="got-divider-diamond" style={{ background: accent }} />
            <div className="got-divider-line right" style={{ maxWidth: '60px', background: `linear-gradient(to left, transparent, ${accent})` }} />
          </div>

          <p className="font-garamond text-base sm:text-lg text-[var(--ash)] leading-[1.8] max-w-4xl">
            {project.approach || project.summary}
          </p>
        </section>

        {/* 3. Architecture & Stack Subsection */}
        <section
          className="fade-up realm-card relative p-7 sm:p-10 border bg-[#110202]/95 backdrop-blur-sm"
          style={{ borderColor: 'rgba(192, 57, 43, 0.35)' }}
        >
          <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full border flex items-center justify-center bg-[#250505]"
              style={{ borderColor: accent, color: accent }}
            >
              <Layers size={18} />
            </div>
            <div>
              <span className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-[#d87c7c] font-semibold">
                Phase III · System Architecture
              </span>
              <h2 className="font-cinzel-dec text-xl sm:text-2xl text-[var(--parchment)] font-bold">
                Architecture &amp; Tech Stack
              </h2>
            </div>
          </div>

          <div className="got-divider mb-6" style={{ justifyContent: 'flex-start' }}>
            <div className="got-divider-line" style={{ maxWidth: '60px', background: `linear-gradient(to right, transparent, ${accent})` }} />
            <div className="got-divider-diamond" style={{ background: accent }} />
            <div className="got-divider-line right" style={{ maxWidth: '60px', background: `linear-gradient(to left, transparent, ${accent})` }} />
          </div>

          <p className="font-garamond text-base sm:text-lg text-[var(--ash)] leading-[1.8] max-w-4xl mb-6">
            {project.architecture || project.description}
          </p>

          <h3 className="font-cinzel text-xs uppercase tracking-widest text-[#ff9999] font-bold mb-3">
            Equipped Technologies &amp; Frameworks
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-cinzel uppercase px-3 py-1.5 bg-[#250606] text-[var(--parchment)] border"
                style={{ borderColor: 'rgba(192, 57, 43, 0.45)' }}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* 4. Outcome Subsection */}
        <section
          className="fade-up realm-card relative p-7 sm:p-10 border bg-[#110202]/95 backdrop-blur-sm"
          style={{ borderColor: 'rgba(192, 57, 43, 0.35)' }}
        >
          <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full border flex items-center justify-center bg-[#250505]"
              style={{ borderColor: accent, color: accent }}
            >
              <CheckCircle size={18} />
            </div>
            <div>
              <span className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-[#d87c7c] font-semibold">
                Phase IV · Measured Impact
              </span>
              <h2 className="font-cinzel-dec text-xl sm:text-2xl text-[var(--parchment)] font-bold">
                Outcome &amp; Proven Results
              </h2>
            </div>
          </div>

          <div className="got-divider mb-6" style={{ justifyContent: 'flex-start' }}>
            <div className="got-divider-line" style={{ maxWidth: '60px', background: `linear-gradient(to right, transparent, ${accent})` }} />
            <div className="got-divider-diamond" style={{ background: accent }} />
            <div className="got-divider-line right" style={{ maxWidth: '60px', background: `linear-gradient(to left, transparent, ${accent})` }} />
          </div>

          <p className="font-garamond text-base sm:text-lg text-[var(--parchment)] leading-[1.8] max-w-4xl">
            {project.outcome || project.summary}
          </p>
        </section>

        {/* Next / Previous Project Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[rgba(192,57,43,0.3)]">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.id}`}
              className="got-cta-ghost text-xs tracking-wider py-3 px-6 flex items-center gap-2 w-full sm:w-auto justify-center"
              style={{ borderColor: 'rgba(192, 57, 43, 0.5)', color: 'var(--parchment)' }}
            >
              <ArrowLeft size={14} />
              <span>Previous: {prevProject.title}</span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              to={`/projects/${nextProject.id}`}
              className="got-cta-ghost text-xs tracking-wider py-3 px-6 flex items-center gap-2 w-full sm:w-auto justify-center"
              style={{ borderColor: 'rgba(192, 57, 43, 0.5)', color: 'var(--parchment)' }}
            >
              <span>Next: {nextProject.title}</span>
              <ArrowRight size={14} />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};
