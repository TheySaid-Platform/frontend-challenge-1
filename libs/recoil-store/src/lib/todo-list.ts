import { atom, SetterOrUpdater } from 'recoil';
import { Todo } from '@todo/interfaces';

export const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: [],
});
