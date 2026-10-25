import { ResourceArticle } from '../types';

export const RESOURCE_ARTICLES: ResourceArticle[] = [
  {
    id: 'functional-vs-conventional-nutrition',
    title: 'Functional Nutrition Explained: Systems Biology vs. Symptom Management',
    category: 'Fundamentals',
    readTime: '5 min read',
    excerpt: 'An objective breakdown of how functional nutrition investigates upstream biochemical drivers, organ crosstalk, and nutrient cofactors rather than viewing health through isolated organ silos.',
    keyPoints: [
      'Focuses on physiological mechanisms rather than one-size-fits-all caloric equations.',
      'Treats food as information, epigenetic signals, and biochemical substrate.',
      'Respects biochemical individuality: two individuals with identical symptoms may require entirely different nutritional strategies.'
    ],
    content: [
      'Conventional dietary guidelines were originally designed to prevent acute deficiency diseases (such as scurvy, beriberi, and rickets) across large populations. While effective for population-scale minimum thresholds, they were not formulated to optimize individual metabolic flexibility, resolve subclinical inflammation, or support complex microbiome dynamics.',
      'Functional nutrition applies the lens of systems biology. It recognizes that the gastrointestinal tract, the endocrine system, the immune network, and mitochondrial energy production are not isolated departments; they are interconnected nodes in a continuous biological feedback loop.',
      'When addressing persistent fatigue, for example, a functional approach does not merely prescribe caffeine or generic B-vitamins. It examines whether the root issue lies in impaired oxygen transport (iron handling), Krebs cycle cofactor depletion (magnesium, thiamine), chronic gut endotoxemia (intestinal permeability), or HPA axis dysregulation.'
    ]
  },
  {
    id: 'macronutrient-architecture-plate',
    title: 'The Evidence-Informed Plate: Structural Food Sequencing and Glycemic Stability',
    category: 'Guides',
    readTime: '6 min read',
    excerpt: 'How the physical architecture of whole foods and the order in which you consume macronutrients dictate gastric emptying, insulin secretion, and sustained afternoon cognitive focus.',
    keyPoints: [
      'Fiber first: Soluble fiber creates a viscous mesh in the proximal duodenum.',
      'Protein and healthy fats second: Stimulates cholecystokinin (CCK) and GLP-1, signaling satiety.',
      'Complex carbohydrates last: Glucose absorption curve is flattened by up to 40%.'
    ],
    content: [
      'For decades, nutritional science treated carbohydrate grams as identical regardless of their physical matrix. However, recent continuous glucose monitoring (CGM) research and metabolic ward studies confirm that the physical architecture of food fundamentally alters digestive kinetics.',
      'When a carbohydrate is trapped inside an intact plant cell wall (such as in whole intact legumes, minimally processed grains, or fibrous vegetables), digestive enzymes access the starch slowly. By contrast, when that same plant is pulverized into fine flour, digestive amylase cleaves the starches instantly in the mouth and stomach.',
      'Practical takeaway: Begin main meals with raw or lightly steamed bitter vegetables dressed with extra virgin olive oil. Follow with quality protein (fish, poultry, eggs, tempeh, or beans). Finish with your starchy carbohydrates. This single behavioral habit drastically blunts reactive glucose spikes and subsequent postprandial crashes.'
    ]
  },
  {
    id: 'microbiome-diversity-rule',
    title: 'The 30-Plant Principle: Microbiome Diversity, Fermentation & Metabolites',
    category: 'Deep Dives',
    readTime: '7 min read',
    excerpt: 'Why counting plant diversity provides greater metabolic and immunological resilience than restrictive elimination diets, based on the landmark American Gut Project findings.',
    keyPoints: [
      'Microbial diversity is the single strongest correlate with gut resilience.',
      'Herbs, spices, seeds, nuts, legumes, fruits, and vegetables all contribute to diversity count.',
      'Each plant family supplies unique polyphenols, beta-glucans, arabinogalactans, and resistant starches.'
    ],
    content: [
      'Data from the American Gut Project (analyzing over 15,000 microbial samples across 40 countries) revealed that individuals who consumed more than 30 distinct plant varieties per week harbored significantly more diverse gut microbiomes than those who consumed 10 or fewer, regardless of whether they identified as omnivores or vegans.',
      'Why does diversity matter? Different bacterial species possess distinct enzymatic toolkits (CAZymes) specialized for degrading specific prebiotic fiber polymers. A diet consisting of the same 5 vegetables day after day starves specialized commensals, leading to microbial extinction cascades.',
      'Practical tip: Do not buy large quantities of a single vegetable. Instead, create seed mixes (chia, flax, pumpkin, hemp, sunflower), incorporate culinary herbs (oregano, thyme, rosemary, mint), and rotate through varied leafy greens and heirloom legumes.'
    ]
  },
  {
    id: 'testing-scope-and-limitations',
    title: 'Functional Health Testing: What Specialized Biomarkers Can and Cannot Tell Us',
    category: 'Guides',
    readTime: '8 min read',
    excerpt: 'A critical, transparent look at comprehensive stool analysis, organic acid profiles, continuous glucose monitoring, and food sensitivity panels.',
    keyPoints: [
      'Lab tests are diagnostic clues, not definitive diagnoses in isolation.',
      'Functional reference ranges identify trends before pathological thresholds are breached.',
      'Over-testing can lead to health anxiety and unnecessary financial burden without qualified interpretation.'
    ],
    content: [
      'In functional health, objective testing is a powerful tool to eliminate guesswork. However, the commercial wellness industry has sometimes weaponized testing, selling thousands of dollars in panels with questionable clinical utility.',
      'We distinguish between rigorously validated functional metrics and preliminary tests. For example, continuous glucose monitoring (CGM), erythrocyte fatty acid profiling (Omega-3 Index), RBC magnesium, high-sensitivity C-reactive protein (hs-CRP), and fecal calprotectin possess strong clinical validation.',
      'Conversely, general IgG food sensitivity tests have high false-positive rates, frequently reflecting normal immune tolerance or exposure rather than true physiological pathology. Tests should always be chosen judiciously, tailored to specific symptoms, and interpreted within comprehensive clinical context.'
    ]
  }
];

