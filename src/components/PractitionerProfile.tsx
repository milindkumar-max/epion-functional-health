import React from 'react';
import { ArrowRight, CheckCircle2, MapPin, Calendar, Clock, HeartHandshake } from 'lucide-react';
import { EDITORIAL_PHOTOS } from '../data/photography';

interface PractitionerProfileProps {
  onOpenBooking: () => void;
}

export const PractitionerProfile: React.FC<PractitionerProfileProps> = ({ onOpenBooking }) => {
  return (
    <section id="practitioner" className="py-20 lg:py-28 bg-[#FAF8F5] dark:bg-[#0C1811] border-b border-[#E8E2D8] dark:border-[#1E3326] transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs uppercase tracking-[0.2em] font-medium text-[#5F7065] dark:text-[#8FA597]">
            Practitioner & Clinical Story
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#163324] dark:text-[#FAF8F5] tracking-tight leading-[1.12]">
            Personalized guidance from a dedicated <br className="hidden sm:block" />
            <span className="italic font-normal text-[#2A4E38] dark:text-[#9EE2BA]">functional nutritionist.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#4E5B54] dark:text-[#C5D7CC] leading-relaxed pt-1">
            Epion is led by <strong>Milind Kumar</strong>, a functional nutritionist based in Bellandur, Bengaluru. Our practice is built on a simple foundation: listening deeply to your health timeline, exploring root physiological connections, and crafting actionable nutritional strategies that respect your life.
          </p>
        </div>

        {/* Practitioner Dossier: Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Authentic Portrait Photography & Practice Location (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xs overflow-hidden border border-[#E8E2D8] dark:border-[#1E3326] bg-[#FAF8F5] dark:bg-[#0E1A12] shadow-xs group relative">
              <div className="aspect-[4/5] relative overflow-hidden">
                <img
                  src="/assets/aistudio/Milind_hd_pic_81b3ea18.png"
                  alt="Milind Kumar, Functional Nutritionist at Epion Functional Health in Bellandur, Bengaluru"
                  className="w-full h-full object-cover object-[center_18%] filter contrast-[1.02] transition-transform duration-700 group-hover:scale-[1.01]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

                {/* Identification Overlay */}
                <div className="absolute bottom-5 left-5 right-5 text-[#FAF8F5]">
                  <div className="text-xs uppercase tracking-widest text-[#A3C8B1] font-medium">
                    Practitioner & Founder
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium leading-tight mt-1">
                    Milind Kumar
                  </h3>
                  <div className="text-xs text-[#D4E8DC] mt-1 font-normal">
                    Functional Nutritionist · Systems Biology & Metabolic Health
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#F8F5EE] dark:bg-[#13241A] border-t border-[#E8E2D8] dark:border-[#1E3326] flex items-center justify-between text-xs text-[#5F7065] dark:text-[#9FB7A8]">
                <span className="font-medium text-[#163324] dark:text-[#FAF8F5]">In-Clinic & Virtual Telehealth</span>
                <span>Bengaluru, Karnataka</span>
              </div>
            </div>

            {/* Practice Location Details */}
            <div className="p-5 bg-white dark:bg-[#0E1A12] border border-[#E8E2D8] dark:border-[#1E3326] rounded-xs space-y-2.5 text-xs text-[#4E5B54] dark:text-[#C5D7CC]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#163324] dark:text-[#FAF8F5]">
                <MapPin className="w-3.5 h-3.5 text-[#2A4E38] dark:text-[#86C19D]" />
                <span>Clinic Location</span>
              </div>
              <p className="font-medium text-[#163324] dark:text-[#FAF8F5]">
                Sarada Residency, Bellandur, Bengaluru - 560103
              </p>
              <p className="text-[#63716A] dark:text-[#889E91] leading-relaxed">
                Consultations are held in person at our Bellandur clinic, or worldwide via secure high-definition telehealth video.
              </p>
            </div>
          </div>

          {/* Right Column: Narrative, Philosophy & The Collaborative Journey (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* The Origin & Philosophy */}
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#5F7065] dark:text-[#8FA597] uppercase tracking-wider block">
                The Philosophy
              </span>
              <p className="font-serif text-xl sm:text-2xl text-[#163324] dark:text-[#FAF8F5] leading-snug">
                “Too often, people are told their lab tests are 'completely fine,' even while dealing with daily fatigue, chronic gut issues, or erratic energy.”
              </p>
              <p className="text-sm sm:text-base text-[#4E5B54] dark:text-[#C5D7CC] leading-relaxed">
                As a functional nutritionist, my commitment is to look deeper at the interconnected physiological systems that conventional, rushed appointments frequently miss. We investigate how your microbiome ecology, cellular energy production, blood sugar volatility, and daily stressors influence one another.
              </p>
              <p className="text-sm sm:text-base text-[#4E5B54] dark:text-[#C5D7CC] leading-relaxed">
                Rather than prescribing rigid, short-lived diets, we craft realistic nutritional strategies rooted in traditional food practices and validated by current scientific research.
              </p>
            </div>

            {/* How Traditional Wisdom, Science, and AI Work Together in Practice */}
            <div className="p-6 bg-[#F8F5EE] dark:bg-[#13241A] border-l-2 border-[#163324] dark:border-[#86C19D] rounded-xs space-y-3">
              <div className="text-xs uppercase tracking-wider font-semibold text-[#163324] dark:text-[#FAF8F5]">
                How We Integrate Wisdom, Science & AI Tools
              </div>
              <p className="text-xs sm:text-sm text-[#4E5B54] dark:text-[#C5D7CC] leading-relaxed">
                When you share your detailed health history, dietary logs, and prior lab reports, our AI-assisted tools help organize the complex timeline and highlight potential nutritional patterns. I then personally evaluate those insights against published physiological evidence and your lived circumstances to design a cohesive, compassionate plan.
              </p>
              <p className="text-xs text-[#63716A] dark:text-[#889E91] italic">
                AI supports the analytical synthesis; human clinician judgment, empathy, and evidence guide every recommendation.
              </p>
            </div>

            {/* The Consultation Experience */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#5F7065] dark:text-[#8FA597] uppercase tracking-wider block">
                What Working Together Looks Like
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#4E5B54] dark:text-[#C5D7CC]">
                <div className="p-4 bg-white dark:bg-[#0E1A12] border border-[#E8E2D8] dark:border-[#1E3326] rounded-xs space-y-1.5">
                  <span className="font-semibold text-[#163324] dark:text-[#FAF8F5] block">
                    75-Minute Initial Deep Dive
                  </span>
                  <p className="leading-relaxed text-[#5F7065] dark:text-[#9FB7A8]">
                    Sufficient time to explore your entire health timeline, symptom onset, food habits, and lifestyle factors without rushing.
                  </p>
                </div>

                <div className="p-4 bg-white dark:bg-[#0E1A12] border border-[#E8E2D8] dark:border-[#1E3326] rounded-xs space-y-1.5">
                  <span className="font-semibold text-[#163324] dark:text-[#FAF8F5] block">
                    Written Action Roadmap
                  </span>
                  <p className="leading-relaxed text-[#5F7065] dark:text-[#9FB7A8]">
                    Clear, individualized nutrition guidelines, meal structure, targeted food sources, and sustainable daily habits.
                  </p>
                </div>

                <div className="p-4 bg-white dark:bg-[#0E1A12] border border-[#E8E2D8] dark:border-[#1E3326] rounded-xs space-y-1.5">
                  <span className="font-semibold text-[#163324] dark:text-[#FAF8F5] block">
                    Collaboration with Doctors
                  </span>
                  <p className="leading-relaxed text-[#5F7065] dark:text-[#9FB7A8]">
                    We communicate transparently with your medical doctors and respect existing diagnoses, medication regimens, and treatments.
                  </p>
                </div>

                <div className="p-4 bg-white dark:bg-[#0E1A12] border border-[#E8E2D8] dark:border-[#1E3326] rounded-xs space-y-1.5">
                  <span className="font-semibold text-[#163324] dark:text-[#FAF8F5] block">
                    Ongoing Protocol Calibration
                  </span>
                  <p className="leading-relaxed text-[#5F7065] dark:text-[#9FB7A8]">
                    Focused follow-up sessions to track symptom resolution, calibrate adjustments, and maintain long-term compliance.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct CTA */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-[#5F7065] dark:text-[#9FB7A8]">
                Consultations available in Bellandur, Bengaluru & worldwide via telehealth.
              </span>
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 h-11 px-6 text-xs uppercase tracking-wider font-semibold text-[#FAF8F5] bg-[#163324] hover:bg-[#204532] transition-colors rounded-xs cursor-pointer shadow-xs whitespace-nowrap"
              >
                <span>Book a Consultation with Milind</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#86C19D]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
