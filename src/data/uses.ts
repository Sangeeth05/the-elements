import type { ElementUses, UsesData } from '../types';
import raw from './uses.json';

export const USES: UsesData = raw;

export const usesFor = (atomicNumber: number): ElementUses | undefined => USES[String(atomicNumber)];

export const hasUses = (atomicNumber: number) => String(atomicNumber) in USES;