export const FREQUENTLY_ASKED_QUESTIONS = [
  {
    question: 'How does functional nutrition differ from seeing a traditional dietitian or doctor?',
    answer: 'Functional nutrition does not replace your primary medical care; it acts as a deep-dive investigative partner. While conventional medicine excels at acute diagnosis and pharmacological crisis management, functional nutrition specializes in chronic lifestyle factors, systems biology, nutrient biochemistry, and daily lifestyle implementation. We spend 60–90 minutes mapping your complete timeline, exploring interconnected systems, and constructing detailed, sustainable nutritional strategies.'
  },
  {
    question: 'Do I need expensive laboratory testing or supplements to benefit?',
    answer: 'No. While targeted testing (such as comprehensive blood panels, organic acids, or stool analysis) can be invaluable for complex or persistent issues, foundational nutrition, circadian entrainment, stress mitigation, and food sequencing always come first. Many clients achieve substantial health transformations through evidence-informed whole-food modifications without purchasing a single supplement.'
  },
  {
    question: 'Do you promise to cure chronic autoimmune or metabolic diseases?',
    answer: 'No. We explicitly reject miracle-cure promises, "reversal" hype, and ungrounded panaceas. What we provide is rigorous, evidence-informed nutritional support designed to optimize cellular energetics, support mucosal barrier integrity, reduce chronic inflammatory triggers, and improve metabolic flexibility as a complement to appropriate medical care.'
  },
  {
    question: 'How do you handle dietary dogmas like strict veganism or strict carnivore diets?',
    answer: 'We maintain a biochemical, dogma-free approach. Human genetics, gastrointestinal tolerances, ethical preferences, and metabolic phenotypes vary substantially. Rather than enforcing an ideological label, we analyze your current physiological response, micronutrient sufficiency, and lipid markers, designing an evidence-based framework that respects your personal ethics while fulfilling your biological requirements.'
  },
  {
    question: 'Is functional nutrition covered by health insurance?',
    answer: 'Coverage varies by jurisdiction and provider. In many regions, functional nutrition consultations may be eligible for Health Savings Accounts (HSA) or Flexible Spending Accounts (FSA), and superbills can be provided for insurance reimbursement where permitted. We maintain complete transparency regarding consultation fees upfront.'
  }
];
