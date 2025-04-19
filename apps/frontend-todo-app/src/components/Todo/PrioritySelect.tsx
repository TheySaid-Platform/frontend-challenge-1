//priority dropdown

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Priority } from "../../app/types/todo";

// components/Todo/PrioritySelect.tsx
const PRIORITIES = ["Low", "Medium", "High"];

interface Props {
  value: string;
  onChange: (value: Priority) => void;
  direction?: "up" | "down";
}

const PrioritySelect = ({ value, onChange, direction = "up" }: Props) => {
  const [open, setOpen] = useState(false);
  const positionClasses =
    direction === "up"
      ? "bottom-full mb-1"
      : "top-full mt-1";

  const handleSelect = (priority: Priority) => {
    onChange(priority);
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full border px-3 py-2 rounded-md text-sm text-left"
      >
        {value || "Select priority..."}
        <ChevronDown size={14} />
      </button>

      {open && (
        <div className={`absolute z-10 ${positionClasses} w-full bg-white border border-gray-200 rounded-md shadow-lg`}>
          <ul className="py-1 text-sm text-gray-700">
            {PRIORITIES.map((p) => (
              <li
                key={p}
                onClick={() => handleSelect(p as Priority)}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  value === p ? "font-semibold" : ""
                }`}
              >
                {value === p ? "✓ " : ""} {p}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PrioritySelect;
