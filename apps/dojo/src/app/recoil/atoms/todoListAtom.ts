import { atom } from 'recoil';

interface Todo {
    title: string;
    dueDate: string | undefined;
    description: string | undefined;
    isComplete: boolean;
    id: string;
  }
export const todoListAtom = atom<Todo[]>({
  key: 'todoListState', // unique ID (with respect to other atoms/selectors)
  default: [] // default value (aka initial value)
});
