import { Button, Input } from '@todo/ui';
import { useState } from 'react';

export function NewTodoForm() {
  const [description, setDescription] = useState('');
  const createTodo = () => {};
  return (
    <div className="flex w-full gap-2">
      <Input
        placeholder="New task"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <Button onClick={createTodo}>Add Item</Button>
    </div>
  );
}

export default NewTodoForm;
