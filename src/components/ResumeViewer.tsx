import React, { useState, useEffect, useRef } from 'react';
import { Scroll, Download, ExternalLink, RotateCw, ShieldCheck } from 'lucide-react';
import { RESUME_PATH, RESUME_FILENAME } from '../config/constants';

interface ResumeViewerProps {
  accent?: string;
}

export const ResumeViewer: React.FC<ResumeViewerProps> = ({ accent = '#8fafc4' }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setReloadKey((prev) => prev + 1);

    // If iframe element exists, directly refresh its source to bypass cache
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.src.split('&t=')[0];
      iframeRef.current.src = `${currentSrc}&t=${Date.now()}`;
    }

    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const iframeSrc = `${RESUME_PATH}&reload=${reloadKey}#toolbar=0&navpanes=0&scrollbar=1`;

  return (
    <div
      className="fade-up realm-card p-5 sm:p-7 md:p-8 border bg-[#0d121a]/95 backdrop-blur-md relative shadow-[0_0_50px_rgba(0,0,0,0.85)]"
      style={{ '--accent': accent, borderColor: 'rgba(143, 175, 196, 0.4)' } as React.CSSProperties}
      data-delay="100"
    >
      {/* Corner brackets */}
      <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
      <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
      <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
      <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

      {/* Header Info */}
      <div
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 mb-5"
        style={{
          borderBottom: `1px solid color-mix(in srgb, ${accent} 25%, transparent)`,
        }}
      >
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Scroll size={18} style={{ color: accent }} />
            <span className="font-cinzel text-[10px] tracking-[0.3em] uppercase text-[#8fafc4] font-semibold">
              Grand Maester's Ledger
            </span>
          </div>
          <h2 className="font-cinzel-dec text-xl sm:text-2xl font-bold text-[var(--parchment)]">
            The Official Scroll (Resume)
          </h2>
          <p className="font-fell italic text-xs sm:text-sm text-[var(--ash)] mt-1">
            Archival parchment chronicling technical campaigns, production platforms, and engineering masteries.
          </p>
        </div>

        {/* Control Bar */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-1 md:pt-0">
          {/* Open in New Tab Button */}
          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="got-cta-ghost min-h-[38px] px-3.5 py-1.5 text-xs flex items-center gap-1.5 transition-all duration-300 hover:shadow-[0_0_15px_rgba(143,175,196,0.3)]"
            style={{ borderColor: 'rgba(143, 175, 196, 0.45)', color: accent }}
            aria-label="Open Resume Scroll in New Tab"
          >
            <ExternalLink size={13} className="shrink-0" />
            <span>Open in New Tab</span>
          </a>

          {/* Download PDF Button */}
          <a
            href={RESUME_PATH}
            download={RESUME_FILENAME}
            className="got-cta-btn min-h-[38px] px-3.5 py-1.5 text-xs flex items-center gap-1.5 transition-all duration-300"
            style={{ background: accent, color: '#050403' }}
            aria-label="Download Sarthak Jalan Resume Scroll PDF"
          >
            <Download size={13} className="shrink-0" />
            <span>Download PDF</span>
          </a>

          {/* Refresh/Reload Button (Only on desktop/iframe view) */}
          {!isMobile && (
            <button
              type="button"
              onClick={handleRefresh}
              className="min-h-[38px] min-w-[38px] p-2 border border-[#223042] bg-[#111a26] text-[var(--ash)] hover:text-[var(--parchment)] hover:border-[#8fafc4] hover:shadow-[0_0_15px_rgba(143,175,196,0.25)] flex items-center justify-center transition-all duration-300 cursor-pointer"
              title="Reload Ledger Scroll"
              aria-label="Reload Ledger Scroll"
            >
              <RotateCw size={14} className={isRefreshing ? 'animate-spin text-[#8fafc4]' : ''} />
            </button>
          )}
        </div>
      </div>

      {/* Viewer Chamber: Desktop Embedded IFrame vs Mobile Fallback Card */}
      {!isMobile ? (
        <div className="relative border border-[#223042] bg-[#070b10] overflow-hidden shadow-inner">
          {/* Subtle Top Status Bar */}
          <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#0e1622] border-b border-[#1f2d3d] text-[10px] font-cinzel text-[var(--ash)]">
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8fafc4] shadow-[0_0_8px_#8fafc4]" />
              <span className="tracking-wider uppercase">ARCHIVAL MANUSCRIPT · INLINE PREVIEW</span>
            </div>
            <span className="tracking-widest opacity-60">OLDTOWN SEAL VALIDATED</span>
          </div>

          {/* PDF Viewer Iframe */}
          <iframe
            ref={iframeRef}
            key={reloadKey}
            src={iframeSrc}
            title="Sarthak Jalan Official Resume Scroll"
            className="w-full h-[540px] sm:h-[620px] lg:h-[680px] border-0 bg-[#0c0d10]"
          />
        </div>
      ) : (
        /* Mobile Fallback Chamber */
        <div className="p-6 sm:p-8 border border-[#223042] bg-[#0c131c] text-center">
          <div className="w-14 h-14 mx-auto rounded-full border border-[#354b66] flex items-center justify-center mb-4 bg-[#111a26] text-[#8fafc4]">
            <ShieldCheck size={26} />
          </div>
          <h3 className="font-cinzel-dec text-base font-bold text-[var(--parchment)] mb-2">
            Archival Parchment Available
          </h3>
          <p className="font-fell italic text-xs text-[var(--ash)] max-w-md mx-auto mb-5 leading-relaxed">
            The Grand Maester's ledger is formatted for royal desk displays. For the clearest reading experience on handheld scrolls, open directly in a dedicated tab or download the file.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto">
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="got-cta-ghost w-full justify-center min-h-[44px] text-xs flex items-center gap-2"
              style={{ borderColor: 'rgba(143, 175, 196, 0.45)', color: accent }}
            >
              <ExternalLink size={14} />
              <span>Open in New Tab</span>
            </a>

            <a
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              className="got-cta-btn w-full justify-center min-h-[44px] text-xs flex items-center gap-2"
              style={{ background: accent, color: '#050403' }}
            >
              <Download size={14} />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
