import React, { useState, useEffect, useRef } from 'react';
import { FileText, Download, ExternalLink, RotateCw, ShieldCheck } from 'lucide-react';
import { RESUME_PATH, RESUME_FILENAME } from '../config/constants';

interface ResumeViewerProps {
  accent?: string;
}

export const ResumeViewer: React.FC<ResumeViewerProps> = ({ accent = 'var(--cyan)' }) => {
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
      className="fade-up realm-card p-5 sm:p-7 md:p-8 border bg-[#0d1017]/95 backdrop-blur-md relative shadow-[0_0_50px_rgba(0,0,0,0.85)] rounded"
      style={{ '--accent': accent, borderColor: 'rgba(0, 240, 255, 0.35)' } as React.CSSProperties}
      data-delay="100"
    >
      {/* Corner brackets */}
      <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
      <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
      <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
      <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

      {/* Header Info */}
      <div
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 mb-5 border-b border-[rgba(0,240,255,0.2)]"
      >
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <FileText size={16} style={{ color: accent }} />
            <span className="font-chakra text-[10px] tracking-[0.3em] uppercase text-[var(--cyan)] font-semibold">
              SYS://RESUME.VIEWER
            </span>
          </div>
          <h2 className="font-orbitron text-xl sm:text-2xl font-bold text-[var(--text)]">
            Technical Resume Dossier
          </h2>
          <p className="font-space text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mt-1">
            Complete dossier chronicling production engineering, AI model architectures, and distributed systems.
          </p>
        </div>

        {/* Control Bar */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-1 md:pt-0">
          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="cyber-ghost min-h-[38px] px-3.5 py-1.5 text-xs flex items-center gap-1.5 transition-all"
            style={{ borderColor: 'rgba(0, 240, 255, 0.4)', color: 'var(--text)' }}
            aria-label="Open Resume in New Tab"
          >
            <ExternalLink size={13} className="shrink-0" />
            <span>Open in New Tab</span>
          </a>

          <a
            href={RESUME_PATH}
            download={RESUME_FILENAME}
            className="got-cta-btn min-h-[38px] px-3.5 py-1.5 text-xs flex items-center gap-1.5 transition-all"
            style={{ background: accent, color: '#07080c' }}
            aria-label="Download Sarthak Jalan Resume PDF"
          >
            <Download size={13} className="shrink-0" />
            <span>Download PDF</span>
          </a>

          {!isMobile && (
            <button
              type="button"
              onClick={handleRefresh}
              className="min-h-[38px] min-w-[38px] p-2 border border-[rgba(0,240,255,0.3)] bg-[#07080c] text-[var(--text-muted)] hover:text-white hover:border-[var(--cyan)] flex items-center justify-center transition-all cursor-pointer rounded"
              title="Reload Resume View"
              aria-label="Reload Resume View"
            >
              <RotateCw size={14} className={isRefreshing ? 'animate-spin text-[var(--cyan)]' : ''} />
            </button>
          )}
        </div>
      </div>

      {/* Viewer Chamber */}
      {!isMobile ? (
        <div className="relative border border-[rgba(0,240,255,0.25)] bg-[#07080c] overflow-hidden rounded">
          <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#0d1017] border-b border-[rgba(0,240,255,0.2)] text-[10px] font-chakra text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--cyan)] shadow-[0_0_8px_var(--cyan)]" />
              <span className="tracking-wider uppercase">SYS://LIVE_PDF_PREVIEW</span>
            </div>
            <span className="tracking-widest opacity-80">VERIFIED_CHECKSUM_OK</span>
          </div>

          <iframe
            ref={iframeRef}
            key={reloadKey}
            src={iframeSrc}
            title="Sarthak Jalan Official Resume"
            className="w-full h-[680px] bg-[#07080c] border-none"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="p-6 border border-[rgba(0,240,255,0.25)] bg-[#07080c] text-center rounded">
          <div className="w-12 h-12 mx-auto mb-3 rounded border border-[var(--cyan-dim)] flex items-center justify-center text-[var(--cyan)] bg-[#0d1017]">
            <ShieldCheck size={24} />
          </div>
          <h3 className="font-orbitron text-base font-bold text-[var(--text)] mb-2">
            Mobile Document Interface
          </h3>
          <p className="font-space text-xs text-[var(--text-muted)] leading-relaxed max-w-md mx-auto mb-5">
            To view high-resolution typographic formatting and complete layout on smaller screens, launch the PDF directly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="got-cta-btn w-full sm:w-auto text-xs py-2.5 px-5 flex items-center justify-center gap-2"
              style={{ background: accent, color: '#07080c' }}
            >
              <ExternalLink size={14} />
              <span>Open PDF in Tab</span>
            </a>
            <a
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              className="cyber-ghost w-full sm:w-auto text-xs py-2.5 px-5 flex items-center justify-center gap-2"
              style={{ borderColor: 'rgba(0, 240, 255, 0.4)', color: 'var(--text)' }}
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
