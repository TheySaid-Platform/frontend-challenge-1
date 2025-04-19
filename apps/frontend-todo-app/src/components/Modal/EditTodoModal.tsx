// components/Modal/EditTodoModal.tsx
import { useState } from "react";

import CategorySelect from "../Todo/CategorySelect";
import PrioritySelect from "../Todo/PrioritySelect";
import { Priority, Todo } from "../../app/types/todo";

interface Props {
  todo: Todo;
  onClose: () => void;
  onSave: (updatedTodo: Todo) => void;
}

const EditTodoModal = ({ todo, onClose, onSave }: Props) => {
  const [title, setTitle] = useState(todo.title);
  const [category, setCategory] = useState(todo.category);
  const [priority, setPriority] = useState<Priority>(todo.priority);

  const handleSave = () => {
    onSave({ ...todo, title, category, priority });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-md p-6 space-y-4">
        <h2 className="text-lg font-semibold">Edit Task</h2>
        <input
          className="w-full border px-3 py-2 rounded-md text-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />
        <PrioritySelect
          value={priority}
          onChange={setPriority}
          direction="down"
        />
        <CategorySelect
          value={category}
          onChange={setCategory}
          direction="down"
        />

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="text-sm px-4 py-1 rounded-md border border-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-purple-500 text-white text-sm px-4 py-1 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTodoModal;
