import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './input';

describe('Input component', () => {
  it('renders with placeholder', () => {
    render(<Input placeholder="Enter text" onChange={() => {}} />);
    const input = screen.getByPlaceholderText('Enter text') as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.placeholder).toBe('Enter text');
  });

  it('renders with provided value', () => {
    render(<Input value="Initial" onChange={() => {}} />);
    const input = screen.getByDisplayValue('Initial') as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.value).toBe('Initial');
  });

  it('calls onChange when typed into', () => {
    const handleChange = jest.fn();
    render(<Input value="" onChange={handleChange} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Hello' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('calls onKeyDown when key is pressed', () => {
    const handleKeyDown = jest.fn();
    render(<Input value="" onChange={() => {}} onKeyDown={handleKeyDown} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });
});
