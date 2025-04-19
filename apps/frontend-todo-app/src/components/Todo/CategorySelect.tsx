// components/Todo/CategorySelect.tsx
import { useRecoilValue } from "recoil";
import { categoryListState } from "../../recoil/categorystate";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  direction?: "up" | "down";
}

const CategorySelect = ({ value, onChange, direction='up' }: Props) => {
  const categories = useRecoilValue(categoryListState);
  const [open, setOpen] = useState(false);

  const handleSelect = (cat: string) => {
    onChange(cat);
    setOpen(false);
  };

  const positionClasses =
  direction === "up"
    ? "bottom-full mb-1"
    : "top-full mt-1";

  return (
    <div className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full border px-3 py-2 rounded-md text-sm text-left"
      >
        {value || "Select category..."}
        <ChevronDown size={14} />
      </button>

      {open && (
        <div className={`absolute z-10 ${positionClasses} w-full bg-white border border-gray-200 rounded-md shadow-lg`}>
          <ul className="py-1 text-sm text-gray-700">
            {categories.map((cat) => (
              <li
                key={cat.name}
                onClick={() => handleSelect(cat.name)}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  value === cat.name ? "font-semibold" : ""
                }`}
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
