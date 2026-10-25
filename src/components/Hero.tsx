import React from 'react';
import { PageView } from '../types';
import { ArrowRight, Compass, Sparkles, BookOpen, Dna, Cpu } from 'lucide-react';

interface HeroProps {
  onNavigate: (page: PageView) => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenBooking }) => {
  const scrollToApproach = () => {
    const el = document.getElementById('tradition-and-science');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('approach');
    }
  };

  return (
    <section className="relative bg-[#FAF8F5] dark:bg-[#0C1811] border-b border-[#E8E2D8] dark:border-[#1E3326] overflow-hidden">
      
      {/* 
        Unified, Immersive Photographic Backdrop:
        The whole-food photograph is seamlessly integrated into the warm ivory environment
        using soft organic edge feathering on desktop, eliminating any split-panel box look.
      */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Right-anchored cinematic image extending across the canvas */}
        <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[62%] xl:w-[58%] h-full opacity-90 lg:opacity-100">
          <img
            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=2200&q=90"
            alt="Vibrant artfully composed functional whole foods: ripe avocado, citrus, heirloom tomatoes, chickpeas, leafy herbs, seeds, and spices"
            className="w-full h-full object-cover object-[center_30%] filter contrast-[1.04] saturate-[1.12]"
            loading="eager"
          />

          {/* 
            Seamless atmospheric blend:
            On desktop, a smooth, multi-stop gradient dissolves the photo into the warm ivory `#FAF8F5` canvas
            from the left without any vertical boundary or harsh edges.
          */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/65 to-transparent w-[55%] dark:from-[#0C1811] dark:via-[#0C1811]/65" />
          
          {/* Subtle top/bottom feathering to meld with header and page canvas */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent dark:from-[#0C1811] dark:via-[#0C1811]/80" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/90 to-transparent dark:from-[#0C1811] dark:via-[#0C1811]/90" />
        </div>

        {/* Mobile atmospheric overlay so text remains 100% legible against image backdrop */}
        <div className="block lg:hidden absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-[#FAF8F5]/90 to-[#FAF8F5]/95 dark:from-[#0C1811] dark:via-[#0C1811]/90 dark:to-[#0C1811]/95" />
      </div>

      {/* Hero Content Stage */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-20 lg:py-28 min-h-[78vh] lg:min-h-[85vh] flex flex-col justify-center">
        <div className="max-w-2xl xl:max-w-[640px] space-y-7">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs uppercase tracking-[0.24em] font-semibold text-[#2D5A3E] dark:text-[#86C19D]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 dark:bg-emerald-400"></span>
            <span>FUNCTIONAL NUTRITION · TRADITIONAL WISDOM · AI-ASSISTED INSIGHT</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2.5">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[62px] font-normal text-[#163324] dark:text-[#FAF8F5] leading-[1.08] tracking-tight">
              Understand your health.
            </h1>
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[46px] font-normal italic text-[#2A4E38] dark:text-[#9EE2BA] leading-[1.12] tracking-tight">
              Nourish the whole system.
            </p>
          </div>

          {/* Highlighted Phrase */}
          <div className="pt-0.5">
            <span className="font-serif text-lg sm:text-xl text-[#1E3E2B] dark:text-[#D4E8DC] font-medium tracking-tight">
              Traditional wisdom. Modern science. Personalised nutrition.
            </span>
          </div>

          {/* Body Copy */}
          <p className="text-base sm:text-[17px] text-[#3E4C43] dark:text-[#D1E0D7] leading-relaxed font-normal">
            Explore how nutrition, gut health, metabolism, lifestyle, and your individual health history connect. Epion brings traditional health knowledge together with modern scientific evidence and AI-assisted analysis to help inform a more personalised approach to nutrition and wellbeing.
          </p>

          {/* Calls to Action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2.5 h-12 px-8 text-xs font-semibold uppercase tracking-[0.14em] text-[#FAF8F5] bg-[#163324] hover:bg-[#204532] active:scale-[0.99] transition-all rounded-xs shadow-sm hover:shadow-md cursor-pointer"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-4 h-4 text-[#86C19D]" />
            </button>

            <button
              onClick={scrollToApproach}
              className="inline-flex items-center justify-center gap-2 h-12 px-7 text-xs font-semibold uppercase tracking-[0.14em] text-[#163324] dark:text-[#FAF8F5] bg-white/90 hover:bg-white dark:bg-[#13241A]/90 dark:hover:bg-[#193123] border border-[#CCD8D0] dark:border-[#223F2E] active:scale-[0.99] transition-all rounded-xs shadow-2xs cursor-pointer backdrop-blur-xs"
            >
              <Compass className="w-4 h-4 text-[#2A4E38] dark:text-[#86C19D]" />
              <span>Explore Our Approach</span>
            </button>
          </div>

          {/* Understated Trust Line */}
          <div className="pt-2 text-xs text-[#526458] dark:text-[#9FB7A8] font-medium">
            <p>
              Personalised nutrition <span className="text-[#889E91] mx-1.5">·</span> Evidence-informed guidance <span className="text-[#889E91] mx-1.5">·</span> In-clinic in Bengaluru & virtual consultations
            </p>
          </div>

          {/* 
            Subtle Tri-Pillar Harmony Bar:
            Visually communicates the synergy of Traditional Knowledge, Modern Science, and AI-Assisted Insight
          */}
          <div className="pt-6 border-t border-[#E8E2D8] dark:border-[#1E3326] grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#163324] dark:text-[#FAF8F5]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B7A54]" />
                <span className="font-serif text-sm">Traditional Knowledge</span>
              </div>
              <p className="text-xs text-[#5F7065] dark:text-[#8FA597] leading-relaxed">
                Time-honored culinary heritage & restorative whole foods
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#163324] dark:text-[#FAF8F5]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#205C38]" />
                <span className="font-serif text-sm">Modern Science</span>
              </div>
              <p className="text-xs text-[#5F7065] dark:text-[#8FA597] leading-relaxed">
                Systems biology, physiology & peer-reviewed research
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#163324] dark:text-[#FAF8F5]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#163324]" />
                <span className="font-serif text-sm">AI-Assisted Insight</span>
              </div>
              <p className="text-xs text-[#5F7065] dark:text-[#8FA597] leading-relaxed">
                Structured information & individual pattern exploration
              </p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
