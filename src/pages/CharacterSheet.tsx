import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import {
  Download,
  Shield,
  Award,
  ArrowLeft,
  Check,
  Zap,
  Cpu,
  Terminal,
} from 'lucide-react';

export const CharacterSheet: React.FC = () => {
  const accent = 'var(--cyan)';
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const attributes = [
    { name: 'System Architecture', score: 95, desc: 'Full-stack MERN, distributed services, Redis queues' },
    { name: 'Machine Learning & Affective AI', score: 96, desc: '60/40 multimodal acoustic-visual fusion' },
    { name: 'Predictive Model Precision', score: 99, desc: '98.78% accuracy on 1M+ row force predictions' },
    { name: 'Edge Inference & Quantization', score: 94, desc: 'Sub-115ms on-device INT8 TFLite classification' },
    { name: 'Algorithmic Problem Solving', score: 92, desc: 'LeetCode 1550+ contest rating, 400+ problems' },
    { name: 'Hackathon Execution & Speed', score: 94, desc: '1st Runner Up (400+ teams) & Flipkart Top 10%' },
  ];

  const gear = [
    { name: 'TypeScript & React Interface', type: 'Primary Stack', desc: 'React 19, TypeScript, state orchestration' },
    { name: 'TFLite Edge Core Engine', type: 'Neural Runtime', desc: '4.8MB quantized mobile neural network' },
    { name: 'Affective Acoustic Substrate', type: 'AI Pipeline', desc: 'SenseVoice, Deepgram, and Gemini integration' },
    { name: 'MERN Microservices Architecture', type: 'Backend Cluster', desc: 'Node.js, Express, MongoDB connection pooling' },
    { name: 'AWS Cloud Infrastructure', type: 'Deployment Node', desc: 'Cloud Practitioner, S3, EC2, automated workflows' },
  ];

  const feats = [
    { title: '1st Runner Up', event: 'Hack the Spring 2025', desc: 'Ranked #2 out of 400+ contending engineering teams' },
    { title: 'Top 10% National Rank', event: 'Flipkart GRiD 6.0', desc: 'Advanced to national semi-finals in HealthTech track' },
    { title: 'LeetCode Top 30%', event: 'Algorithmic Arena', desc: '1550+ contest rating with 400+ problems solved' },
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

      // Dark cyber background
      ctx.fillStyle = '#07080c';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cyan radial glow
      const grad = ctx.createRadialGradient(600, 350, 50, 600, 775, 850);
      grad.addColorStop(0, 'rgba(0, 240, 255, 0.12)');
      grad.addColorStop(1, 'rgba(7, 8, 12, 0.98)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cyan Outer Border
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 3;
      ctx.strokeRect(40, 40, 1120, 1470);

      // Inner Border
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
      ctx.lineWidth = 1;
      ctx.strokeRect(52, 52, 1096, 1446);

      // Corner HUD brackets
      const drawBracket = (x: number, y: number, size: number, dx: number, dy: number) => {
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x + dx * size, y);
        ctx.lineTo(x, y);
        ctx.lineTo(x, y + dy * size);
        ctx.stroke();
      };

      drawBracket(60, 60, 20, 1, 1);
      drawBracket(1140, 60, 20, -1, 1);
      drawBracket(60, 1490, 20, 1, -1);
      drawBracket(1140, 1490, 20, -1, -1);

      // Header Text
      ctx.fillStyle = '#00f0ff';
      ctx.font = 'bold 18px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('SYS://SYSTEM.CODEX · TELEMETRY SPECIFICATION', 600, 95);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 42px monospace';
      ctx.fillText('SARTHAK JALAN', 600, 150);

      ctx.fillStyle = '#00f0ff';
      ctx.font = 'bold 16px monospace';
      ctx.fillText('LEVEL 22 · SYSTEMS ARCHITECT & APPLIED AI ENGINEER', 600, 185);

      ctx.fillStyle = '#7d8fa9';
      ctx.font = '14px monospace';
      ctx.fillText('Origin: Vellore Institute of Technology · Substrate: Distributed Web & Edge AI', 600, 215);

      // Divider line
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.beginPath();
      ctx.moveTo(150, 240);
      ctx.lineTo(1050, 240);
      ctx.stroke();

      // Section: Core Attributes
      ctx.textAlign = 'left';
      ctx.fillStyle = '#00f0ff';
      ctx.font = 'bold 20px monospace';
      ctx.fillText('// CORE ATTRIBUTES & TELEMETRY', 100, 285);

      let yPos = 325;
      attributes.forEach((attr) => {
        ctx.fillStyle = '#e8f4ff';
        ctx.font = 'bold 16px monospace';
        ctx.fillText(attr.name, 100, yPos);

        ctx.fillStyle = '#00f0ff';
        ctx.font = 'bold 16px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`${attr.score}/100`, 1100, yPos);
        ctx.textAlign = 'left';

        // Stat bar background
        ctx.fillStyle = '#0d1017';
        ctx.fillRect(100, yPos + 10, 1000, 10);

        // Stat bar fill
        ctx.fillStyle = '#00f0ff';
        ctx.fillRect(100, yPos + 10, (1000 * attr.score) / 100, 10);

        ctx.fillStyle = '#7d8fa9';
        ctx.font = '13px monospace';
        ctx.fillText(attr.desc, 100, yPos + 35);

        yPos += 60;
      });

      // Divider line
      yPos += 15;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
      ctx.beginPath();
      ctx.moveTo(150, yPos);
      ctx.lineTo(1050, yPos);
      ctx.stroke();

      // Section: Equipped Stack
      yPos += 45;
      ctx.fillStyle = '#00f0ff';
      ctx.font = 'bold 20px monospace';
      ctx.fillText('// PRODUCTION TECH ARSENAL', 100, yPos);

      yPos += 35;
      gear.forEach((item) => {
        ctx.fillStyle = '#e8f4ff';
        ctx.font = 'bold 15px monospace';
        ctx.fillText(`• ${item.name} [${item.type}]`, 100, yPos);

        ctx.fillStyle = '#7d8fa9';
        ctx.font = '14px monospace';
        ctx.fillText(`— ${item.desc}`, 480, yPos);

        yPos += 34;
      });

      // Divider line
      yPos += 15;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
      ctx.beginPath();
      ctx.moveTo(150, yPos);
      ctx.lineTo(1050, yPos);
      ctx.stroke();

      // Section: Milestones & Benchmarks
      yPos += 45;
      ctx.fillStyle = '#00f0ff';
      ctx.font = 'bold 20px monospace';
      ctx.fillText('// SYSTEM BENCHMARKS & HONORS', 100, yPos);

      yPos += 35;
      feats.forEach((feat) => {
        ctx.fillStyle = '#ff2bd6';
        ctx.font = 'bold 15px monospace';
        ctx.fillText(`✦ ${feat.title} · ${feat.event}`, 100, yPos);

        ctx.fillStyle = '#7d8fa9';
        ctx.font = '13px monospace';
        ctx.fillText(feat.desc, 120, yPos + 22);

        yPos += 48;
      });

      // Footer Seal
      ctx.textAlign = 'center';
      ctx.fillStyle = '#00f0ff';
      ctx.font = '14px monospace';
      ctx.fillText('"Engineered for resilience · Scaled for real-world production constraints"', 600, 1445);

      ctx.fillStyle = '#7d8fa9';
      ctx.font = '12px monospace';
      ctx.fillText('github.com/sarthakjalan05 · linkedin.com/in/sarthak-jalan-7685a7285', 600, 1475);

      // Trigger download
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'sarthak-jalan-system-codex.png';
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
      {/* Background Grid & Vignette */}
      <div className="realm-bg-texture" />
      <div className="realm-bg-vignette" />

      {/* Breadcrumb Bar */}
      <div className="relative z-10 max-w-4xl mx-auto mb-6 px-4 flex items-center justify-between">
        <Link
          to="/about"
          className="inline-flex items-center gap-2 font-chakra text-xs uppercase tracking-wider text-[var(--cyan)] hover:text-white transition-colors py-2"
        >
          <ArrowLeft size={14} />
          <span>Return to About</span>
        </Link>

        <button
          onClick={handleDownloadCanvas}
          disabled={downloading}
          className="got-cta-btn text-xs py-2 px-5 inline-flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.3)] rounded font-chakra font-bold"
          style={{ background: 'var(--cyan)', color: '#07080c' }}
        >
          {downloadSuccess ? (
            <>
              <Check size={14} />
              <span>Dossier Exported!</span>
            </>
          ) : (
            <>
              <Download size={14} />
              <span>{downloading ? 'Rendering...' : 'Export Telemetry (PNG)'}</span>
            </>
          )}
        </button>
      </div>

      <PageHeader
        sectionLabel="SYSTEM CODEX"
        eyebrow="SYS://EASTER_EGG.ATTRIBUTES"
        title="System"
        titleEm="Codex & Telemetry"
        motto="Grounded in Engineering Metrics · Proven in Production"
        subtitle="A system specification sheet translating Sarthak's technical competencies, benchmark stats, and platform arsenal into an interactive dossier."
        accent={accent}
        sigilRune="//"
      />

      {/* Main Character Sheet Card */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 mb-16">
        <div
          className="fade-up realm-card relative p-6 sm:p-10 md:p-12 border border-[rgba(0,240,255,0.25)] bg-[#0d1017]/95 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.9)] rounded"
        >
          {/* Corner HUD Brackets */}
          <span className="corner corner-tl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-tr" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-bl" style={{ '--accent': accent } as React.CSSProperties} />
          <span className="corner corner-br" style={{ '--accent': accent } as React.CSSProperties} />

          {/* Profile Header Box */}
          <div className="border-b border-[rgba(0,240,255,0.15)] pb-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div
                className="w-16 h-16 rounded border-2 border-[var(--cyan)] flex items-center justify-center font-orbitron text-2xl font-bold bg-[#07080c] text-[var(--cyan)] shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              >
                SJ
              </div>

              <div>
                <span className="font-chakra text-[10px] uppercase tracking-wider text-[var(--cyan)] font-semibold">
                  CLASS: LEVEL 22 SYSTEMS ARCHITECT &amp; AI PRACTITIONER
                </span>
                <h1 className="font-orbitron text-2xl sm:text-3xl font-extrabold text-[var(--text)] my-1">
                  Sarthak Jalan
                </h1>
                <p className="font-space text-xs sm:text-sm text-[var(--text-muted)]">
                  Affiliation: Vellore Institute of Technology · Focus: Applied AI &amp; Cloud Systems
                </p>
              </div>
            </div>

            <button
              onClick={handleDownloadCanvas}
              disabled={downloading}
              className="cyber-ghost text-xs py-2 px-4 inline-flex items-center gap-2 cursor-pointer self-stretch sm:self-auto justify-center font-chakra font-semibold rounded"
              style={{ borderColor: 'rgba(0, 240, 255, 0.4)', color: 'var(--cyan)' }}
            >
              <Download size={14} />
              <span>Export PNG</span>
            </button>
          </div>

          {/* Section: Core Attributes */}
          <div className="mb-10">
            <h2 className="font-orbitron text-base sm:text-lg font-bold text-[var(--text)] mb-4 flex items-center gap-2">
              <Zap size={16} className="text-[var(--cyan)]" />
              <span>Core Telemetry &amp; Technical Attributes</span>
            </h2>

            <div className="space-y-4">
              {attributes.map((attr) => (
                <div key={attr.name}>
                  <div className="flex items-center justify-between text-xs sm:text-sm font-chakra mb-1">
                    <span className="text-[var(--text)] font-semibold">{attr.name}</span>
                    <span className="text-[var(--cyan)] font-bold">{attr.score} / 100</span>
                  </div>
                  {/* Visual Bar */}
                  <div className="w-full h-2 bg-[#07080c] rounded overflow-hidden border border-[rgba(0,240,255,0.2)]">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--cyan-dim)] to-[var(--cyan)] transition-all duration-1000 shadow-[0_0_8px_var(--cyan)]"
                      style={{ width: `${attr.score}%` }}
                    />
                  </div>
                  <p className="font-space text-xs text-[var(--text-muted)] mt-1">{attr.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Equipped Arsenal */}
          <div className="mb-10 pt-6 border-t border-[rgba(0,240,255,0.15)]">
            <h2 className="font-orbitron text-base sm:text-lg font-bold text-[var(--text)] mb-4 flex items-center gap-2">
              <Cpu size={16} className="text-[var(--cyan)]" />
              <span>Equipped Technology Arsenal</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gear.map((item) => (
                <div
                  key={item.name}
                  className="p-4 border border-[rgba(0,240,255,0.2)] bg-[#07080c]/80 rounded"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-chakra text-xs font-bold text-[var(--text)]">
                      {item.name}
                    </h3>
                    <span className="font-chakra text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-[#0d1017] text-[var(--cyan)] border border-[rgba(0,240,255,0.2)] rounded">
                      {item.type}
                    </span>
                  </div>
                  <p className="font-space text-xs text-[var(--text-muted)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Benchmarks & Honors */}
          <div className="pt-6 border-t border-[rgba(0,240,255,0.15)]">
            <h2 className="font-orbitron text-base sm:text-lg font-bold text-[var(--text)] mb-4 flex items-center gap-2">
              <Award size={16} className="text-[var(--magenta)]" />
              <span>System Milestones &amp; Benchmarks</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {feats.map((feat) => (
                <div
                  key={feat.title}
                  className="p-4 border border-[rgba(0,240,255,0.2)] bg-[#07080c]/80 rounded"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[var(--magenta)] text-xs">✦</span>
                    <h3 className="font-chakra text-xs font-bold text-[var(--text)]">
                      {feat.title}
                    </h3>
                  </div>
                  <p className="font-chakra text-[10px] text-[var(--cyan)] uppercase tracking-wider mb-1">
                    {feat.event}
                  </p>
                  <p className="font-space text-xs text-[var(--text-muted)]">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Card Footer */}
          <div className="mt-8 pt-4 border-t border-[rgba(0,240,255,0.15)] text-center">
            <p className="font-space text-xs text-[var(--text-muted)]">
              &quot;Engineered with sub-millisecond precision · Built for scale and verified in production.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
