import {atom} from 'jotai'

export const tasksAtom = atom<string[]>(["Milk", "Eggs", 'Cheese', 'Bread','butter'])

export const inputItem = atom('');