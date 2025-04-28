import { FaPlusCircle } from 'react-icons/fa';
import { Button, Input } from '@todo/ui';
import { useState } from 'react';

export function NewTodoForm() {
  const [description, setDescription] = useState('');
  const createTodo = () => {};
  return (
    <form className="flex w-full">
      <FaPlusCircle />
      <Input
        placeholder="New task"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <Button onClick={createTodo}>Add Item</Button>
    </form>
  );
}

export default NewTodoForm;
