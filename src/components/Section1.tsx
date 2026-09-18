import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  FolderCode,
  Cpu,
  GraduationCap,
  Award,
  Trophy,
  Mail,
  Terminal,
  ArrowRight,
} from 'lucide-react';
import { HOUSES } from '../data/houses';
import { House } from '../types';
import '../styles/section1.css';

interface HouseCardProps {
  house: House;
  index: number;
}

const getModuleIcon = (name?: string, accent?: string) => {
  const iconProps = {
    size: 40,
    className: 'transition-transform duration-300 group-hover:scale-110',
    style: { color: accent || 'var(--cyan)' },
  };

  switch (name) {
    case 'Briefcase':
      return <Briefcase {...iconProps} />;
    case 'FolderCode':
      return <FolderCode {...iconProps} />;
    case 'Cpu':
      return <Cpu {...iconProps} />;
    case 'GraduationCap':
      return <GraduationCap {...iconProps} />;
    case 'Award':
      return <Award {...iconProps} />;
    case 'Trophy':
      return <Trophy {...iconProps} />;
    case 'Mail':
      return <Mail {...iconProps} />;
    default:
      return <Terminal {...iconProps} />;
  }
};

export const HouseCard: React.FC<HouseCardProps> = ({ house, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Staggered entrance via IntersectionObserver
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

  // Subtle 3D tilt on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !iconRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    iconRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) scale(1.08)`;
  };

  const handleMouseLeave = () => {
    if (iconRef.current) iconRef.current.style.transform = '';
    setHovered(false);
  };

  const cardContent = (
    <div
      ref={cardRef}
      className={`house-card group house-card--${house.id} ${!house.isNavigable ? 'non-navigable' : ''}`}
      style={
        {
          '--accent': house.accent,
          '--border': house.borderColor,
          background: house.bg,
        } as React.CSSProperties
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* HUD Corner Brackets */}
      <span className="corner corner-tl" />
      <span className="corner corner-tr" />
      <span className="corner corner-bl" />
      <span className="corner corner-br" />

      {/* Ambient glow pulse on hover */}
      <div className="card-glow" />

      {/* Module Icon Container */}
      <div ref={iconRef} className="house-sigil-wrap">
        <div
          className="cyber-icon-frame"
          style={{
            borderColor: `color-mix(in srgb, ${house.accent} 40%, transparent)`,
            boxShadow: `0 0 20px color-mix(in srgb, ${house.accent} 25%, transparent)`,
          }}
        >
          {getModuleIcon(house.iconName, house.accent)}
        </div>
        <div
          className="sigil-ring"
          style={{
            borderColor: `color-mix(in srgb, ${house.accent} 20%, transparent)`,
          }}
        />
      </div>

      {/* Static content */}
      <div className={`house-content ${hovered ? 'content-hidden' : ''}`}>
        <p className="house-region">{house.region}</p>
        <div className="house-divider">
          <span className="divider-line" />
          <span className="divider-dot" />
          <span className="divider-line" />
        </div>
        <h2 className="house-name">{house.name}</h2>
        <p className="house-seat">{house.seat}</p>
        <p className="house-sigil-label">{house.section}</p>

        {/* Action chip */}
        <div className="pt-2">
          <span className="house-enter-chip">
            {house.routingLabel || 'ACCESS →'}
          </span>
        </div>
      </div>

      {/* Hover reveal: status + description */}
      <div className={`house-hover-content ${hovered ? 'hover-visible' : ''}`}>
        <p className="hover-words">{house.words}</p>
        <div className="house-divider hover-divider">
          <span className="divider-line" />
          <span className="divider-dot" />
          <span className="divider-line" />
        </div>
        <h3 className="hover-name">{house.section || house.name}</h3>
        <p className="hover-desc">{house.description}</p>
        {house.isNavigable && (
          <span className="hover-enter-cta">
            <span>{house.routingLabel || 'ACCESS SUBSYSTEM →'}</span>
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </span>
        )}
      </div>

      {/* Bottom neon accent line */}
      <div className="card-accent-bar" />
    </div>
  );

  // Wrap navigable cards in React Router Link
  if (house.isNavigable && house.route) {
    return (
      <Link
        to={house.route}
        className="house-card-link"
        aria-label={`Access ${house.section || house.name} (${house.name})`}
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export const Section1: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const els = [headingRef.current, subRef.current].filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          els.forEach((el, i) =>
            setTimeout(() => el.classList.add('visible'), i * 120)
          );
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="houses-navigation" ref={sectionRef} className="section1">
      {/* Background cyber grid & glow */}
      <div className="section1-bg-texture" />
      <div className="section1-bg-vignette" />

      {/* Section header */}
      <header className="section1-header">
        <p ref={subRef} className="section1-eyebrow fade-up">
          SYS://NAVIGATION.CORE
        </p>
        <div className="header-ornament">
          <span className="ornament-line" />
          <span className="ornament-dot" />
          <span className="ornament-line" />
        </div>
        <h2 ref={headingRef} className="section1-title fade-up">
          System <em>Modules</em>
        </h2>
        <p className="section1-subtitle fade-up">
          Seven operational subsystems cataloging production engineering, distributed platforms, verified credentials, and communication lines.
        </p>
      </header>

      {/* Modules grid */}
      <div className="houses-grid">
        {HOUSES.map((house, i) => (
          <HouseCard key={house.id} house={house} index={i} />
        ))}
      </div>

      {/* Section footer terminal indicator */}
      <div className="section1-footer-ornament">
        <span className="footer-line" />
        <span className="footer-terminal-tag">SYS://ALL_SYSTEMS_ONLINE</span>
        <span className="footer-line" />
      </div>
    </section>
  );
};
