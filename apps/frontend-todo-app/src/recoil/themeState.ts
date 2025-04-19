import { atom } from "recoil";

const THEME_KEY = "theme";

const getInitialTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  return (localStorage.getItem(THEME_KEY) as "light" | "dark") || "light";
};

export const themeState = atom<"light" | "dark">({
  key: "themeState",
  default: getInitialTheme(),
  effects: [
    ({ onSet }) => {
      onSet((newTheme) => {
        localStorage.setItem(THEME_KEY, newTheme);
      });
    },
  ],
});
