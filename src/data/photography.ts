export interface EditorialPhoto {
  url: string;
  alt: string;
  caption: string;
  credit?: string;
}

/**
 * Editorial Photography Collection
 * High-resolution Unsplash photography matching our art-directed functional nutrition aesthetic:
 * Natural daylight, authentic whole foods, botanical herbs, seeds, travertine/linen surfaces,
 * professional clinical consultation, clean research environments, and organic textures.
 */
export const EDITORIAL_PHOTOS = {
  // Hero & Still-life photography
  heroStillLife: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80', // Fresh vibrant botanical greens, microgreens, wooden and stone table
  heroBotanicalMacro: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80', // Beautiful editorial salad bowl with whole vegetables and edible seeds
  
  // Health topics photography
  gutMicrobiome: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80', // Organic heirloom carrots, prebiotic roots with soil texture
  metabolicHealth: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80', // Fresh wholesome berry & whole seed breakfast bowl, low glycemic
  mitochondrialBioenergetics: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', // Nutrient-dense colorful bowl with avocado, microgreens, citrus
  hepaticBiotransformation: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', // Fresh raw ginger, turmeric rhizomes, garlic on rustic surface
  neuroendocrineAxis: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80', // Calm mindful tea ritual with adaptogenic herbal infusion
  immunonutrition: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80', // Shiitake & reishi functional medicinal mushrooms on dark slate

  // Practitioner & Clinical Practice - Milind Kumar (Authentic practitioner photo)
  milindKumarPortrait: '/assets/aistudio/Milind_hd_pic_81b3ea18.png',
  practitionerPortrait: '/assets/aistudio/Milind_hd_pic_81b3ea18.png',
  practitionerConsultation: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80', // Respectful clinical consultation discussing patient health records
  clinicalLaboratory: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80', // Glass beaker, botanical extracts, clean lab workspace
  
  // Real Biochemical Pathways & Cellular Bioenergetics Imagery
  pathwayKrebsMitochondria: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1000&q=80', // Cellular laboratory biology & biochemistry
  pathwayMicrobiomeBarrier: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1000&q=80', // Bio-fluorescence cellular structures
  pathwayHepaticMetabolism: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80', // Scientific biochemical research and enzymatic analysis
  heroFullBackground: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=2000&q=85', // Full-bleed rich botanical culinary medicine still life

  // Articles & Educational Resources
  articlePlateArchitecture: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80', // Balanced meal preparation, colorful vegetables on cutting board
  articleMicrobiomeDiversity: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80', // Diverse vibrant vegetable flat lay with seeds and legumes
  articleFunctionalVsConventional: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80', // Stethoscope, herbal medicine and fresh herbs together
  articleTestingScope: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80', // Clean diagnostic lab glassware and pipettes on slate
};
