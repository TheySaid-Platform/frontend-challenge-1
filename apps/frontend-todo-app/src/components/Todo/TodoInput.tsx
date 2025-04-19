import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todoListState } from "../../recoil/todoState";
import CategorySelect from "./CategorySelect";
import PrioritySelect from "./PrioritySelect";
import { Priority } from "../../app/types/todo";
import AddCategory from "../Categories/AddCategory";
import { themeState } from "../../recoil/themeState";

const TodoInput = () => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [errors, setErrors] = useState<{ text?: boolean; category?: boolean; priority?: boolean }>({});

  const theme = useRecoilValue(themeState);
  const isDark = theme === "dark";
  const setTodos = useSetRecoilState(todoListState);

  const validate = () => {
    const newErrors = {
      text: !text,
      category: !category,
      priority: !priority,
    };
    setErrors(newErrors);
    return !newErrors.text && !newErrors.category && !newErrors.priority;
  };

  const handleAddTodo = () => {
    if (!validate()) return;
    const newTodo = {
      id: Date.now().toString(),
      title: text,
      completed: false,
      category,
      priority: priority as Priority,
    };
    setTodos((prev) => [...prev, newTodo]);
    setText("");
    setCategory("");
    setPriority("");
    setErrors({});
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAddTodo();
  };

  return (
    <div className="mt-6 space-y-3">
      <div className="flex gap-2">
        <input
          className={`flex-1 border px-3 py-2 rounded-md text-sm w-full transition-colors
            ${isDark
              ? "bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:ring-purple-400"
              : "bg-white text-gray-900 placeholder-gray-500 border-gray-300 focus:ring-purple-500"}
            focus:outline-none focus:ring-2 focus:border-transparent`}
          placeholder="Add a new task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md text-sm transition-colors dark:bg-purple-600 dark:hover:bg-purple-700"
          onClick={handleAddTodo}
        >
          Add Item
        </button>
      </div>
      {errors.text && <p className="text-red-500 text-sm">Task title is required.</p>}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <CategorySelect value={category} onChange={setCategory} />
          {errors.category && <p className="text-red-500 text-sm">Category is required.</p>}
        </div>
        <div>
          <PrioritySelect value={priority} onChange={setPriority} />
          {errors.priority && <p className="text-red-500 text-sm">Priority is required.</p>}
        </div>
        <AddCategory />
      </div>
    </div>
  );
};

export default TodoInput;
