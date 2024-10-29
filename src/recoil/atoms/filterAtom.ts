import { atom } from 'recoil';

export type FilterType = 'ALL' | 'ACTIVE' | 'COMPLETED';

export const filterAtom = atom<FilterType>({
  key: 'filterAtom',
  default: 'ALL',
});
