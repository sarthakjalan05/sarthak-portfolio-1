import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, User, Mail, MessageSquare } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validate fields with clean technical error copy
  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.name.trim()) {
      errs.name = 'Please provide your name or organization identity.';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least two characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Please provide a valid contact email.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Format invalid. Please enter a valid email address.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please input your transmission message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Transmission body must contain at least 10 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Simulated uplink latency
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch {
      setErrors({
        message: 'Transmission network error. Please verify and retry.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="relative p-8 md:p-12 border border-[rgba(0,240,255,0.4)] bg-[#0d1017] text-center overflow-hidden rounded">
        <span className="corner corner-tl" style={{ '--accent': 'var(--cyan)' } as React.CSSProperties} />
        <span className="corner corner-tr" style={{ '--accent': 'var(--cyan)' } as React.CSSProperties} />
        <span className="corner corner-bl" style={{ '--accent': 'var(--cyan)' } as React.CSSProperties} />
        <span className="corner corner-br" style={{ '--accent': 'var(--cyan)' } as React.CSSProperties} />

        <div className="w-16 h-16 mx-auto mb-5 rounded border border-[var(--cyan)] flex items-center justify-center bg-[#07080c] text-[var(--cyan)] shadow-[0_0_25px_rgba(0,240,255,0.3)]">
          <CheckCircle2 size={32} />
        </div>

        <h3 className="font-orbitron text-xl md:text-2xl text-[var(--text)] mb-3 font-bold">
          Transmission Received
        </h3>

        <div className="flex items-center justify-center gap-3 max-w-xs mx-auto mb-4">
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-[var(--cyan)]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" />
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-[var(--cyan)]" />
        </div>

        <p className="font-space text-sm sm:text-base text-[var(--text-muted)] max-w-md mx-auto mb-8 leading-relaxed">
          Your transmission packet has been encrypted and delivered directly to Sarthak Jalan&apos;s communication terminal.
        </p>

        <button
          onClick={() => setIsSubmitted(false)}
          className="cyber-ghost min-h-[44px] px-6 py-2.5 text-xs font-chakra tracking-wider uppercase rounded"
          style={{ borderColor: 'var(--cyan)', color: 'var(--cyan)' }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative p-6 sm:p-8 md:p-10 border border-[rgba(0,240,255,0.3)] bg-[#0d1017]/95 backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.85)] rounded"
    >
      <span className="corner corner-tl" style={{ '--accent': 'var(--cyan)' } as React.CSSProperties} />
      <span className="corner corner-tr" style={{ '--accent': 'var(--cyan)' } as React.CSSProperties} />
      <span className="corner corner-bl" style={{ '--accent': 'var(--cyan)' } as React.CSSProperties} />
      <span className="corner corner-br" style={{ '--accent': 'var(--cyan)' } as React.CSSProperties} />

      <div className="mb-8 text-center">
        <span className="font-chakra text-xs tracking-[0.3em] text-[var(--cyan)] uppercase block mb-1 font-semibold">
          SYS://TRANSMISSION.DISPATCH
        </span>
        <h3 className="font-orbitron text-xl sm:text-2xl text-[var(--text)] font-bold">
          Send Message
        </h3>
        <p className="font-space text-xs sm:text-sm text-[var(--text-muted)] mt-1.5 max-w-md mx-auto leading-relaxed">
          Inscribe your message below. Dispatched directly to Sarthak Jalan.
        </p>
      </div>

      {/* Name Field */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="contact-name"
            className="flex items-center gap-2 font-chakra text-xs uppercase tracking-wider text-[var(--text)] font-semibold"
          >
            <User size={15} className="text-[var(--cyan)] shrink-0" />
            <span>Identity / Organization</span>
            <span className="text-[var(--cyan)] font-bold" title="Required">*</span>
          </label>
          <span className="font-space text-xs text-[var(--text-muted)]">
            Required
          </span>
        </div>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Elena Rostova (NeuralTech Corp)"
          className={`w-full min-h-[46px] px-4 py-2.5 bg-[#07080c] border ${
            errors.name
              ? 'border-red-500 bg-red-950/20'
              : 'border-[rgba(0,240,255,0.25)] hover:border-[var(--cyan-dim)] focus:border-[var(--cyan)] focus:ring-1 focus:ring-[var(--cyan)]'
          } rounded font-space text-sm text-[var(--text)] placeholder:text-[var(--text-muted)]/60 focus:outline-none transition-all`}
        />
        {errors.name && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400 font-space">
            <AlertCircle size={14} className="shrink-0" />
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="contact-email"
            className="flex items-center gap-2 font-chakra text-xs uppercase tracking-wider text-[var(--text)] font-semibold"
          >
            <Mail size={15} className="text-[var(--cyan)] shrink-0" />
            <span>Transmission Email</span>
            <span className="text-[var(--cyan)] font-bold" title="Required">*</span>
          </label>
          <span className="font-space text-xs text-[var(--text-muted)]">
            Required
          </span>
        </div>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. contact@domain.com"
          className={`w-full min-h-[46px] px-4 py-2.5 bg-[#07080c] border ${
            errors.email
              ? 'border-red-500 bg-red-950/20'
              : 'border-[rgba(0,240,255,0.25)] hover:border-[var(--cyan-dim)] focus:border-[var(--cyan)] focus:ring-1 focus:ring-[var(--cyan)]'
          } rounded font-space text-sm text-[var(--text)] placeholder:text-[var(--text-muted)]/60 focus:outline-none transition-all`}
        />
        {errors.email && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400 font-space">
            <AlertCircle size={14} className="shrink-0" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="contact-message"
            className="flex items-center gap-2 font-chakra text-xs uppercase tracking-wider text-[var(--text)] font-semibold"
          >
            <MessageSquare size={15} className="text-[var(--cyan)] shrink-0" />
            <span>Message Content</span>
            <span className="text-[var(--cyan)] font-bold" title="Required">*</span>
          </label>
          <span className="font-space text-xs text-[var(--text-muted)]">
            Min 10 chars
          </span>
        </div>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Detail technical requirements, opportunity specifications, or scheduling requests..."
          className={`w-full p-4 bg-[#07080c] border ${
            errors.message
              ? 'border-red-500 bg-red-950/20'
              : 'border-[rgba(0,240,255,0.25)] hover:border-[var(--cyan-dim)] focus:border-[var(--cyan)] focus:ring-1 focus:ring-[var(--cyan)]'
          } rounded font-space text-sm text-[var(--text)] placeholder:text-[var(--text-muted)]/60 focus:outline-none transition-all resize-none`}
        />
        {errors.message && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400 font-space">
            <AlertCircle size={14} className="shrink-0" />
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="got-cta-btn w-full justify-center min-h-[48px] text-xs font-chakra tracking-widest uppercase flex items-center gap-2.5 transition-all disabled:opacity-60"
        style={{ background: 'var(--cyan)', color: '#07080c' }}
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-[#07080c] border-t-transparent rounded-full animate-spin" />
            <span>ENCRYPTING &amp; DISPATCHING...</span>
          </>
        ) : (
          <>
            <Send size={15} />
            <span>DISPATCH TRANSMISSION</span>
          </>
        )}
      </button>
    </form>
  );
};
