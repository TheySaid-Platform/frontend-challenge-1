import { atom } from 'recoil';

export interface Task {
  id: number;
  task: string;
  date: string;
  priority: 'Low' | 'Medium' | 'High';
  checked?: boolean;
  newlyAdded?: boolean;
  isDeleting?: boolean;
  checkedAnimation?: boolean;
}

export const tasksAtom = atom<Task[]>({
  key: 'tasksAtom',
  default: [],
});
