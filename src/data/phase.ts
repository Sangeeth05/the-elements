import type { ElementData, MatterState } from '../types';

export const ROOM_TEMP_K = 298;
export const MIN_TEMP_K = 0;
export const MAX_TEMP_K = 6000;

/** State of matter at `kelvin`, from the element's melting/boiling points (also in K). */
export function stateAt(el: Pick<ElementData, 'melt' | 'boil'>, kelvin: number): MatterState {
  if (el.melt == null || el.boil == null) return 'unknown';
  if (kelvin < el.melt) return 'solid';
  if (kelvin < el.boil) return 'liquid';
  return 'gas';
}

export const STATE_LABELS: Record<MatterState, string> = {
  solid: 'Solid',
  liquid: 'Liquid',
  gas: 'Gas',
  unknown: 'Unknown',
};

export const STATE_LETTERS: Record<MatterState, string> = {
  solid: 'S',
  liquid: 'L',
  gas: 'G',
  unknown: '?',
};
