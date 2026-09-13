import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ContactForm } from '../components/ContactForm';
import { Mail, Phone, Linkedin, Github, ExternalLink, ShieldAlert, MapPin } from 'lucide-react';

export const Contact: React.FC = () => {
  const accent = '#8fafc4'; // Stark Grey Direwolf / Ice

  return (
    <div className="realm-page">
      <PageHeader
        eyebrow="HOUSE STARK · WINTERFELL"
        title="Ravens to"
        titleEm="The North"
        subtitle='"The pack that answers when called." Send your dispatches to Winterfell for engineering inquiries, advisory roles, or alliances across the realm.'
        accent={accent}
        sigilRune="🐺"
      />

      {/* Stark Motto Banner */}
      <div className="text-center mb-16">
        <span
          className="font-cinzel-dec text-lg sm:text-xl tracking-widest uppercase block"
          style={{ color: accent, textShadow: `0 0 20px color-mix(in srgb, ${accent} 40%, transparent)` }}
        >
          "Winter Is Coming"
        </span>
        <div className="got-divider max-w-xs mx-auto mt-2">
          <div className="got-divider-line" style={{ background: `linear-gradient(to right, transparent, ${accent})` }} />
          <div className="got-divider-diamond" style={{ background: accent }} />
          <div className="got-divider-line right" style={{ background: `linear-gradient(to left, transparent, ${accent})` }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-start">
        {/* Left Column: Direct Communication Channels & Castle Coordinates */}
        <div className="lg:col-span-5 space-y-6">
          {/* Raven Registry Card */}
          <div
            className="p-7 sm:p-8 border bg-[#0d121a]/90 backdrop-blur-sm relative"
            style={{ borderColor: 'rgba(143, 175, 196, 0.35)' }}
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

            <div className="space-y-4">
              {/* Clickable Email */}
              <a
                href="mailto:sarthakjalan06@gmail.com"
                className="flex items-center gap-3.5 p-3.5 border border-[#223042] bg-[#111a26] hover:border-[#8fafc4] transition-colors group"
              >
                <div className="w-10 h-10 rounded-full border border-[#354b66] flex items-center justify-center text-[#8fafc4] group-hover:border-[#8fafc4] transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="font-cinzel text-[10px] tracking-widest text-[#8fafc4] uppercase block">
                    Raven Mail
                  </span>
                  <span className="font-cinzel text-xs sm:text-sm text-[var(--parchment)] font-semibold break-all">
                    sarthakjalan06@gmail.com
                  </span>
                </div>
              </a>

              {/* Clickable Phone */}
              <a
                href="tel:+919874255221"
                className="flex items-center gap-3.5 p-3.5 border border-[#223042] bg-[#111a26] hover:border-[#8fafc4] transition-colors group"
              >
                <div className="w-10 h-10 rounded-full border border-[#354b66] flex items-center justify-center text-[#8fafc4] group-hover:border-[#8fafc4] transition-colors">
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
                className="flex items-center justify-between p-3.5 border border-[#223042] bg-[#111a26] hover:border-[#8fafc4] transition-colors group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full border border-[#354b66] flex items-center justify-center text-[#8fafc4] group-hover:border-[#8fafc4] transition-colors">
                    <Linkedin size={18} />
                  </div>
                  <div>
                    <span className="font-cinzel text-[10px] tracking-widest text-[#8fafc4] uppercase block">
                      Guild Network
                    </span>
                    <span className="font-cinzel text-xs sm:text-sm text-[var(--parchment)] font-semibold break-all">
                      linkedin.com/in/sarthak-jalan-1b5597284
                    </span>
                  </div>
                </div>
                <ExternalLink size={14} className="text-[#8fafc4] opacity-70 group-hover:opacity-100 shrink-0" />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/sarthakjalan05"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 border border-[#223042] bg-[#111a26] hover:border-[#8fafc4] transition-colors group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full border border-[#354b66] flex items-center justify-center text-[#8fafc4] group-hover:border-[#8fafc4] transition-colors">
                    <Github size={18} />
                  </div>
                  <div>
                    <span className="font-cinzel text-[10px] tracking-widest text-[#8fafc4] uppercase block">
                      Code Fortress
                    </span>
                    <span className="font-cinzel text-xs sm:text-sm text-[var(--parchment)] font-semibold">
                      github.com/sarthakjalan05
                    </span>
                  </div>
                </div>
                <ExternalLink size={14} className="text-[#8fafc4] opacity-70 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          {/* Winterfell Seat Posture note */}
          <div className="p-6 border border-[#26374d] bg-[#090e14] text-xs font-fell text-[var(--ash)] leading-relaxed">
            <div className="flex items-center gap-2 mb-2 font-cinzel text-[#8fafc4] uppercase tracking-wider">
              <MapPin size={14} />
              <span>Seat: The North · Open to Remote Realms & Relocation</span>
            </div>
            <p>
              Anchored in Vellore &amp; Bangalore (India). Ready to dispatch code, lead engineering campaigns, and consult across the kingdoms.
            </p>
          </div>
        </div>

        {/* Right Column: Working Contact Form with Validations */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};
