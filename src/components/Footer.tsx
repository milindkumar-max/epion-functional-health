import React, { useState } from 'react';
import { PageView } from '../types';
import { ArrowRight, CheckCircle2, ShieldCheck, Mail, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenBooking: () => void;
  onOpenLegal: (type: 'disclaimer' | 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking, onOpenLegal }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError('');
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#12241A] text-[#FAF8F5] pt-20 pb-12 border-t border-[#1C3627]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        
        {/* Pre-Footer Call to Action Block */}
        <div className="bg-[#1B382B] rounded-2xl p-8 sm:p-12 border border-[#2B4E3B] flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <div className="text-xs uppercase tracking-[0.2em] font-medium text-[#86C19D]">
              Personalized Functional Care
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF8F5] font-normal leading-tight">
              Take a more informed approach to your health.
            </h3>
            <p className="text-sm text-[#B7D7C3] leading-relaxed pt-1">
              Explore evidence-informed nutrition education, investigate your metabolic pathways, or schedule a clinical systems intake with Milind Kumar in Bellandur, Bangalore.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-7 py-4 text-xs font-semibold uppercase tracking-wider text-[#163324] bg-[#FAF8F5] hover:bg-white rounded-xs transition-colors whitespace-nowrap shadow-sm cursor-pointer"
            >
              Book a Consultation
            </button>
            <button
              onClick={() => {
                onNavigate('science');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-7 py-4 text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] bg-transparent border border-[#4A6E59] hover:bg-[#204532] rounded-xs transition-colors whitespace-nowrap cursor-pointer"
            >
              Explore Educational Resources
            </button>
          </div>
        </div>

        {/* Main Footer Links & Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pt-8 border-t border-[#1E3B2C]">
          
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="font-serif text-2xl font-semibold tracking-tight text-[#FAF8F5]">
              Epion Functional Health
            </div>
            <p className="text-xs text-[#98AE9F] leading-relaxed max-w-sm">
              An evidence-informed functional nutrition and integrative medicine platform exploring systems biology, gastrointestinal ecology, cellular bioenergetics, and metabolic optimization.
            </p>
            <div className="text-xs text-[#8EA898] space-y-1 font-mono">
              <p className="text-[#C5DED0] font-semibold">Milind Kumar · Functional Nutritionist</p>
              <p>Sarada Residency, Bellandur, Bangalore - 560103</p>
              <p>Consultations: In-Clinic & Telehealth</p>
            </div>
          </div>

          {/* Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#86C19D]">
              Navigation
            </div>
            <ul className="space-y-2 text-xs text-[#B7D7C3]">
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('practitioner');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Milind
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('health-areas');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Areas of Focus
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('science');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Science and Resources
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('pricing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Consultations and Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-white transition-colors cursor-pointer font-medium text-[#86C19D]"
                >
                  Book an Appointment
                </button>
              </li>
            </ul>
          </div>

          {/* Health Domains (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#86C19D]">
              Physiological Domains
            </div>
            <ul className="space-y-2 text-xs text-[#B7D7C3]">
              <li>
                <button
                  onClick={() => {
                    onNavigate('health-areas');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Gut Health & Microbiome
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('health-areas');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Metabolic Health & Glycemia
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('health-areas');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Phase I & II Biotransformation
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('health-areas');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Mitochondrial Bioenergetics
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('health-areas');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Nutrigenomics & Polymorphisms
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter & Subscriptions (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-[#86C19D]">
              Biochemical Dispatches
            </div>
            <p className="text-xs text-[#98AE9F] leading-relaxed">
              Bi-weekly summaries of emerging peer-reviewed nutrition science, metabolic pathways, and evidence-informed living.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-lg bg-[#1B382B] border border-[#2B4E3B] text-xs text-[#B7D7C3] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#86C19D] shrink-0" />
                <span>Thank you. You are subscribed to our research dispatches.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full px-3 py-2 bg-[#1B382B] border border-[#2B4E3B] rounded-l-md text-xs text-[#FAF8F5] placeholder-[#7A9382] focus:outline-none focus:ring-1 focus:ring-[#86C19D]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#FAF8F5] text-[#163324] hover:bg-white rounded-r-md text-xs font-semibold shrink-0 transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
                {newsletterError && (
                  <p className="text-[11px] text-[#F87171]">{newsletterError}</p>
                )}
                <p className="text-[10px] text-[#7A9382]">
                  No spam or marketing promotions. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>

        </div>

        {/* Legal Disclaimer & Bottom Copyright Bar */}
        <div className="pt-8 border-t border-[#1E3B2C] space-y-6">
          {/* Medical Disclaimer Banner */}
          <div className="p-4 rounded-xl bg-[#172D20] border border-[#22402E] text-[11px] text-[#8EA696] leading-relaxed">
            <span className="font-semibold text-[#B7D7C3] block mb-1">
              Medical & Health Disclaimer
            </span>
            The educational information provided on this platform is for instructional and research synthesis purposes only. It is not intended to substitute for clinical medical evaluation, diagnosis, or pharmacotherapy by a licensed medical physician. Individual physiological responses vary. Always consult your qualified healthcare practitioner prior to adopting therapeutic dietary strategies or nutritional supplements.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A9382]">
            <div>
              © {new Date().getFullYear()} Epion Functional Health. All rights reserved.
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={() => onOpenLegal('disclaimer')}
                className="hover:text-white transition-colors"
              >
                Medical Disclaimer
              </button>
              <button
                onClick={() => onOpenLegal('privacy')}
                className="hover:text-white transition-colors"
              >
                Privacy Notice
              </button>
              <button
                onClick={() => onOpenLegal('terms')}
                className="hover:text-white transition-colors"
              >
                Terms of Use
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
