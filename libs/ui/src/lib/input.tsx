import React from 'react';

export function Input(props: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
}) {
  const { onChange, placeholder, value } = props;
  return (
    <div className="w-full border-b-2 border-gray-300">
      <input onChange={onChange} placeholder={placeholder} value={value} />
      <h1>Welcome to Input!</h1>
    </div>
  );
}

export default Input;
