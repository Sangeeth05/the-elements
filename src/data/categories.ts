import type { CategoryKey, ElementData } from '../types';
import raw from './elements.json';

export const CATEGORIES: Record<CategoryKey, { label: string; color: string }> = {
  'alkali metal': { label: 'Alkali metal', color: '#ff6b6b' },
  'alkaline earth metal': { label: 'Alkaline earth', color: '#ffa94d' },
  'transition metal': { label: 'Transition metal', color: '#ffd43b' },
  'post-transition metal': { label: 'Post-transition', color: '#8ce99a' },
  metalloid: { label: 'Metalloid', color: '#38d9a9' },
  'diatomic nonmetal': { label: 'Diatomic nonmetal', color: '#4dabf7' },
  'polyatomic nonmetal': { label: 'Polyatomic nonmetal', color: '#66d9e8' },
  'noble gas': { label: 'Noble gas', color: '#9775fa' },
  lanthanide: { label: 'Lanthanide', color: '#f783ac' },
  actinide: { label: 'Actinide', color: '#e599f7' },
  unknown: { label: 'Unknown', color: '#adb5bd' },
};

/** The dataset uses "unknown, probably …" for superheavy elements; group them. */
export function normalizeCategory(category: string): CategoryKey {
  return category.startsWith('unknown') ? 'unknown' : (category as CategoryKey);
}

export const ELEMENTS: (ElementData & { cat: CategoryKey })[] = (raw as ElementData[]).map(
  (e) => ({ ...e, cat: normalizeCategory(e.category) }),
);

export const categoryColor = (cat: CategoryKey) => CATEGORIES[cat].color;
