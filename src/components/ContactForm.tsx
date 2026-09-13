import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

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

        <p className="font-fell italic text-base md:text-lg text-[var(--ash)] max-w-md mx-auto mb-8">
          The scroll has been dispatched across the Seven Kingdoms to Winterfell. Sarthak will review your words and send a reply posthaste.
        </p>

        <button
          onClick={() => setIsSubmitted(false)}
          className="got-cta-ghost"
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
      className="relative p-6 md:p-10 border border-[#38485e] bg-[#0a0f16]/90 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.8)]"
    >
      <span className="corner corner-tl" style={{ '--accent': '#8fafc4' } as React.CSSProperties} />
      <span className="corner corner-tr" style={{ '--accent': '#8fafc4' } as React.CSSProperties} />
      <span className="corner corner-bl" style={{ '--accent': '#8fafc4' } as React.CSSProperties} />
      <span className="corner corner-br" style={{ '--accent': '#8fafc4' } as React.CSSProperties} />

      <div className="mb-6 text-center">
        <span className="font-cinzel text-xs tracking-[0.35em] text-[#8fafc4] uppercase block mb-1">
          Dispatch to Winterfell
        </span>
        <h3 className="font-cinzel-dec text-xl md:text-2xl text-[var(--parchment)]">
          Send a Raven
        </h3>
      </div>

      {/* Name Field */}
      <div className="mb-5">
        <label
          htmlFor="contact-name"
          className="block font-cinzel text-xs uppercase tracking-widest text-[#8fafc4] mb-2"
        >
          Your Name & House
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Lord Eddard of Winterfell"
          className={`w-full px-4 py-3 bg-[#0d131c] border ${
            errors.name ? 'border-red-600' : 'border-[#2d3a4d] focus:border-[#8fafc4]'
          } rounded-none font-fell text-[var(--parchment)] placeholder-[#5d6878] focus:outline-none transition-colors`}
        />
        {errors.name && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400 font-fell italic">
            <AlertCircle size={14} className="shrink-0" />
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="mb-5">
        <label
          htmlFor="contact-email"
          className="block font-cinzel text-xs uppercase tracking-widest text-[#8fafc4] mb-2"
        >
          Raven Destination (Email Address)
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. raven@winterfell.realm"
          className={`w-full px-4 py-3 bg-[#0d131c] border ${
            errors.email ? 'border-red-600' : 'border-[#2d3a4d] focus:border-[#8fafc4]'
          } rounded-none font-fell text-[var(--parchment)] placeholder-[#5d6878] focus:outline-none transition-colors`}
        />
        {errors.email && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400 font-fell italic">
            <AlertCircle size={14} className="shrink-0" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="mb-6">
        <label
          htmlFor="contact-message"
          className="block font-cinzel text-xs uppercase tracking-widest text-[#8fafc4] mb-2"
        >
          The Inscription (Message)
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Inscribe your proposition, alliance, or greeting..."
          className={`w-full px-4 py-3 bg-[#0d131c] border ${
            errors.message ? 'border-red-600' : 'border-[#2d3a4d] focus:border-[#8fafc4]'
          } rounded-none font-fell text-[var(--parchment)] placeholder-[#5d6878] focus:outline-none transition-colors resize-y`}
        />
        {errors.message && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400 font-fell italic">
            <AlertCircle size={14} className="shrink-0" />
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="text-center pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="got-cta-btn w-full sm:w-auto"
          style={{ background: '#8fafc4', color: '#050403' }}
        >
          <Send size={14} />
          {isSubmitting ? 'The Raven Prepares Flight...' : 'Release The Raven'}
        </button>
      </div>
    </form>
  );
};
