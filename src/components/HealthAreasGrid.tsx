import React, { useState } from 'react';
import { HealthArea } from '../types';
import { HEALTH_AREAS } from '../data/healthAreas';
import { EDITORIAL_PHOTOS } from '../data/photography';
import { ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';

interface HealthAreasGridProps {
  onOpenBooking: () => void;
}

const AREA_PHOTOS: Record<string, string> = {
  'gut-microbiome': EDITORIAL_PHOTOS.gutMicrobiome,
  'metabolic-blood-sugar': EDITORIAL_PHOTOS.metabolicHealth,
  'liver-fat-metabolism': EDITORIAL_PHOTOS.hepaticBiotransformation,
  'inflammation-immune': EDITORIAL_PHOTOS.immunonutrition,
  'mitochondria-cellular-energy': EDITORIAL_PHOTOS.mitochondrialBioenergetics,
  'nutrient-biochemistry': EDITORIAL_PHOTOS.articlePlateArchitecture,
  'stress-neuroendocrine': EDITORIAL_PHOTOS.neuroendocrineAxis,
  'personalized-nutrigenomics': EDITORIAL_PHOTOS.articleMicrobiomeDiversity,
};

export const HealthAreasGrid: React.FC<HealthAreasGridProps> = ({ onOpenBooking }) => {
  const [selectedAreaId, setSelectedAreaId] = useState<string>(HEALTH_AREAS[0].id);

  const activeArea = HEALTH_AREAS.find((a) => a.id === selectedAreaId) || HEALTH_AREAS[0];
  const photoUrl = AREA_PHOTOS[activeArea.id] || EDITORIAL_PHOTOS.gutMicrobiome;

  return (
    <section id="health-areas" className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="text-xs uppercase tracking-[0.2em] font-medium text-[#5F7065]">
            Clinical Focus Areas
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#163324] tracking-tight leading-[1.12]">
            Explore health areas.
          </h2>
          <p className="text-base sm:text-lg text-[#4E5B54] leading-relaxed pt-1">
            Rather than separating health into rigid categories, we evaluate how interconnected physiological systems shape day-to-day wellness. Select any area below to examine the underlying mechanisms and evidence-informed nutritional strategies.
          </p>
        </div>

        {/* 8 Health Area Selection Buttons (Varying Layout, Clean Typography) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-10">
          {HEALTH_AREAS.map((area) => {
            const isSelected = area.id === activeArea.id;
            return (
              <button
                key={area.id}
                onClick={() => setSelectedAreaId(area.id)}
                className={`p-4 text-left border rounded-xs transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#163324] text-[#FAF8F5] border-[#163324] shadow-xs'
                    : 'bg-white text-[#3B4840] border-[#E8E2D8] hover:border-[#B4C2BA] hover:bg-[#FDFBF7]'
                }`}
              >
                <div className={`text-xs uppercase tracking-wider font-medium mb-1.5 ${
                  isSelected ? 'text-[#A3C8B1]' : 'text-[#7B8B82]'
                }`}>
                  {area.systemsConnected[0]}
                </div>
                <div className="font-serif text-base font-medium leading-snug line-clamp-2">
                  {area.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Editorial Feature Stage for Selected Area */}
        <div className="bg-white border border-[#E8E2D8] rounded-xs shadow-xs p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Authentic Photography & Diagnostic Markers (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative aspect-[4/3] rounded-xs overflow-hidden border border-[#E8E2D8] shadow-2xs">
                <img
                  src={photoUrl}
                  alt={activeArea.title}
                  className="w-full h-full object-cover filter contrast-[1.02]"
                  loading="lazy"
                />
              </div>

              {/* Biomarkers & Diagnostic Framework (Unboxed, clean) */}
              <div className="p-5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-xs space-y-3">
                <div className="text-xs uppercase tracking-wider font-semibold text-[#163324]">
                  Relevant Diagnostic Biomarkers
                </div>
                <ul className="space-y-1.5 text-xs text-[#4E5B54]">
                  {activeArea.keyBiomarkers.map((marker, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3B7A57]" />
                      <span>{marker}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interconnected Systems */}
              <div className="text-xs text-[#63716A] space-y-1">
                <span className="font-medium text-[#163324] block">Systems In Crosstalk:</span>
                <p>{activeArea.systemsConnected.join(' · ')}</p>
              </div>
            </div>

            {/* Right Column: Deep Narrative & Nutritional Strategies (7 cols) */}
            <div className="lg:col-span-7 space-y-7">
              <div>
                <span className="text-xs font-medium text-[#5F7065] uppercase tracking-wider">
                  Physiological Overview
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#163324] mt-1 leading-snug">
                  {activeArea.title}
                </h3>
                <p className="text-sm sm:text-base text-[#4E5B54] mt-3 leading-relaxed">
                  {activeArea.fullOverview}
                </p>
              </div>

              {/* Cellular Role */}
              <div className="p-4 bg-[#F8F5EE] border-l-2 border-[#163324] rounded-xs text-xs sm:text-sm text-[#3E4943] leading-relaxed">
                <span className="font-semibold text-[#163324] block mb-1">Cellular Mechanism:</span>
                {activeArea.physiologicalRole}
              </div>

              {/* Evidence-Informed Strategies */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-[#163324] uppercase tracking-wider">
                  Targeted Nutritional Strategies
                </div>
                <div className="space-y-2.5">
                  {activeArea.nutritionalStrategies.map((strat, i) => (
                    <div key={i} className="p-4 bg-[#FAF8F5] border border-[#E8E2D8] rounded-xs">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="text-sm font-semibold text-[#163324]">
                          {strat.title}
                        </h4>
                        <span className="text-[11px] text-[#63716A]">
                          Evidence: {strat.evidenceGrade}
                        </span>
                      </div>
                      <p className="text-xs text-[#4E5B54] mt-1 leading-relaxed">
                        {strat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="pt-4 border-t border-[#E8E2D8] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="text-xs text-[#63716A]">
                  Personalized protocols crafted during intake.
                </div>
                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] bg-[#163324] hover:bg-[#204532] transition-colors rounded-xs cursor-pointer shadow-xs"
                >
                  <span>Book Consultation for this Area</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
