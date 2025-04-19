import { useRecoilState, useRecoilValue } from "recoil";
import { categoryListState, selectedCategoryState } from "../../recoil/categorystate"
import { useState } from "react";
import { ChevronDown } from "lucide-react";


const CategoryDropdown = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useRecoilState(selectedCategoryState);
  const categories = useRecoilValue(categoryListState);

  const handleSelect = (cat: string) => {
    setSelected(cat);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm px-10 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
      >
        {selected === "All" ? "All…" : selected}
        <ChevronDown size={14} />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <ul className="py-1 text-sm text-gray-700">
            <li
              onClick={() => handleSelect("All")}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                selected === "All" ? "font-semibold" : ""
              }`}
            >
              ✓ All Categories
            </li>
            {categories.map((cat) => (
              <li
                key={cat.name}
                onClick={() => handleSelect(cat.name)}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  selected === cat.name ? "font-semibold" : ""
                }`}
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