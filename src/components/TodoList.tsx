'use client';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Todo } from 'src/recoil/atoms';
import TodoItem from './TodoItem';
import { AnimatePresence, motion } from 'framer-motion';
const TodoList = ({todoList}: {todoList: Todo[]}) => {

  return (
    <div>
      <AnimatePresence>
        {todoList?.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;
