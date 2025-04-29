import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import NewTodoForm from './new-todo-form';

jest.mock('@todo/ui', () => ({
  Button: ({
    onClick,
    children,
  }: {
    onClick: () => void;
    children: React.ReactNode;
  }) => <button onClick={onClick}>{children}</button>,
  Input: ({
    onChange,
    value,
    placeholder,
    onKeyDown,
  }: {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
    placeholder: string;
    onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  }) => (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
    />
  ),
}));

describe('NewTodoForm component', () => {
  it('renders the input and button', () => {
    render(
      <RecoilRoot>
        <NewTodoForm />
      </RecoilRoot>
    );
    expect(screen.getByPlaceholderText('New task')).toBeTruthy();
    expect(screen.getByText('Add Item')).toBeTruthy();
  });

  it('does not add a new todo if input is empty', () => {
    const mockSetTodoList = jest.fn();
    jest
      .spyOn(require('recoil'), 'useSetRecoilState')
      .mockReturnValue(mockSetTodoList);

    render(
      <RecoilRoot>
        <NewTodoForm />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText('New task');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(screen.getByText('Add Item'));

    expect(mockSetTodoList).not.toHaveBeenCalled();
  });
});
