import { useRecoilState, useRecoilValue } from "recoil";
import CategoryDropdown from "./CategoryDropdown";
import { Filter, filterState } from "../../recoil/filterState";
import { themeState } from "../../recoil/themeState";

const tabs: Filter[] = ["All", "Active", "Completed"];

const StatusTabs = () => {
  const [filter, setFilter] = useRecoilState(filterState);
  const theme = useRecoilValue(themeState);
  const isDark = theme === "dark";

  return (
    <div className="flex justify-between items-center mt-4">
      <div
        className={`flex gap-1 p-1 rounded-md transition-colors ${
          isDark ? "bg-gray-700" : "bg-gray-100"
        }`}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1 text-sm font-medium rounded-md transition-colors ${
              filter === tab
                ? isDark
                  ? "bg-gray-900 text-white border border-gray-600 font-semibold"
                  : "bg-white text-black border border-gray-300 font-semibold"
                : isDark
                ? "text-gray-400 hover:text-white"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <CategoryDropdown />
    </div>
  );
};

export default StatusTabs;
