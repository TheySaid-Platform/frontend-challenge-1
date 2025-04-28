import { Todo } from '@todo/interfaces';
import { todoListState } from '@todo/recoil-store';
import { Button, Input } from '@todo/ui';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

export function NewTodoForm() {
  const [description, setDescription] = useState('');
  const setTodoList = useSetRecoilState(todoListState);

  const addTodo = () => {
    if (description.trim() === '') return;

    const newTodo: Todo = {
      id: uuidv4(),
      description: description.trim(),
      completed: false,
    };

    setTodoList((oldList) => [...oldList, newTodo]);
    setDescription('');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  };
  return (
    <div className="flex w-full gap-2">
      <Input
        placeholder="New task"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={addTodo}>Add Item</Button>
    </div>
  );
}

export default NewTodoForm;
