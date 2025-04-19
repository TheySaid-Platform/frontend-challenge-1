import { atom } from "recoil";

export const selectedCategoryState = atom<string>({
    key: "selectedCategoryState",
    default: "All",
});

export interface Category {
    name: string;
    color: string;
  }

  export const categoryListState = atom<Category[]>({
    key: "categoryListState",
    default: [
      { name: "Work", color: "bg-blue-200 text-blue-800" },
      { name: "Personal", color: "bg-green-200 text-green-800" },
      { name: "Shopping", color: "bg-pink-200 text-pink-800" },
      { name: "Other", color: "bg-gray-200 text-gray-700" },
    ],
  });