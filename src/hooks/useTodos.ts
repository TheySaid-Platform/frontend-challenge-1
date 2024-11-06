/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { useRecoilState } from 'recoil';
import { todoListState } from '@/recoil/todoListAtom';
import { useEffect, useState } from "react"


import defaultTodo from '../data/defaultTodo.json';
interface todo {
  id: string
  completed: boolean
  title: string
}

const useTodos = () => {

    const [todoList, setTodoList] = useRecoilState(todoListState);

  // Functions for adding, removing, toggling, and clearing todos
  const addTodo = (todo: { id: string; title: string; completed: boolean }) => {
    setTodoList((prev) => [todo, ...prev]);
  };

    const removeTodo = (id: string) => {
        setTodoList((prev) => prev.filter((todo) => todo.id !== id));
      };


    // update localStorage for todoList
    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todoList));
      }, [todoList]);

    const toggleTodo = (id: string) => {
        setTodoList((prev) =>
          prev.map((todo) =>
            todo.id !== id ? todo : { ...todo, completed: !todo.completed }
          )
        );
      };


    const clearCompleted = () => {
        setTodoList((prev) => prev.filter((todo) => !todo.completed));
      };
    
      const resetTodoList = () => {
        setTodoList(defaultTodo);
      };

  return {
    addTodo,
    todoList, 
    setTodoList, 
    removeTodo, 
    toggleTodo,
    clearCompleted, 
    resetTodoList
  }
}

export default useTodos
