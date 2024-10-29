'use client';
import React, { use } from 'react';
import { useRecoilState } from 'recoil';
import { Todo, todoListState } from 'src/recoil/atoms';
import { motion } from 'framer-motion';
import bin from 'src/public/trash.svg';
import Image from 'next/image';

const TodoItem = ({ todo }: { todo: Todo }) => {
  const [_, setTodoList] = useRecoilState(todoListState);

  const handleClickTodo = (event: React.MouseEvent<HTMLInputElement>) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((t) => {
        if (t.id === todo.id) {
          return { ...t, completed: !t.completed };
        }
        return t;
      });
    });
  };

  const handleDeleteTodo = () => {
    setTodoList((prevTodos) => {
      return prevTodos.filter((t) => t.id !== todo.id);
    });
  };
  return (
    <motion.div
      className="m-2"
      key={todo.id}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <label htmlFor={todo.id}>
        <motion.div
          className="  flex justify-between items-center cursor-pointer p-4"
          animate={{
            scale: todo.completed ? 0.8 : 1,
            backgroundColor: todo.completed ? '#04ff009c' : '#ff0000a8',
            borderRadius: '20px',
          }}
        >
          <input
            checked={todo.completed}
            className="appearance-none  sm:w-6 sm:h-6  w-2 h-2  rounded-full bg-white checked:bg-[#42894274]"
            type="checkbox"
            name="todo"
            id={todo.id}
            onClick={(event) => handleClickTodo(event)}
          />

          <motion.div
            className="p-1  sm:p-3 sm:text-2xl  text-xs  text-wrap"
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              opacity: todo.completed ? 0.5 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 20,
            }}
          >
            <motion.div
              className="sm:hidden block  truncate"
              title={todo.text}
              whileHover={{ scale: 1.1 }}
            >
              {todo.text.length > 20
                ? todo.text.substring(0, 10) + '...'
                : todo.text}
            </motion.div>
            <motion.div className="sm:block hidden ">{todo.text}</motion.div>
          </motion.div>

          <button
            onClick={() => handleDeleteTodo()}
            className="text-red-400 hover:text-red-800"
          >
            <Image src={bin} alt="bin" width={25} height={25} />
          </button>
        </motion.div>
      </label>
    </motion.div>
  );
};

export default TodoItem;
