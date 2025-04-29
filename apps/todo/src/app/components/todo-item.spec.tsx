import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import TodoItem from './todo-item';
import { todoListState } from '@todo/recoil-store';
import { MdOutlineDelete } from 'react-icons/md';

jest.mock('@todo/ui', () => ({
  Checkbox: ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: () => void;
  }) => (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      data-testid="checkbox"
    />
  ),
}));

describe('TodoItem component', () => {
  const mockTodo = {
    id: '1',
    description: 'Test Todo',
    completed: false,
  };

  it('renders the todo description and checkbox correctly', () => {
    render(
      <RecoilRoot>
        <TodoItem todo={mockTodo} />
      </RecoilRoot>
    );

    expect(screen.getByText('Test Todo')).toBeTruthy();
    const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it('toggles the completed state when the checkbox is clicked', () => {
    const mockSetTodoList = jest.fn();
    const mockTodoList = [mockTodo];

    jest
      .spyOn(require('recoil'), 'useRecoilState')
      .mockReturnValue([mockTodoList, mockSetTodoList]);

    render(
      <RecoilRoot>
        <TodoItem todo={mockTodo} />
      </RecoilRoot>
    );

    const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;

    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);

    expect(mockSetTodoList).toHaveBeenCalledWith([
      { ...mockTodo, completed: true },
    ]);
  });
});
