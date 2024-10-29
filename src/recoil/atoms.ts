import { atom } from 'recoil';

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

export enum TodoListFiltersEnum {
    ShowAll = 'Show All',
    ShowCompleted = 'Show Completed',
    ShowUncompleted = 'Show Uncompleted',
}

export const todoListState = atom<Todo[]>({
    key: 'todoListState',
    default: [],
});

export const todoListFilterState = atom<TodoListFiltersEnum>({
    key: 'todoListFilterState',
    default: TodoListFiltersEnum.ShowAll,
});