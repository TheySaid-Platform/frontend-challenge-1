import { Todo } from '@todo/interfaces';
import { Checkbox } from '@todo/ui';
import { useState } from 'react';
import { MdOutlineDelete } from 'react-icons/md';

export function TodoItem(props: { todo: Todo }) {
  const { todo } = props;
  const { description, completed } = todo;
  // const [menuOpen, setMenuOpen] = useState(false);
  // const [isUpdating, setIsUpdating] = useState(false);
  return (
    <div className="w-full flex items-center justify-between p-4 my-2 px-2 rounded-md bg-pink-50">
      <div className="flex gap-4 items-center">
        <Checkbox checked={completed} onChange={(e) => {}} />
        <p>{description}</p>
      </div>
      <MdOutlineDelete
        className="text-gray-500 hover:text-red-500 cursor-pointer"
        size={24}
        onClick={() => {
          // setMenuOpen(true);
        }}
      />
    </div>
  );
}

export default TodoItem;
