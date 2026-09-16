import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import {
  Download,
  Shield,
  Swords,
  Sparkles,
  Award,
  BookOpen,
  ArrowLeft,
  Check,
  Flame,
  Zap,
  Cpu,
  Star,
} from 'lucide-react';

export const CharacterSheet: React.FC = () => {
  const accent = '#d4a84b'; // Lannister / Valyrian Gold
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const attributes = [
    { name: 'System Architecture', score: 95, desc: 'Full-stack MERN, distributed services, Redis queues' },
    { name: 'Machine Learning & Affective AI', score: 96, desc: '60/40 multimodal acoustic-visual fusion' },
    { name: 'Predictive Model Precision', score: 99, desc: '98.78% accuracy on 1M+ row force predictions' },
    { name: 'Edge Inference & Quantization', score: 94, desc: 'Sub-115ms on-device INT8 TFLite classification' },
    { name: 'Algorithmic Problem Solving', score: 92, desc: 'LeetCode 1550+ contest rating, 400+ problems' },
    { name: 'Hackathon Grit & Speed', score: 94, desc: '1st Runner Up (400+ teams) & Flipkart Top 10%' },
  ];

  const gear = [
    { name: 'Valyrian TypeScript Blade', type: 'Primary Weapon', desc: 'React 19, TypeScript, state orchestration' },
    { name: 'TFLite Dragon Heart', type: 'Artifact', desc: '4.8MB quantized mobile neural network' },
    { name: 'Affective Acoustic Amulet', type: 'Relic', desc: 'SenseVoice, Deepgram, and Gemini integration' },
    { name: 'MERN Fortress Aegis', type: 'Armor', desc: 'Node.js, Express, MongoDB connection pooling' },
    { name: 'AWS Cloud Sigil', type: 'Accessory', desc: 'Cloud Practitioner, S3, EC2, automated workflows' },
  ];

  const feats = [
    { title: '1st Runner Up', event: 'Hack the Spring 2025', desc: 'Ranked #2 out of 400+ contending engineering teams' },
    { title: 'Top 10% National Rank', event: 'Flipkart GRiD 6.0', desc: 'Advanced to national semi-finals in HealthTech track' },
    { title: 'LeetCode Top 30%', event: 'Algorithmic Arena', desc: '1550+ contest rating with 400+ problems vanquished' },
    { title: 'Executive Committee', event: 'Apple Developers Group', desc: 'Led technical design and iOS/web initiatives at VIT' },
  ];

  const handleDownloadCanvas = () => {
    setDownloading(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 1550;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Background
      ctx.fillStyle = '#080604';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Gradient overlay
      const grad = ctx.createRadialGradient(600, 400, 50, 600, 775, 800);
      grad.addColorStop(0, 'rgba(212, 168, 75, 0.12)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Gold Outer Border
      ctx.strokeStyle = '#d4a84b';
      ctx.lineWidth = 4;
      ctx.strokeRect(40, 40, 1120, 1470);

      // Inner Border
      ctx.strokeStyle = 'rgba(212, 168, 75, 0.35)';
      ctx.lineWidth = 1;
      ctx.strokeRect(52, 52, 1096, 1446);

      // Corner Diamonds
      const drawDiamond = (cx: number, cy: number, size: number) => {
        ctx.fillStyle = '#d4a84b';
        ctx.beginPath();
        ctx.moveTo(cx, cy - size);
        ctx.lineTo(cx + size, cy);
        ctx.lineTo(cx, cy + size);
        ctx.lineTo(cx - size, cy);
        ctx.closePath();
        ctx.fill();
      };

      drawDiamond(40, 40, 12);
      drawDiamond(1160, 40, 12);
      drawDiamond(40, 1510, 12);
      drawDiamond(1160, 1510, 12);

      // Header Text
      ctx.fillStyle = '#d4a84b';
      ctx.font = 'bold 20px serif';
      ctx.textAlign = 'center';
      ctx.fillText('CHARACTER CODEX · THE REALM OF WESTEROS', 600, 95);

      ctx.fillStyle = '#f5ede0';
      ctx.font = 'bold 44px serif';
      ctx.fillText('SARTHAK JALAN', 600, 150);

      ctx.fillStyle = '#c9a84c';
      ctx.font = '18px serif';
      ctx.fillText('LEVEL 22 · ARCHMAGE OF FULL-STACK & AI SYSTEMS', 600, 185);

      ctx.fillStyle = '#a89f91';
      ctx.font = '16px serif';
      ctx.fillText('House Allegiance: Targaryen & Lannister · Guild: Vellore Institute of Technology', 600, 215);

      // Divider line
      ctx.strokeStyle = 'rgba(212, 168, 75, 0.5)';
      ctx.beginPath();
      ctx.moveTo(150, 240);
      ctx.lineTo(1050, 240);
      ctx.stroke();

      // Section: Core Attributes
      ctx.textAlign = 'left';
      ctx.fillStyle = '#d4a84b';
      ctx.font = 'bold 24px serif';
      ctx.fillText('⚔ CORE ATTRIBUTES', 100, 285);

      let yPos = 325;
      attributes.forEach((attr) => {
        ctx.fillStyle = '#f5ede0';
        ctx.font = 'bold 18px serif';
        ctx.fillText(attr.name, 100, yPos);

        ctx.fillStyle = '#d4a84b';
        ctx.font = 'bold 18px serif';
        ctx.textAlign = 'right';
        ctx.fillText(`${attr.score}/100`, 1100, yPos);
        ctx.textAlign = 'left';

        // Stat bar background
        ctx.fillStyle = '#221910';
        ctx.fillRect(100, yPos + 10, 1000, 10);

        // Stat bar fill
        ctx.fillStyle = '#d4a84b';
        ctx.fillRect(100, yPos + 10, (1000 * attr.score) / 100, 10);

        ctx.fillStyle = '#8e8679';
        ctx.font = '13px serif';
        ctx.fillText(attr.desc, 100, yPos + 35);

        yPos += 60;
      });

      // Divider line
      yPos += 15;
      ctx.strokeStyle = 'rgba(212, 168, 75, 0.4)';
      ctx.beginPath();
      ctx.moveTo(150, yPos);
      ctx.lineTo(1050, yPos);
      ctx.stroke();

      // Section: Equipped Gear
      yPos += 45;
      ctx.fillStyle = '#d4a84b';
      ctx.font = 'bold 24px serif';
      ctx.fillText('🛡 EQUIPPED ARSENAL & RELICS', 100, yPos);

      yPos += 35;
      gear.forEach((item) => {
        ctx.fillStyle = '#f5ede0';
        ctx.font = 'bold 17px serif';
        ctx.fillText(`• ${item.name} (${item.type})`, 100, yPos);

        ctx.fillStyle = '#a89f91';
        ctx.font = '15px serif';
        ctx.fillText(`— ${item.desc}`, 420, yPos);

        yPos += 34;
      });

      // Divider line
      yPos += 15;
      ctx.strokeStyle = 'rgba(212, 168, 75, 0.4)';
      ctx.beginPath();
      ctx.moveTo(150, yPos);
      ctx.lineTo(1050, yPos);
      ctx.stroke();

      // Section: Feats & Quests
      yPos += 45;
      ctx.fillStyle = '#d4a84b';
      ctx.font = 'bold 24px serif';
      ctx.fillText('🏆 FEATS OF VALOR', 100, yPos);

      yPos += 35;
      feats.forEach((feat) => {
        ctx.fillStyle = '#ffde7a';
        ctx.font = 'bold 17px serif';
        ctx.fillText(`✦ ${feat.title} · ${feat.event}`, 100, yPos);

        ctx.fillStyle = '#a89f91';
        ctx.font = '15px serif';
        ctx.fillText(feat.desc, 120, yPos + 22);

        yPos += 48;
      });

      // Footer Seal
      ctx.textAlign = 'center';
      ctx.fillStyle = '#c9a84c';
      ctx.font = 'italic 16px serif';
      ctx.fillText('"Forged with Valyrian Precision · Verified across Westeros & Silicon Valley"', 600, 1445);

      ctx.fillStyle = '#6e6559';
      ctx.font = '12px monospace';
      ctx.fillText('github.com/sarthakjalan05 · linkedin.com/in/sarthak-jalan-7685a7285', 600, 1475);

      // Trigger download
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'sarthak-jalan-character-sheet.png';
      link.href = dataUrl;
      link.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to generate canvas sheet', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div
      className="realm-page relative overflow-hidden"
      style={{ '--accent': accent } as React.CSSProperties}
    >
      {/* Atmospheric Background Layers */}
      <div className="realm-bg-texture" />
      <div className="realm-bg-vignette" />

      {/* Breadcrumb Bar */}
      <div className="relative z-10 max-w-4xl mx-auto mb-6 px-2 flex items-center justify-between">
        <Link
          to="/about"
          className="inline-flex items-center gap-2 font-cinzel text-xs uppercase tracking-widest text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors py-2"
        >
          <ArrowLeft size={14} />
          <span>Return to About</span>
        </Link>

        <button
          onClick={handleDownloadCanvas}
          disabled={downloading}
          className="got-cta-btn text-xs py-2 px-5 inline-flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(212,168,75,0.4)]"
          style={{ background: accent, color: '#000' }}
        >
          {downloadSuccess ? (
            <>
              <Check size={14} />
              <span>Parchment Exported!</span>
            </>
          ) : (
            <>
              <Download size={14} />
              <span>{downloading ? 'Engraving...' : 'Download Character Sheet (PNG)'}</span>
            </>
          )}
        </button>
      </div>

      <PageHeader
        sectionLabel="Character Codex"
        eyebrow="EASTER EGG · CODEX OF VALYRIA"
        title="RPG Character"
        titleEm="Sheet & Feats"
        motto="Forged in Code · Tempered by AI"
        subtitle='An RPG character sheet translating Sarthak&apos;s real-world skills, achievements, and technical arsenal into a Westerosi adventurer profile.'
        accent={accent}
        sigilRune="🛡"
      />

      {/* Main Character Sheet Card */}
      <div className="relative z-10 max-w-4xl mx-auto px-2 sm:px-4 mb-16">
        <div
          className="fade-up realm-card relative p-7 sm:p-12 border bg-[#0b0805]/95 backdrop-blur-sm shadow-[0_0_60px_rgba(0,0,0,0.9)]"
          style={{
            borderColor: 'rgba(212, 168, 75, 0.45)',
          }}
        >
          {/* Corner Ornaments */}
          <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

          {/* Profile Header Box */}
          <div className="border-b border-[var(--gold-dim)]/40 pb-8 mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div
                className="w-20 h-20 rounded-full border-2 flex items-center justify-center font-cinzel-dec text-3xl font-bold bg-[#140e08] shadow-[0_0_20px_rgba(212,168,75,0.4)]"
                style={{ borderColor: accent, color: accent }}
              >
                SJ
              </div>

              <div>
                <span className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--gold)] font-semibold">
                  CLASS: LEVEL 22 ARCHMAGE / SYSTEMS ARCHITECT
                </span>
                <h1 className="font-cinzel-dec text-2xl sm:text-3xl font-bold text-[var(--parchment)] my-1">
                  Sarthak Jalan
                </h1>
                <p className="font-garamond text-sm text-[var(--ash)]">
                  Affiliation: House Targaryen &amp; The Citadel · Origin: Vellore Institute of Technology
                </p>
              </div>
            </div>

            <button
              onClick={handleDownloadCanvas}
              disabled={downloading}
              className="got-cta-ghost text-xs py-2.5 px-4 inline-flex items-center gap-2 cursor-pointer self-stretch sm:self-auto justify-center"
            >
              <Download size={14} />
              <span>Export PNG</span>
            </button>
          </div>

          {/* Section: Core Attributes */}
          <div className="mb-10">
            <h2 className="font-cinzel-dec text-lg sm:text-xl font-bold text-[var(--parchment)] mb-4 flex items-center gap-2">
              <Swords size={18} className="text-[var(--gold)]" />
              <span>Core Attributes &amp; Combat Proficiency</span>
            </h2>

            <div className="space-y-5">
              {attributes.map((attr) => (
                <div key={attr.name}>
                  <div className="flex items-center justify-between text-xs sm:text-sm font-cinzel mb-1.5">
                    <span className="text-[var(--parchment)] font-semibold">{attr.name}</span>
                    <span className="text-[var(--gold)] font-bold">{attr.score} / 100</span>
                  </div>
                  {/* Visual Bar */}
                  <div className="w-full h-2 bg-[#1b140c] rounded-full overflow-hidden border border-[var(--gold-dim)]/30">
                    <div
                      className="h-full bg-gradient-to-r from-[#d4a84b] to-[#ffde7a] transition-all duration-1000"
                      style={{ width: `${attr.score}%` }}
                    />
                  </div>
                  <p className="font-garamond text-xs text-[var(--ash)] mt-1">{attr.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Equipped Arsenal */}
          <div className="mb-10 pt-8 border-t border-[var(--gold-dim)]/30">
            <h2 className="font-cinzel-dec text-lg sm:text-xl font-bold text-[var(--parchment)] mb-4 flex items-center gap-2">
              <Shield size={18} className="text-[var(--gold)]" />
              <span>Equipped Arsenal &amp; Relics</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gear.map((item) => (
                <div
                  key={item.name}
                  className="p-4 border border-[var(--gold-dim)]/25 bg-[#120d08]/80 rounded-sm"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-cinzel text-xs font-bold text-[var(--gold-light)]">
                      {item.name}
                    </h3>
                    <span className="font-cinzel text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-[#1f160e] text-[var(--gold-dim)] border border-[var(--gold-dim)]/20">
                      {item.type}
                    </span>
                  </div>
                  <p className="font-garamond text-xs text-[var(--ash)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Feats of Valor */}
          <div className="pt-8 border-t border-[var(--gold-dim)]/30">
            <h2 className="font-cinzel-dec text-lg sm:text-xl font-bold text-[var(--parchment)] mb-4 flex items-center gap-2">
              <Award size={18} className="text-[var(--gold)]" />
              <span>Feats of Valor &amp; Quests Vanquished</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {feats.map((feat) => (
                <div
                  key={feat.title}
                  className="p-4 border border-[var(--gold-dim)]/25 bg-[#120d08]/80 rounded-sm"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[var(--gold)] text-xs">✦</span>
                    <h3 className="font-cinzel text-xs font-bold text-[var(--parchment)]">
                      {feat.title}
                    </h3>
                  </div>
                  <p className="font-cinzel text-[10px] text-[var(--gold-dim)] uppercase tracking-wider mb-1">
                    {feat.event}
                  </p>
                  <p className="font-garamond text-xs text-[var(--ash)]">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Card Footer */}
          <div className="mt-10 pt-6 border-t border-[var(--gold-dim)]/30 text-center">
            <p className="font-garamond italic text-xs text-[var(--ash)]">
              &quot;A Lannister always ships on time, and dragons hatch from Sarthak&apos;s own fire.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
