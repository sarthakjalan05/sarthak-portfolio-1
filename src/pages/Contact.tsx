import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ContactForm } from '../components/ContactForm';
import { ResumeViewer } from '../components/ResumeViewer';
import { Mail, Phone, Linkedin, Github, ExternalLink, MapPin } from 'lucide-react';

export const Contact: React.FC = () => {
  const accent = '#8fafc4'; // Stark Grey Direwolf / Ice

  return (
    <div className="realm-page relative overflow-hidden" style={{ '--accent': accent } as React.CSSProperties}>
      {/* Atmospheric Background Layers */}
      <div className="realm-bg-texture" />
      <div className="realm-bg-vignette" />

      <PageHeader
        eyebrow="HOUSE STARK · WINTERFELL"
        title="Ravens to"
        titleEm="The North"
        motto="Winter Is Coming"
        subtitle='"The pack that answers when called." Send your dispatches to Winterfell for engineering inquiries, advisory roles, or alliances across the realm.'
        accent={accent}
        sigilRune="🐺"
      />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-12 sm:space-y-16">
        {/* Requirement 4: Grand Maester's Ledger Full Inline Resume Viewer */}
        <section aria-label="Grand Maester's Ledger - Official Resume Scroll">
          <ResumeViewer accent={accent} />
        </section>

        {/* Communication Coordinates & Raven Dispatch Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* Left Column: Direct Communication Channels & Seat Note */}
          <div className="lg:col-span-5 space-y-6">
            {/* Raven Registry Card */}
            <div
              className="fade-up realm-card p-6 sm:p-8 border bg-[#0d121a]/90 backdrop-blur-sm relative"
              style={{ '--accent': accent, borderColor: 'rgba(143, 175, 196, 0.35)' } as React.CSSProperties}
              data-delay="200"
            >
              {/* Corner brackets */}
              <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
              <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
              <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
              <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

              <h3 className="font-cinzel-dec text-xl font-bold text-[var(--parchment)] mb-2">
                Direct Inscriptions
              </h3>
              <p className="font-fell italic text-sm text-[var(--ash)] mb-6">
                When haste is imperative, summon the raven post directly through verified coordinates.
              </p>

              <div className="space-y-3.5">
                {/* Clickable Email */}
                <a
                  href="mailto:sarthakjalan06@gmail.com"
                  className="flex items-center gap-3.5 p-3 sm:p-3.5 border border-[#223042] bg-[#111a26] hover:border-[#8fafc4] hover:shadow-[0_0_20px_rgba(143,175,196,0.25)] hover:-translate-y-0.5 transition-all duration-300 min-h-[52px] group"
                >
                  <div className="w-10 h-10 rounded-full border border-[#354b66] flex items-center justify-center text-[#8fafc4] group-hover:border-[#8fafc4] group-hover:bg-[#1a2638] transition-colors shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0">
                    <span className="font-cinzel text-[10px] tracking-widest text-[#8fafc4] uppercase block">
                      Raven Mail
                    </span>
                    <span className="font-cinzel text-xs sm:text-sm text-[var(--parchment)] font-semibold truncate block">
                      sarthakjalan06@gmail.com
                    </span>
                  </div>
                </a>

                {/* Clickable Phone */}
                <a
                  href="tel:+919874255221"
                  className="flex items-center gap-3.5 p-3 sm:p-3.5 border border-[#223042] bg-[#111a26] hover:border-[#8fafc4] hover:shadow-[0_0_20px_rgba(143,175,196,0.25)] hover:-translate-y-0.5 transition-all duration-300 min-h-[52px] group"
                >
                  <div className="w-10 h-10 rounded-full border border-[#354b66] flex items-center justify-center text-[#8fafc4] group-hover:border-[#8fafc4] group-hover:bg-[#1a2638] transition-colors shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="font-cinzel text-[10px] tracking-widest text-[#8fafc4] uppercase block">
                      Signal Horn (Phone)
                    </span>
                    <span className="font-cinzel text-xs sm:text-sm text-[var(--parchment)] font-semibold">
                      +91-9874255221
                    </span>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/sarthak-jalan-1b5597284"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 sm:p-3.5 border border-[#223042] bg-[#111a26] hover:border-[#8fafc4] hover:shadow-[0_0_20px_rgba(143,175,196,0.25)] hover:-translate-y-0.5 transition-all duration-300 min-h-[52px] group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-full border border-[#354b66] flex items-center justify-center text-[#8fafc4] group-hover:border-[#8fafc4] group-hover:bg-[#1a2638] transition-colors shrink-0">
                      <Linkedin size={18} />
                    </div>
                    <div className="min-w-0">
                      <span className="font-cinzel text-[10px] tracking-widest text-[#8fafc4] uppercase block">
                        Guild Network
                      </span>
                      <span className="font-cinzel text-xs sm:text-sm text-[var(--parchment)] font-semibold truncate block">
                        linkedin.com/in/sarthak-jalan
                      </span>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-[#8fafc4] opacity-70 group-hover:opacity-100 shrink-0 ml-2" />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/sarthakjalan05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 sm:p-3.5 border border-[#223042] bg-[#111a26] hover:border-[#8fafc4] hover:shadow-[0_0_20px_rgba(143,175,196,0.25)] hover:-translate-y-0.5 transition-all duration-300 min-h-[52px] group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-full border border-[#354b66] flex items-center justify-center text-[#8fafc4] group-hover:border-[#8fafc4] group-hover:bg-[#1a2638] transition-colors shrink-0">
                      <Github size={18} />
                    </div>
                    <div className="min-w-0">
                      <span className="font-cinzel text-[10px] tracking-widest text-[#8fafc4] uppercase block">
                        Code Fortress
                      </span>
                      <span className="font-cinzel text-xs sm:text-sm text-[var(--parchment)] font-semibold truncate block">
                        github.com/sarthakjalan05
                      </span>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-[#8fafc4] opacity-70 group-hover:opacity-100 shrink-0 ml-2" />
                </a>
              </div>
            </div>

            {/* Winterfell Seat Posture note */}
            <div
              className="fade-up p-5 sm:p-6 border border-[#26374d] bg-[#090e14] text-xs font-fell text-[var(--ash)] leading-relaxed relative"
              data-delay="300"
            >
              <div className="flex items-center gap-2 mb-2 font-cinzel text-[#8fafc4] uppercase tracking-wider">
                <MapPin size={14} className="shrink-0" />
                <span>Seat: The North · Remote Realms & Relocation</span>
              </div>
              <p>
                Anchored in Vellore &amp; Bangalore (India). Ready to dispatch code, lead engineering campaigns, and consult across the kingdoms.
              </p>
            </div>
          </div>

          {/* Right Column: Working Contact Form with Validations */}
          <div className="fade-up lg:col-span-7" data-delay="150">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};
