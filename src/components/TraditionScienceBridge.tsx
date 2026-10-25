import React from 'react';
import { PageView } from '../types';
import { ArrowRight, Compass } from 'lucide-react';

interface TraditionScienceBridgeProps {
  onNavigate: (page: PageView) => void;
  onOpenBooking: () => void;
}

export const TraditionScienceBridge: React.FC<TraditionScienceBridgeProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  return (
    <section id="tradition-and-science" className="py-20 lg:py-28 bg-[#F6F3EC] dark:bg-[#0B150F] border-b border-[#E8E2D8] dark:border-[#1E3326] transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs uppercase tracking-[0.2em] font-medium text-[#5F7065] dark:text-[#8FA597]">
            Clinical Philosophy
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#163324] dark:text-[#FAF8F5] tracking-tight leading-[1.14]">
            Where traditional wisdom meets <br className="hidden sm:block" />
            <span className="italic font-normal text-[#2A4E38] dark:text-[#9EE2BA]">modern health science.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#4E5B54] dark:text-[#C5D7CC] leading-relaxed pt-1">
            Human wellbeing is neither purely ancestral nor entirely reducible to laboratory metrics. We bring together time-tested food traditions, current scientific research, and thoughtful pattern analysis to create an approach tailored to your lived reality.
          </p>
        </div>

        {/* 
          Asymmetrical Editorial Narrative:
          Three distinct, beautifully paced editorial chapters instead of repetitive cookie-cutter boxes
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start pt-4 border-t border-[#E5DFD4] dark:border-[#1A2E22]">
          
          {/* Chapter 1: Traditional Knowledge (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono text-[#5F7065] dark:text-[#8FA597] uppercase tracking-wider block">
              Chapter 01 / Heritage
            </span>
            <h3 className="font-serif text-2xl text-[#163324] dark:text-[#FAF8F5] font-normal leading-snug">
              Traditional Knowledge
            </h3>
            <p className="text-sm font-medium text-[#2A4E38] dark:text-[#9EE2BA]">
              Explore food traditions, culinary practices, and established knowledge that can inform an individual nutrition approach.
            </p>
            <p className="text-sm text-[#4E5B54] dark:text-[#C5D7CC] leading-relaxed">
              Long before molecular nutrition was codified, diverse culinary cultures understood the restorative value of seasonal plant diversity, bitter digestive herbs, fermentation, and slow, mindful meals. We treat this ancestral wisdom as a rich source of foundational insight.
            </p>
            <div className="pt-2 text-xs text-[#63716A] dark:text-[#889E91] space-y-1">
              <p>• Ancestral culinary preparation & seasonal eating</p>
              <p>• Botanical spices, bitter greens & gut ecology</p>
              <p>• Mindful meal pacing & parasympathetic tone</p>
            </div>
          </div>

          {/* Chapter 2: Modern Science (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono text-[#5F7065] dark:text-[#8FA597] uppercase tracking-wider block">
              Chapter 02 / Evidence
            </span>
            <h3 className="font-serif text-2xl text-[#163324] dark:text-[#FAF8F5] font-normal leading-snug">
              Modern Science
            </h3>
            <p className="text-sm font-medium text-[#2A4E38] dark:text-[#9EE2BA]">
              Use relevant nutrition research, physiology, and systems thinking to assess what is supported by current evidence.
            </p>
            <p className="text-sm text-[#4E5B54] dark:text-[#C5D7CC] leading-relaxed">
              We interrogate mechanisms through peer-reviewed biomedical literature: evaluating intestinal mucosal permeability, continuous glycemic variability, mitochondrial energy pathways, and liver detoxification phases. Recommendations are grounded in verifiable human physiology.
            </p>
            <div className="pt-2 text-xs text-[#63716A] dark:text-[#889E91] space-y-1">
              <p>• Gut mucosal integrity & microbiome metabolites</p>
              <p>• Glycemic stability & insulin sensitivity dynamics</p>
              <p>• Cellular bioenergetics & targeted micronutrient cofactors</p>
            </div>
          </div>

          {/* Chapter 3: AI-Assisted Insight (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono text-[#5F7065] dark:text-[#8FA597] uppercase tracking-wider block">
              Chapter 03 / Synthesis
            </span>
            <h3 className="font-serif text-2xl text-[#163324] dark:text-[#FAF8F5] font-normal leading-snug">
              AI-Assisted Insight
            </h3>
            <p className="text-sm font-medium text-[#2A4E38] dark:text-[#9EE2BA]">
              Use AI-assisted tools to organise health information, explore potential patterns, and support more structured, personalised discussions.
            </p>
            <p className="text-sm text-[#4E5B54] dark:text-[#C5D7CC] leading-relaxed">
              Modern health histories are detailed and multi-layered. We use AI-assisted tools strictly behind the scenes to synthesize long intake questionnaires, cross-reference symptoms with dietary logs, and highlight subtle correlations for clinician evaluation.
            </p>
            <div className="pt-2 text-xs text-[#63716A] dark:text-[#889E91] space-y-1">
              <p>• Structured synthesis of complex health timelines</p>
              <p>• Multi-variable pattern exploration & nutrient gaps</p>
              <p>• Informed, collaborative clinical dialogue with Milind</p>
            </div>
          </div>

        </div>

        {/* 
          Clinical Governance & Care Continuity:
          Clear statement about human clinician oversight, ethical boundaries, and next steps
        */}
        <div className="bg-[#FAF8F5] dark:bg-[#0E1A12] border border-[#E8E2D8] dark:border-[#1E3326] p-8 rounded-xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-4 border-b border-[#E8E2D8] dark:border-[#1E3326]">
            <div className="space-y-1 max-w-2xl">
              <span className="text-xs font-mono text-[#5F7065] dark:text-[#8FA597] uppercase tracking-wider block">
                Human-Centered Clinical Governance
              </span>
              <p className="font-serif text-xl text-[#163324] dark:text-[#FAF8F5] font-normal leading-snug">
                Every strategy is personally reviewed and customized by Milind Kumar.
              </p>
              <p className="text-xs text-[#4E5B54] dark:text-[#C5D7CC] leading-relaxed pt-1">
                AI tools never diagnose conditions or prescribe plans on their own. They serve only as analytical support to help organise complex information so your consultation can focus deeply on practical, human-centred care.
              </p>
            </div>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 self-start lg:self-auto h-11 px-6 text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] bg-[#163324] hover:bg-[#204532] rounded-xs transition-colors cursor-pointer shrink-0"
            >
              <span>Schedule an Intake</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#86C19D]" />
            </button>
          </div>

          <div className="text-[11px] text-[#63716A] dark:text-[#889E91] leading-relaxed">
            Epion Functional Health works complementarily alongside your primary care physician and medical specialists. Consultations are available in-person at our Bellandur, Bengaluru clinic or worldwide via private virtual telehealth.
          </div>
        </div>

      </div>
    </section>
  );
};
