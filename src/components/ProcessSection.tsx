import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProcessSectionProps {
  onOpenBooking: () => void;
}

const FIVE_STAGES = [
  {
    number: '01',
    title: 'Understand',
    headline: 'Individual goals, health history, and daily lifestyle',
    summary: 'Every journey begins with listening. We map your chronological health timeline—from early life events and environmental exposures to daily work schedules, sleep patterns, stress rhythms, and personal food relationships.',
    deliverables: [
      'Comprehensive chronological milestone review',
      'Daily circadian and lifestyle rhythm audit',
      'Personal food tolerance and preference mapping',
    ],
  },
  {
    number: '02',
    title: 'Review',
    headline: 'Nutritional status and relevant clinical information',
    summary: 'We examine your past laboratory bloodwork, recent biomarker trends, digestive patterns, and current dietary intake. We identify functional micronutrient insufficiencies and evaluate markers through optimal wellness reference ranges.',
    deliverables: [
      'Review of existing primary physician lab panels',
      'Dietary macro and micronutrient sufficiency analysis',
      'Identification of enzyme cofactors and metabolic gaps',
    ],
  },
  {
    number: '03',
    title: 'Explore',
    headline: 'Physiological connections and systems crosstalk',
    summary: 'Rather than treating symptoms as unrelated problems, we explore how your body systems interact. We investigate how gut permeability may influence joint comfort, how insulin volatility impacts energy, or how liver clearance affects skin vitality.',
    deliverables: [
      'Systems biology feedback loop analysis',
      'Gut-liver-brain signaling axis mapping',
      'Identification of upstream metabolic drivers',
    ],
  },
  {
    number: '04',
    title: 'Develop',
    headline: 'An individualized, sustainable nutrition strategy',
    summary: 'We co-create a personalized nutritional protocol designed for your actual everyday life in Bangalore or wherever you reside. We focus on nutrient-dense whole foods, meal sequencing, culinary ease, and targeted botanical cofactors.',
    deliverables: [
      'Tailored whole-food plate architecture',
      'Chrononutrition and meal-timing framework',
      'Practical procurement and cooking workflows',
    ],
  },
  {
    number: '05',
    title: 'Adjust',
    headline: 'Review progress and refine care over time',
    summary: 'Human physiology is dynamic. As energy returns, digestion calms, and metabolic markers shift, we meet to evaluate your progress, re-examine biomarkers, and adjust your protocol to foster long-term self-sustaining vitality.',
    deliverables: [
      'Follow-up milestone check-ins',
      'Biomarker and symptom progression tracking',
      'Long-term maintenance and dietary flexibility plan',
    ],
  },
];

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenBooking }) => {
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const activeStage = FIVE_STAGES[activeStageIdx];

  return (
    <section id="approach" className="py-20 lg:py-28 bg-[#F5F2EB] dark:bg-[#0E1A12] border-b border-[#E8E2D8] dark:border-[#1E3326] transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs uppercase tracking-[0.2em] font-medium text-[#5F7065] dark:text-[#8FA597]">
            Care Journey
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#163324] dark:text-[#FAF8F5] tracking-tight leading-[1.12]">
            How the approach works.
          </h2>
          <p className="text-base sm:text-lg text-[#4E5B54] dark:text-[#C5D7CC] leading-relaxed pt-1">
            Personalized functional nutrition is a structured, collaborative inquiry. We guide you through five clear stages to uncover root causes and build enduring metabolic health without dogmatic diets or unsustainable restrictions.
          </p>
        </div>

        {/* 5-Stage Step Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {FIVE_STAGES.map((stage, idx) => {
            const isActive = idx === activeStageIdx;
            return (
              <button
                key={stage.number}
                onClick={() => setActiveStageIdx(idx)}
                className={`p-5 text-left border rounded-xs transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#163324] text-[#FAF8F5] border-[#163324] shadow-xs'
                    : 'bg-white dark:bg-[#0B150F] text-[#3B4840] dark:text-[#C5D7CC] border-[#E2DDD5] dark:border-[#1E3326] hover:border-[#B4C2BA] hover:bg-[#FAF8F5] dark:hover:bg-[#13241A]'
                }`}
              >
                <div className={`text-xs font-mono font-medium mb-1.5 ${
                  isActive ? 'text-[#A3C8B1]' : 'text-[#7B8B82] dark:text-[#8FA597]'
                }`}>
                  Stage {stage.number}
                </div>
                <div className="font-serif text-base font-normal leading-snug">
                  {stage.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown */}
        <div className="bg-white dark:bg-[#0B150F] border border-[#E2DDD5] dark:border-[#1E3326] rounded-xs p-8 lg:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Stage Overview (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono text-[#5F7065] dark:text-[#8FA597] uppercase tracking-wider block">
                Stage {activeStage.number} Objective
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#163324] dark:text-[#FAF8F5] leading-snug">
                {activeStage.headline}
              </h3>
              <p className="text-sm sm:text-base text-[#4E5B54] dark:text-[#C5D7CC] leading-relaxed pt-1">
                {activeStage.summary}
              </p>

              <div className="pt-4 border-t border-[#F0ECE4] dark:border-[#1E3326]">
                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-2 h-11 px-6 text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] bg-[#163324] hover:bg-[#204532] transition-colors rounded-xs cursor-pointer shadow-xs"
                >
                  <span>Begin with an Intake</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#86C19D]" />
                </button>
              </div>
            </div>

            {/* Right Column: Key Deliverables (5 cols) */}
            <div className="lg:col-span-5 p-6 bg-[#FAF8F5] dark:bg-[#13241A] border border-[#E8E2D8] dark:border-[#1E3326] rounded-xs space-y-3">
              <div className="text-xs font-semibold text-[#163324] dark:text-[#FAF8F5]">
                Key Clinical Outcomes
              </div>
              <ul className="space-y-2 text-xs text-[#4E5B54] dark:text-[#C5D7CC]">
                {activeStage.deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2A4E38] dark:text-[#86C19D] shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
