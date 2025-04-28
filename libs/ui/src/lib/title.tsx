import React from 'react';
export function Title(props: { children?: string }) {
  return <h1 className="font-semibold text-2xl">{props.children}</h1>;
}

export default Title;
