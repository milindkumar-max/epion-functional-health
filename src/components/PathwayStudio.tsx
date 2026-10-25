import React, { useState } from 'react';
import { BIOLOGICAL_PATHWAYS } from '../data/pathways';
import { ChevronRight, ChevronLeft, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface PathwayStudioProps {
  onOpenBooking: () => void;
}

export const PathwayStudio: React.FC<PathwayStudioProps> = ({ onOpenBooking }) => {
  const [selectedPathwayIndex, setSelectedPathwayIndex] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const pathway = BIOLOGICAL_PATHWAYS[selectedPathwayIndex];
  const step = pathway.steps[activeStepIndex];

  const handleSelectPathway = (idx: number) => {
    setSelectedPathwayIndex(idx);
    setActiveStepIndex(0);
  };

  return (
    <section id="science-pathways" className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="text-xs uppercase tracking-[0.2em] font-medium text-[#5F7065]">
            Biochemical Mechanics
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#163324] tracking-tight leading-[1.12]">
            Explore the science behind nutrition.
          </h2>
          <p className="text-base sm:text-lg text-[#4E5B54] leading-relaxed pt-1">
            Every physiological process in human health is an enzymatic sequence. When essential micronutrients, amino acids, or cofactors are depleted, downstream cellular reactions stall. Step through the mapped metabolic pathways below to see how food functions as molecular signaling.
          </p>
        </div>

        {/* Pathway Category Selection Tabs (Clean buttons, unboxed metadata) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {BIOLOGICAL_PATHWAYS.map((p, idx) => {
            const isSelected = idx === selectedPathwayIndex;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPathway(idx)}
                className={`p-4 text-left border rounded-xs transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#163324] text-[#FAF8F5] border-[#163324] shadow-xs'
                    : 'bg-white text-[#3B4840] border-[#E8E2D8] hover:border-[#B4C2BA] hover:bg-[#FDFBF7]'
                }`}
              >
                <div className={`text-xs uppercase tracking-wider font-medium mb-1 ${
                  isSelected ? 'text-[#A3C8B1]' : 'text-[#7B8B82]'
                }`}>
                  {p.category}
                </div>
                <div className="font-serif text-base font-medium leading-snug line-clamp-2">
                  {p.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Pathway Educational Stage (Clean Light Neutral Surface) */}
        <div className="bg-white border border-[#E8E2D8] rounded-xs p-8 lg:p-12 shadow-xs space-y-10">
          
          {/* Header of Active Pathway */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8E2D8]">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs text-[#63716A] flex items-center gap-2">
                <span className="font-semibold text-[#163324]">{pathway.category}</span>
                <span aria-hidden="true">·</span>
                <span>{pathway.steps.length} Sequential Reaction Stages</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#163324] leading-snug">
                {pathway.title}
              </h3>
              <p className="text-sm text-[#4E5B54]">
                {pathway.subtitle}
              </p>
            </div>

            {/* Step Controls */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono text-[#63716A]">
                Stage {activeStepIndex + 1} of {pathway.steps.length}
              </span>
              <div className="flex items-center border border-[#DDD7CD] rounded-xs overflow-hidden">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="p-2 text-[#163324] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF8F5] border-r border-[#DDD7CD] transition-colors cursor-pointer"
                  aria-label="Previous pathway step"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={activeStepIndex === pathway.steps.length - 1}
                  onClick={() => setActiveStepIndex((prev) => Math.min(pathway.steps.length - 1, prev + 1))}
                  className="p-2 text-[#163324] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                  aria-label="Next pathway step"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-5 gap-2">
            {pathway.steps.map((st, i) => {
              const isActive = i === activeStepIndex;
              const isPassed = i < activeStepIndex;
              return (
                <div
                  key={i}
                  onClick={() => setActiveStepIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#163324]'
                      : isPassed
                      ? 'bg-[#8BB299]'
                      : 'bg-[#EAE5DC]'
                  }`}
                  title={st.title}
                />
              );
            })}
          </div>

          {/* Active Reaction Stage: 2-Column Editorial Educational Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left: Biochemical Mechanism & Molecular Reaction (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#5F7065] font-medium">
                  Reaction Stage {step.stepNumber}
                </span>
                <h4 className="font-serif text-2xl font-medium text-[#163324] mt-1">
                  {step.title}
                </h4>
                <p className="text-sm sm:text-base text-[#4E5B54] mt-3 leading-relaxed">
                  {step.biochemicalMechanism}
                </p>
              </div>

              {/* Enzymes & Receptors (Clear, readable labels) */}
              <div className="p-5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-xs space-y-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#163324] block">
                  Key Enzymes & Membrane Receptors
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {step.keyEnzymesOrReceptors.map((enz, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-white text-[#163324] border border-[#E2DDD5] text-xs font-medium rounded-xs"
                    >
                      {enz}
                    </span>
                  ))}
                </div>
              </div>

              {/* Critical Cofactors */}
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#163324] block">
                  Essential Mineral & Vitamin Cofactors
                </span>
                <div className="flex flex-wrap gap-2">
                  {step.criticalCofactors.map((cf, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-[#EAEFE9] text-[#163324] border border-[#D2E2D0] text-xs font-medium rounded-xs"
                    >
                      {cf}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right: Nutritional Translation & Clinical Focus (5 cols) */}
            <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#E8E2D8] p-6 lg:p-8 rounded-xs space-y-6 text-xs">
              
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#163324] block">
                  Therapeutic Food Inputs For This Stage
                </span>
                <div className="space-y-2 mt-3">
                  {step.nutritionalInputs.map((fs, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-white p-3 border border-[#E8E2D8] rounded-xs text-xs text-[#3E4944] leading-relaxed">
                      <span className="text-[#163324] font-bold text-sm">·</span>
                      <span>{fs}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#F5F2EB] border-l-2 border-[#163324] rounded-xs text-xs text-[#55635B] space-y-1">
                <span className="font-semibold text-[#163324] block">Clinical Takeaway:</span>
                <p className="leading-relaxed">{pathway.clinicalTakeaway}</p>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full py-3.5 bg-[#163324] hover:bg-[#204532] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 rounded-xs shadow-xs cursor-pointer"
              >
                <span>Discuss This Pathway in Intake</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
