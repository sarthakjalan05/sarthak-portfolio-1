import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scroll } from 'lucide-react';
import { CHAPTERS } from '../data/chapters';
import { RESUME_PATH, RESUME_FILENAME } from '../config/constants';
import '../styles/hero.css';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const sigilRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const chapterLabelRef = useRef<HTMLDivElement>(null);
  const runeBarRef = useRef<HTMLDivElement>(null);

  const [activeChapter, setActiveChapter] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  // Check viewport width and prefers-reduced-motion
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Chapter transition animation
  const prevChapter = useRef(-1);
  const transitionChapter = (idx: number) => {
    if (prevChapter.current === idx) return;
    prevChapter.current = idx;
    setActiveChapter(idx);

    const ch = CHAPTERS[idx];
    if (!ch) return;

    const targets = [titleRef.current, subtitleRef.current, bodyRef.current, sigilRef.current].filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (targets.length === 0) return;

    const tl = gsap.timeline();

    // Fade out previous text
    tl.to(targets, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      stagger: 0.03,
    })
      // Update DOM content mid-transition
      .call(() => {
        if (titleRef.current) titleRef.current.textContent = ch.title;
        if (subtitleRef.current) subtitleRef.current.textContent = ch.subtitle;
        if (bodyRef.current) bodyRef.current.textContent = ch.body;
        if (sigilRef.current) sigilRef.current.textContent = ch.sigil;
      })
      // Fade in new chapter text
      .fromTo(
        targets,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.06 }
      );

    // Update chapter index label
    if (chapterLabelRef.current) {
      gsap.fromTo(
        chapterLabelRef.current,
        { opacity: 0, x: 10 },
        { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }
      );
      chapterLabelRef.current.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(
        CHAPTERS.length
      ).padStart(2, '0')}`;
    }
  };

  // Chapter 0 text initialization & video ready listener with safety timeout fallback
  useEffect(() => {
    // Set initial text values
    const ch0 = CHAPTERS[0];
    if (titleRef.current) titleRef.current.textContent = ch0.title;
    if (subtitleRef.current) subtitleRef.current.textContent = ch0.subtitle;
    if (bodyRef.current) bodyRef.current.textContent = ch0.body;
    if (sigilRef.current) sigilRef.current.textContent = ch0.sigil;

    // On mobile, skip video loading entirely and mark ready immediately
    if (isMobile) {
      setVideoReady(true);
      return;
    }

    const video = videoRef.current;

    // Safety fallback: force videoReady true after 4 seconds even if loadedmetadata hasn't fired
    const fallbackTimer = setTimeout(() => {
      setVideoReady(true);
    }, 4000);

    const onReady = () => {
      clearTimeout(fallbackTimer);
      setVideoReady(true);
    };

    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.addEventListener('loadedmetadata', onReady);
      video.addEventListener('canplay', onReady);
      video.addEventListener('error', onReady);
      if (video.readyState >= 1) {
        onReady();
      }
    }

    return () => {
      clearTimeout(fallbackTimer);
      if (video) {
        video.removeEventListener('loadedmetadata', onReady);
        video.removeEventListener('canplay', onReady);
        video.removeEventListener('error', onReady);
      }
    };
  }, [isMobile]);

  // GSAP ScrollTrigger setup for Desktop
  useEffect(() => {
    // If mobile or elements not ready, do not initialize the pinned scroll container
    if (!videoReady || isMobile || !containerRef.current || !stickyRef.current) return;

    const container = containerRef.current;
    const sticky = stickyRef.current;
    const video = videoRef.current;
    const duration = video?.duration && !isNaN(video.duration) ? video.duration : 6;
    const scrollHeight = window.innerHeight * 5;

    // Use gsap.context for complete lifecycle safety and cleanup
    const ctx = gsap.context(() => {
      // Pinned trigger with anticipation
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: `+=${scrollHeight}`,
        pin: sticky,
        pinSpacing: true,
        anticipatePin: 1,
      });

      // Video scrubbing & chapter synchronizer
      gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${scrollHeight}`,
          scrub: 0.5,
          onUpdate: (self) => {
            if (video && video.duration && !isNaN(video.duration)) {
              const t = self.progress * duration;
              // Increased threshold for less frequent seeks to improve smoothness
              if (Math.abs(video.currentTime - t) > 0.15) {
                if (typeof (video as any).fastSeek === 'function') {
                  (video as any).fastSeek(t);
                } else {
                  video.currentTime = t;
                }
              }
            }

            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }

            const p = self.progress;
            const idx = CHAPTERS.findIndex((c) => p >= c.progress[0] && p < c.progress[1]);
            transitionChapter(idx === -1 ? CHAPTERS.length - 1 : idx);

            const vinInt = 0.45 + Math.sin(p * Math.PI) * 0.2;
            if (vignetteRef.current) {
              vignetteRef.current.style.opacity = String(vinInt);
            }
          },
        },
      });

      // Background shift
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          background: 'linear-gradient(to top, rgba(5,4,3,0.80) 0%, rgba(5,4,3,0.22) 45%, rgba(5,4,3,0.05) 100%)',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: `+=${scrollHeight}`,
            scrub: 2,
          },
        });
      }

      // Rune bar tick stagger
      if (runeBarRef.current) {
        const ticks = runeBarRef.current.querySelectorAll('.rune-tick');
        if (ticks.length > 0) {
          gsap.fromTo(
            ticks,
            { scaleY: 0, opacity: 0 },
            {
              scaleY: 1,
              opacity: 1,
              stagger: 0.04,
              duration: 0.5,
              ease: 'power2.out',
              scrollTrigger: { trigger: container, start: 'top 80%' },
            }
          );
        }
      }

      // Initial entrance animation
      const entranceTargets = [sigilRef.current, subtitleRef.current, titleRef.current, bodyRef.current].filter(
        (el): el is HTMLElement => Boolean(el)
      );
      if (entranceTargets.length > 0) {
        gsap.fromTo(
          entranceTargets,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', stagger: 0.08, delay: 0.2 }
        );
      }
    }, container);

    // Debounced window resize handler for clean re-calculations
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
      ctx.revert();
    };
  }, [videoReady, isMobile]);

  // CTA Smooth scroll to houses
  const scrollToHouses = () => {
    const el = document.getElementById('houses-navigation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Loading Overlay */}
      <div className={`got-loading ${videoReady ? 'hidden' : ''}`}>
        <div className="got-loading-logo">Sarthak Jalan</div>
        <div className="got-loading-sub">A Chronicle of Code & Craft</div>
        <div className="got-loading-bar-wrap">
          <div className="got-loading-bar-fill" />
        </div>
      </div>

      {/* Main Container */}
      <div
        ref={containerRef}
        className={`got-container ${isMobile ? 'mobile-hero' : ''}`}
        style={!isMobile ? { height: `${window.innerHeight * 5 + window.innerHeight}px` } : undefined}
      >
        <div ref={stickyRef} className={`got-sticky ${isMobile ? 'mobile-hero-sticky' : ''}`}>
          {/* Ambient Video & Fallback */}
          <div className="got-video-fallback" />
          {!isMobile ? (
            <video
              ref={videoRef}
              className="got-video"
              src="/video/one.mp4"
              poster="/video/one-poster.jpg"
              playsInline
              muted
              preload="auto"
              onError={() => setVideoReady(true)}
            />
          ) : (
            <img
              className="got-video got-mobile-poster"
              src="/video/one-poster.jpg"
              alt="The Realm of Sarthak Jalan"
              loading="eager"
            />
          )}

          {/* Overlays */}
          <div ref={vignetteRef} className="got-vignette" />
          <div ref={overlayRef} className="got-overlay" />
          <div className="got-grain-local" />

          {/* Corner Ornaments */}
          {!isMobile &&
            ['tl', 'tr', 'bl', 'br'].map((pos) => (
              <div key={pos} className={`got-corner got-corner-${pos}`}>
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 2 L2 20 M2 2 L20 2" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.6" />
                  <path d="M2 2 L8 8" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.4" />
                  <rect
                    x="1"
                    y="1"
                    width="4"
                    height="4"
                    fill="none"
                    stroke="#c9a84c"
                    strokeWidth="0.5"
                    strokeOpacity="0.7"
                  />
                </svg>
              </div>
            ))}

          {/* Rune decorative tick bar */}
          <div ref={runeBarRef} className="got-rune-bar">
            {Array.from({ length: 60 }).map((_, i) => (
              <div key={i} className="rune-tick" />
            ))}
          </div>

          {/* Main Hero Content */}
          <div className="got-content">
            <span ref={sigilRef} className="got-sigil">
              ✦
            </span>
            <div className="got-divider">
              <div className="got-divider-line" />
              <div className="got-divider-diamond" />
              <div className="got-divider-line right" />
            </div>
            <span ref={subtitleRef} className="got-subtitle">
              A CHRONICLE OF CODE AND CRAFT
            </span>
            <h1 ref={titleRef} className="got-title">
              The Realm of Sarthak Jalan
            </h1>
            <p ref={bodyRef} className="got-body">
              Full-Stack Developer and AI Engineer forging resilient platforms, intelligent models, and seamless user experiences across the digital kingdoms.
            </p>

            {/* CTAs */}
            <div className="got-cta-row">
              <button onClick={scrollToHouses} className="got-cta-btn">
                Explore the Realm
              </button>

              <a
                href={RESUME_PATH}
                download={RESUME_FILENAME}
                className="got-cta-ghost flex items-center gap-2"
                aria-label="Download Sarthak Jalan Resume Scroll PDF"
              >
                <Scroll size={14} className="text-[var(--gold)]" />
                <span>Download the Scroll</span>
              </a>

              <a
                href="https://github.com/sarthakjalan05"
                target="_blank"
                rel="noopener noreferrer"
                className="got-cta-ghost"
                aria-label="View Sarthak Jalan code on GitHub"
              >
                <span>View on GitHub</span>
                <span className="text-xs">⚔</span>
              </a>
            </div>
          </div>

          {/* Right Side Vertical Panel (Desktop only) */}
          {!isMobile && (
            <div className="got-right-panel">
              <div ref={chapterLabelRef} className="got-chapter-label">
                01 / 06
              </div>
              <div className="got-vert-line" />
              <div className="got-dots">
                {CHAPTERS.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Jump to chapter ${i + 1}`}
                    onClick={() => {
                      const scrollTarget = (window.innerHeight * 5) * (CHAPTERS[i].progress[0] + 0.01);
                      window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
                    }}
                    className={`got-dot ${i === activeChapter ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Scroll Hint */}
          {!isMobile && (
            <div className="got-scroll-hint">
              <span>Scroll</span>
              <div className="arrow" />
            </div>
          )}

          {/* Bottom Progress Bar */}
          {!isMobile && (
            <div className="got-progress-bar-wrap">
              <div ref={progressRef} className="got-progress-bar-fill" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
