import { useState } from "react";
import { useRecoilValue } from "recoil";
import { themeState } from "../../recoil/themeState";

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

  const theme = useRecoilValue(themeState);
  const isDark = theme === "dark";

  const handleSave = () => {
    onSave({ ...todo, title, category, priority });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 px-2">
      <div
        className={`w-full max-w-sm rounded-lg shadow-md p-4 space-y-3
          ${isDark ? "bg-gray-900 text-white" : "bg-white text-black"}`}
      >
        <h2 className="text-base font-semibold">Edit Task</h2>

        <input
          className={`w-full border px-3 py-2 rounded-md text-sm transition-colors
            ${isDark
              ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400 focus:ring-purple-400"
              : "bg-white text-black border-gray-300 placeholder-gray-500 focus:ring-purple-500"
            } focus:outline-none focus:ring-2 focus:border-transparent`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />

        <PrioritySelect value={priority} onChange={setPriority} direction="down" />
        <CategorySelect value={category} onChange={setCategory} direction="down" />

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className={`text-sm px-3 py-1 rounded-md border transition-colors
              ${isDark
                ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-purple-500 hover:bg-purple-600 text-white text-sm px-4 py-1.5 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTodoModal;
