import { atom, selector } from "recoil";
import { Priority, Todo } from "../app/types/todo";
import { filterState } from "./filterState";
import { selectedCategoryState } from "./categorystate";

const TODO_STORAGE_KEY = "todos";

const getInitialTodos = (): Todo[] => {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(TODO_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as Todo[];
    } catch {
      return [];
    }
  }

  return []; // no defaults
};

export const todoListState = atom<Todo[]>({
  key: "todoListState",
  default: getInitialTodos(),
  effects: [
    ({ onSet }) => {
      onSet((newTodos) => {
        localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(newTodos));
      });
    },
  ],
});

export const todoStatsState = selector({
  key: "todoStatsState",
  get: ({ get }) => {
    const list = get(todoListState);
    const total = list.length;
    const completed = list.filter((item) => item?.completed).length;
    return { total, completed };
  },
});

export const filteredTodoListState = selector<Todo[]>({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const todos = get(todoListState);
    const filter = get(filterState);
    const category = get(selectedCategoryState);

    return todos.filter((todo) => {
      const matchesStatus =
        filter === "All" ||
        (filter === "Active" ? !todo.completed : todo.completed);
      const matchesCategory =
        category === "All" || todo.category === category;

      return matchesStatus && matchesCategory;
    });
  },
});
