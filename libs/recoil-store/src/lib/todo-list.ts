import { atom, SetterOrUpdater } from 'recoil';
import { Todo } from '@todo/interfaces';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
