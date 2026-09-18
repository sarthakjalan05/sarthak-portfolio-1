import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { ContactForm } from '../components/ContactForm';
import { ResumeViewer } from '../components/ResumeViewer';
import { Mail, Phone, Linkedin, Github, ExternalLink, MapPin, Copy, Check } from 'lucide-react';

export const Contact: React.FC = () => {
  const accent = '#00f0ff'; // Cyber Cyan
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmailToClipboard = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const email = 'sarthakjalan06@gmail.com';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      });
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    copyEmailToClipboard();
    try {
      window.open('mailto:sarthakjalan06@gmail.com', '_blank');
    } catch {
      // Handled by copy
    }
  };

  return (
    <div className="realm-page relative overflow-hidden" style={{ '--accent': accent } as React.CSSProperties}>
      {/* Background Grid & Glow */}
      <div className="realm-bg-texture" />
      <div className="realm-bg-vignette" />

      <PageHeader
        sectionLabel="COMMUNICATION TERMINAL"
        eyebrow="SYS://COMMUNICATION.UPLINK"
        title="Direct"
        titleEm="Transmission"
        motto="CONNECT // TRANSMIT // COLLABORATE"
        subtitle="Establish communication coordinates for engineering roles, technical advisory, distributed platform projects, or code collaboration."
        accent={accent}
        sigilRune="✦"
      />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-16 sm:space-y-20 px-2">
        {/* Full Inline Resume Viewer */}
        <section aria-label="Official Resume Dossier">
          <ResumeViewer accent={accent} />
        </section>

        {/* Transmission Coordinates & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start">
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className="fade-up realm-card p-8 sm:p-9 border bg-[#0d1017]/95 backdrop-blur-md relative rounded shadow-[0_0_40px_rgba(0,0,0,0.85)]"
              style={{ '--accent': accent, borderColor: 'rgba(0, 240, 255, 0.3)' } as React.CSSProperties}
              data-delay="200"
            >
              <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
              <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
              <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
              <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

              <h3 className="font-orbitron text-lg sm:text-xl font-bold text-[var(--text)] mb-2">
                Direct Channels
              </h3>
              <p className="font-space text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                For prioritized correspondence, connect via verified endpoints below.
              </p>

              <div className="space-y-4">
                {/* Clickable Email */}
                <div className="border border-[rgba(0,240,255,0.2)] bg-[#07080c] hover:border-[var(--cyan)] transition-all duration-300 rounded group">
                  <div className="flex items-center justify-between p-3.5 sm:p-4">
                    <a
                      href="mailto:sarthakjalan06@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleEmailClick}
                      className="flex items-center gap-3.5 min-w-0 flex-1"
                      title="Send email & copy address"
                    >
                      <div className="w-9 h-9 rounded border border-[var(--cyan-dim)] flex items-center justify-center text-[var(--cyan)] group-hover:border-[var(--cyan)] group-hover:bg-[#0d1017] transition-colors shrink-0">
                        {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Mail size={16} />}
                      </div>
                      <div className="min-w-0">
                        <span className="font-chakra text-[10px] tracking-widest text-[var(--cyan)] uppercase block font-semibold">
                          EMAIL TERMINAL {copiedEmail && <span className="text-emerald-400 lowercase font-normal ml-1.5">· copied!</span>}
                        </span>
                        <span className="font-space text-xs sm:text-sm text-[var(--text)] font-medium truncate block group-hover:text-white transition-colors">
                          sarthakjalan06@gmail.com
                        </span>
                      </div>
                    </a>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <button
                        type="button"
                        onClick={copyEmailToClipboard}
                        className="px-2 py-1 border border-[rgba(0,240,255,0.25)] bg-[#0d1017] hover:border-[var(--cyan)] hover:text-[var(--cyan)] text-xs font-chakra tracking-wider text-[var(--text-muted)] flex items-center gap-1 transition-colors rounded"
                        title="Copy email to clipboard"
                        aria-label="Copy email address"
                      >
                        {copiedEmail ? (
                          <>
                            <Check size={12} className="text-emerald-400" />
                            <span className="text-emerald-400 hidden sm:inline">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span className="hidden sm:inline">Copy</span>
                          </>
                        )}
                      </button>

                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=sarthakjalan06@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 border border-[rgba(0,240,255,0.25)] bg-[#0d1017] hover:border-[var(--cyan)] text-[var(--cyan)] hover:text-white text-xs font-chakra tracking-wider flex items-center gap-1 transition-colors rounded"
                        title="Open in Gmail web client"
                      >
                        <span className="hidden sm:inline">Gmail</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <a
                  href="tel:+919874255221"
                  className="flex items-center gap-3.5 p-3.5 border border-[rgba(0,240,255,0.2)] bg-[#07080c] hover:border-[var(--cyan)] transition-all duration-300 rounded group"
                >
                  <div className="w-9 h-9 rounded border border-[var(--cyan-dim)] flex items-center justify-center text-[var(--cyan)] group-hover:border-[var(--cyan)] group-hover:bg-[#0d1017] transition-colors shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="font-chakra text-[10px] tracking-widest text-[var(--cyan)] uppercase block font-semibold">
                      VOICE COMM (PHONE)
                    </span>
                    <span className="font-space text-xs sm:text-sm text-[var(--text)] font-medium">
                      +91-9874255221
                    </span>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/sarthak-jalan-7685a7285/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 border border-[rgba(0,240,255,0.2)] bg-[#07080c] hover:border-[var(--cyan)] transition-all duration-300 rounded group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded border border-[var(--cyan-dim)] flex items-center justify-center text-[var(--cyan)] group-hover:border-[var(--cyan)] group-hover:bg-[#0d1017] transition-colors shrink-0">
                      <Linkedin size={16} />
                    </div>
                    <div className="min-w-0">
                      <span className="font-chakra text-[10px] tracking-widest text-[var(--cyan)] uppercase block font-semibold">
                        PROFESSIONAL NETWORK
                      </span>
                      <span className="font-space text-xs sm:text-sm text-[var(--text)] font-medium truncate block">
                        linkedin.com/in/sarthak-jalan-7685a7285
                      </span>
                    </div>
                  </div>
                  <ExternalLink size={13} className="text-[var(--cyan)] opacity-70 group-hover:opacity-100 shrink-0 ml-2" />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/sarthakjalan05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 border border-[rgba(0,240,255,0.2)] bg-[#07080c] hover:border-[var(--cyan)] transition-all duration-300 rounded group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded border border-[var(--cyan-dim)] flex items-center justify-center text-[var(--cyan)] group-hover:border-[var(--cyan)] group-hover:bg-[#0d1017] transition-colors shrink-0">
                      <Github size={16} />
                    </div>
                    <div className="min-w-0">
                      <span className="font-chakra text-[10px] tracking-widest text-[var(--cyan)] uppercase block font-semibold">
                        CODE REPOSITORY
                      </span>
                      <span className="font-space text-xs sm:text-sm text-[var(--text)] font-medium truncate block">
                        github.com/sarthakjalan05
                      </span>
                    </div>
                  </div>
                  <ExternalLink size={13} className="text-[var(--cyan)] opacity-70 group-hover:opacity-100 shrink-0 ml-2" />
                </a>
              </div>
            </div>

            {/* Location Note */}
            <div
              className="fade-up p-5 border border-[rgba(0,240,255,0.2)] bg-[#0d1017]/80 rounded text-xs font-space text-[var(--text-muted)] leading-relaxed relative"
              data-delay="300"
            >
              <div className="flex items-center gap-2 mb-2 font-chakra text-[var(--cyan)] uppercase tracking-wider font-semibold">
                <MapPin size={13} className="shrink-0" />
                <span>LOCATION: BANGALORE &amp; VELLORE, INDIA</span>
              </div>
              <p>
                Available for high-impact full-stack engineering roles, distributed systems development, and remote or hybrid team collaboration worldwide.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="fade-up lg:col-span-7" data-delay="150">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};
