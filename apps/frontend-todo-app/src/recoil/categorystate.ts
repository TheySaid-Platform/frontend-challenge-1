import { atom } from "recoil";

export interface Category {
  name: string;
  colorLight: string;
  colorDark: string;
}

const LOCAL_STORAGE_KEY = "categories";

// Two default categories
const defaultCategories: Category[] = [
  {
    name: "Work",
    colorLight: "bg-blue-200 text-blue-800",
    colorDark: "bg-blue-900 text-blue-200",
  },
  {
    name: "Personal",
    colorLight: "bg-green-200 text-green-800",
    colorDark: "bg-green-900 text-green-200",
  },
];

const getInitialCategories = (): Category[] => {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  try {
    if (stored) {
      return JSON.parse(stored) as Category[];
    } else {
      // Save default on first load
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultCategories));
      return defaultCategories;
    }
  } catch {
    return defaultCategories;
  }
};

export const categoryListState = atom<Category[]>({
  key: "categoryListState",
  default: getInitialCategories(),
  effects: [
    ({ onSet }) => {
      onSet((newCategories) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCategories));
      });
    },
  ],
});

export const selectedCategoryState = atom<string>({
  key: "selectedCategoryState",
  default: "All",
});
