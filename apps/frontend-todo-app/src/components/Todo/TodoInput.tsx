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
  const theme = useRecoilValue(themeState);
  const isDark = theme === "dark";

  const setTodos = useSetRecoilState(todoListState);

  const handleAddTodo = () => {
    if (!text || !category || !priority) return;
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
  };

  return (
    <div className="mt-6 space-y-3">
      <div className="flex gap-2">
      <input
  className={`flex-1 border px-3 py-2 rounded-md text-sm w-full transition-colors 
    ${isDark
      ? "bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:ring-purple-400"
      : "bg-white text-gray-900 placeholder-gray-500 border-gray-300 focus:ring-purple-500"
    } 
    focus:outline-none focus:ring-2 focus:border-transparent`}
  placeholder="Add a new task"
  value={text}
  onChange={(e) => setText(e.target.value)}
/>
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md text-sm 
                     transition-colors dark:bg-purple-600 dark:hover:bg-purple-700"
          onClick={handleAddTodo}
        >
          Add Item
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <CategorySelect value={category} onChange={setCategory} />
        <PrioritySelect value={priority} onChange={setPriority} />
        <AddCategory />
      </div>
    </div>
  );
};

export default TodoInput;
