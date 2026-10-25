export type PageView =
  | 'home'
  | 'approach'
  | 'health-areas'
  | 'pathways'
  | 'science'
  | 'resources'
  | 'practitioner'
  | 'pricing'
  | 'booking'
  | 'appointments'
  | 'visual-studio'
  | 'admin';

export interface HealthArea {
  id: string;
  title: string;
  shortDescription: string;
  fullOverview: string;
  physiologicalRole: string;
  systemsConnected: string[];
  keyBiomarkers: string[];
  nutritionalStrategies: {
    title: string;
    description: string;
    evidenceGrade: 'High' | 'Moderate' | 'Emerging';
  }[];
  clinicalFocus: string;
  dietaryPatterns: string[];
  references: {
    citation: string;
    source: string;
    year: number;
  }[];
}

export interface PathwayStep {
  stepNumber: number;
  title: string;
  biochemicalMechanism: string;
  keyEnzymesOrReceptors: string[];
  criticalCofactors: string[];
  nutritionalInputs: string[];
  clinicalSignificance: string;
}

export interface BiologicalPathway {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  overview: string;
  steps: PathwayStep[];
  systemsInvolved: string[];
  clinicalTakeaway: string;
}

export interface ResearchArticle {
  id: string;
  title: string;
  category: 'Metabolic Science' | 'Gut Microbiome' | 'Nutrient Biochemistry' | 'Mitochondrial Biology' | 'Immunonutrition';
  date: string;
  readTime: string;
  evidenceLevel: 'Randomized Controlled Trial' | 'Systematic Review & Meta-Analysis' | 'Mechanistic Cellular Study' | 'Clinical Cohort';
  summary: string;
  keyFindings: string[];
  biologicalMechanism: string;
  authorNote: string;
  doiCitation: string;
}

export interface ResourceArticle {
  id: string;
  title: string;
  category: 'Fundamentals' | 'Guides' | 'Deep Dives' | 'Q&A';
  readTime: string;
  excerpt: string;
  content: string[];
  keyPoints: string[];
}

export interface Consultation {
  id: string;
  name: string;
  durationMinutes: number;
  priceINR: number;
  priceUSD?: number;
  subtitle: string;
  description: string;
  recommendedFor: string;
}

export interface AppointmentRecord {
  id: string;
  consultationId: string;
  consultationName: string;
  date: string;
  time: string;
  durationMinutes: number;
  priceINR?: number;
  priceUSD?: number;
  fullName: string;
  email: string;
  phone?: string;
  reason?: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}
