import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil'; // Import RecoilRoot for wrapping components
import TodoList from './todo-list';
import { todoListState } from '@todo/recoil-store';

jest.mock(
  './todo-item',
  () =>
    ({
      todo,
    }: {
      todo: { id: string; description: string; completed: boolean };
    }) =>
      <div data-testid="todo-item">{todo.description}</div>
);

describe('TodoList component', () => {
  it('renders no items if the todo list is empty', () => {
    const mockTodoList: [] = [];

    render(
      <RecoilRoot>
        <TodoList />
      </RecoilRoot>
    );

    expect(screen.queryByTestId('todo-item')).toBeNull();
  });
});
