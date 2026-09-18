import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { PROJECTS } from '../data/projects';
import {
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Cpu,
  AlertTriangle,
  Layers,
  CheckCircle2,
  Calendar,
  Github,
} from 'lucide-react';

export const ProjectCaseStudy: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const accent = '#ff2bd6'; // Cyber Magenta

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
      {/* Background Grid & Glow */}
      <div className="realm-bg-texture" />
      <div className="realm-bg-vignette" />

      {/* Breadcrumb Bar */}
      <div className="relative z-10 max-w-5xl mx-auto mb-6 px-2">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 font-chakra text-xs uppercase tracking-widest text-[var(--cyan)] hover:text-white transition-colors py-2"
        >
          <ArrowLeft size={14} />
          <span>Return to Software Projects</span>
        </Link>
      </div>

      <PageHeader
        sectionLabel="TECHNICAL CASE STUDY"
        eyebrow={`SYS://CASE_STUDY.${project.id.toUpperCase()}`}
        title="Case Study:"
        titleEm={project.title}
        motto="ARCHITECTURE // BENCHMARKS // TELEMETRY"
        subtitle={project.summary}
        accent={accent}
        sigilRune="✦"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-2 sm:px-4 space-y-10">
        {/* Project Meta & External Links Bar */}
        <div
          className="fade-up realm-card relative p-6 sm:p-8 border bg-[#0d1017]/95 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            borderColor: 'rgba(255, 43, 214, 0.35)',
          }}
        >
          <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-chakra">
            <span className="flex items-center gap-2 text-[var(--magenta)] font-bold tracking-wider uppercase">
              <Calendar size={15} className="shrink-0" />
              {project.date}
            </span>
            <span className="text-[var(--cyan-dim)]">◆</span>
            <span className="text-[var(--text)] tracking-wider">PRODUCTION ARCHITECTURE</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-ghost text-xs py-2.5 px-5 flex items-center gap-2"
                style={{
                  borderColor: 'rgba(255, 43, 214, 0.45)',
                  color: 'var(--text)',
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
              className="got-cta-btn text-xs py-2.5 px-6 inline-flex items-center gap-2"
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
                className="fade-up realm-card relative p-5 border text-center bg-[#0d1017]/90"
                style={{
                  borderColor: 'rgba(255, 43, 214, 0.28)',
                }}
                data-delay={idx * 80}
              >
                <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
                <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />
                <p className="font-chakra text-[10px] uppercase tracking-widest text-[var(--magenta)] mb-2 font-semibold">
                  {metric.label}
                </p>
                <div className="font-orbitron text-xl sm:text-2xl font-bold text-[var(--text)]">
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
          className="fade-up realm-card relative p-7 sm:p-10 border bg-[#0d1017]/95 backdrop-blur-md"
          style={{ borderColor: 'rgba(255, 43, 214, 0.28)' }}
        >
          <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded border flex items-center justify-center bg-[rgba(255,43,214,0.1)]"
              style={{ borderColor: accent, color: accent }}
            >
              <AlertTriangle size={18} />
            </div>
            <div>
              <span className="font-chakra text-[10px] uppercase tracking-[0.25em] text-[var(--magenta)] font-semibold">
                PHASE I · THE CHALLENGE
              </span>
              <h2 className="font-orbitron text-lg sm:text-xl text-[var(--text)] font-bold">
                Problem Domain
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-px bg-[var(--magenta)]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--magenta)]" />
            <span className="w-12 h-px bg-gradient-to-r from-[var(--magenta)] to-transparent" />
          </div>

          <p className="font-space text-sm sm:text-base text-[var(--text-muted)] leading-[1.8] max-w-4xl">
            {project.problem || project.description}
          </p>
        </section>

        {/* 2. Approach Subsection */}
        <section
          className="fade-up realm-card relative p-7 sm:p-10 border bg-[#0d1017]/95 backdrop-blur-md"
          style={{ borderColor: 'rgba(255, 43, 214, 0.28)' }}
        >
          <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded border flex items-center justify-center bg-[rgba(255,43,214,0.1)]"
              style={{ borderColor: accent, color: accent }}
            >
              <Cpu size={18} />
            </div>
            <div>
              <span className="font-chakra text-[10px] uppercase tracking-[0.25em] text-[var(--magenta)] font-semibold">
                PHASE II · ENGINEERING STRATEGY
              </span>
              <h2 className="font-orbitron text-lg sm:text-xl text-[var(--text)] font-bold">
                Technical Approach
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-px bg-[var(--magenta)]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--magenta)]" />
            <span className="w-12 h-px bg-gradient-to-r from-[var(--magenta)] to-transparent" />
          </div>

          <p className="font-space text-sm sm:text-base text-[var(--text-muted)] leading-[1.8] max-w-4xl">
            {project.approach || project.summary}
          </p>
        </section>

        {/* 3. Architecture & Stack Subsection */}
        <section
          className="fade-up realm-card relative p-7 sm:p-10 border bg-[#0d1017]/95 backdrop-blur-md"
          style={{ borderColor: 'rgba(255, 43, 214, 0.28)' }}
        >
          <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded border flex items-center justify-center bg-[rgba(255,43,214,0.1)]"
              style={{ borderColor: accent, color: accent }}
            >
              <Layers size={18} />
            </div>
            <div>
              <span className="font-chakra text-[10px] uppercase tracking-[0.25em] text-[var(--magenta)] font-semibold">
                PHASE III · SYSTEM ARCHITECTURE
              </span>
              <h2 className="font-orbitron text-lg sm:text-xl text-[var(--text)] font-bold">
                Architecture &amp; Tech Stack
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-px bg-[var(--magenta)]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--magenta)]" />
            <span className="w-12 h-px bg-gradient-to-r from-[var(--magenta)] to-transparent" />
          </div>

          <p className="font-space text-sm sm:text-base text-[var(--text-muted)] leading-[1.8] max-w-4xl mb-6">
            {project.architecture || project.description}
          </p>

          <h3 className="font-chakra text-xs uppercase tracking-widest text-[var(--text)] font-bold mb-3">
            System Stack &amp; Frameworks
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-chakra uppercase px-3 py-1.5 bg-[rgba(255,43,214,0.06)] text-[var(--text)] border rounded"
                style={{ borderColor: 'rgba(255, 43, 214, 0.35)' }}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* 4. Outcome Subsection */}
        <section
          className="fade-up realm-card relative p-7 sm:p-10 border bg-[#0d1017]/95 backdrop-blur-md"
          style={{ borderColor: 'rgba(255, 43, 214, 0.28)' }}
        >
          <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded border flex items-center justify-center bg-[rgba(255,43,214,0.1)]"
              style={{ borderColor: accent, color: accent }}
            >
              <CheckCircle2 size={18} />
            </div>
            <div>
              <span className="font-chakra text-[10px] uppercase tracking-[0.25em] text-[var(--magenta)] font-semibold">
                PHASE IV · MEASURED IMPACT
              </span>
              <h2 className="font-orbitron text-lg sm:text-xl text-[var(--text)] font-bold">
                Outcome &amp; Results
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-px bg-[var(--magenta)]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--magenta)]" />
            <span className="w-12 h-px bg-gradient-to-r from-[var(--magenta)] to-transparent" />
          </div>

          <p className="font-space text-sm sm:text-base text-[var(--text)] leading-[1.8] max-w-4xl">
            {project.outcome || project.summary}
          </p>
        </section>

        {/* Next / Previous Project Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[rgba(255,43,214,0.25)]">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.id}`}
              className="cyber-ghost text-xs tracking-wider py-3 px-6 flex items-center gap-2 w-full sm:w-auto justify-center"
              style={{ borderColor: 'rgba(255, 43, 214, 0.45)', color: 'var(--text)' }}
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
              className="cyber-ghost text-xs tracking-wider py-3 px-6 flex items-center gap-2 w-full sm:w-auto justify-center"
              style={{ borderColor: 'rgba(255, 43, 214, 0.45)', color: 'var(--text)' }}
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
