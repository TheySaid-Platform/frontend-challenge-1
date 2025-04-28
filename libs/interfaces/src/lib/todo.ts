interface Todo {
  id: string;
  description: string;
  completed: boolean;
}

const todos: Todo[] = [
  { id: '1', description: 'Finish React project', completed: false },
  { id: '2', description: 'Buy groceries', completed: true },
  {
    id: '3',
    description: 'Write blog post about TypeScript',
    completed: false,
  },
  { id: '4', description: 'Call Mom', completed: true },
  { id: '5', description: 'Clean the house', completed: false },
  { id: '6', description: 'Read 50 pages of a book', completed: false },
  { id: '7', description: 'Go for a 30-minute run', completed: true },
  { id: '8', description: 'Update LinkedIn profile', completed: false },
  { id: '9', description: 'Organize workspace', completed: true },
  { id: '10', description: 'Plan weekend trip', completed: false },
];

export type { Todo };
export { todos };
