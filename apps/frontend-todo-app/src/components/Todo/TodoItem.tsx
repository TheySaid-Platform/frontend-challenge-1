import { useState } from "react";
import { Todo } from "../../app/types/todo";
import { CATEGORY_COLORS } from "../../constants/colors";
import { CheckCircle, Circle, Trash2, Pencil } from "lucide-react";
import EditTodoModal from "../Modal/EditTodoModal";
import { categoryListState } from "../../recoil/categorystate";
import { useRecoilValue } from "recoil";
import { themeState } from "../../recoil/themeState";

interface Props {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (todo: Todo) => void;
}

const TodoItem = ({ todo, onToggle, onDelete, onEdit }: Props) => {
  const categoryList = useRecoilValue(categoryListState);
  const found = categoryList.find((c) => c.name === todo.category);
  const categoryColor = found ? found.colorLight : "bg-gray-500";
  const [showModal, setShowModal] = useState<boolean>(false);
  const theme = useRecoilValue(themeState);
  const isDark = theme === "dark";
  console.log(categoryColor,'categoryColor');

  return (
    <div
      className={`flex justify-between items-center py-2 px-2 cursor-pointer border-b rounded-md transition-colors ${
        isDark ? "hover:bg-gray-700 border-gray-700" : "hover:bg-purple-50 border-gray-200"
      }`}
    >
      <div className="flex items-center gap-3">
        <button onClick={onToggle}>
          {todo.completed ? (
            <CheckCircle className="text-purple-500 w-5 h-5" />
          ) : (
            <Circle className="text-purple-500 w-5 h-5" />
          )}
        </button>

        <span
          className={`text-sm ${
            todo.completed
              ? isDark
                ? "line-through text-gray-500"
                : "line-through text-gray-400"
              : isDark
              ? "text-white"
              : "text-gray-800"
          }`}
        >
          {todo.title}
        </span>
      </div>

      <div className="flex items-center gap-5">
        <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColor}`}>
          {todo.category}
        </span>
        <button onClick={() => setShowModal(true)} className="cursor-pointer">
          <Pencil
            className={`w-4 h-4 transition-colors ${
              isDark ? "text-gray-400 hover:text-blue-400" : "text-gray-400 hover:text-blue-500"
            }`}
          />
        </button>
        <button
          onClick={onDelete}
          className="opacity-1 group-hover:opacity-100 transition-opacity"
        >
          <Trash2
            className={`w-4 h-4 transition-colors ${
              isDark ? "text-gray-400 hover:text-red-400" : "text-gray-400 hover:text-red-500"
            }`}
          />
        </button>
      </div>

      {showModal && (
        <EditTodoModal
          todo={todo}
          onClose={() => setShowModal(false)}
          onSave={(updated) => onEdit(updated)}
        />
      )}
    </div>
  );
};

export default TodoItem;
