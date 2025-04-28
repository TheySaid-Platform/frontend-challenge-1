import { atom, SetterOrUpdater } from 'recoil';
import { Todo } from '@todo/interfaces';

export const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: [],
});

export const addTodo = (
  setTodos: SetterOrUpdater<Todo[]>,
  description: string,
  idGenerator: () => string
) => {
  const newTodo: Todo = {
    id: idGenerator(),
    description: description.trim(),
    completed: false,
  };

  setTodos((oldList) => [...oldList, newTodo]);
};

export const updateTodoDescription = (
  setTodos: SetterOrUpdater<Todo[]>,
  id: string,
  newDescription: string
) => {
  setTodos((oldList) =>
    oldList.map((todo) =>
      todo.id === id ? { ...todo, description: newDescription } : todo
    )
  );
};

export const toggleTodoComplete = (
  setTodos: SetterOrUpdater<Todo[]>,
  id: string
) => {
  setTodos((oldList) =>
    oldList.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );
};

export const deleteTodo = (setTodos: SetterOrUpdater<Todo[]>, id: string) => {
  setTodos((oldList) => oldList.filter((todo) => todo.id !== id));
};
