import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { HOUSES } from '../data/houses';
import { House } from '../types';
import '../styles/section1.css';

interface HouseCardProps {
  house: House;
  index: number;
}

export const HouseCard: React.FC<HouseCardProps> = ({ house, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const sigilRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(!house.sigil_url);

  // Staggered entrance via IntersectionObserver
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

  // 3D Sigil tilt on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !sigilRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    sigilRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) scale(1.06)`;
  };

  const handleMouseLeave = () => {
    if (sigilRef.current) sigilRef.current.style.transform = '';
    setHovered(false);
  };

  /**
   * Determine Sigil Fallback Glyph:
   * NOTE ON CITADEL SIGIL TREATMENT:
   * As specified, no pre-rendered image asset exists in the original codebase
   * for The Citadel. It gracefully defaults to the glowing chain-link glyph '⛓'
   * in parchment/silver-grey inside .house-sigil-fallback.
   */
  const getFallbackGlyph = () => {
    if (house.id === 'citadel') return '⛓';
    return house.sigil[0] || '✦';
  };

  const cardContent = (
    <div
      ref={cardRef}
      className={`house-card house-card--${house.id} ${!house.isNavigable ? 'non-navigable' : ''}`}
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
      {/* Corner Ornaments */}
      <span className="corner corner-tl" />
      <span className="corner corner-tr" />
      <span className="corner corner-bl" />
      <span className="corner corner-br" />

      {/* Glow pulse on hover */}
      <div className="card-glow" />

      {/* Sigil with 3D tilt */}
      <div ref={sigilRef} className="house-sigil-wrap">
        {!imgError && house.sigil_url ? (
          <img
            className={`house-sigil-img ${house.id === 'citadel' ? 'house-sigil-img--citadel' : ''}`}
            src={house.sigil_url}
            alt={`${house.name} Sigil`}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="house-sigil-fallback">{getFallbackGlyph()}</div>
        )}
        <div className="sigil-ring" />
      </div>

      {/* Static content with routing chip */}
      <div className={`house-content ${hovered ? 'content-hidden' : ''}`}>
        <p className="house-region">{house.region}</p>
        <div className="house-divider">
          <span className="divider-line" />
          <span className="divider-diamond" />
          <span className="divider-line" />
        </div>
        <h2 className="house-name">{house.name}</h2>
        <p className="house-seat">{house.seat}</p>
        <p className="house-sigil-label">{house.sigil}</p>

        {/* Visual navigation affordance chip */}
        <div className="pt-2">
          <span className="house-enter-chip">
            {house.routingLabel || 'Enter →'}
          </span>
        </div>
      </div>

      {/* Hover reveal: motto + description */}
      <div className={`house-hover-content ${hovered ? 'hover-visible' : ''}`}>
        <p className="hover-words">{house.words}</p>
        <div className="house-divider hover-divider">
          <span className="divider-line" />
          <span className="divider-diamond" />
          <span className="divider-line" />
        </div>
        <h3 className="hover-name">{house.section || house.name}</h3>
        <p className="hover-desc">{house.description}</p>
        {house.isNavigable && (
          <span className="hover-enter-cta">
            {house.routingLabel || 'Inspect Ledger →'}
          </span>
        )}
      </div>

      {/* Bottom accent bar */}
      <div className="card-accent-bar" />
    </div>
  );

  // Wrap navigable house cards in React Router Link at outermost layer
  if (house.isNavigable && house.route) {
    return (
      <Link
        to={house.route}
        className="house-card-link"
        aria-label={`Explore ${house.section || house.name} (${house.name}) - ${house.words}`}
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
            setTimeout(() => el.classList.add('visible'), i * 150)
          );
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="houses-navigation" ref={sectionRef} className="section1">
      {/* Ambient background texture */}
      <div className="section1-bg-texture" />
      <div className="section1-bg-vignette" />

      {/* Section header */}
      <header className="section1-header">
        <p ref={subRef} className="section1-eyebrow fade-up">
          THE REALM ARCHITECTURE & NAVIGATION
        </p>
        <div className="header-ornament">
          <span className="ornament-line" />
          <span className="ornament-rune">✦</span>
          <span className="ornament-line" />
        </div>
        <h2 ref={headingRef} className="section1-title fade-up">
          Houses & <em>Orders</em>
        </h2>
        <p className="section1-subtitle fade-up">
          Seven halls of deeds, dragons, oaths, and craftsmanship. Select your path.
        </p>
      </header>

      {/* Houses grid */}
      <div className="houses-grid">
        {HOUSES.map((house, i) => (
          <HouseCard key={house.id} house={house} index={i} />
        ))}
      </div>

      {/* Section footer ornament */}
      <div className="section1-footer-ornament">
        <span className="footer-line" />
        <span className="footer-sigil">⚔</span>
        <span className="footer-line" />
      </div>
    </section>
  );
};
