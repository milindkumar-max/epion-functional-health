import React, { useState } from 'react';
import { PageView } from '../types';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { EDITORIAL_PHOTOS } from '../data/photography';

interface ApproachSectionProps {
  onNavigate: (page: PageView) => void;
  onOpenBooking: () => void;
}

interface ConnectedAxis {
  id: string;
  name: string;
  interactsWith: string;
  summary: string;
  evidenceFocus: string;
}

const SYSTEM_AXES: ConnectedAxis[] = [
  {
    id: 'gut-metabolism',
    name: 'Gut Microbiome & Metabolic Balance',
    interactsWith: 'Digestion ↔ Blood sugar regulation',
    summary: 'When dietary fiber is fermented by commensal microbes, it produces short-chain fatty acids (SCFAs) that trigger GLP-1 hormone release and improve peripheral insulin sensitivity.',
    evidenceFocus: 'Fiber diversity, postprandial glucose stability, and enterocyte health.',
  },
  {
    id: 'mitochondria-inflammation',
    name: 'Cellular Mitochondria & Inflammation',
    interactsWith: 'Cellular energy ↔ Immune response',
    summary: 'Persistent subclinical inflammation drains cellular energy by creating reactive oxygen species that impair electron transport chain efficiency, manifesting as afternoon brain fog and fatigue.',
    evidenceFocus: 'Antioxidant cofactors, omega-3 resolution, and micronutrient repletion.',
  },
  {
    id: 'stress-digestion',
    name: 'Stress Rhythms & Digestive Barrier',
    interactsWith: 'Neuroendocrine axis ↔ Mucosal permeability',
    summary: 'Elevated sympathetic tone shunts microvascular circulation away from the intestinal mucosa, suppressing digestive enzymes and increasing susceptibility to food reactivity.',
    evidenceFocus: 'Parasympathetic vagal activation, mindful meal timing, and adaptogenic herbs.',
  },
  {
    id: 'liver-hormones',
    name: 'Liver Function & Hormone Clearance',
    interactsWith: 'Hepatic biotransformation ↔ Endocrine health',
    summary: 'Sluggish liver Phase II glucuronidation delays the safe clearance of circulating estrogen and environmental metabolites, leading to cyclical discomfort and lethargy.',
    evidenceFocus: 'Cruciferous sulforaphane, glycine conjugation, and clean hydration.',
  },
];

export const ApproachSection: React.FC<ApproachSectionProps> = ({ onNavigate, onOpenBooking }) => {
  const [activeAxisId, setActiveAxisId] = useState(SYSTEM_AXES[0].id);
  const activeAxis = SYSTEM_AXES.find((a) => a.id === activeAxisId) || SYSTEM_AXES[0];

  return (
    <section id="philosophy" className="py-20 lg:py-28 bg-[#FAF8F5] dark:bg-[#0C1811] border-b border-[#E8E2D8] dark:border-[#1E3326] transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs uppercase tracking-[0.2em] font-medium text-[#5F7065] dark:text-[#8FA597]">
            Systems Biology Approach
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#163324] dark:text-[#FAF8F5] tracking-tight leading-[1.12]">
            Your health is an interconnected system.
          </h2>
          <p className="text-base sm:text-lg text-[#4E5B54] dark:text-[#C5D7CC] leading-relaxed pt-1">
            In conventional models, symptoms are often treated in isolation. Functional nutrition recognizes that digestion, metabolism, inflammation, sleep, stress, and cellular energy continuously influence one another. When we support the underlying biological systems, the whole body responds.
          </p>
        </div>

        {/* Editorial Two-Column System Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Interactive Crosstalk Explorer */}
          <div className="lg:col-span-7 space-y-5">
            <div className="text-xs font-mono text-[#5F7065] dark:text-[#8FA597] uppercase tracking-wider pb-2 border-b border-[#E8E2D8] dark:border-[#1E3326]">
              Interconnected physiological axes
            </div>

            <div className="space-y-3">
              {SYSTEM_AXES.map((axis) => {
                const isSelected = axis.id === activeAxis.id;
                return (
                  <div
                    key={axis.id}
                    onClick={() => setActiveAxisId(axis.id)}
                    className={`p-6 border transition-all duration-200 cursor-pointer rounded-xs text-left ${
                      isSelected
                        ? 'bg-white dark:bg-[#0E1A12] border-[#163324] dark:border-[#86C19D] shadow-xs'
                        : 'bg-[#FAF8F5] dark:bg-[#0C1811] border-[#E8E2D8] dark:border-[#1E3326] hover:border-[#B4C2BA] hover:bg-white dark:hover:bg-[#112016]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className={`font-serif text-lg sm:text-xl font-normal ${
                        isSelected ? 'text-[#163324] dark:text-[#FAF8F5]' : 'text-[#3B4840] dark:text-[#C5D7CC]'
                      }`}>
                        {axis.name}
                      </h3>
                      <span className="text-xs text-[#5F7065] dark:text-[#8FA597] shrink-0 font-normal">
                        {axis.interactsWith}
                      </span>
                    </div>

                    <p className="text-sm text-[#4E5B54] dark:text-[#C5D7CC] mt-2.5 leading-relaxed">
                      {axis.summary}
                    </p>

                    {isSelected && (
                      <div className="mt-4 pt-4 border-t border-[#F0ECE4] dark:border-[#1E3326] text-xs text-[#2A4E38] dark:text-[#9EE2BA] flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2A4E38] dark:text-[#86C19D] shrink-0" />
                        <span>Clinical focus: {axis.evidenceFocus}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Editorial Visual & Clinical Context */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xs overflow-hidden border border-[#E8E2D8] dark:border-[#1E3326] bg-white dark:bg-[#0E1A12] shadow-xs">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={EDITORIAL_PHOTOS.heroBotanicalMacro}
                  alt="Nutrient-dense whole botanical foods and seeds photographed in natural daylight"
                  className="w-full h-full object-cover filter contrast-[1.02]"
                  loading="lazy"
                />
              </div>
              <div className="p-6 bg-white dark:bg-[#0E1A12] space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[#5F7065] dark:text-[#8FA597]">
                  Whole-system nutrition
                </div>
                <div className="font-serif text-xl text-[#163324] dark:text-[#FAF8F5] font-normal leading-snug">
                  Food as biological information, not merely calories.
                </div>
                <p className="text-xs sm:text-sm text-[#4E5B54] dark:text-[#C5D7CC] leading-relaxed pt-1">
                  Every meal delivers signaling molecules—polyphenols, fatty acids, amino acids, and fibers—that talk directly to your gut bacteria, cell membranes, and metabolic enzymes.
                </p>
              </div>
            </div>

            {/* Respectful Healthcare Contrast Note */}
            <div className="p-6 bg-[#F8F5EE] dark:bg-[#13241A] border border-[#E8E2D8] dark:border-[#1E3326] rounded-xs space-y-3">
              <div className="text-xs font-semibold text-[#163324] dark:text-[#FAF8F5]">
                Collaborative Clinical Care
              </div>
              <p className="text-xs sm:text-sm text-[#4E5B54] dark:text-[#C5D7CC] leading-relaxed">
                Functional nutrition does not replace emergency or acute medical care. Instead, we work collaboratively alongside your physician, addressing upstream lifestyle and dietary factors that support long-term physiological resilience.
              </p>
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#163324] dark:text-[#FAF8F5] hover:text-[#2A4E38] hover:underline pt-1 cursor-pointer"
              >
                <span>Learn how an intake works</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
