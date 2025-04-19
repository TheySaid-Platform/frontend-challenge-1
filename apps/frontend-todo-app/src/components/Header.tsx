//Todo list, title progress bar, dark/light toggle

import { useRecoilState, useRecoilValue } from "recoil";
import { todoStatsState } from "../recoil/todoState";
import { MoonIcon, SunIcon } from "lucide-react";
import { themeState } from "../recoil/themeState";

const Header = () => {
  const { total = 0, completed = 0 } = useRecoilValue(todoStatsState);

  const progress = total > 0 ? (completed / total) * 100 : 0;

  const [theme, setTheme] = useRecoilState(themeState);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Todo List</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-500 text-sm">{`${completed}/${total} completed`}</span>
          <button
            onClick={toggleTheme}
            className="text-gray-500 hover:text-black dark:hover:text-white"
          >
            {theme === "light" ? <MoonIcon size={18} /> : <SunIcon size={18} />}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mt-3">
        <div
          className="h-full bg-purple-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Header;
