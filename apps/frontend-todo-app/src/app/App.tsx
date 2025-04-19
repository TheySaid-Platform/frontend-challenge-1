import StatusTabs from "../components/Filters/StatusTabs";
import Header from "../components/Header";
import TodoInput from "../components/Todo/TodoInput";
import TodoList from "../components/Todo/TodoList";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import { themeState } from "../recoil/themeState";

const App = () => {
  const theme = useRecoilValue(themeState);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <div
  className={`min-h-screen flex items-center justify-center px-4 transition-colors ${
    isDark
      ? "bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800"
      : "bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300"
  }`}
>
  <div
    className={`w-full max-w-md p-6 rounded-2xl shadow-lg transition-colors border backdrop-blur-sm ${
      isDark
        ? "bg-gray-900 text-white border-gray-700 shadow-black/40"
        : "bg-white text-gray-900 border-gray-400 shadow-gray-500/10"
    }`}
  >
    <Header />
    <StatusTabs />
    <TodoList />
    <TodoInput />
  </div>
</div>

  );
};

export default App;
