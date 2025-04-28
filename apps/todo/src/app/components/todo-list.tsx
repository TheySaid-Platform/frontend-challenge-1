import { useRecoilValue } from 'recoil';
import TodoItem from './todo-item';
import { todoListState } from '@todo/recoil-store';

export function TodoList() {
  const todoList = useRecoilValue(todoListState);

  return (
    <div className="grid grid-cols-1">
      {todoList.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;
