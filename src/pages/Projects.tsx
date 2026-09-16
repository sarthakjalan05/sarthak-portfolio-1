import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { PROJECTS } from '../data/projects';
import { ProjectItem } from '../types';
import { ExternalLink, Flame, ArrowRight, BookOpen, Scroll } from 'lucide-react';
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
          setTimeout(() => el.classList.add('visible'), index * 100);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  // Keep 2-3 most distinguishing tech tags
  const keyStack = project.stack.slice(0, 3);

  return (
    <div
      ref={cardRef}
      className="realm-card fade-up relative flex flex-col justify-between p-6 sm:p-7 border bg-[#120202]/90 backdrop-blur-sm group hover:border-[rgba(192,57,43,0.8)] transition-all duration-300 shadow-[0_0_25px_rgba(0,0,0,0.8)]"
      style={
        {
          '--accent': accent,
          borderColor: 'rgba(192, 57, 43, 0.35)',
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
              className="w-9 h-9 rounded-full flex items-center justify-center border shrink-0 transition-transform duration-300 group-hover:scale-105"
              style={{
                borderColor: accent,
                background: 'radial-gradient(circle, #3d0505 0%, #0d0101 100%)',
                color: accent,
              }}
            >
              <Flame size={16} />
            </div>
            <div>
              <p className="font-cinzel text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: accent }}>
                {project.date}
              </p>
              <span className="font-cinzel text-[9px] text-[var(--gold-dim)] uppercase tracking-wider">
                House Targaryen
              </span>
            </div>
          </div>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ash)] hover:text-[var(--parchment)] p-1 transition-colors"
              title="Open external deployment"
              aria-label={`Open external deployment for ${project.title}`}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        {/* Title */}
        <h3 className="font-cinzel-dec text-lg sm:text-xl text-[var(--parchment)] mb-2.5 group-hover:text-[#ff9999] transition-colors leading-tight font-bold">
          <Link to={`/projects/${project.id}`} className="hover:underline">
            {project.title}
          </Link>
        </h3>

        {/* Single tight sentence summary */}
        <p className="font-garamond text-sm sm:text-base text-[var(--ash)] leading-relaxed mb-4">
          {project.summary}
        </p>

        {/* 2-3 Key Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {keyStack.map((t) => (
            <span
              key={t}
              className="text-[9px] font-cinzel tracking-wider uppercase px-2.5 py-1 bg-[#1f0505] text-[#ffcccc] border border-[rgba(192,57,43,0.35)] font-medium"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Clear visual affordance: Click to open full details */}
      <div className="pt-3 border-t border-[rgba(192,57,43,0.25)] mt-2">
        <Link
          to={`/projects/${project.id}`}
          className="got-cta-ghost w-full justify-center text-xs py-2 px-3 group-hover:bg-[rgba(192,57,43,0.15)] group-hover:border-[rgba(192,57,43,0.7)] transition-all flex items-center gap-2"
          style={{ borderColor: 'rgba(192, 57, 43, 0.45)', color: '#ffb3b3' }}
        >
          <BookOpen size={13} className="text-[#c0392b]" />
          <span>Inspect Architecture &amp; Case Study</span>
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: accent }} />
    </div>
  );
};

export const Projects: React.FC = () => {
  const accent = '#c0392b'; // Targaryen Blood Crimson

  return (
    <div className="realm-page relative overflow-hidden" style={{ '--accent': accent } as React.CSSProperties}>
      {/* Atmospheric Background Layers */}
      <div className="realm-bg-texture" />
      <div className="realm-bg-vignette" />

      <PageHeader
        sectionLabel="Projects"
        eyebrow="HOUSE TARGARYEN · DRAGONSTONE"
        title="Armory of"
        titleEm="Forged Projects"
        motto="Fire and Blood"
        subtitle='"Built, not inherited — dragons hatched from Sarthak&apos;s own fire." Explore architectural case studies across on-device diagnostics, triage routers, and multimodal emotional AI.'
        accent={accent}
        sigilRune="🐉"
      />

      {/* Projects Grid: Compact, scannable tiles */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto px-2">
        {PROJECTS.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} accent={accent} />
        ))}
      </div>

      {/* Low-key 'the full story lives here' signal */}
      <div className="fade-up mt-14 mb-8 text-center relative z-10">
        <p className="font-fell italic text-sm text-[var(--ash)] inline-flex items-center gap-2">
          <span>For the complete record,</span>
          <a
            href={RESUME_PATH}
            download={RESUME_FILENAME}
            className="text-[var(--gold)] hover:text-[var(--gold-light)] underline underline-offset-4 decoration-[var(--gold-dim)] hover:decoration-[var(--gold)] transition-colors not-italic font-cinzel text-xs uppercase tracking-wider inline-flex items-center gap-1"
          >
            <span>download the full resume</span>
            <span>&darr;</span>
          </a>
        </p>
      </div>
    </div>
  );
};
