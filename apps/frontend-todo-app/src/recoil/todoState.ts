
import { atom, selector } from "recoil";
import { Priority, Todo } from "../app/types/todo";
import { filterState } from "./filterState";
import { selectedCategoryState } from "./categorystate";



export const todoListState = atom<Todo[]>({
    key: "todoListState",
    default: [
      {
        id: "1",
        title: "Buy groceries",
        completed: false,
        category: "Groceries",
        priority: Priority.High,
      },
      {
        id: "2",
        title: "Finish client proposal",
        completed: true,
        category: "Work",
        priority: Priority.Medium,
      },
      {
        id: "3",
        title: "Evening yoga",
        completed: false,
        category: "Personal",
        priority: Priority.Low,
      },
      {
        id: "4",
        title: "Pay utility bills",
        completed: true,
        category: "Other",
        priority: Priority.Medium,
      },
    ],
  });

export const todoStatsState = selector({
    key: "todoStatsState",
    get: ({ get}) => {
        const list = get(todoListState);
        const total = list.length;
        const completed = list.filter((item) => item?.completed).length
        return {total, completed};
    }
});

export const filteredTodoListState = selector<Todo[]>({
    key: "filteredTodoListState",
    get: ({get}) => {
        const todos = get(todoListState);
        const filter = get(filterState);
        const category = get(selectedCategoryState);

        return todos.filter((todo) => {
            const matchesStatus = filter === "All" || (filter === "Active" ? !todo.completed : todo.completed);
            const matchesCategory = category === "All" || todo.category === category;
            return matchesStatus && matchesCategory;
        })
    }
})

