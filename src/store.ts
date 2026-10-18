import { create } from 'zustand';
import type { CategoryKey } from './types';

interface TableState {
  hovered: number | null; // atomic number shown in the spotlight
  selected: number | null; // atomic number open in the detail panel
  category: CategoryKey | null; // legend filter
  query: string;
  setHovered: (n: number | null) => void;
  setSelected: (n: number | null) => void;
  toggleCategory: (c: CategoryKey) => void;
  setQuery: (q: string) => void;
}

export const useTable = create<TableState>((set) => ({
  hovered: 1,
  selected: null,
  category: null,
  query: '',
  setHovered: (hovered) => set((s) => ({ hovered: hovered ?? s.hovered })),
  setSelected: (selected) => set({ selected }),
  toggleCategory: (c) => set((s) => ({ category: s.category === c ? null : c })),
  setQuery: (query) => set({ query }),
}));
