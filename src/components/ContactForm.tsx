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

  // Validate fields with themed error copy
  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.name.trim()) {
      errs.name = 'Declare your name and house, traveler.';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Your moniker must be at least two runes long.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'The raven requires an address to carry your scroll.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'The raven could not find that address. Provide a valid email.';
    }

    if (!formData.message.trim()) {
      errs.message = 'The parchment cannot remain blank. Inscribe your message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'A raven flies not for fewer than ten characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    /**
     * ─── FORMSPREE / EMAILJS INTEGRATION POINT ──────────────────────────────
     * Currently runs a client-side mock flight with actual timeout.
     * To connect Formspree:
     *   Replace the endpoint URL below with your Formspree form ID:
     *   const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
     *     method: "POST",
     *     headers: { "Content-Type": "application/json" },
     *     body: JSON.stringify(formData)
     *   });
     *
     * Or for EmailJS:
     *   import emailjs from '@emailjs/browser';
     *   await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData, 'YOUR_PUBLIC_KEY');
     * ────────────────────────────────────────────────────────────────────────
     */
    try {
      // Simulated raven flight delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch {
      setErrors({
        message: 'The winds beyond the Wall were too fierce. Please try again.',
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
      <div className="relative p-8 md:p-12 border border-[#4a6380] bg-[#0d1117] text-center overflow-hidden">
        <span className="corner corner-tl" style={{ '--accent': '#8fafc4' } as React.CSSProperties} />
        <span className="corner corner-tr" style={{ '--accent': '#8fafc4' } as React.CSSProperties} />
        <span className="corner corner-bl" style={{ '--accent': '#8fafc4' } as React.CSSProperties} />
        <span className="corner corner-br" style={{ '--accent': '#8fafc4' } as React.CSSProperties} />

        <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-[#8fafc4] flex items-center justify-center bg-[#1a2332] text-[#8fafc4] shadow-[0_0_25px_rgba(143,175,196,0.3)]">
          <CheckCircle2 size={32} />
        </div>

        <h3 className="font-cinzel-dec text-2xl md:text-3xl text-[var(--parchment)] mb-3">
          Your Raven Has Taken Flight
        </h3>

        <div className="got-divider max-w-xs mx-auto mb-4">
          <div className="got-divider-line" style={{ background: 'linear-gradient(to right, transparent, #8fafc4)' }} />
          <div className="got-divider-diamond" style={{ background: '#8fafc4' }} />
          <div className="got-divider-line right" style={{ background: 'linear-gradient(to left, transparent, #8fafc4)' }} />
        </div>

        <p className="font-garamond text-base md:text-lg text-[var(--ash)] max-w-md mx-auto mb-8 leading-[1.75]">
          The scroll has been dispatched across the Seven Kingdoms to Winterfell. Sarthak will review your words and send a reply posthaste.
        </p>

        <button
          onClick={() => setIsSubmitted(false)}
          className="got-cta-ghost min-h-[44px]"
          style={{ borderColor: '#8fafc4', color: '#8fafc4' }}
        >
          Send Another Raven
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative p-6 sm:p-8 md:p-10 border-2 border-[#384f6b] bg-[#0c131d]/95 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.85)]"
    >
      <span className="corner corner-tl" style={{ '--accent': '#8fafc4' } as React.CSSProperties} />
      <span className="corner corner-tr" style={{ '--accent': '#8fafc4' } as React.CSSProperties} />
      <span className="corner corner-bl" style={{ '--accent': '#8fafc4' } as React.CSSProperties} />
      <span className="corner corner-br" style={{ '--accent': '#8fafc4' } as React.CSSProperties} />

      <div className="mb-8 text-center">
        <span className="font-cinzel text-xs tracking-[0.35em] text-[#8fafc4] uppercase block mb-1">
          Dispatch to Winterfell
        </span>
        <h3 className="font-cinzel-dec text-2xl sm:text-3xl text-[var(--parchment)] drop-shadow-[0_0_15px_rgba(245,241,232,0.15)]">
          Send a Raven
        </h3>
        <p className="font-garamond text-sm sm:text-base text-[#a2b5c7] mt-1.5 max-w-md mx-auto leading-relaxed">
          Inscribe your missive below. Your message is dispatched directly to Sarthak Jalan.
        </p>
      </div>

      {/* Name Field */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="contact-name"
            className="flex items-center gap-2 font-cinzel text-xs sm:text-sm uppercase tracking-wider text-[#e6f0fa] font-semibold"
          >
            <User size={16} className="text-[#8fafc4] shrink-0" />
            <span>Your Name &amp; House / Company</span>
            <span className="text-[#8fafc4] font-bold" title="Required">*</span>
          </label>
          <span className="font-garamond text-xs text-[#8ca4bd] italic">
            Required
          </span>
        </div>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Lord Eddard / Alex Vance (Stark Enterprises)"
          className={`w-full min-h-[48px] px-4 py-3 bg-[#131d2b] border-2 ${
            errors.name
              ? 'border-red-500 bg-red-950/20'
              : 'border-[#3b526d] hover:border-[#6787a8] hover:bg-[#162335] focus:border-[#a8cbe6] focus:bg-[#19283c] focus:shadow-[0_0_20px_rgba(168,203,230,0.35)] focus:ring-1 focus:ring-[#a8cbe6]'
          } rounded-none font-garamond text-base sm:text-lg text-[#f7f5f0] placeholder:text-[#95abc0] placeholder:opacity-100 focus:outline-none transition-all`}
        />
        {errors.name && (
          <p className="mt-2 flex items-center gap-1.5 text-xs sm:text-sm text-red-400 font-garamond">
            <AlertCircle size={15} className="shrink-0" />
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="contact-email"
            className="flex items-center gap-2 font-cinzel text-xs sm:text-sm uppercase tracking-wider text-[#e6f0fa] font-semibold"
          >
            <Mail size={16} className="text-[#8fafc4] shrink-0" />
            <span>Your Email Address (For Reply)</span>
            <span className="text-[#8fafc4] font-bold" title="Required">*</span>
          </label>
          <span className="font-garamond text-xs text-[#8ca4bd] italic">
            Where to send reply
          </span>
        </div>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. yourname@company.com or lord@realm.org"
          className={`w-full min-h-[48px] px-4 py-3 bg-[#131d2b] border-2 ${
            errors.email
              ? 'border-red-500 bg-red-950/20'
              : 'border-[#3b526d] hover:border-[#6787a8] hover:bg-[#162335] focus:border-[#a8cbe6] focus:bg-[#19283c] focus:shadow-[0_0_20px_rgba(168,203,230,0.35)] focus:ring-1 focus:ring-[#a8cbe6]'
          } rounded-none font-garamond text-base sm:text-lg text-[#f7f5f0] placeholder:text-[#95abc0] placeholder:opacity-100 focus:outline-none transition-all`}
        />
        {errors.email && (
          <p className="mt-2 flex items-center gap-1.5 text-xs sm:text-sm text-red-400 font-garamond">
            <AlertCircle size={15} className="shrink-0" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="mb-7">
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="contact-message"
            className="flex items-center gap-2 font-cinzel text-xs sm:text-sm uppercase tracking-wider text-[#e6f0fa] font-semibold"
          >
            <MessageSquare size={16} className="text-[#8fafc4] shrink-0" />
            <span>Your Message / Inscription</span>
            <span className="text-[#8fafc4] font-bold" title="Required">*</span>
          </label>
          <span className="font-garamond text-xs text-[#8ca4bd] italic">
            Inscribe your scroll
          </span>
        </div>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Inscribe your proposition, project collaboration, opportunity, or greeting..."
          className={`w-full px-4 py-3.5 bg-[#131d2b] border-2 ${
            errors.message
              ? 'border-red-500 bg-red-950/20'
              : 'border-[#3b526d] hover:border-[#6787a8] hover:bg-[#162335] focus:border-[#a8cbe6] focus:bg-[#19283c] focus:shadow-[0_0_20px_rgba(168,203,230,0.35)] focus:ring-1 focus:ring-[#a8cbe6]'
          } rounded-none font-garamond text-base sm:text-lg text-[#f7f5f0] placeholder:text-[#95abc0] placeholder:opacity-100 focus:outline-none transition-all resize-y leading-[1.7]`}
        />
        {errors.message && (
          <p className="mt-2 flex items-center gap-1.5 text-xs sm:text-sm text-red-400 font-garamond">
            <AlertCircle size={15} className="shrink-0" />
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="text-center pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="got-cta-btn w-full sm:w-auto min-h-[48px] px-8 text-sm sm:text-base font-semibold tracking-wider hover:shadow-[0_0_25px_rgba(143,175,196,0.45)] transition-all duration-300"
          style={{ background: '#8fafc4', color: '#050c14' }}
        >
          <Send size={16} />
          {isSubmitting ? 'The Raven Prepares Flight...' : 'Release The Raven'}
        </button>
      </div>
    </form>
  );
};
