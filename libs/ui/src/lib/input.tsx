import React from 'react';

export function Input(props: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  const { onChange, placeholder, value, onKeyDown } = props;
  return (
    <input
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      className="focus:outline-none w-full py-2 px-4 bg-transparent text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
      onKeyDown={onKeyDown}
    />
  );
}

export default Input;
