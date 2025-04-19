import { useRecoilValue } from "recoil";
import { categoryListState } from "../../recoil/categorystate";
import { themeState } from "../../recoil/themeState";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  direction?: "up" | "down";
}

const CategorySelect = ({ value, onChange, direction = 'up' }: Props) => {
  const categories = useRecoilValue(categoryListState);
  const theme = useRecoilValue(themeState);
  const isDark = theme === "dark";

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (cat: string) => {
    onChange(cat);
    setOpen(false);
  };

  const positionClasses =
    direction === "up" ? "bottom-full mb-1" : "top-full mt-1";

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
        {value || "Select category..."}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className={`absolute z-10 ${positionClasses} w-full border rounded-md shadow-lg transition-colors
            ${isDark
              ? "bg-gray-800 border-gray-600 text-gray-200"
              : "bg-white border-gray-200 text-gray-700"
            }`}
        >
          <ul  className="py-1 text-sm max-h-48 overflow-y-auto  thin-scrollbar" style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#94a3b8 transparent", // gray-400 thumb, transparent track
          }}>
            {categories.map((cat) => (
              <li
                key={cat.name}
                onClick={() => handleSelect(cat.name)}
                className={`px-4 py-2 cursor-pointer transition-colors ${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                } ${value === cat.name ? "font-semibold" : ""}`}
              >
                {value === cat.name ? "✓ " : ""} {cat.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategorySelect;
