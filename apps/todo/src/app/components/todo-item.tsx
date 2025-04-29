import { Todo } from '@todo/interfaces';
import { todoListState } from '@todo/recoil-store';
import { Checkbox } from '@todo/ui';
import { useState } from 'react';
import { MdOutlineDelete } from 'react-icons/md';
import { useRecoilState } from 'recoil';

export function TodoItem(props: { todo: Todo }) {
  const { todo } = props;
  const { description, completed } = todo;
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const index = todoList.findIndex((listItem) => listItem.id === todo.id);

  const toggleComplete = () => {
    const newList = [...todoList];
    newList[index] = {
      ...todo,
      completed: !todo.completed,
    };
    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = todoList.filter((_, i) => i !== index);
    setTodoList(newList);
  };

  return (
    <div className="w-full flex items-center justify-between p-4 my-2 px-2 rounded-md bg-pink-50">
      <div className="flex gap-4 items-center">
        <Checkbox checked={completed} onChange={toggleComplete} />
        <p>{description}</p>
      </div>
      <MdOutlineDelete
        className="text-gray-500 hover:text-red-500 cursor-pointer"
        size={24}
        onClick={deleteItem}
      />
    </div>
  );
}

export default TodoItem;
