/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable prettier/prettier */
import { atom } from 'recoil';


// Define the todo list type
interface Todo {
    id: string;
    title: string;
    completed: boolean;
  }

  
// Define the todo list state atom with the same type
export const todoListState = atom<Array<Todo>>({
    key: 'todoListState', // Unique ID for this atom
    default: [], // Initial value for the todo list (you can set todoListDefault here if needed)
  });
