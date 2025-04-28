import { todos } from '@todo/interfaces';
import TodoItem from './todo-item';

export function TodoList() {
  return (
    <div className="grid grid-cols-1">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;
