import { useState } from 'react';

export function Input(props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <input
      type="text"
      className={`${
        isFocused ? 'w-48 sm:w-72' : 'w-48'
      } h-10 transition-all duration-500 rounded-sm bg-transparent px-2 border-b-[1px] outline-none`}
      placeholder="Search"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
}
