import React from 'react';
import { render, screen } from '@testing-library/react';
import PageContainer from './page-container';

describe('PageContainer component', () => {
  it('renders children correctly', () => {
    render(
      <PageContainer>
        <p>Test content</p>
      </PageContainer>
    );
    const child = screen.getByText('Test content');
    expect(child).toBeTruthy();
    expect(child.tagName.toLowerCase()).toBe('p');
  });

  it('renders with correct container structure', () => {
    const { container } = render(
      <PageContainer>
        <span>Child</span>
      </PageContainer>
    );
    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv).toBeTruthy();
    expect(outerDiv.className.includes('w-screen')).toBe(true);

    const innerDiv = outerDiv.querySelector('div');
    expect(innerDiv).toBeTruthy();
    expect(innerDiv?.className.includes('max-w-[40rem]')).toBe(true);
  });
});
