import React, { useEffect, useRef, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { PROJECTS } from '../data/projects';
import { ProjectItem } from '../types';
import { ExternalLink, Flame, ShieldCheck } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  accent: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, accent }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), index * 120);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="house-card fade-up group"
      style={
        {
          '--accent': accent,
          '--border': '#5a1212',
          background: 'linear-gradient(135deg, #120202 0%, #200808 60%, #120202 100%)',
          minHeight: '520px',
        } as React.CSSProperties
      }
    >
      {/* Corner brackets */}
      <span className="corner corner-tl" />
      <span className="corner corner-tr" />
      <span className="corner corner-bl" />
      <span className="corner corner-br" />

      {/* Glow pulse */}
      <div className="card-glow" />

      {/* Dragon crest icon */}
      <div className="house-sigil-wrap">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:scale-105"
          style={{
            borderColor: accent,
            background: 'radial-gradient(circle, #3d0505 0%, #0d0101 100%)',
            boxShadow: `0 0 25px color-mix(in srgb, ${accent} 40%, transparent)`,
            color: accent,
          }}
        >
          <Flame size={36} />
        </div>
        <div className="sigil-ring" />
      </div>

      {/* Static Content State */}
      <div className={`house-content ${hovered ? 'content-hidden' : ''}`}>
        <p className="house-region" style={{ color: accent }}>
          {project.date} · TARGARYEN FORGE
        </p>

        <div className="house-divider">
          <span className="divider-line" style={{ background: `linear-gradient(to right, transparent, ${accent})` }} />
          <span className="divider-diamond" style={{ background: accent }} />
          <span className="divider-line right" style={{ background: `linear-gradient(to left, transparent, ${accent})` }} />
        </div>

        <h3 className="house-name font-cinzel-dec text-xl sm:text-2xl text-[var(--parchment)] mb-3">
          {project.title}
        </h3>

        <p className="font-garamond text-base text-[var(--ash)] leading-[1.7] max-w-xs mx-auto mb-4 line-clamp-3">
          {project.summary}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap justify-center gap-1.5 max-w-xs mx-auto mb-4">
          {project.stack.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[9px] font-cinzel uppercase px-2 py-0.5 bg-[#1a0404] text-[var(--parchment)]"
              style={{ border: `1px solid color-mix(in srgb, ${accent} 35%, transparent)` }}
            >
              {t}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="text-[9px] font-cinzel text-[var(--gold-dim)] px-1 py-0.5">
              +{project.stack.length - 3} more
            </span>
          )}
        </div>

        <div>
          <span className="house-enter-chip" style={{ color: accent, borderColor: accent }}>
            Hover for Scrolls ⚔
          </span>
        </div>
      </div>

      {/* Hover Reveal State */}
      <div className={`house-hover-content ${hovered ? 'hover-visible' : ''}`}>
        <p className="hover-words" style={{ color: accent }}>
          {project.title}
        </p>

        <div className="house-divider hover-divider">
          <span className="divider-line" style={{ background: `linear-gradient(to right, transparent, ${accent})` }} />
          <span className="divider-diamond" style={{ background: accent }} />
          <span className="divider-line right" style={{ background: `linear-gradient(to left, transparent, ${accent})` }} />
        </div>

        <p className="hover-desc font-garamond text-sm sm:text-base leading-[1.75] mb-4 max-w-sm">
          {project.description}
        </p>

        {/* Themed divider directly above the tech-tag row */}
        <div
          className="w-full max-w-[140px] mx-auto my-3"
          style={{ borderTop: `1px solid color-mix(in srgb, ${accent} 35%, transparent)` }}
        />

        {/* All Tech tags on hover */}
        <div className="flex flex-wrap justify-center gap-1.5 max-w-sm mb-6">
          {project.stack.map((t) => (
            <span
              key={t}
              className="text-[9px] font-cinzel uppercase px-2 py-0.5 bg-[#1f0505] text-[var(--parchment)]"
              style={{ border: `1px solid color-mix(in srgb, ${accent} 35%, transparent)` }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* External Link button with affordance */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="got-cta-btn text-xs py-2 px-6"
          style={{ background: accent, color: '#050403' }}
        >
          <span>Inspect Project</span>
          <ExternalLink size={13} />
        </a>
      </div>

      {/* Bottom accent bar */}
      <div className="card-accent-bar" style={{ background: accent }} />
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
        subtitle='"Built, not inherited — dragons hatched from Sarthak&apos;s own fire." Scaled on-device diagnostics, intelligent triage networks, and affective multimodal companions.'
        accent={accent}
        sigilRune="🐉"
      />

      {/* Projects Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 max-w-7xl mx-auto px-2">
        {PROJECTS.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} accent={accent} />
        ))}
      </div>
    </div>
  );
};
