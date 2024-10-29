'use client';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { todoListState } from '../recoil/atoms';
import { motion, AnimatePresence } from 'framer-motion';

const Form = () => {
  const [text, setText] = useRecoilState(todoListState);
  const [todo, setTodo] = useState<string>('');
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setText((prevTodos) => [
      ...prevTodos,
      { id: crypto.randomUUID(), text: todo, completed: false },
    ]);
    setTodo('');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: text.length }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
        className="p-4  rounded-lg   bg-white shadow-2xl w-full "
      >
        <form className="flex justify-end border-b pb-3" onSubmit={onSubmit}>
          <input
            autoFocus
            required
            type="text"
            value={todo}
            onChange={onChange}
            className="border-0 w-full focus:outline-none  p-2 m-2 text-black text-2xl"
          />

          <button
            type="submit"
            className="border-1 hidden sm:block hover:bg-green-300 cu bg-green-500 text-white border-black rounded px-4 "
          >
            Add Item
          </button>
          <button
            type="submit"
            className="sm:hidden text-green-500 border-black rounded text-2xl "
          >
            +
          </button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

export default Form;
