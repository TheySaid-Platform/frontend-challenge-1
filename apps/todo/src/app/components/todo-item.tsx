import { Todo } from '@todo/interfaces';

export function TodoItem(props: { todo: Todo }) {
  const { todo } = props;
  const { id, description, completed } = todo;
  return (
    <div className="w-full">
      <h1>Welcome to TodoItem!</h1>
    </div>
  );
}

export default TodoItem;
