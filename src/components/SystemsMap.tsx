import React, { useState } from 'react';
import { PageView } from '../types';
import { ArrowRight, GitBranch, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';

interface SystemsMapProps {
  onNavigate: (page: PageView) => void;
}

interface PathwayNode {
  id: string;
  name: string;
  category: 'gut' | 'metabolism' | 'mitochondria' | 'liver' | 'neuro';
  categoryLabel: string;
  description: string;
  biochemicalMarkers: string[];
  interconnectedNodes: { id: string; name: string }[];
  clinicalInsight: string;
  dietaryInputs: string[];
}

const PATHWAY_NODES: PathwayNode[] = [
  {
    id: 'mucosal-barrier',
    name: 'Mucosal Barrier & Epithelial Integrity',
    category: 'gut',
    categoryLabel: 'Gut Ecology',
    description: 'Selectivity of the single-cell enterocyte layer, regulated by tight-junction protein complexes (claudins, occludins, ZO-1).',
    biochemicalMarkers: ['Serum Zonulin', 'Fecal Secretory IgA', 'Endotoxin Clearance'],
    interconnectedNodes: [
      { id: 'microbial-metabolites', name: 'Microbial SCFA Production' },
      { id: 'phase2-detox', name: 'Hepatic Biotransformation' },
      { id: 'mitochondrial-oxphos', name: 'Mitochondrial Respiration' }
    ],
    clinicalInsight: 'Mucosal permeability allows circulating antigens to trigger low-grade inflammatory cascades that overburden liver clearance and metabolic tissue sensitivity.',
    dietaryInputs: ['L-Glutamine', 'Zinc Carnosine', 'Bone Broth Glycine', 'Pomegranate Ellagitannins'],
  },
  {
    id: 'microbial-metabolites',
    name: 'Microbiome Short-Chain Fatty Acid Axis',
    category: 'gut',
    categoryLabel: 'Gut Ecology',
    description: 'Anaerobic microbial fermentation of non-digestible prebiotic fibers yielding short-chain fatty acids (acetate, propionate, butyrate).',
    biochemicalMarkers: ['Fecal Butyrate Concentration', 'Acetate/Propionate Ratio', 'Calprotectin'],
    interconnectedNodes: [
      { id: 'mucosal-barrier', name: 'Mucosal Barrier' },
      { id: 'insulin-pi3k', name: 'Insulin Signaling' },
      { id: 'hpa-vagal', name: 'Gut-Brain Axis' }
    ],
    clinicalInsight: 'Butyrate supplies the primary energy source for healthy colonocytes, helps modulate immune balance, and stimulates satiety hormones.',
    dietaryInputs: ['Inulin (Chicory & Leek)', 'Resistant Starch', 'Beta-Glucans (Oats)', 'Arabinogalactan'],
  },
  {
    id: 'insulin-pi3k',
    name: 'Insulin Sensitivity & Glucose Regulation',
    category: 'metabolism',
    categoryLabel: 'Metabolism',
    description: 'Receptor tyrosine kinase phosphorylation cascade governing muscle glucose uptake and hepatic glycogen storage.',
    biochemicalMarkers: ['Fasting Insulin', 'HOMA-IR', 'HbA1c', 'Continuous Glucose Metrics'],
    interconnectedNodes: [
      { id: 'mitochondrial-oxphos', name: 'Mitochondrial Respiration' },
      { id: 'microbial-metabolites', name: 'Microbial SCFA' },
      { id: 'phase2-detox', name: 'Liver Conjugation' }
    ],
    clinicalInsight: 'Optimal glucose sequencing and mineral cofactors prevent exaggerated insulin spikes, reducing liver fat accumulation and postprandial fatigue.',
    dietaryInputs: ['Bioavailable Magnesium', 'Alpha-Lipoic Acid', 'Chromium Picolinate', 'Cinnamon Polyphenols'],
  },
  {
    id: 'mitochondrial-oxphos',
    name: 'Mitochondrial Respiration & Cellular Energy',
    category: 'mitochondria',
    categoryLabel: 'Cellular Energy',
    description: 'Mitochondrial complexes and ATP synthase converting macronutrient substrates into usable cellular energy currency.',
    biochemicalMarkers: ['Organic Acids', 'Lactate/Pyruvate Ratio', 'Ubiquinol Status'],
    interconnectedNodes: [
      { id: 'insulin-pi3k', name: 'Insulin Signaling' },
      { id: 'mucosal-barrier', name: 'Mucosal Barrier' },
      { id: 'phase2-detox', name: 'Hepatic Biotransformation' }
    ],
    clinicalInsight: 'Cofactor depletions (B-vitamins, CoQ10, magnesium) can slow mitochondrial respiration, manifesting as persistent daytime fatigue and reduced recovery.',
    dietaryInputs: ['CoQ10 / Ubiquinol', 'Riboflavin (B2)', 'Magnesium Malate', 'Acetyl-L-Carnitine'],
  },
  {
    id: 'phase2-detox',
    name: 'Hepatic Biotransformation & Conjugation',
    category: 'liver',
    categoryLabel: 'Liver Health',
    description: 'Phase I functionalization followed by Phase II glutathione, glucuronidation, and amino acid conjugation for safe bile excretion.',
    biochemicalMarkers: ['Serum GGT', 'Direct Bilirubin', 'Urinary Pyroglutamate'],
    interconnectedNodes: [
      { id: 'mucosal-barrier', name: 'Gut Barrier' },
      { id: 'insulin-pi3k', name: 'Insulin Signaling' },
      { id: 'mitochondrial-oxphos', name: 'Mitochondrial Energy' }
    ],
    clinicalInsight: 'Phase II conjugation requires adequate sulfur-bearing amino acids and antioxidant cofactors to neutralize intermediate metabolites without cellular stress.',
    dietaryInputs: ['Sulforaphane (Broccoli Sprouts)', 'N-Acetyl Cysteine', 'Dietary Glycine', 'Milk Thistle (Silymarin)'],
  },
  {
    id: 'hpa-vagal',
    name: 'Neuroendocrine Tone & Gut-Brain Signaling',
    category: 'neuro',
    categoryLabel: 'Nervous System',
    description: 'Bidirectional communication between the central nervous system, autonomic tone, and enteric digestive motility.',
    biochemicalMarkers: ['Salivary Cortisol Curve', 'DHEA-S', 'Heart Rate Variability'],
    interconnectedNodes: [
      { id: 'mucosal-barrier', name: 'Mucosal Barrier' },
      { id: 'microbial-metabolites', name: 'Microbial SCFA' },
      { id: 'mitochondrial-oxphos', name: 'Mitochondrial Energy' }
    ],
    clinicalInsight: 'Sustained sympathetic activation alters digestive enzyme output and blood flow to the gut mucosa, directly impacting nutrient absorption.',
    dietaryInputs: ['Ashwagandha (KSM-66)', 'L-Theanine', 'Phosphatidylserine', 'Fermented Whole Foods'],
  },
];

export const SystemsMap: React.FC<SystemsMapProps> = ({ onNavigate }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('mucosal-barrier');
  const [activeFilter, setActiveFilter] = useState<'all' | 'gut' | 'metabolism' | 'mitochondria' | 'liver' | 'neuro'>('all');

  const selectedNode = PATHWAY_NODES.find((n) => n.id === selectedNodeId) || PATHWAY_NODES[0];

  const filteredNodes = activeFilter === 'all'
    ? PATHWAY_NODES
    : PATHWAY_NODES.filter((n) => n.category === activeFilter);

  return (
    <section id="pathways" className="py-16 lg:py-24 bg-[var(--canvas-bg)] border-b border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
        
        {/* Section Header */}
        <div className="border-b border-[var(--border-subtle)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] font-medium text-[#5F7065]">
              Systems Biology in Practice
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)] font-normal tracking-tight">
              Interconnected physiology. <br />
              <span className="italic font-normal text-emerald-900 dark:text-emerald-300">Every organ communicates with the next.</span>
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] max-w-md leading-relaxed font-normal">
            Rather than treating organs as isolated components, functional nutrition evaluates the bidirectional biochemistry between the digestive barrier, liver clearance, cellular mitochondria, and glycemic balance.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[var(--border-subtle)] text-xs">
          <span className="text-[var(--text-muted)] font-medium mr-2 shrink-0">Filter by system:</span>
          {[
            { id: 'all', label: 'All Systems' },
            { id: 'gut', label: 'Gut Ecology' },
            { id: 'metabolism', label: 'Metabolism' },
            { id: 'mitochondria', label: 'Cellular Energy' },
            { id: 'liver', label: 'Liver & Detox' },
            { id: 'neuro', label: 'Nervous System' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xs transition-colors cursor-pointer shrink-0 font-medium ${
                activeFilter === tab.id
                  ? 'bg-[#163324] text-[#FAF8F5]'
                  : 'bg-[var(--surface-bg)] text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)] border border-[var(--border-color)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main 2-Column Systems Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Systems Selection (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="text-xs text-[var(--text-muted)] font-medium pb-1 flex items-center justify-between">
              <span>Physiological Interactions</span>
              <span>{filteredNodes.length} mapped areas</span>
            </div>

            {filteredNodes.map((node) => {
              const isSelected = node.id === selectedNode.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`p-5 rounded-xs border text-left transition-all cursor-pointer relative group ${
                    isSelected
                      ? 'bg-[var(--surface-bg)] border-[#163324] shadow-xs'
                      : 'bg-[var(--surface-secondary)]/50 border-[var(--border-color)] hover:border-[#163324]/40 hover:bg-[var(--surface-bg)]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-emerald-800 dark:text-emerald-300">
                        {node.categoryLabel}
                      </div>
                      <h4 className="font-serif text-lg font-medium text-[var(--text-primary)] leading-snug">
                        {node.name}
                      </h4>
                    </div>
                    <GitBranch className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-[#163324] dark:text-[#86C19D] rotate-90' : 'text-[var(--text-muted)]'}`} />
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] mt-2 line-clamp-2 leading-relaxed">
                    {node.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: Editorial Detail Stage (7 cols) */}
          <div className="lg:col-span-7 bg-[var(--surface-bg)] border border-[var(--border-color)] rounded-xs p-6 sm:p-8 shadow-xs space-y-7">
            
            {/* Active System Header */}
            <div className="border-b border-[var(--border-subtle)] pb-5 space-y-2">
              <div className="text-xs text-emerald-800 dark:text-emerald-400 font-medium">
                {selectedNode.categoryLabel}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[var(--text-primary)] leading-snug">
                {selectedNode.name}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {selectedNode.description}
              </p>
            </div>

            {/* Natural Physiological Signaling Cascade */}
            <div className="bg-[#FAF8F5] dark:bg-[#13241A] border border-[#E8E2D8] dark:border-[#223F2E] rounded-xs p-5 space-y-3">
              <div className="text-xs uppercase tracking-wider font-semibold text-[#163324] dark:text-[#86C19D]">
                Biological Signaling Sequence
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
                <div className="bg-white dark:bg-[#0C1811] p-3.5 border border-[#E2DDD5] dark:border-[#1E3326] rounded-xs space-y-1">
                  <span className="text-[11px] text-[#63716A] block font-medium">Stage 1: Input</span>
                  <div className="font-medium text-[#163324] dark:text-[#F0F5F2]">Nutrient & Molecular Substrate</div>
                  <p className="text-[11px] text-[#55635B] dark:text-[#9FB7A8] leading-relaxed">Dietary intake, micronutrients, or microbial metabolites delivered to enterocytes.</p>
                </div>

                <div className="bg-white dark:bg-[#0C1811] p-3.5 border border-[#E2DDD5] dark:border-[#1E3326] rounded-xs space-y-1">
                  <span className="text-[11px] text-[#63716A] block font-medium">Stage 2: Catalysis</span>
                  <div className="font-medium text-[#163324] dark:text-[#F0F5F2]">Enzymatic & Receptor Activation</div>
                  <p className="text-[11px] text-[#55635B] dark:text-[#9FB7A8] leading-relaxed">Specific vitamin and mineral cofactors facilitate biochemical conversion.</p>
                </div>

                <div className="bg-white dark:bg-[#0C1811] p-3.5 border border-[#E2DDD5] dark:border-[#1E3326] rounded-xs space-y-1">
                  <span className="text-[11px] text-[#63716A] block font-medium">Stage 3: Response</span>
                  <div className="font-medium text-[#163324] dark:text-[#F0F5F2]">Cellular Equilibrium</div>
                  <p className="text-[11px] text-[#55635B] dark:text-[#9FB7A8] leading-relaxed">Homeostatic metabolic, immune, and bioenergetic signaling across organ networks.</p>
                </div>
              </div>
            </div>

            {/* Clinical Perspective */}
            <div className="p-4 bg-[#F5F2EB] dark:bg-[#16271D] border-l-2 border-[#163324] dark:border-[#86C19D] rounded-xs text-xs space-y-1">
              <span className="font-semibold text-[#163324] dark:text-[#FAF8F5] block">Clinical Perspective:</span>
              <p className="text-[#4E5B54] dark:text-[#C5D7CC] leading-relaxed">{selectedNode.clinicalInsight}</p>
            </div>

            {/* Biomarkers & Nutrient Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#FAF8F5] dark:bg-[#13241A] border border-[#E8E2D8] dark:border-[#223F2E] rounded-xs space-y-2">
                <span className="text-xs font-semibold text-[#163324] dark:text-[#FAF8F5] block">
                  Relevant Biomarkers & Tests:
                </span>
                <ul className="space-y-1.5 text-xs text-[#4E5B54] dark:text-[#C5D7CC]">
                  {selectedNode.biochemicalMarkers.map((bm, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 dark:bg-emerald-400"></span>
                      <span>{bm}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-[#FAF8F5] dark:bg-[#13241A] border border-[#E8E2D8] dark:border-[#223F2E] rounded-xs space-y-2">
                <span className="text-xs font-semibold text-[#163324] dark:text-[#FAF8F5] block">
                  Nutritional Inputs & Cofactors:
                </span>
                <ul className="space-y-1.5 text-xs text-[#4E5B54] dark:text-[#C5D7CC]">
                  {selectedNode.dietaryInputs.map((inp, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 dark:bg-emerald-400"></span>
                      <span>{inp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Interconnected Systems */}
            <div className="pt-3 border-t border-[var(--border-subtle)] space-y-2">
              <span className="text-xs text-[var(--text-muted)] font-medium block">
                Direct Physiological Connections:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedNode.interconnectedNodes.map((target) => (
                  <button
                    key={target.id}
                    onClick={() => setSelectedNodeId(target.id)}
                    className="px-3 py-1.5 text-xs rounded-xs bg-[var(--surface-secondary)] hover:bg-[#163324] hover:text-[#FAF8F5] border border-[var(--border-color)] text-[var(--text-primary)] transition-colors cursor-pointer"
                  >
                    → {target.name}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
