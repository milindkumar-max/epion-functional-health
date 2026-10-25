import { HealthArea } from '../types';

export const HEALTH_AREAS: HealthArea[] = [
  {
    id: 'gut-microbiome',
    title: 'Gut Health & Microbiome',
    shortDescription: 'Intestinal barrier integrity, microbial metabolite signaling, and the symbiotic gastrointestinal ecosystem.',
    fullOverview: 'The gastrointestinal tract represents the primary interface between external nutrients and host physiology. Covering approximately 32 square meters of mucosal surface area, the single-cell epithelial layer and complex microbial consortium dictate nutrient absorption, systemic immune tolerance, neurotransmitter modulation, and hepatic metabolic load.',
    physiologicalRole: 'Epithelial tight junctions (Claudins, Occludins, ZO-1) maintain selective permeability while commensal species (Faecalibacterium prausnitzii, Akkermansia muciniphila, Bifidobacteria) ferment nondigestible polysaccharides into short-chain fatty acids (acetate, propionate, butyrate).',
    systemsConnected: ['Immune Regulation', 'Liver Biotransformation', 'Neuroendocrine Axis', 'Metabolic Regulation'],
    keyBiomarkers: ['Fecal Calprotectin', 'Zonulin', 'Short-Chain Fatty Acid Profiles', 'sIgA', 'Microbial Diversity Indices'],
    nutritionalStrategies: [
      {
        title: 'Microbial Accessible Carbohydrates (MACs)',
        description: 'Targeted diversity of soluble and fermentable prebiotic fibers (inulin, arabinogalactans, resistant starches) to feed butyrate-producing commensals.',
        evidenceGrade: 'High'
      },
      {
        title: 'Polyphenol-Rich Botanical Matrix',
        description: 'Ellagitannins, anthocyanins, and epigallocatechin gallate (EGCG) acting as selective prebiotic modulators supporting Akkermansia abundance.',
        evidenceGrade: 'Moderate'
      },
      {
        title: 'Mucosal Barrier Precursors',
        description: 'L-Glutamine, zinc carnosine, and threonine providing direct energetic substrates for enterocyte turnover and mucin layer synthesis.',
        evidenceGrade: 'Moderate'
      }
    ],
    clinicalFocus: 'Investigating dysbiosis patterns, impaired mucosal barrier selectivity ("intestinal hyperpermeability"), functional dyspepsia, and downstream inflammatory consequences without unsupported miracle-cure claims.',
    dietaryPatterns: ['High-Diversity Plant Matrix (30+ species/week)', 'Polyphenol-dense whole foods', 'Fermented live cultures (kefir, fermented vegetables)', 'Elimination of processed emulsifiers (polysorbate-80, CMC)'],
    references: [
      {
        citation: 'Sonnenburg ED, Sonnenburg JL. Starving our microbial self: the deleterious consequences of a diet deficient in microbiota-accessible carbohydrates. Cell Metab. 2014.',
        source: 'Cell Metabolism',
        year: 2014
      },
      {
        citation: 'Valdes AM, et al. Role of the gut microbiota in nutrition and health. BMJ. 2018;361:k2179.',
        source: 'British Medical Journal',
        year: 2018
      }
    ]
  },
  {
    id: 'metabolic-blood-sugar',
    title: 'Metabolic Health & Blood Sugar',
    shortDescription: 'Insulin signaling fidelity, postprandial glycemic excursions, and metabolic flexibility.',
    fullOverview: 'Metabolic health reflects the efficiency with which cells transition between fuel substrates (glucose and fatty acids) and maintain homeostatic glycemic balance without compensatory hyperinsulinemia. Suboptimal insulin sensitivity alters lipid partitioning, vascular tone, mitochondrial oxidation, and chronic low-grade inflammation.',
    physiologicalRole: 'Beta-cell insulin secretion activates muscle and hepatic IRS-1/PI3K/Akt signaling cascades, facilitating GLUT4 translocation for glucose clearance, while glycogen synthesis and lipogenesis pathways coordinate systemic nutrient storage.',
    systemsConnected: ['Mitochondrial Energy', 'Hormonal Signaling', 'Liver Lipogenesis', 'Cardiovascular Endothelium'],
    keyBiomarkers: ['Fasting Glucose & Insulin', 'HOMA-IR', 'HbA1c', 'Continuous Glucose (CGM) Glycemic Variability', 'Triglyceride-to-HDL Ratio'],
    nutritionalStrategies: [
      {
        title: 'Glycemic Load & Macronutrient Sequencing',
        description: 'Consuming dietary fiber and bioavailable protein prior to starches to slow gastric emptying, attenuate GIP/GLP-1 spikes, and flatten postprandial glucose curves.',
        evidenceGrade: 'High'
      },
      {
        title: 'Insulin-Sensitizing Micronutrient Cofactors',
        description: 'Optimizing bioactive magnesium, chromium picolinate, and alpha-lipoic acid to support intracellular tyrosine kinase receptor signaling.',
        evidenceGrade: 'Moderate'
      },
      {
        title: 'Circadian Nutritional Entrainment',
        description: 'Aligning energy intake with natural peripheral tissue insulin sensitivity chronobiology (higher daytime insulin sensitivity, reduced late-evening glycemic clearance).',
        evidenceGrade: 'Moderate'
      }
    ],
    clinicalFocus: 'Identifying early glycemic dysregulation years before overt diagnostic thresholds, addressing reactive hypoglycemia, postprandial lethargy, and visceral adiposity accumulation.',
    dietaryPatterns: ['Low-glycemic Mediterranean pattern', 'Fiber-rich whole plant foods', 'Targeted meal-timing windows', 'Adequate dietary protein (1.2–1.6 g/kg)'],
    references: [
      {
        citation: 'Shukla AP, et al. Food Order Has a Significant Impact on Postprandial Glucose and Insulin Levels. Diabetes Care. 2015.',
        source: 'Diabetes Care',
        year: 2015
      },
      {
        citation: 'Petersen MC, Shulman GI. Mechanisms of Insulin Action and Insulin Resistance. Physiol Rev. 2018.',
        source: 'Physiological Reviews',
        year: 2018
      }
    ]
  },
  {
    id: 'liver-fat-metabolism',
    title: 'Liver Health & Fat Metabolism',
    shortDescription: 'Hepatic lipid handling, de novo lipogenesis, and Phase I/II biotransformation biochemistry.',
    fullOverview: 'The liver coordinates intermediary metabolism, packaging triglycerides into very-low-density lipoproteins (VLDL), synthesizing bile acids from cholesterol, and converting fat-soluble endogenous and exogenous compounds into water-soluble metabolites for renal and biliary excretion.',
    physiologicalRole: 'Hepatocyte enzymatic biotransformation occurs in two interconnected phases: Phase I (Cytochrome P450 oxidation, hydroxylation) followed swiftly by Phase II (Glucuronidation, Sulfation, Glutathione conjugation, Methylation, Glycination) to neutralize reactive intermediate electrophiles.',
    systemsConnected: ['Digestion & Bile Clearance', 'Metabolic Homeostasis', 'Gut-Liver Portal Axis', 'Hormone Inactivation'],
    keyBiomarkers: ['ALT, AST & GGT', 'Lipid Subfractions (ApoB, LDL-P)', 'Bilirubin Fractions', 'Homocysteine (Methylation proxy)', 'Ultrasound Hepatic Steatosis Index'],
    nutritionalStrategies: [
      {
        title: 'Glutathione & Sulfur Amino Acid Support',
        description: 'Dietary cruciferous glucosinolates (sulforaphane precursors), N-acetylcysteine, and sulfur-rich brassicas to upregulate Nrf2-mediated antioxidant response elements and glutathione S-transferases.',
        evidenceGrade: 'High'
      },
      {
        title: 'Choline & Methyl Donor Balance',
        description: 'Phosphatidylcholine, betaine, and active folate/B12 to prevent hepatic steatosis by facilitating hepatic VLDL export.',
        evidenceGrade: 'High'
      },
      {
        title: 'Bile Acid Flow & Bitter Stimulation',
        description: 'Herbal bitters (taraxacum, artichoke cynarin) stimulating choleretic activity, promoting healthy enterohepatic circulation and toxin elimination.',
        evidenceGrade: 'Emerging'
      }
    ],
    clinicalFocus: 'Non-alcoholic fatty liver physiology, estrogen metabolite conjugation, sluggish biliary dynamics, and supporting real physiological detoxification pathways without unscientific cleanse gimmicks.',
    dietaryPatterns: ['Sulfur-dense vegetables (alliums, brassicas)', 'Choline-rich eggs, poultry, and legumes', 'Restricted dietary fructose & industrial seed oils', 'Dandelion and artichoke bitter teas'],
    references: [
      {
        citation: 'Hodges RE, Minich DM. Modulation of Metabolic Detoxification Pathways Using Foods and Food-Derived Components. J Nutr Metab. 2015.',
        source: 'Journal of Nutrition and Metabolism',
        year: 2015
      },
      {
        citation: 'Corbin KD, Zeisel SH. Choline metabolism provides novel insights into nonalcoholic fatty liver disease. Curr Opin Gastroenterol. 2012.',
        source: 'Current Opinion in Gastroenterology',
        year: 2012
      }
    ]
  },
  {
    id: 'inflammation-immune',
    title: 'Inflammation & Immune Balance',
    shortDescription: 'Innate and adaptive immune modulation, cytokine signaling, and specialized pro-resolving mediators.',
    fullOverview: 'Inflammation is an essential, life-preserving defense mechanism; however, failure of active inflammatory resolution leads to persistent low-grade systemic inflammation (inflammaging). This chronic state damages endothelial tissue, impairs insulin receptor signaling, accelerates cellular senescence, and alters central nervous system neurochemistry.',
    physiologicalRole: 'Polyunsaturated fatty acids are metabolized via Cyclooxygenase (COX) and Lipoxygenase (LOX) into prostaglandins, leukotrienes, or Specialized Pro-resolving Mediators (SPMs: resolvins, protectins, maresins) that actively coordinate tissue repair.',
    systemsConnected: ['Cardiovascular Endothelium', 'Neurobiology', 'Gut Mucosal Barrier', 'Joint and Musculoskeletal Tissue'],
    keyBiomarkers: ['High-Sensitivity C-Reactive Protein (hs-CRP)', 'Omega-3 Index (EPA + DHA %)', 'Fibrinogen', 'IL-6 / TNF-alpha', 'Neutrophil-to-Lymphocyte Ratio (NLR)'],
    nutritionalStrategies: [
      {
        title: 'Eicosanoid Ratio Modulation',
        description: 'Elevating long-chain marine omega-3 fatty acids (EPA, DHA) to displace arachidonic acid in leukocyte cell membranes and promote SPM biosynthesis.',
        evidenceGrade: 'High'
      },
      {
        title: 'NF-kB Transcriptional Inhibition',
        description: 'Curcuminoids, resveratrol, and anthocyanin extracts downregulating nuclear translocation of nuclear factor kappa B.',
        evidenceGrade: 'Moderate'
      },
      {
        title: 'Vitamin D3 & K2 Synergism',
        description: 'Optimizing calcitriol levels to promote regulatory T-cell (Treg) differentiation and dampen pro-inflammatory Th17 pathways.',
        evidenceGrade: 'High'
      }
    ],
    clinicalFocus: 'Differentiating between acute physiological inflammatory responses and unresolved chronic subclinical inflammation contributing to fatigue, joint stiffness, and metabolic dysfunction.',
    dietaryPatterns: ['Traditional Mediterranean anti-inflammatory diet', 'Wild-caught cold-water fish', 'Colorful polyphenol array (deep reds, purples, greens)', 'Elimination of advanced glycation end-products (AGEs)'],
    references: [
      {
        citation: 'Serhan CN. Pro-resolving lipid mediators are leads for resolution physiology. Nature. 2014;510:92-101.',
        source: 'Nature',
        year: 2014
      },
      {
        citation: 'Calder PC. Omega-3 fatty acids and inflammatory processes. Nutrients. 2010;2(3):355-374.',
        source: 'Nutrients',
        year: 2010
      }
    ]
  },
  {
    id: 'mitochondria-cellular-energy',
    title: 'Mitochondria & Cellular Energy',
    shortDescription: 'Oxidative phosphorylation, reactive oxygen species buffering, and mitochondrial biogenesis.',
    fullOverview: 'Mitochondria generate over 90% of cellular ATP via the electron transport chain (Complexes I–IV and ATP Synthase). Beyond energy currency, mitochondria function as essential signaling hubs for calcium homeostasis, apoptosis, steroidogenesis, and metabolic substrate sensing.',
    physiologicalRole: 'The Krebs (TCA) cycle reduces NAD+ and FAD to NADH and FADH2, which feed electrons into inner mitochondrial membrane complexes, establishing a proton gradient driving ATP phosphorylation.',
    systemsConnected: ['Brain & Cognitive Function', 'Cardiovascular Output', 'Muscle Metabolic Performance', 'Endocrine Glandular Output'],
    keyBiomarkers: ['Urinary Organic Acids (Citrate, Succinate, Malate)', 'CoQ10 Serum Levels', 'Fasting Lactate / Pyruvate Ratio', 'Lipid Peroxides / 8-OHdG'],
    nutritionalStrategies: [
      {
        title: 'Electron Transport Chain Cofactor Triad',
        description: 'Coenzyme Q10 (Ubiquinol), Alpha-Lipoic Acid, and PQQ to support electron shuttling and protect inner mitochondrial cardiolipin membranes.',
        evidenceGrade: 'Moderate'
      },
      {
        title: 'NAD+ Salvage Pathway Substrates',
        description: 'Nicotinamide riboside or NMN paired with sirtuin-activating polyphenols (quercetin, resveratrol) to sustain mitochondrial sirtuin (SIRT3) deacetylation activity.',
        evidenceGrade: 'Emerging'
      },
      {
        title: 'Mitochondrial Biogenesis Induction',
        description: 'Zone 2 aerobic exercise and mild caloric or carbohydrate restriction stimulating PGC-1alpha transcription.',
        evidenceGrade: 'High'
      }
    ],
    clinicalFocus: 'Addressing post-viral mitochondrial uncoupling, persistent mental exhaustion, exercise intolerance, and cellular oxidative damage without ungrounded panaceas.',
    dietaryPatterns: ['Dietary riboflavin, niacin, thiamine and B-complex rich foods', 'Grass-fed organ meats or pastured poultry', 'Dark leafy greens (folate and magnesium for ATP complexes)', 'Intermittent fasting under qualified guidance'],
    references: [
      {
        citation: 'Wallace DC. A mitochondrial paradigm of metabolic and degenerative diseases, aging, and cancer. Am J Clin Pathol. 2005.',
        source: 'American Journal of Clinical Pathology',
        year: 2005
      },
      {
        citation: 'Scarpulla RC. Metabolic regulation of mitochondrial biogenesis through the PGC-1 transcriptional coactivator family. Physiol Rev. 2011.',
        source: 'Physiological Reviews',
        year: 2011
      }
    ]
  },
  {
    id: 'nutrient-biochemistry',
    title: 'Nutrient Status & Biochemistry',
    shortDescription: 'Micronutrient bioavailability, intracellular enzyme cofactors, and biochemical individuality.',
    fullOverview: 'Standard serum lab ranges frequently capture gross pathology rather than functional sufficiency. Nutritional biochemistry recognizes that enzymes require specific mineral cofactors, vitamin coenzymes, and amino acid substrates to operate at physiological velocity.',
    physiologicalRole: 'Over 300 human enzymes require zinc; more than 600 enzymatic reactions depend on magnesium. Suboptimal status impairs DNA repair, neurotransmitter synthesis, methylation, and detoxification before frank deficiency diseases manifest.',
    systemsConnected: ['Enzyme Kinetics', 'Neurotransmitter Synthesis', 'Epigenetic Methylation', 'Bone & Structural Matrix'],
    keyBiomarkers: ['RBC Magnesium & Zinc', 'Ferritin & Iron Saturation', 'Methylmalonic Acid (MMA for B12)', 'Active Folate & Homocysteine', 'Vitamin D 25(OH)D'],
    nutritionalStrategies: [
      {
        title: 'Nutrient Bioavailability & Chelation',
        description: 'Selecting bisglycinate and malate mineral forms with superior intestinal carrier-mediated uptake and lower gastrointestinal side effects.',
        evidenceGrade: 'High'
      },
      {
        title: 'Synergistic Mineral Ratios',
        description: 'Balancing zinc with copper (10:1 ratio), and calcium with magnesium and vitamin K2 (MK-7) to guide mineral deposition into bone matrix rather than vascular walls.',
        evidenceGrade: 'High'
      },
      {
        title: 'Food-First Nutrient Repletion',
        description: 'Prioritizing whole-food nutrient matrices that supply synergistic bioflavonoids, peptides, and fiber alongside isolated vitamins.',
        evidenceGrade: 'High'
      }
    ],
    clinicalFocus: 'Detecting functional micronutrient insufficiencies caused by medication depletion (e.g., PPIs, metformin, statins), malabsorption, or increased metabolic demand.',
    dietaryPatterns: ['Soaked and sprouted legumes (reduced phytate antinutrients)', 'Mineral-rich bone broths and sea vegetables', 'Pastured eggs and wild bivalves (oysters, mussels for zinc/B12)', 'Rainbow vegetable intake'],
    references: [
      {
        citation: 'Ames BN. Prolonging healthy aging: Longevity vitamins and proteins. PNAS. 2018;115(43):10836-10844.',
        source: 'Proceedings of the National Academy of Sciences',
        year: 2018
      },
      {
        citation: 'Gombart AF, et al. A Review of the Science of Micronutrients and Immune Health. Nutrients. 2020;12(1):236.',
        source: 'Nutrients',
        year: 2020
      }
    ]
  },
  {
    id: 'stress-neuroendocrine',
    title: 'Stress, Sleep & Mind-Body Health',
    shortDescription: 'Hypothalamic-Pituitary-Adrenal (HPA) axis dynamics, autonomic tone, and circadian biology.',
    fullOverview: 'Chronic physiological and psychological stressors trigger sustained corticotropin-releasing hormone (CRH) and glucocorticoid secretion. Over time, flattened cortisol diurnal rhythms disrupt intestinal permeability, elevate hepatic gluconeogenesis, alter sleep architecture, and dysregulate thyroid hormone peripheral conversion.',
    physiologicalRole: 'The locus coeruleus-norepinephrine and HPA axis regulate fight-or-flight responses. Parasympathetic vagal nerve stimulation promotes digestive motility, secretin release, and heart rate variability (HRV) recovery.',
    systemsConnected: ['Thyroid & Sex Hormones', 'Gut Motility & Digestion', 'Sleep Architecture', 'Cardiovascular HRV'],
    keyBiomarkers: ['Salivary / Urinary 4-Point Diurnal Cortisol & DHEA', 'Heart Rate Variability (HRV)', 'hs-Troponin & Morning Blood Pressure', 'Free T3 / Reverse T3 Ratio'],
    nutritionalStrategies: [
      {
        title: 'Adaptogenic Botanical Modulation',
        description: 'Evidence-supported adaptogens (Withania somnifera / Ashwagandha, Rhodiola rosea) modulating glucocorticoid receptor sensitivity and blunting cortisol surges.',
        evidenceGrade: 'Moderate'
      },
      {
        title: 'Inhibitory Neurotransmitter Support',
        description: 'L-Theanine, GABA precursors, and phosphatidylserine to promote alpha-wave relaxation without daytime sedation.',
        evidenceGrade: 'Moderate'
      },
      {
        title: 'Circadian Light & Feeding Sync',
        description: 'Morning full-spectrum daylight exposure paired with protein-anchored breakfast to set suprachiasmatic nucleus rhythms and nighttime melatonin production.',
        evidenceGrade: 'High'
      }
    ],
    clinicalFocus: 'Managing HPA axis dysfunction, unrefreshing sleep, circadian misalignment, stress-induced digestive spasms, and sympathetic overactivation.',
    dietaryPatterns: ['Consistent regular meal timing', 'Caffeine limitation post-midday', 'Magnesium-rich evening meal additions', 'Chamomile, passionflower, and tart cherry concentrates'],
    references: [
      {
        citation: 'McEwen BS. Neurobiological and Systemic Effects of Chronic Stress. Chronic Stress. 2017.',
        source: 'Chronic Stress (Thousand Oaks)',
        year: 2017
      },
      {
        citation: 'Chandrasekhar K, et al. A prospective, randomized double-blind study of safety and efficacy of high-concentration Ashwagandha root extract. Indian J Psychol Med. 2012.',
        source: 'Indian Journal of Psychological Medicine',
        year: 2012
      }
    ]
  },
  {
    id: 'personalized-nutrigenomics',
    title: 'Personalized Nutrition & Nutrigenomics',
    shortDescription: 'Genetic polymorphisms (SNPs), individual biochemical variation, and gene-diet interactions.',
    fullOverview: 'Single nucleotide polymorphisms (SNPs) in critical metabolic genes subtly alter enzymatic binding affinities and cofactor requirements. Rather than determining destiny, genetics provides a personalized roadmap of nutritional sensitivities and biological priorities.',
    physiologicalRole: 'Variants in MTHFR (methylation), APOE (lipid clearance), FADS1/2 (fatty acid desaturation), and CYP1A2 (caffeine biotransformation) alter how individuals metabolize specific dietary components and nutrients.',
    systemsConnected: ['One-Carbon Metabolism', 'Lipid Transport', 'Phase I Detoxification', 'Vitamin D Receptor Binding'],
    keyBiomarkers: ['MTHFR (C677T, A1298C)', 'APOE Genotype (e2/e3/e4)', 'CYP1A2 Phenotype', 'COMT Val158Met', 'VDR Polymorphism Analysis'],
    nutritionalStrategies: [
      {
        title: 'Methylation Pathway Optimization',
        description: 'Utilizing active methylated folate (L-5-MTHF) and methylcobalamin instead of synthetic pteroylmonoglutamic acid for individuals with MTHFR variants.',
        evidenceGrade: 'High'
      },
      {
        title: 'Lipid-Responsive Macronutrient Tailoring',
        description: 'Calibrating saturated vs monounsaturated fat ratios based on APOE4 status to maintain vascular and neurocognitive health.',
        evidenceGrade: 'Moderate'
      },
      {
        title: 'Individual Fatty Acid Conversion Adjustment',
        description: 'Supplying preformed EPA/DHA directly when FADS1 desaturase polymorphisms hinder plant-derived ALA conversion.',
        evidenceGrade: 'High'
      }
    ],
    clinicalFocus: 'Navigating genetic predispositions with realistic clinical nuance, avoiding genetic fatalism while establishing custom dietary guidelines that respect biological uniqueness.',
    dietaryPatterns: ['Genotype-informed dietary ratios', 'Active methylated vitamin forms', 'Individualized fat quality profiles', 'Targeted choline and betaine sources'],
    references: [
      {
        citation: 'Ordovas JM, et al. Personalized nutrition and health: Current status and future perspectives. BMJ. 2018;361:k2173.',
        source: 'British Medical Journal',
        year: 2018
      },
      {
        citation: 'Ferguson LR, et al. Nutrigenomics and Nutrigenetics in Functional Foods and Personalized Nutrition. CRC Press. 2019.',
        source: 'Clinical Nutrition Research',
        year: 2019
      }
    ]
  }
];
