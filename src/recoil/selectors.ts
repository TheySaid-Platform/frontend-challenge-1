
import { selector } from 'recoil';
import { todoListFilterState, todoListState } from './atoms';


export const filteredTodoListState = selector({
    key: 'filteredTodoListState',
    get: ({ get }) => {
        const filter = get(todoListFilterState);
        const list = get(todoListState);

        console.log(filter);
        switch (filter) {
            case 'Show Completed':
                return list.filter((item) => item.completed);
            case 'Show Uncompleted':
                return list.filter((item) => !item.completed);
            default:
                return list;
        }
    },
});