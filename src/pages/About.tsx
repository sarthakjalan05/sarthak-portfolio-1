import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Brain, ArrowRight, Code2, Sparkles, Terminal, Scroll, GitBranch, ChevronDown, ChevronUp } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { GitHubActivity } from '../components/GitHubActivity';
import { RESUME_PATH, RESUME_FILENAME } from '../config/constants';

export const About: React.FC = () => {
  const [imgError, setImgError] = useState(false);
  const [showGitHubActivity, setShowGitHubActivity] = useState(false);
  const accent = 'var(--gold)';

  return (
    <div className="realm-page relative overflow-hidden" style={{ '--accent': accent } as React.CSSProperties}>
      {/* Atmospheric Background Layers */}
      <div className="realm-bg-texture" />
      <div className="realm-bg-vignette" />

      {/* Page Header (Consistent with other realm pages) */}
      <PageHeader
        sectionLabel="ABOUT"
        eyebrow="BEYOND THE HOUSES"
        title="About"
        titleEm="Sarthak Jalan"
        motto="Forging intelligent systems and web realms beyond boundaries"
        subtitle='"Beyond the banners and ancestral seats lies the maker of these digital realms." An introduction to Sarthak Jalan — engineer, builder, and artificial intelligence practitioner.'
        accent={accent}
        sigilRune="✦"
      />

      {/* Main Centered Content Card */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div
          className="fade-up realm-card relative p-6 sm:p-10 md:p-12 border bg-[#0b0806]/95 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.85)]"
          style={{
            borderColor: 'color-mix(in srgb, var(--gold) 35%, transparent)',
          }}
        >
          {/* Corner Ornaments */}
          <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

          {/* 1. Profile Block */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 pb-8 border-b border-[color-mix(in_srgb,var(--gold)_25%,transparent)] text-center sm:text-left">
            {/* Portrait Image with Glowing Gold-Ring / Sigil-Ring */}
            <div className="relative w-[96px] h-[96px] shrink-0">
              <div
                className="absolute -inset-1 rounded-full pointer-events-none transition-all duration-400"
                style={{
                  border: '1px solid color-mix(in srgb, var(--gold) 35%, transparent)',
                  boxShadow: '0 0 18px color-mix(in srgb, var(--gold) 25%, transparent)',
                }}
              />
              {!imgError ? (
                <img
                  src="/images/profile.jpg"
                  alt="Sarthak Jalan portrait"
                  width={96}
                  height={96}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover rounded-full relative z-10"
                  style={{
                    border: '2px solid color-mix(in srgb, var(--gold) 55%, transparent)',
                    boxShadow:
                      '0 4px 20px rgba(0, 0, 0, 0.7), 0 0 0 3px rgba(0, 0, 0, 0.5), 0 0 25px color-mix(in srgb, var(--gold) 30%, transparent)',
                  }}
                />
              ) : (
                <div
                  className="house-sigil-fallback w-full h-full rounded-full flex items-center justify-center font-cinzel-dec text-3xl font-bold relative z-10 select-none"
                  style={{
                    color: 'var(--gold)',
                    textShadow: '0 0 25px var(--gold)',
                    background: 'rgba(10, 7, 5, 0.92)',
                    border: '2px solid color-mix(in srgb, var(--gold) 50%, transparent)',
                    boxShadow:
                      '0 4px 20px rgba(0, 0, 0, 0.7), 0 0 0 3px rgba(0, 0, 0, 0.4), 0 0 25px color-mix(in srgb, var(--gold) 30%, transparent)',
                  }}
                  aria-label="Sarthak Jalan initials placeholder"
                >
                  SJ
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[var(--gold)] font-semibold block mb-1">
                The Architect
              </span>
              <h2 className="font-cinzel-dec text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--parchment)] tracking-wide">
                Sarthak Jalan
              </h2>
              <p className="font-cinzel text-xs sm:text-sm tracking-[0.2em] uppercase text-[#e8c97a] font-medium mt-1">
                Full-Stack Developer &amp; AI Engineer
              </p>
              <p className="font-garamond text-sm text-[var(--ash)] mt-2">
                Specializing in Cloud Computing, Distributed Web Systems &amp; Applied Machine Learning at Vellore Institute of Technology.
              </p>
            </div>
          </div>

          {/* 2. Bio Paragraph (EB Garamond, 4-6 sentences) */}
          <div className="py-8">
            <h3 className="font-cinzel text-xs tracking-[0.35em] text-[var(--gold)] uppercase font-semibold mb-4 flex items-center gap-2">
              <Sparkles size={14} className="text-[var(--gold)]" />
              <span>The Journey &amp; Philosophy</span>
            </h3>
            <div className="space-y-4 font-garamond text-base sm:text-lg text-[var(--parchment)]/95 leading-[1.8]">
              <p>
                Sarthak Jalan is a full-stack engineer and artificial intelligence practitioner passionate about crafting scalable digital products and applied machine learning systems. Grounded in modern web architecture, he designs and ships robust applications using the MERN stack (MongoDB, Express.js, React, Node.js) with meticulous attention to performance, modular design, and responsive interfaces. In parallel, his work in machine learning spans Python, Scikit-learn, and deep learning frameworks, translating complex clinical and visual data into predictive healthcare diagnostic tools and multimodal interfaces. From architecting distributed cloud backends to deploying on-device AI and real-time edge processing models, Sarthak bridges the gap between deep technical rigor and human-centered software. Driven by continuous exploration and competitive hackathons, he builds solutions engineered to thrive under real-world pressure.
              </p>
            </div>
          </div>

          {/* 3. Two Pillar Cards (Side-by-side on desktop, stacked on mobile) */}
          <div className="pb-8">
            <h3 className="font-cinzel text-xs tracking-[0.35em] text-[var(--gold)] uppercase font-semibold mb-5 flex items-center gap-2">
              <Code2 size={14} className="text-[var(--gold)]" />
              <span>Technical Pillars</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pillar 1: Full-Stack & Platforms */}
              <div
                className="realm-card relative p-6 sm:p-7 border bg-[#120d09]/80 backdrop-blur-sm flex flex-col justify-between group"
                style={{
                  borderColor: 'color-mix(in srgb, var(--gold) 25%, transparent)',
                }}
              >
                <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
                <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
                <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
                <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

                <div>
                  <div className="w-12 h-12 rounded-full border border-[var(--gold-dim)] flex items-center justify-center bg-[#1a140d] text-[var(--gold)] mb-4 group-hover:scale-105 group-hover:border-[var(--gold)] transition-all duration-300 shadow-[0_0_15px_rgba(201,168,76,0.2)]">
                    <Layers size={22} />
                  </div>
                  <h4 className="font-cinzel-dec text-lg font-bold text-[var(--parchment)] mb-2 group-hover:text-[var(--gold-light)] transition-colors">
                    Full-Stack &amp; Platforms
                  </h4>
                  <p className="font-garamond text-sm sm:text-base text-[var(--ash)] leading-relaxed mb-4">
                    Architecting end-to-end web applications with the MERN stack, Node.js services, resilient REST APIs, and automated cloud deployments tailored for scalable performance.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[color-mix(in_srgb,var(--gold)_15%,transparent)]">
                  {['MERN Stack', 'Node.js', 'React', 'MongoDB', 'REST APIs', 'Cloud Deploy'].map((tag) => (
                    <span
                      key={tag}
                      className="font-cinzel text-[10px] tracking-wider uppercase px-2 py-0.5 border border-[var(--gold-dim)]/40 bg-[var(--gold)]/5 text-[var(--parchment)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pillar 2: AI/ML & Data Systems */}
              <div
                className="realm-card relative p-6 sm:p-7 border bg-[#120d09]/80 backdrop-blur-sm flex flex-col justify-between group"
                style={{
                  borderColor: 'color-mix(in srgb, var(--gold) 25%, transparent)',
                }}
              >
                <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
                <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
                <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
                <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

                <div>
                  <div className="w-12 h-12 rounded-full border border-[var(--gold-dim)] flex items-center justify-center bg-[#1a140d] text-[var(--gold)] mb-4 group-hover:scale-105 group-hover:border-[var(--gold)] transition-all duration-300 shadow-[0_0_15px_rgba(201,168,76,0.2)]">
                    <Brain size={22} />
                  </div>
                  <h4 className="font-cinzel-dec text-lg font-bold text-[var(--parchment)] mb-2 group-hover:text-[var(--gold-light)] transition-colors">
                    AI/ML &amp; Data Systems
                  </h4>
                  <p className="font-garamond text-sm sm:text-base text-[var(--ash)] leading-relaxed mb-4">
                    Engineering applied intelligence pipelines using Python, Scikit-learn, and neural architectures, with emphasis on healthcare computer vision and edge model deployment.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[color-mix(in_srgb,var(--gold)_15%,transparent)]">
                  {['Python', 'Scikit-learn', 'TensorFlow', 'Computer Vision', 'Edge AI', 'ML Pipelines'].map((tag) => (
                    <span
                      key={tag}
                      className="font-cinzel text-[10px] tracking-wider uppercase px-2 py-0.5 border border-[var(--gold-dim)]/40 bg-[var(--gold)]/5 text-[var(--parchment)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 4. Footer Tag Row */}
          <div className="pt-6 sm:pt-8 border-t border-[color-mix(in_srgb,var(--gold)_20%,transparent)] flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
            <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[var(--ash)]">
              Full-Stack Developer
            </span>
            <span className="text-[var(--gold)] text-xs select-none">✦</span>
            <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[var(--ash)]">
              AI/ML Engineer
            </span>
            <span className="text-[var(--gold)] text-xs select-none">✦</span>
            <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[var(--ash)]">
              Open Source Contributor
            </span>
            <span className="text-[var(--gold)] text-xs select-none">✦</span>
            <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[var(--ash)]">
              HealthTech Finalist
            </span>
          </div>

          {/* Live GitHub Activity Campaign Ledger (Collapsed by default so real work is prominent) */}
          <div className="mt-8 pt-6 border-t border-[color-mix(in_srgb,var(--gold)_20%,transparent)]">
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowGitHubActivity((prev) => !prev)}
                className="got-cta-ghost inline-flex items-center gap-2.5 px-5 py-2.5 text-xs font-cinzel tracking-[0.2em] uppercase border border-[var(--gold-dim)]/50 hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 transition-all cursor-pointer"
                aria-expanded={showGitHubActivity}
              >
                <GitBranch size={14} className="text-[var(--gold)]" />
                <span>{showGitHubActivity ? 'Conceal Public Git Ledger' : 'View Public Git Ledger (Recent Commits)'}</span>
                {showGitHubActivity ? (
                  <ChevronUp size={13} className="text-[var(--gold)]" />
                ) : (
                  <ChevronDown size={13} className="text-[var(--gold)]" />
                )}
              </button>
            </div>

            {showGitHubActivity && (
              <div className="mt-6 animate-in fade-in duration-300">
                <GitHubActivity />
              </div>
            )}
          </div>

          {/* Character Sheet Easter Egg Teaser (Remains small footer/about easter egg link) */}
          <div className="mt-8 pt-6 border-t border-[color-mix(in_srgb,var(--gold)_20%,transparent)] flex items-center justify-center">
            <Link
              to="/character-sheet"
              className="group/egg inline-flex items-center gap-2 font-cinzel text-xs text-[var(--gold-dim)] hover:text-[var(--gold)] transition-colors px-4 py-2 border border-dashed border-[var(--gold-dim)]/40 hover:border-[var(--gold)] bg-[#0d0905]/70"
            >
              <Scroll size={14} className="text-[var(--gold)] group-hover/egg:rotate-12 transition-transform" />
              <span className="tracking-widest uppercase text-[10px] sm:text-xs">
                Easter Egg: Inspect RPG Character Sheet &amp; Feats
              </span>
              <span className="text-[10px]">⚔</span>
            </Link>
          </div>
        </div>

        {/* Explore Realm Navigation Links */}
        <div className="fade-up mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-4 text-center">
          <Link
            to="/experience"
            className="got-cta-ghost text-xs tracking-[0.2em] py-3 px-6 inline-flex items-center gap-2"
          >
            <span>Explore Experience</span>
            <ArrowRight size={14} />
          </Link>
          <Link
            to="/projects"
            className="got-cta-btn text-xs tracking-[0.2em] py-3 px-6 inline-flex items-center gap-2"
            style={{ background: 'var(--gold)', color: 'var(--ink)' }}
          >
            <span>View Projects Armory</span>
            <ArrowRight size={14} />
          </Link>
          <Link
            to="/contact"
            className="got-cta-ghost text-xs tracking-[0.2em] py-3 px-6 inline-flex items-center gap-2"
          >
            <span>Send A Raven</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Low-key 'the full story lives here' signal */}
        <div className="fade-up mt-10 mb-8 text-center">
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
    </div>
  );
};
