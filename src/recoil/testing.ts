/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { atom, selector } from 'recoil';

import { todo } from '@/pages/Index';

import defaultTodo from '../data/defaultTodo.json';

// Define a Recoil atom for the todo list
export const todoListState = atom<todo[]>({
    key: 'todoListState', // Unique ID for this atom
    default: defaultTodo, // Initial value
  });

  // Optional: Define a selector for filtering todos by their status
export const filteredTodoListState = selector({
    key: 'filteredTodoListState',
    get: ({ get }) => {
      const filter = get(todoFilterState); // Get the current filter
      const list = get(todoListState); // Get the todo list
  
      switch (filter) {
        case 'completed':
          return list.filter((item) => item.completed);
        case 'active':
          return list.filter((item) => !item.completed);
        default:
          return list;
      }
    },
  });

  export const todoFilterState = atom<'all' | 'active' | 'completed'>({
    key: 'todoFilterState',
    default: 'all',
  });