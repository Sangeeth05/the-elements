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
