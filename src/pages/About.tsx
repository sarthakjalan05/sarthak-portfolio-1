import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Brain, ArrowRight, Code2, Sparkles, Terminal, FileText, GitBranch, ChevronDown, ChevronUp } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { GitHubActivity } from '../components/GitHubActivity';
import { RESUME_PATH, RESUME_FILENAME } from '../config/constants';

export const About: React.FC = () => {
  const [imgError, setImgError] = useState(false);
  const [showGitHubActivity, setShowGitHubActivity] = useState(false);
  const accent = 'var(--cyan)';

  return (
    <div className="realm-page relative overflow-hidden" style={{ '--accent': accent } as React.CSSProperties}>
      {/* Background Texture & Vignette */}
      <div className="realm-bg-texture" />
      <div className="realm-bg-vignette" />

      {/* Page Header */}
      <PageHeader
        sectionLabel="PROFILE"
        eyebrow="SYS://PROFILE.SPECIFICATION"
        title="About"
        titleEm="Sarthak Jalan"
        motto="Engineering distributed cloud systems, edge ML inference, and full-stack web platforms"
        subtitle="System architecture overview, applied intelligence capabilities, and technical trajectory."
        accent={accent}
        sigilRune="//"
      />

      {/* Main Centered Content Card */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div
          className="fade-up realm-card relative p-6 sm:p-10 md:p-12 border border-[rgba(0,240,255,0.25)] bg-[#0d1017]/95 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.9)] rounded"
        >
          {/* Corner HUD Brackets */}
          <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

          {/* 1. Profile Block */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 pb-8 border-b border-[rgba(0,240,255,0.15)] text-center sm:text-left">
            {/* Portrait Image */}
            <div className="relative w-[96px] h-[96px] shrink-0">
              <div
                className="absolute -inset-1 rounded-full pointer-events-none transition-all duration-300"
                style={{
                  border: '1px solid var(--cyan-dim)',
                  boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)',
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
                    border: '2px solid var(--cyan)',
                    boxShadow: '0 0 20px rgba(0, 240, 255, 0.35)',
                  }}
                />
              ) : (
                <div
                  className="w-full h-full rounded-full flex items-center justify-center font-orbitron text-2xl font-bold relative z-10 select-none bg-[#07080c] text-[var(--cyan)] border-2 border-[var(--cyan)] shadow-[0_0_20px_rgba(0,240,255,0.35)]"
                  aria-label="Sarthak Jalan initials placeholder"
                >
                  SJ
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <span className="font-chakra text-xs tracking-[0.25em] uppercase text-[var(--cyan)] font-semibold block mb-1">
                SYSTEM ARCHITECT
              </span>
              <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--text)] tracking-wider">
                Sarthak Jalan
              </h2>
              <p className="font-chakra text-xs sm:text-sm tracking-wider uppercase text-[var(--cyan-dim)] font-semibold mt-1">
                Full-Stack Developer &amp; AI Systems Engineer
              </p>
              <p className="font-space text-xs sm:text-sm text-[var(--text-muted)] mt-2 leading-relaxed">
                Computer Science Senior at Vellore Institute of Technology (VIT), specializing in Cloud Computing, Distributed Web Services &amp; Applied Machine Learning.
              </p>
            </div>
          </div>

          {/* 2. Bio Paragraph */}
          <div className="py-8 border-b border-[rgba(0,240,255,0.15)]">
            <h3 className="font-chakra text-xs tracking-[0.3em] text-[var(--cyan)] uppercase font-semibold mb-4 flex items-center gap-2">
              <Terminal size={14} className="text-[var(--cyan)]" />
              <span>SYS://ENGINEERING_PROFILE.LOG</span>
            </h3>
            <div className="space-y-4 font-space text-sm sm:text-base text-[var(--text)]/90 leading-relaxed">
              <p>
                Sarthak Jalan is a full-stack engineer and artificial intelligence practitioner passionate about crafting scalable digital systems and applied machine learning architectures. Grounded in modern web infrastructure, he builds and deploys high-throughput applications using the MERN stack (MongoDB, Express.js, React, Node.js) with meticulous attention to performance, modular design, and responsive interfaces.
              </p>
              <p>
                In parallel, his work in machine learning spans Python, Scikit-learn, PyTorch, and TensorFlow, translating complex clinical and visual data into predictive healthcare diagnostic tools and multimodal interfaces. From architecting distributed cloud backends to deploying on-device AI and real-time edge processing models, Sarthak bridges the gap between deep technical rigor and reliable, human-centered software.
              </p>
            </div>
          </div>

          {/* 3. Two Pillar Cards */}
          <div className="py-8">
            <h3 className="font-chakra text-xs tracking-[0.3em] text-[var(--cyan)] uppercase font-semibold mb-5 flex items-center gap-2">
              <Code2 size={14} className="text-[var(--cyan)]" />
              <span>CORE TECHNICAL PILLARS</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pillar 1: Full-Stack & Platforms */}
              <div
                className="realm-card relative p-6 border border-[rgba(0,240,255,0.2)] bg-[#07080c]/80 backdrop-blur-sm flex flex-col justify-between group rounded"
              >
                <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
                <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
                <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
                <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

                <div>
                  <div className="w-11 h-11 rounded border border-[var(--cyan-dim)] flex items-center justify-center bg-[#0d1017] text-[var(--cyan)] mb-4 group-hover:scale-105 group-hover:border-[var(--cyan)] transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                    <Layers size={20} />
                  </div>
                  <h4 className="font-orbitron text-base font-bold text-[var(--text)] mb-2 group-hover:text-[var(--cyan)] transition-colors">
                    Full-Stack &amp; Distributed Systems
                  </h4>
                  <p className="font-space text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                    Architecting end-to-end web applications with the MERN stack, Node.js microservices, resilient REST APIs, and automated cloud deployments tailored for scalable performance.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[rgba(0,240,255,0.12)]">
                  {['MERN Stack', 'Node.js', 'React', 'MongoDB', 'REST APIs', 'Cloud Deploy'].map((tag) => (
                    <span
                      key={tag}
                      className="font-chakra text-[10px] tracking-wider uppercase px-2 py-0.5 border border-[rgba(0,240,255,0.25)] bg-[#0d1017] text-[var(--cyan)] rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pillar 2: AI/ML & Data Systems */}
              <div
                className="realm-card relative p-6 border border-[rgba(0,240,255,0.2)] bg-[#07080c]/80 backdrop-blur-sm flex flex-col justify-between group rounded"
              >
                <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
                <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
                <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
                <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

                <div>
                  <div className="w-11 h-11 rounded border border-[var(--cyan-dim)] flex items-center justify-center bg-[#0d1017] text-[var(--cyan)] mb-4 group-hover:scale-105 group-hover:border-[var(--cyan)] transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                    <Brain size={20} />
                  </div>
                  <h4 className="font-orbitron text-base font-bold text-[var(--text)] mb-2 group-hover:text-[var(--cyan)] transition-colors">
                    AI/ML &amp; Data Systems
                  </h4>
                  <p className="font-space text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                    Engineering applied intelligence pipelines using Python, Scikit-learn, and neural architectures, with emphasis on healthcare computer vision and edge model deployment.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[rgba(0,240,255,0.12)]">
                  {['Python', 'Scikit-learn', 'TensorFlow', 'Computer Vision', 'Edge AI', 'ML Pipelines'].map((tag) => (
                    <span
                      key={tag}
                      className="font-chakra text-[10px] tracking-wider uppercase px-2 py-0.5 border border-[rgba(0,240,255,0.25)] bg-[#0d1017] text-[var(--cyan)] rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 4. Telemetry Tag Row */}
          <div className="pt-6 sm:pt-8 border-t border-[rgba(0,240,255,0.15)] flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
            <span className="font-chakra text-xs tracking-wider uppercase text-[var(--text-muted)]">
              Full-Stack Developer
            </span>
            <span className="text-[var(--cyan)] text-xs select-none">/</span>
            <span className="font-chakra text-xs tracking-wider uppercase text-[var(--text-muted)]">
              AI/ML Engineer
            </span>
            <span className="text-[var(--cyan)] text-xs select-none">/</span>
            <span className="font-chakra text-xs tracking-wider uppercase text-[var(--text-muted)]">
              Open Source Contributor
            </span>
            <span className="text-[var(--cyan)] text-xs select-none">/</span>
            <span className="font-chakra text-xs tracking-wider uppercase text-[var(--text-muted)]">
              HealthTech Finalist
            </span>
          </div>

          {/* Live GitHub Activity Stream Toggle */}
          <div className="mt-8 pt-6 border-t border-[rgba(0,240,255,0.15)]">
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowGitHubActivity((prev) => !prev)}
                className="cyber-ghost inline-flex items-center gap-2.5 px-5 py-2.5 text-xs font-chakra tracking-wider uppercase border border-[rgba(0,240,255,0.3)] hover:border-[var(--cyan)] hover:bg-[rgba(0,240,255,0.08)] transition-all cursor-pointer rounded"
                aria-expanded={showGitHubActivity}
              >
                <GitBranch size={14} className="text-[var(--cyan)]" />
                <span>{showGitHubActivity ? 'Hide Public GitHub Stream' : 'View Public GitHub Stream (Recent Commits)'}</span>
                {showGitHubActivity ? (
                  <ChevronUp size={13} className="text-[var(--cyan)]" />
                ) : (
                  <ChevronDown size={13} className="text-[var(--cyan)]" />
                )}
              </button>
            </div>

            {showGitHubActivity && (
              <div className="mt-6 animate-in fade-in duration-300">
                <GitHubActivity />
              </div>
            )}
          </div>

          {/* Character Sheet Easter Egg */}
          <div className="mt-8 pt-6 border-t border-[rgba(0,240,255,0.15)] flex items-center justify-center">
            <Link
              to="/character-sheet"
              className="group/egg inline-flex items-center gap-2 font-chakra text-xs text-[var(--cyan-dim)] hover:text-[var(--cyan)] transition-colors px-4 py-2 border border-dashed border-[rgba(0,240,255,0.25)] hover:border-[var(--cyan)] bg-[#07080c] rounded"
            >
              <FileText size={14} className="text-[var(--cyan)]" />
              <span className="tracking-wider uppercase text-[11px]">
                Easter Egg: Inspect Attribute Codex &amp; Benchmarks
              </span>
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="fade-up mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-4 text-center">
          <Link
            to="/experience"
            className="cyber-ghost text-xs tracking-wider py-2.5 px-6 inline-flex items-center gap-2 font-chakra font-semibold rounded"
          >
            <span>Explore Experience</span>
            <ArrowRight size={14} />
          </Link>
          <Link
            to="/projects"
            className="got-cta-btn text-xs tracking-wider py-2.5 px-6 inline-flex items-center gap-2 font-chakra font-bold rounded shadow-[0_0_20px_rgba(0,240,255,0.25)]"
            style={{ background: 'var(--cyan)', color: '#07080c' }}
          >
            <span>View Projects Matrix</span>
            <ArrowRight size={14} />
          </Link>
          <Link
            to="/contact"
            className="cyber-ghost text-xs tracking-wider py-2.5 px-6 inline-flex items-center gap-2 font-chakra font-semibold rounded"
          >
            <span>Contact Terminal</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Resume signal */}
        <div className="fade-up mt-8 mb-8 text-center">
          <p className="font-space text-xs text-[var(--text-muted)] inline-flex items-center gap-2">
            <span>For the complete engineering dossier,</span>
            <a
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              className="text-[var(--cyan)] hover:text-white underline underline-offset-4 transition-colors font-chakra text-xs uppercase tracking-wider inline-flex items-center gap-1"
            >
              <span>download the full resume (PDF)</span>
              <span>&darr;</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
