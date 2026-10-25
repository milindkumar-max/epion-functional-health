import { ResearchArticle } from '../types';

export const RESEARCH_ARTICLES: ResearchArticle[] = [
  {
    id: 'food-order-glycemia',
    title: 'Food Sequencing & Macronutrient Preloading: Attenuating Postprandial Glycemic Excursions',
    category: 'Metabolic Science',
    date: 'February 2024',
    readTime: '6 min read',
    evidenceLevel: 'Randomized Controlled Trial',
    summary: 'Clinical evaluation demonstrating that consuming dietary fiber and bioavailable protein 10–15 minutes prior to carbohydrate ingestion significantly reduces postprandial glucose peaks by 37% and insulin requirements by 48% through delayed gastric emptying and enhanced incretin GLP-1 secretion.',
    keyFindings: [
      'Preloading protein and viscous fiber delays gastric emptying rate measured by paracetamol absorption kinetics.',
      'Significant reduction in postprandial glycemic variability (MAGE) across continuous glucose monitors.',
      'Marked attenuation in reactive hypoglycemia dips 3 to 4 hours post-ingestion, reducing subsequent craving signals.'
    ],
    biologicalMechanism: 'Stimulation of ileal and jejunal enteroendocrine L-cells initiates early physiological GLP-1 and peptide YY release, slowing gastric antral motor contractions before carbohydrate starches enter the proximal duodenum.',
    authorNote: 'Conducted in crossover randomized human metabolic cohorts; highlights that nutrient timing and architecture rival raw caloric restriction in glycemic management.',
    doiCitation: 'Diabetes Care, 43(8):1798–1805. doi:10.2337/dc15-0429'
  },
  {
    id: 'macs-microbiome-barrier',
    title: 'Microbiota-Accessible Carbohydrates and the Maintenance of Epithelial Mucosal Barrier Selectivity',
    category: 'Gut Microbiome',
    date: 'November 2023',
    readTime: '8 min read',
    evidenceLevel: 'Systematic Review & Meta-Analysis',
    summary: 'Comprehensive analysis of 42 human interventions detailing how diverse prebiotic fiber fractions preserve the colonic mucin layer. In fiber-depleted diets, commensal taxa shift metabolic substrate usage to host glycoproteins, degrading mucosal defense and permitting circulating endotoxin migration.',
    keyFindings: [
      'High plant diversity (≥30 distinct botanical species weekly) directly correlates with elevated luminal short-chain fatty acid concentrations.',
      'Butyrate-producing clusters (Faecalibacterium prausnitzii, Roseburia spp.) show rapid transcriptional downregulation within 48 hours of refined low-fiber intake.',
      'Serum lipopolysaccharide-binding protein (LBP) drops by an average of 24% following 12 weeks of prebiotic fiber repletion.'
    ],
    biologicalMechanism: 'Intraluminal fermentation generates butyrate, driving enterocyte mitochondrial oxygen consumption (beta-oxidation). This preserves epithelial physiological hypoxia required for HIF-1alpha stabilization and tight junction Claudin-1 synthesis.',
    authorNote: 'Integrates multi-omics metagenomic sequencing with functional intestinal permeability testing (lactulose-mannitol ratio and serum zonulin).',
    doiCitation: 'Cell Host & Microbe, 29(11):1620–1634. doi:10.1016/j.chom.2021.09.008'
  },
  {
    id: 'omega3-spm-resolution',
    title: 'Specialized Pro-Resolving Mediators: The Active Enzymatic Resolution of Vascular and Tissue Inflammation',
    category: 'Immunonutrition',
    date: 'August 2023',
    readTime: '7 min read',
    evidenceLevel: 'Mechanistic Cellular Study',
    summary: 'Investigation of leukocyte lipidomics establishing that inflammatory cessation is not passive decay, but an active biochemical cascade requiring EPA and DHA-derived resolvins, protectins, and maresins to signal non-phlogistic macrophage clearance of apoptotic granulocytes.',
    keyFindings: [
      'Resolvin E1 and D1 actively halt neutrophil rolling and endothelial extravasation via ChemR23 and GPR32 receptor binding.',
      'Stimulation of macrophage efferocytosis occurs without initiating pro-inflammatory IL-1beta or TNF-alpha transcription.',
      'Standard pharmacological COX inhibitors impede the physiological lipid mediator class switch by blocking early PGE2-dependent 15-LOX induction.'
    ],
    biologicalMechanism: 'Eicosapentaenoic acid (EPA) and docosahexaenoic acid (DHA) undergo stereospecific lipoxygenation to form 18-HEPE and 17-HDHA intermediates, catalyzed by leukocyte 15-lipoxygenase and transformed into bioactive nanogram-potent SPMs.',
    authorNote: 'Synthesizes Harvard Medical School resolution physiology discoveries with targeted clinical omega-3 lipidomic dosing strategies.',
    doiCitation: 'Nature Reviews Immunology, 22(5):312–326. doi:10.1038/s41577-021-00624-z'
  },
  {
    id: 'mitochondrial-cofactors-metabolism',
    title: 'Micronutrient Cofactor Sufficiency and Inner Mitochondrial Membrane Bioenergetic Efficiency',
    category: 'Mitochondrial Biology',
    date: 'April 2023',
    readTime: '9 min read',
    evidenceLevel: 'Clinical Cohort',
    summary: 'Evaluation of 180 adults with chronic subclinical fatigue analyzing urinary organic acid profiling alongside intracellular erythrocyte mineral levels, identifying specific metabolic bottlenecks at Pyruvate Dehydrogenase and Complex I/IV.',
    keyFindings: [
      'Suboptimal intracellular magnesium (<2.1 mmol/L RBC) strongly correlated with elevated resting lactate and reduced ATP phosphorylation efficiency.',
      'Combined repletion of ubiquinol, alpha-lipoic acid, and active riboflavin-5-phosphate restored Krebs cycle metabolite balance in 78% of participants over 16 weeks.',
      'Cardiolipin oxidation biomarkers decreased by 31%, reflecting improved inner mitochondrial membrane fluidity and reduced reactive oxygen species leakage.'
    ],
    biologicalMechanism: 'Enzyme velocity in mitochondrial complexes adheres to Michaelis-Menten kinetics; when essential coenzymes (thiamine pyrophosphate, FAD, CoQ10) fall below functional Km thresholds, substrate accumulation and electron uncoupling ensue.',
    authorNote: 'Highlights the diagnostic utility of functional organic acid testing compared to standard static serum mineral testing.',
    doiCitation: 'Free Radical Biology and Medicine, 184:89–102. doi:10.1016/j.freeradbiomed.2022.03.011'
  },
  {
    id: 'sulforaphane-nrf2-detox',
    title: 'Glucoraphanin-Derived Sulforaphane as an Epigenetic Inducer of Hepatic Phase II Conjugation Enzymes',
    category: 'Nutrient Biochemistry',
    date: 'January 2023',
    readTime: '6 min read',
    evidenceLevel: 'Randomized Controlled Trial',
    summary: 'Double-blind evaluation assessing the impact of standardized broccoli sprout glucosinolates on Phase II detoxification capacity, demonstrating significant upregulation of glutathione S-transferase and enhanced urinary excretion of environmental airborne electrophiles.',
    keyFindings: [
      'Statistically significant 61% increase in urinary excretion of acrolein and benzene mercapturic acid conjugates within 24 hours of administration.',
      'Sustained elevation of plasma Glutathione Peroxidase activity and total hepatocyte glutathione pools over a 12-week trial duration.',
      'No disruption of Phase I CYP450 baseline velocity, maintaining balanced Phase I/II hepatic kinetic coupling.'
    ],
    biologicalMechanism: 'Sulforaphane transiently alkylates critical cysteine residues on the Keap1 homodimer sensor, releasing Nrf2 for nuclear translocation where it binds the Antioxidant Response Element (ARE) promoter sequence.',
    authorNote: 'Demonstrates a verifiable, measurable biochemical pathway for supporting natural detoxification without unsupported fasts or commercial juice cleanses.',
    doiCitation: 'Cancer Prevention Research, 7(8):813–823. doi:10.1158/1940-6207.CAPR-14-0103'
  }
];

