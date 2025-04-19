import { useRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";
import { categoryListState } from "../../recoil/categorystate";
import { themeState } from "../../recoil/themeState";

const COLOR_OPTIONS = [
  "bg-purple-200 text-purple-800",
  "bg-blue-200 text-blue-800",
  "bg-green-200 text-green-800",
  "bg-yellow-200 text-yellow-800",
  "bg-pink-200 text-pink-800",
];

const AddCategory = () => {
  const [categories, setCategories] = useRecoilState(categoryListState);
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
const theme = useRecoilValue(themeState);
const isDark = theme === "dark";

  const handleAdd = () => {
    const trimmed = input.trim();
    const isDuplicate = categories.some((cat) => cat.name === trimmed);
    if (!trimmed || isDuplicate) return;

    setCategories([
      ...categories,
      {
        name: trimmed,
        colorLight: selectedColor,
        colorDark: selectedColor,
      },
    ]);    setInput("");
    setSelectedColor(COLOR_OPTIONS[0]);
    setShowInput(false);
  };

  return (
    <div className="mt-4">
      {showInput ? (
        <div className="space-y-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="New category name..."
            className={`border px-3 py-1 rounded-md text-sm w-full transition-colors ${
              isDark
                ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400"
                : "bg-white text-gray-900 border-gray-300"
            }`}
          />

          <div className="flex gap-2 items-center">
            {COLOR_OPTIONS.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  selectedColor === color
                    ? isDark
                      ? "border-white"
                      : "border-black"
                    : "border-transparent"
                } ${color}`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowInput(false)}
              className={`text-sm px-3 py-1 rounded-md border transition-colors ${
                isDark
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="bg-purple-500 text-white px-3 py-1 text-sm rounded-md hover:bg-purple-600 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className={`text-sm hover:underline ${
            isDark ? "text-purple-300" : "text-purple-600"
          }`}
        >
          + Add Category
        </button>
      )}
    </div>
  );
};

export default AddCategory;
