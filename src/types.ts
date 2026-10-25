export interface ElementData {
  number: number;
  symbol: string;
  name: string;
  category: string;
  atomic_mass: number;
  shells: number[];
  xpos: number;
  ypos: number;
  electron_configuration_semantic: string;
  phase: string;
  melt: number | null;
  boil: number | null;
  density: number | null;
  summary: string;
  discovered_by: string | null;
  electronegativity_pauling: number | null;
  source: string;
  block: string;
  period: number;
  group: number;
}

export type CategoryKey =
  | 'alkali metal'
  | 'alkaline earth metal'
  | 'transition metal'
  | 'post-transition metal'
  | 'metalloid'
  | 'diatomic nonmetal'
  | 'polyatomic nonmetal'
  | 'noble gas'
  | 'lanthanide'
  | 'actinide'
  | 'unknown';

export type MatterState = 'solid' | 'liquid' | 'gas' | 'unknown';

export interface ElementUse {
  title: string;
  description: string;
}

export interface ElementImage {
  url: string; // verified Wikimedia Commons image URL
  alt: string;
  author: string;
  license: string; // as tagged on the Commons file page; "A or B" means a choice of licenses
  pageUrl: string; // Commons file page (attribution / full license terms)
}

export interface ElementVideo {
  url: string; // direct video file (e.g. .mp4) or a YouTube link
  poster?: string;
  credit: string;
  aiGenerated: boolean;
}

export interface ElementUses {
  uses: ElementUse[];
  images: ElementImage[];
  video?: ElementVideo;
}

/** Shape of src/data/uses.json, keyed by atomic number (JSON keys are strings). */
export type UsesData = Record<string, ElementUses>;
