import { Todo } from '@todo/interfaces';

export function TodoItem(props: { todo: Todo }) {
  const { todo } = props;
  const { description, completed } = todo;
  return (
    <div className="w-full">
      <input type="checkbox" checked={completed} />
      <p>{description}</p>
    </div>
  );
}

export default TodoItem;
