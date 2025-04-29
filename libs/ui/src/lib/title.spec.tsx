import React from 'react';
import { render, screen } from '@testing-library/react';
import Title from './title';

describe('Title component', () => {
  it('renders the text passed as children', () => {
    render(<Title>My Page Title</Title>);
    const titleElement = screen.getByText('My Page Title');
    expect(titleElement).toBeTruthy();
    expect(titleElement.tagName.toLowerCase()).toBe('h1');
  });

  it('applies the correct class name', () => {
    const { container } = render(<Title>Hello</Title>);
    const h1 = container.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1?.className.includes('text-2xl')).toBe(true);
    expect(h1?.className.includes('font-semibold')).toBe(true);
  });
});
