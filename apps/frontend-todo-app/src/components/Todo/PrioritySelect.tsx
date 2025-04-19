import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { Priority } from "../../app/types/todo";
import { themeState } from "../../recoil/themeState";

const PRIORITIES = ["Low", "Medium", "High"];

interface Props {
  value: string;
  onChange: (value: Priority) => void;
  direction?: "up" | "down";
}

const PrioritySelect = ({ value, onChange, direction = "up" }: Props) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const theme = useRecoilValue(themeState);
  const isDark = theme === "dark";

  const positionClasses =
    direction === "up" ? "bottom-full mb-1" : "top-full mt-1";

  const handleSelect = (priority: Priority) => {
    onChange(priority);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between w-full border px-3 py-2 rounded-md text-sm text-left transition-colors
          ${isDark
            ? "bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
            : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
          }`}
      >
        {value || "Select priority..."}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className={`absolute z-10 ${positionClasses} w-full border rounded-md shadow-lg
            ${isDark
              ? "bg-gray-800 border-gray-600 text-gray-200"
              : "bg-white border-gray-200 text-gray-700"
            }`}
        >
          <ul className="py-1 text-sm max-h-48 overflow-y-auto">
            {PRIORITIES.map((p) => (
              <li
                key={p}
                onClick={() => handleSelect(p as Priority)}
                className={`px-4 py-2 cursor-pointer transition-colors ${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                } ${value === p ? "font-semibold" : ""}`}
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