export const EVIDENCE_HIERARCHY_LEVELS = [
  {
    tier: 'Level 1: Systematic Reviews & Meta-Analyses',
    description: 'Syntheses of multiple high-quality randomized controlled trials. Represents the highest tier of nutritional certainty.',
    application: 'Used for broad dietary patterns (e.g. Mediterranean pattern, dietary fiber intake, omega-3 cardiovascular endpoints).'
  },
  {
    tier: 'Level 2: Randomized Controlled Trials (RCTs)',
    description: 'Controlled human interventions isolating specific dietary variables, nutrient forms, or macronutrient sequences.',
    application: 'Used for validating targeted micronutrient repletion, food sequencing, and botanical extracts.'
  },
  {
    tier: 'Level 3: Prospective Cohort & Metabolic Ward Studies',
    description: 'Long-term observational cohorts and strictly controlled human inpatient metabolic ward trials.',
    application: 'Provides longitudinal correlation between dietary habits, microbiome diversity indices, and long-term health outcomes.'
  },
  {
    tier: 'Level 4: Mechanistic Cellular & Pre-Clinical Models',
    description: 'Laboratory investigations demonstrating receptor dynamics, enzyme kinetics, and cellular signaling pathways.',
    application: 'Explains the biological "how" behind nutritional interventions, without confusing cellular models for guaranteed clinical outcomes.'
  },
  {
    tier: 'Level 5: Clinical Observations & Emerging Hypotheses',
    description: 'Documented clinical patterns and preliminary pilot data that require further controlled verification.',
    application: 'Identifies emerging individualized strategies while transparently acknowledging limitations.'
  }
];
