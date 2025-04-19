import { atom } from "recoil";

export type Filter = "All" | "Active" | "Completed";

export const filterState = atom<Filter>({
  key: "filterState",
  default: "All",
});