import { Todo } from './todo';

describe('Todo object', () => {
  it('should create a valid todo object and verify its contents', () => {
    const todo: Todo = {
      id: '123',
      description: 'Finish testing',
      completed: false,
    };

    expect(todo.id).toBe('123');
    expect(todo.description).toBe('Finish testing');
    expect(todo.completed).toBe(false);
  });
});
