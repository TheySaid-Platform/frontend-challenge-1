import { useRecoilState, useRecoilValue } from "recoil";
import { categoryListState, selectedCategoryState } from "../../recoil/categorystate";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { themeState } from "../../recoil/themeState";

const CategoryDropdown = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useRecoilState(selectedCategoryState);
  const categories = useRecoilValue(categoryListState);
  const theme = useRecoilValue(themeState);
  const isDark = theme === "dark";
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (cat: string) => {
    setSelected(cat);
    setOpen(false);
  };

  // ✅ Close on outside click
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
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 text-sm px-10 py-1 border rounded-md transition-colors
          ${isDark
            ? "bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
            : "bg-white text-black border-gray-300 hover:bg-gray-50"
          }`}
      >
        {selected === "All" ? "All…" : selected}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className={`absolute right-0 mt-1 w-40 z-10 border rounded-md shadow-lg
          ${isDark
            ? "bg-gray-800 border-gray-600 text-gray-200"
            : "bg-white border-gray-200 text-gray-700"
          }`}
        >
          <ul style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#94a3b8 transparent", // gray-400 thumb, transparent track
          }} className="py-1 text-sm max-h-48 overflow-y-auto">
            <li
              onClick={() => handleSelect("All")}
              className={`px-4 py-2 cursor-pointer transition-colors ${
                isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
              } ${selected === "All" ? "font-semibold" : ""}`}
            >
              All Categories
            </li>
            {categories.map((cat) => (
              <li
                key={cat.name}
                onClick={() => handleSelect(cat.name)}
                className={`px-4 py-2 cursor-pointer transition-colors ${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                } ${selected === cat.name ? "font-semibold" : ""}`}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
