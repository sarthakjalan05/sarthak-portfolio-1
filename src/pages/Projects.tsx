import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { PROJECTS } from '../data/projects';
import { ProjectItem } from '../types';
import { ExternalLink, FolderCode, ArrowRight, BookOpen, FileText } from 'lucide-react';
import { RESUME_PATH, RESUME_FILENAME } from '../config/constants';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  accent: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, accent }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), index * 80);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  const keyStack = project.stack.slice(0, 3);

  return (
    <div
      ref={cardRef}
      className="realm-card fade-up relative flex flex-col justify-between p-6 sm:p-7 border bg-[#0d1017]/95 backdrop-blur-md group hover:border-[var(--magenta)] transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.85)]"
      style={
        {
          '--accent': accent,
          borderColor: 'rgba(255, 43, 214, 0.28)',
        } as React.CSSProperties
      }
    >
      {/* Corner brackets */}
      <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
      <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
      <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
      <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

      <div>
        {/* Header with Date and External Link */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded flex items-center justify-center border shrink-0 transition-transform duration-300 group-hover:scale-105"
              style={{
                borderColor: `color-mix(in srgb, ${accent} 50%, transparent)`,
                background: 'rgba(255, 43, 214, 0.08)',
                color: accent,
              }}
            >
              <FolderCode size={18} />
            </div>
            <div>
              <p className="font-chakra text-[11px] tracking-[0.2em] uppercase font-semibold" style={{ color: accent }}>
                {project.date}
              </p>
              <span className="font-chakra text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                SYS://PROD_READY
              </span>
            </div>
          </div>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--text)] p-1.5 transition-colors border border-transparent hover:border-[var(--cyan)] rounded"
              title="Open external deployment"
              aria-label={`Open external deployment for ${project.title}`}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        {/* Title */}
        <h3 className="font-orbitron text-lg sm:text-xl text-[var(--text)] mb-2.5 group-hover:text-[var(--cyan)] transition-colors leading-tight font-bold">
          <Link to={`/projects/${project.id}`} className="hover:underline">
            {project.title}
          </Link>
        </h3>

        {/* Summary */}
        <p className="font-space text-sm text-[var(--text-muted)] leading-relaxed mb-5">
          {project.summary}
        </p>

        {/* Key Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {keyStack.map((t) => (
            <span
              key={t}
              className="text-[10px] font-chakra tracking-wider uppercase px-2.5 py-1 bg-[rgba(255,43,214,0.06)] text-[#ffb8fa] border border-[rgba(255,43,214,0.25)] rounded font-medium"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Action CTA to open case study */}
      <div className="pt-3 border-t border-[rgba(255,43,214,0.2)] mt-2">
        <Link
          to={`/projects/${project.id}`}
          className="cyber-ghost w-full justify-center text-xs py-2 px-3 group-hover:bg-[rgba(255,43,214,0.15)] group-hover:border-[var(--magenta)] transition-all flex items-center gap-2"
          style={{ borderColor: 'rgba(255, 43, 214, 0.4)', color: 'var(--text)' }}
        >
          <BookOpen size={13} className="text-[var(--magenta)]" />
          <span>Inspect Architecture &amp; Case Study</span>
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Bottom neon accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: accent }} />
    </div>
  );
};

export const Projects: React.FC = () => {
  const accent = '#ff2bd6'; // Cyber Magenta

  return (
    <div className="realm-page relative overflow-hidden" style={{ '--accent': accent } as React.CSSProperties}>
      {/* Background Grid & Glow */}
      <div className="realm-bg-texture" />
      <div className="realm-bg-vignette" />

      <PageHeader
        sectionLabel="SOFTWARE SYSTEMS"
        eyebrow="SYS://PROJECTS.FORGE"
        title="Software"
        titleEm="Projects"
        motto="INNOVATE // OPTIMIZE // DELIVER"
        subtitle="Architectural case studies across on-device diagnostics, clinical computer vision triage, and high-throughput web applications."
        accent={accent}
        sigilRune="✦"
      />

      {/* Projects Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto px-2">
        {PROJECTS.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} accent={accent} />
        ))}
      </div>

      {/* Bottom resume link */}
      <div className="fade-up mt-14 mb-8 text-center relative z-10">
        <p className="font-space text-sm text-[var(--text-muted)] inline-flex items-center gap-2">
          <span>For full system details &amp; benchmark scores,</span>
          <a
            href={RESUME_PATH}
            download={RESUME_FILENAME}
            className="text-[var(--cyan)] hover:text-white underline underline-offset-4 decoration-[var(--cyan-dim)] hover:decoration-[var(--cyan)] transition-colors font-chakra text-xs uppercase tracking-wider inline-flex items-center gap-1.5"
          >
            <FileText size={13} />
            <span>Download Full Resume PDF</span>
          </a>
        </p>
      </div>
    </div>
  );
};
