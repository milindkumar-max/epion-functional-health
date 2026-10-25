import { BiologicalPathway } from '../types';

export const BIOLOGICAL_PATHWAYS: BiologicalPathway[] = [
  {
    id: 'carbohydrate-insulin',
    title: 'Carbohydrate Digestion & Insulin Receptor Signaling',
    category: 'Metabolic Biochemistry',
    subtitle: 'From dietary starch breakdown to intracellular GLUT4 translocation',
    overview: 'This pathway illustrates how complex carbohydrates are broken down by salivary and pancreatic amylases, absorbed as monosaccharides across enterocytes via SGLT1, transported through portal circulation, and trigger pancreatic beta-cell insulin exocytosis to stimulate cellular glucose uptake.',
    systemsInvolved: ['Gastrointestinal Tract', 'Endocrine Pancreas', 'Skeletal Muscle', 'Adipose Tissue'],
    clinicalTakeaway: 'Macronutrient sequencing, soluble viscous fibers, and dietary polyphenols can moderate the velocity of glucose entry, preserving insulin receptor sensitivity and attenuating postprandial glycemic volatility.',
    steps: [
      {
        stepNumber: 1,
        title: 'Luminal Hydrolysis',
        biochemicalMechanism: 'Dietary starches (amylose and amylopectin) are cleaved at alpha-1,4 glycosidic bonds by salivary and pancreatic alpha-amylase into maltose, maltotriose, and limit dextrins.',
        keyEnzymesOrReceptors: ['Salivary Amylase', 'Pancreatic Amylase', 'Brush Border Glucosidases'],
        criticalCofactors: ['Chloride ions (activator)', 'Calcium ions (structural stability)'],
        nutritionalInputs: ['Intact whole grain fibers', 'Legume resistance to rapid enzymatic breakdown', 'Polyphenol alpha-glucosidase inhibitors (green tea EGCG, berries)'],
        clinicalSignificance: 'Highly processed starches bypass normal luminal pacing, triggering rapid gastric emptying and precipitously steep glucose spikes.'
      },
      {
        stepNumber: 2,
        title: 'Enterocyte Transport & Incretin Release',
        biochemicalMechanism: 'Glucose monomers are transported across the apical intestinal brush border by Sodium-Glucose Cotransporter 1 (SGLT1) and exit into portal capillaries via GLUT2, simultaneously stimulating enteroendocrine L-cells to release GLP-1.',
        keyEnzymesOrReceptors: ['SGLT1 (apical)', 'GLUT2 (basolateral)', 'GLP-1 Receptor'],
        criticalCofactors: ['Extracellular Sodium Gradient (Na+/K+ ATPase driven)'],
        nutritionalInputs: ['Viscous soluble fibers (beta-glucan, psyllium)', 'Prebiotic fibers augmenting basal GLP-1 tone'],
        clinicalSignificance: 'Soluble dietary fibers create a gel matrix that slows SGLT1 diffusion rates, flattening postprandial glucose curves without pharmaceutical inhibitors.'
      },
      {
        stepNumber: 3,
        title: 'Pancreatic Beta-Cell Coupling & Insulin Exocytosis',
        biochemicalMechanism: 'Portal glucose enters pancreatic beta cells via GLUT1/2. Intracellular glycolysis and oxidative phosphorylation elevate the ATP/ADP ratio, closing ATP-sensitive K+ channels, depolarizing the membrane, and opening voltage-gated Ca2+ channels to trigger insulin granule exocytosis.',
        keyEnzymesOrReceptors: ['Glucokinase (hexokinase IV)', 'KATP channel (Kir6.2/SUR1)', 'L-type Ca2+ Channels'],
        criticalCofactors: ['Magnesium (essential for all ATP-dependent kinase phosphorylation steps)', 'Zinc (insulin hexamer crystallization)'],
        nutritionalInputs: ['Magnesium-dense leafy greens', 'Dietary amino acids (leucine, arginine synergistically priming exocytosis)'],
        clinicalSignificance: 'Intracellular magnesium deficiency impairs glucokinase kinetics and blunts normal beta-cell stimulus-secretion coupling.'
      },
      {
        stepNumber: 4,
        title: 'Insulin Receptor Tyrosine Kinase Activation',
        biochemicalMechanism: 'Circulating insulin binds the extracellular alpha subunits of the insulin receptor (INSR), inducing transphosphorylation of intracellular beta subunits. This recruits and phosphorylates Insulin Receptor Substrate-1 (IRS-1).',
        keyEnzymesOrReceptors: ['Insulin Receptor (INSR)', 'IRS-1 / IRS-2', 'PI3K (Phosphoinositide 3-Kinase)'],
        criticalCofactors: ['Chromium (Chromodulin amplification of kinase activity)', 'Vanadate trace cofactors'],
        nutritionalInputs: ['Antioxidant-rich botanical matrix mitigating serine phosphorylation of IRS-1 by inflammatory kinases like JNK and IKK-beta'],
        clinicalSignificance: 'Intracellular lipid overload (diacylglycerols, ceramides) and chronic TNF-alpha activate serine kinases, halting normal IRS-1 signaling and causing clinical insulin resistance.'
      },
      {
        stepNumber: 5,
        title: 'GLUT4 Translocation & Glycogen Synthesis',
        biochemicalMechanism: 'Phosphorylated IRS-1 activates PI3K, converting PIP2 to PIP3, which recruits Akt/PKB via PDK1. Activated Akt phosphorylates AS160, releasing inhibition on Rab GTPases and allowing intracellular vesicles containing GLUT4 to fuse with the plasma membrane, facilitating facilitated glucose diffusion into myocytes.',
        keyEnzymesOrReceptors: ['Akt/Protein Kinase B', 'AS160 (TBC1D4)', 'GLUT4 Storage Vesicles (GSVs)', 'Glycogen Synthase'],
        criticalCofactors: ['Inositol (myo-inositol and D-chiro-inositol serving as second messenger components)'],
        nutritionalInputs: ['Contractile muscle stimulation (exercise activates GLUT4 via AMPK independently of insulin)', 'Alpha-lipoic acid'],
        clinicalSignificance: 'Postprandial movement (e.g. 15-minute gentle walk) bypasses impaired IRS-1/Akt pathways entirely through AMPK-mediated GLUT4 translocation.'
      }
    ]
  },
  {
    id: 'hepatic-biotransformation',
    title: 'Hepatic Biotransformation (Phase I & Phase II Pathways)',
    category: 'Biochemical Detoxification',
    subtitle: 'Two-phase enzymatic neutralization of lipophilic metabolites and environmental compounds',
    overview: 'The liver converts non-polar (fat-soluble) internal hormones, dietary byproducts, and exogenous compounds into polar (water-soluble) substances suitable for biliary excretion into stool or renal excretion in urine.',
    systemsInvolved: ['Liver Hepatocytes', 'Biliary Tree', 'Enterohepatic Circulation', 'Renal Excretion'],
    clinicalTakeaway: 'Detoxification is a constant, enzyme-mediated physiological process requiring dense micronutrient and amino acid cofactors. Phase I creates reactive electrophilic intermediates; Phase II must match or exceed Phase I velocity to prevent cellular oxidative damage.',
    steps: [
      {
        stepNumber: 1,
        title: 'Phase I Functionalization (Cytochrome P450)',
        biochemicalMechanism: 'Membrane-bound CYP450 superfamily monooxygenases introduce a polar functional group (-OH, -COOH, -NH2, -SH) to lipophilic substrates via oxidation, reduction, or hydrolysis, rendering them biologically active electrophiles.',
        keyEnzymesOrReceptors: ['CYP1A1, CYP1A2', 'CYP2D6', 'CYP3A4', 'NADPH-Cytochrome P450 Reductase'],
        criticalCofactors: ['Riboflavin (FAD/FMN)', 'Niacin (NADPH)', 'Iron (Heme center)', 'Magnesium'],
        nutritionalInputs: ['Indole-3-carbinol / DIM from cruciferous vegetables modulating CYP1A1 vs CYP1B1 estrogen hydroxylation'],
        clinicalSignificance: 'Uncoupled Phase I activity generates reactive oxygen species (ROS) and reactive intermediates that are significantly more toxic than the original compound if Phase II conjugation is nutrient-starved.'
      },
      {
        stepNumber: 2,
        title: 'Intermediary Antioxidant Shielding',
        biochemicalMechanism: 'Reactive intermediate metabolites generate hydroxyl radicals and superoxide anions. Endogenous antioxidant enzymes rapidly dismutate and neutralize these radicals before Phase II coupling.',
        keyEnzymesOrReceptors: ['Superoxide Dismutase (SOD1/SOD2)', 'Glutathione Peroxidase (GPx)', 'Catalase'],
        criticalCofactors: ['Zinc & Copper (SOD1)', 'Manganese (SOD2 mitochondrial)', 'Selenium (GPx active site)'],
        nutritionalInputs: ['Selenium-rich Brazil nuts', 'Dietary zinc', 'Polyphenol Nrf2 transcription activators (resveratrol, sulforaphane)'],
        clinicalSignificance: 'Inadequate selenium or trace mineral status leads to hepatocyte lipid peroxidation and elevated serum transaminases.'
      },
      {
        stepNumber: 3,
        title: 'Phase II Conjugation (Enzymatic Coupling)',
        biochemicalMechanism: 'Specific transferase enzymes conjugate the functionalized Phase I metabolite to an endogenous water-soluble donor molecule: Glucuronic acid (UGTs), Glutathione (GSTs), Sulfate (SULTs), Methyl groups (COMT), Glycine, or Acetyl-CoA.',
        keyEnzymesOrReceptors: ['Glutathione S-Transferase (GST)', 'UDP-Glucuronosyltransferase (UGT)', 'Sulfotransferase (SULT)', 'COMT'],
        criticalCofactors: ['Active B6 (P5P)', 'B12 & Folate (SAMe generation for methylation)', 'Molybdenum (Sulfite oxidase for sulfation)'],
        nutritionalInputs: ['N-acetylcysteine and dietary glycine for glutathione synthesis', 'Cruciferous sulforaphane upregulating GST expression', 'Choline and betaine'],
        clinicalSignificance: 'Depletion of glutathione or sulfur amino acids stalls Phase II, leading to tissue accumulation of reactive intermediates and endocrine disruptor recirculation.'
      },
      {
        stepNumber: 4,
        title: 'Phase III Elimination & Transporter Export',
        biochemicalMechanism: 'ATP-Binding Cassette (ABC) efflux pump transporters, including Multidrug Resistance Proteins (MRP2, MDR1) and Bile Salt Export Pump (BSEP), pump conjugated water-soluble metabolites into bile canaliculi or blood for renal filtration.',
        keyEnzymesOrReceptors: ['MRP2 / ABCC2', 'BSEP / ABCB11', 'P-glycoprotein / ABCB1'],
        criticalCofactors: ['Cellular ATP (mitochondrial energy dependent)'],
        nutritionalInputs: ['Artichoke cynarin and dandelion bitters promoting bile flow', 'Adequate dietary hydration'],
        clinicalSignificance: 'Cholestasis (sluggish bile flow) causes toxic conjugated compounds to back up into systemic circulation, manifesting as pruritus, fatigue, and headaches.'
      },
      {
        stepNumber: 5,
        title: 'Enterohepatic Elimination vs. Beta-Glucuronidase Deconjugation',
        biochemicalMechanism: 'Bile dumps into the duodenum; conjugated metabolites travel to the colon bound to dietary insoluble fibers for excretion. However, dysbiotic bacteria producing excessive beta-glucuronidase enzymes can uncouple the conjugate, allowing the free toxin/estrogen to be reabsorbed back through the portal vein.',
        keyEnzymesOrReceptors: ['Bacterial Beta-Glucuronidase', 'Intestinal Epithelial Transporters'],
        criticalCofactors: ['Calcium D-Glucarate (inhibitor of beta-glucuronidase)'],
        nutritionalInputs: ['Calcium D-glucarate from apples, cruciferous vegetables, and citrus', 'Insoluble and soluble dietary fiber binding biliary waste'],
        clinicalSignificance: 'Elevated fecal beta-glucuronidase drives estrogen dominance and toxic reabsorption, highlighting the inescapable connection between gut dysbiosis and liver clearance.'
      }
    ]
  },
  {
    id: 'gut-barrier-microbiome',
    title: 'Gut Barrier Integrity & Microbial Metabolite Cascade',
    category: 'Gastrointestinal Immunology',
    subtitle: 'From dietary prebiotic fiber fermentation to mucosal immunity and systemic tolerance',
    overview: 'Trillions of commensal microorganisms ferment complex dietary fibers and polyphenols into bioactive postbiotic signaling molecules, directly feeding the single-cell enterocyte barrier, fortifying tight junctions, and modulating systemic immune tolerance.',
    systemsInvolved: ['Intestinal Epithelium', 'Gut-Associated Lymphoid Tissue (GALT)', 'Vagus Nerve Axis', 'Systemic Circulation'],
    clinicalTakeaway: 'The intestinal barrier is dynamic. A lack of fermentable substrate forces microbes to consume host mucin glycoproteins, thinning the protective barrier and triggering endotoxemia-mediated low-grade inflammation.',
    steps: [
      {
        stepNumber: 1,
        title: 'Polysaccharide Fermentation & SCFA Synthesis',
        biochemicalMechanism: 'Anaerobic commensal microbes in the cecum and ascending colon ferment non-digestible plant fibers through anaerobic glycolysis and the Wood-Ljungdahl pathway into short-chain fatty acids: Acetate (60%), Propionate (20%), and Butyrate (20%).',
        keyEnzymesOrReceptors: ['Bacterial Carbohydrate-Active Enzymes (CAZymes)', 'Phosphotransbutyrylase', 'Butyrate Kinase'],
        criticalCofactors: ['Anaerobic colonic redox state', 'Optimal luminal pH (5.5–6.5)'],
        nutritionalInputs: ['Resistant starches (cooked and cooled tubers, green banana flour)', 'Inulin, beta-glucan, acacia fiber, arabinoxylans'],
        clinicalSignificance: 'Diets low in fiber result in dramatic drops in luminal butyrate concentrations, depriving colonocytes of their primary energetic fuel.'
      },
      {
        stepNumber: 2,
        title: 'Colonocyte Fueling & Tight Junction Assembly',
        biochemicalMechanism: 'Butyrate enters colonocytes via monocarboxylate transporters (MCT1) and is oxidized via mitochondrial beta-oxidation, consuming local oxygen to maintain epithelial hypoxia. This hypoxia activates Hypoxia-Inducible Factor 1-alpha (HIF-1alpha), driving transcription of Claudin-1, Occludin, and Zonula Occludens-1 (ZO-1).',
        keyEnzymesOrReceptors: ['MCT1 (SLC16A1)', 'HIF-1alpha', 'ZO-1, Occludin, Claudin-1'],
        criticalCofactors: ['Zinc (essential for tight junction protein quaternary structure)', 'L-Glutamine'],
        nutritionalInputs: ['Zinc carnosine', 'L-Glutamine providing fuel for small intestinal enterocytes', 'Adequate dietary threonine for mucin peptide backbone'],
        clinicalSignificance: 'Without butyrate oxidation, colonocytes shift to anaerobic glycolysis, epithelial oxygen levels rise, and tight junctions disassemble, leading to intestinal hyperpermeability.'
      },
      {
        stepNumber: 3,
        title: 'Mucin Hydrodynamics & Glandular Secretion',
        biochemicalMechanism: 'Goblet cells continuously synthesize and secrete MUC2 glycoproteins, creating a dense inner sterile mucus layer and a loose outer colonized layer that prevents bacterial direct contact with the host epithelium.',
        keyEnzymesOrReceptors: ['MUC2 Mucin Glycoprotein', 'Akkermansia muciniphila (stimulates mucus renewal)'],
        criticalCofactors: ['Threonine and Serine (richly glycosylated residues)', 'Adequate bile acids'],
        nutritionalInputs: ['Polyphenols (pomegranate ellagitannins, cranberries) selectively promoting Akkermansia muciniphila abundance'],
        clinicalSignificance: 'Erosion of the protective mucin layer brings bacterial antigens directly into physical contact with toll-like receptors on host epithelial cells.'
      },
      {
        stepNumber: 4,
        title: 'GALT Immune Tolerance & Treg Induction',
        biochemicalMechanism: 'Luminal SCFAs bind G-protein coupled receptors (GPR41/FFAR3, GPR43/FFAR2, and GPR109A) on dendritic cells and T-lymphocytes, inhibiting histone deacetylases (HDACs). This epigenetic change drives Foxp3 expression, generating immunosuppressive Regulatory T-cells (Tregs) that secrete anti-inflammatory IL-10 and TGF-beta.',
        keyEnzymesOrReceptors: ['GPR43 / FFAR2', 'GPR109A', 'Histone Deacetylases (HDACs)', 'Foxp3'],
        criticalCofactors: ['Vitamin A (Retinoic acid for dendritic cell tolerance priming)', 'Vitamin D3'],
        nutritionalInputs: ['Provitamin A beta-carotene alongside bioavailable fat', 'Fermented foods providing live lactic acid bacteria strains'],
        clinicalSignificance: 'Deficient SCFA signaling allows aberrant Th1 and Th17 inflammatory polarization, driving chronic systemic autoimmunity and food reactivities.'
      },
      {
        stepNumber: 5,
        title: 'Endotoxin Containment & Hepatic Protection',
        biochemicalMechanism: 'Intact alkaline phosphatase (IAP) at the brush border dephosphorylates the lipid A moiety of Gram-negative bacterial lipopolysaccharide (LPS), neutralizing its endotoxic potential before systemic absorption.',
        keyEnzymesOrReceptors: ['Intestinal Alkaline Phosphatase (IAP)', 'Toll-Like Receptor 4 (TLR4)'],
        criticalCofactors: ['Magnesium and Zinc (IAP catalytic site cofactors)'],
        nutritionalInputs: ['Dietary omega-3 fatty acids upregulating IAP expression', 'Minimization of high-fat meals paired with industrial emulsifiers'],
        clinicalSignificance: 'When tight junctions fail and IAP is overwhelmed, circulating endotoxins trigger metabolic endotoxemia, driving systemic insulin resistance and neuroinflammation.'
      }
    ]
  },
  {
    id: 'mitochondrial-etc',
    title: 'Mitochondrial Energy & Micronutrient Cofactors',
    category: 'Cellular Bioenergetics',
    subtitle: 'From TCA cycle reducing equivalents to ATP Synthase rotary phosphorylation',
    overview: 'This pathway traces cellular respiration from substrate entry into the mitochondrial matrix through the Krebs cycle, electron transport complexes I through IV, and the rotary electrochemical proton motor generating adenosine triphosphate (ATP).',
    systemsInvolved: ['Mitochondrial Matrix', 'Inner Mitochondrial Membrane', 'Cellular Cytoplasm', 'Tissues with High Metabolic Demand (Brain, Heart, Muscle)'],
    clinicalTakeaway: 'Every step in the electron transport chain depends on specific, non-negotiable micronutrients (iron-sulfur clusters, copper, riboflavin, niacin, CoQ10). Micronutrient depletion creates electron leakage, generating oxidative stress rather than energetic output.',
    steps: [
      {
        stepNumber: 1,
        title: 'Pyruvate Decarboxylation & TCA Entry',
        biochemicalMechanism: 'Glycolytic pyruvate enters the mitochondrial matrix via the mitochondrial pyruvate carrier (MPC) and is converted into Acetyl-CoA by the multi-enzyme Pyruvate Dehydrogenase (PDH) Complex.',
        keyEnzymesOrReceptors: ['Pyruvate Dehydrogenase Complex (E1, E2, E3 subunits)'],
        criticalCofactors: ['Thiamine pyrophosphate (TPP / B1)', 'Lipoic Acid', 'Coenzyme A (Pantothenic Acid / B5)', 'FAD (Riboflavin / B2)', 'NAD+ (Niacin / B3)'],
        nutritionalInputs: ['Unrefined grains, legumes, and nutritional yeast for intact B-vitamin complexes', 'Dietary alpha-lipoic acid'],
        clinicalSignificance: 'Subclinical thiamine or lipoic acid deficiency halts PDH activity, forcing pyruvate reduction to lactic acid and causing post-exertional muscular fatigue.'
      },
      {
        stepNumber: 2,
        title: 'Krebs Cycle Reduction of Electron Carriers',
        biochemicalMechanism: 'Acetyl-CoA combines with oxaloacetate to form citrate. Through eight cyclical enzymatic transformations, the cycle generates 3 NADH, 1 FADH2, and 1 GTP per turn, releasing two CO2 molecules.',
        keyEnzymesOrReceptors: ['Citrate Synthase', 'Isocitrate Dehydrogenase', 'Alpha-Ketoglutarate Dehydrogenase', 'Succinate Dehydrogenase'],
        criticalCofactors: ['Iron-sulfur [Fe-S] clusters (Aconitase)', 'Magnesium & Manganese', 'Vitamin B-complex'],
        nutritionalInputs: ['Bioavailable iron from pasture-raised animal proteins or phytate-reduced plant legumes', 'Magnesium-rich seeds and greens'],
        clinicalSignificance: 'Urinary organic acid testing reveals specific metabolic blocks (e.g. elevated citrate or succinate) pointing directly to deficient enzyme cofactors.'
      },
      {
        stepNumber: 3,
        title: 'Complex I & II Electron Injection',
        biochemicalMechanism: 'NADH oxidizes at Complex I (NADH:ubiquinone oxidoreductase), transferring 2 electrons through FMN and eight Fe-S clusters to Ubiquinone (CoQ10), pumping 4 protons across the membrane. Complex II (Succinate Dehydrogenase) feeds electrons from FADH2 directly to CoQ10 without proton pumping.',
        keyEnzymesOrReceptors: ['Complex I (45 protein subunits)', 'Complex II', 'Coenzyme Q10 (Ubiquinol pool)'],
        criticalCofactors: ['Iron and Sulfur (Fe-S clusters)', 'Flavin Mononucleotide (FMN from Riboflavin)', 'CoQ10'],
        nutritionalInputs: ['Dietary CoQ10 (wild fish, organ meats, sesame seeds)', 'Heme and non-heme iron balanced with dietary vitamin C'],
        clinicalSignificance: 'HMG-CoA reductase inhibitors (statins) block the mevalonate pathway, depleting endogenous CoQ10 synthesis and causing mitochondrial myopathy if unsupplemented.'
      },
      {
        stepNumber: 4,
        title: 'Complex III & IV Electron Relaying to Oxygen',
        biochemicalMechanism: 'Electrons from reduced ubiquinol (QH2) are transferred through Complex III (cytochrome bc1 complex) to Cytochrome c, pumping 4 protons. Cytochrome c transfers electrons to Complex IV (Cytochrome c oxidase), which pumps 2 protons and safely transfers electrons to molecular oxygen, reducing it to water.',
        keyEnzymesOrReceptors: ['Complex III (Cytochrome bc1)', 'Cytochrome c', 'Complex IV (Cytochrome c Oxidase)'],
        criticalCofactors: ['Copper (CuA and CuB centers in Complex IV)', 'Iron-heme a and a3', 'Cardiolipin phospholipid membrane scaffolding'],
        nutritionalInputs: ['Dietary copper (cacao, shiitake mushrooms, shellfish)', 'Alpha-linolenic and linoleic acids supporting cardiolipin integrity'],
        clinicalSignificance: 'Copper deficiency specifically arrests Complex IV function, simulating severe hypoxia and impairing cellular oxygen consumption.'
      },
      {
        stepNumber: 5,
        title: 'Complex V (ATP Synthase) Rotary Phosphorylation',
        biochemicalMechanism: 'The accumulated proton motive force (electrochemical gradient across the inner membrane) drives protons back into the matrix through the F0 rotor subunit of ATP Synthase. This rotation induces conformational shifts in catalytic F1 beta subunits, phosphorylating ADP and inorganic phosphate (Pi) into ATP.',
        keyEnzymesOrReceptors: ['ATP Synthase (Complex V: F0 rotor, F1 catalytic head)'],
        criticalCofactors: ['Magnesium (Mg2+-ADP and Mg2+-ATP are the obligate substrates recognized by the enzyme)'],
        nutritionalInputs: ['Intracellular magnesium optimization (magnesium malate, glycinate)', 'Intermittent fasting activating mitochondrial quality control (mitophagy via PINK1/Parkin)'],
        clinicalSignificance: 'Without sufficient intracellular magnesium, ATP cannot be synthesized or stabilized, regardless of how much substrate or oxygen is available.'
      }
    ]
  },
  {
    id: 'inflammatory-resolution',
    title: 'Inflammatory Resolution & Specialized Pro-Resolving Mediators',
    category: 'Immunonutrition & Lipidomics',
    subtitle: 'From polyunsaturated fatty acid precursors to active tissue repair and phagocytic clearance',
    overview: 'Unlike the historical assumption that inflammation simply fades passively, modern immunology confirms that inflammatory cessation is an active, biochemically orchestrated biological program driven by Specialized Pro-Resolving Mediators (SPMs: resolvins, protectins, maresins).',
    systemsInvolved: ['Vascular Endothelium', 'Tissue Macrophages & Neutrophils', 'Extracellular Matrix', 'Immune Memory Cells'],
    clinicalTakeaway: 'Chronic low-grade inflammation is frequently not an excess of inflammatory initiation, but a failure of active biochemical resolution due to inadequate omega-3 substrate availability and excessive oxidative stress.',
    steps: [
      {
        stepNumber: 1,
        title: 'Phospholipid Cleavage & Eicosanoid Initiation',
        biochemicalMechanism: 'Inflammatory stimuli activate cytosolic Phospholipase A2 (cPLA2), which cleaves arachidonic acid (AA, omega-6) and eicosapentaenoic acid (EPA, omega-3) from cell membrane phospholipids, making them substrates for Cyclooxygenase (COX-2) and 5-Lipoxygenase (5-LOX).',
        keyEnzymesOrReceptors: ['cPLA2', 'COX-2', '5-LOX', 'FLAP (5-Lipoxygenase-activating protein)'],
        criticalCofactors: ['Intracellular Calcium influx', 'Optimal phospholipid membrane membrane fluidity'],
        nutritionalInputs: ['Balanced dietary omega-6 to omega-3 ratio (approaching 3:1 to 1:1, rather than standard Western 16:1)', 'Wild-caught cold-water fish'],
        clinicalSignificance: 'High tissue ratios of arachidonic acid drive dominant synthesis of inflammatory Prostaglandin E2 (PGE2) and Leukotriene B4 (LTB4).'
      },
      {
        stepNumber: 2,
        title: 'Lipid Mediator Class Switching',
        biochemicalMechanism: 'As prostaglandin concentrations peak in the tissue, PGE2 and PGD2 paradoxically upregulate 15-Lipoxygenase (15-LOX) while downregulating 5-LOX. This crucial enzymatic switch ceases production of pro-inflammatory mediators and initiates synthesis of pro-resolving lipoxins and resolvins.',
        keyEnzymesOrReceptors: ['15-Lipoxygenase (15-LOX-1 / ALOX15)', 'Cyclooxygenase-2 (acetylated state)'],
        criticalCofactors: ['Glutathione peroxidase (reducing fatty acid hydroperoxides to active hydroxy intermediates)'],
        nutritionalInputs: ['Polyphenols maintaining active ALOX15 expression without overwhelming oxidative degradation'],
        clinicalSignificance: 'Chronic use of high-dose non-steroidal anti-inflammatory drugs (NSAIDs) blocks COX-2, preventing the early PGE2 trigger needed to initiate class-switching, inadvertently prolonging chronic resolution failure.'
      },
      {
        stepNumber: 3,
        title: 'Biosynthesis of Resolvins, Protectins & Maresins',
        biochemicalMechanism: 'EPA is converted via 18-HEPE into E-series Resolvins (RvE1, RvE2). Docosahexaenoic acid (DHA) is metabolized via 17-HDHA and 14-HDHA into D-series Resolvins (RvD1-RvD6), Protectins (PD1), and Maresins (MaR1) via macrophage 12/15-lipoxygenases.',
        keyEnzymesOrReceptors: ['15-LOX', 'Cytochrome P450 monooxygenases', 'Hydrolases'],
        criticalCofactors: ['Vitamins C and E preventing non-enzymatic free radical peroxidation of fragile polyunsaturated fatty acid sidechains'],
        nutritionalInputs: ['High-potency purified EPA and DHA (or pre-formed specialized pro-resolving mediators)', 'Fat-soluble antioxidants (mixed tocopherols, astaxanthin)'],
        clinicalSignificance: 'Without sufficient membrane EPA and DHA stores, macrophages cannot synthesize resolvins, causing the inflammatory wave to persist indefinitely as a chronic subclinical state.'
      },
      {
        stepNumber: 4,
        title: 'Receptor Activation & Neutrophil Cessation',
        biochemicalMechanism: 'Resolvins bind specific high-affinity G-protein coupled receptors on neutrophils and endothelial cells: ChemR23 (ERV1) for RvE1, and GPR32 (DRV1) and ALX/FPR2 for RvD1. Receptor engagement halts further neutrophil recruitment, prevents endothelial transmigration, and downregulates NF-kB nuclear translocation.',
        keyEnzymesOrReceptors: ['ChemR23 / CMKLR1', 'GPR32 / DRV1', 'ALX / FPR2 Receptor'],
        criticalCofactors: ['Adequate zinc and vitamin D maintaining receptor density and mucosal membrane stability'],
        nutritionalInputs: ['Curcuminoids and boswellia serrata acting synergistically to inhibit downstream pro-inflammatory NF-kB signaling'],
        clinicalSignificance: 'Halting neutrophil infiltration prevents the collateral tissue destruction, elastase release, and scarring that characterize chronic autoimmune and metabolic inflammation.'
      },
      {
        stepNumber: 5,
        title: 'Non-Phlogistic Macrophage Efferocytosis & Tissue Restitution',
        biochemicalMechanism: 'Maresins and Protectins polarize pro-inflammatory M1 macrophages into pro-resolving M2-like reparative phenotypes. These macrophages engulf and digest apoptotic neutrophils (a process termed efferocytosis) without releasing pro-inflammatory cytokines, stimulate lymphatic drainage, and initiate fibroblast collagen remodeling.',
        keyEnzymesOrReceptors: ['MERTK receptor (efferocytosis signaling)', 'Arg-1 (Arginase-1)', 'VEGF-C (lymphatic revascularization)'],
        criticalCofactors: ['Vitamin C (essential cofactor for prolyl hydroxylase in collagen restitution)'],
        nutritionalInputs: ['Vitamin C from raw peppers and camu camu', 'Bioavailable bone broth or collagen peptides providing glycine and proline for structural rebuild'],
        clinicalSignificance: 'Complete efferocytosis terminates the inflammatory episode, restoring normal baseline physiology, endothelial elasticity, and insulin sensitivity.'
      }
    ]
  }
];
