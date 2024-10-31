import { atom } from 'recoil';

interface CompletedTodo {
    title: string;
    dueDate: string | undefined;
    description: string | undefined;
    isComplete: boolean;
    id: string;
    completedDate?: string; // Optional completed date
  }
  const loadCompletedTodosFromLocalStorage = (): CompletedTodo[] => {
    const savedTodos = localStorage.getItem('completedItems');
    return savedTodos ? JSON.parse(savedTodos) : [];
  };
  
  export const completedTodoListAtom = atom<CompletedTodo[]>({
    key: 'completedTodoListState', // Unique ID
    default: loadCompletedTodosFromLocalStorage(), // Load initial state from local storage
  });


