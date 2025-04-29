import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import App from './app';

describe('App', () => {
  it('renders the app title', () => {
    render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );
    const titleElement = screen.getByText('Todo App');
    expect(titleElement.textContent).toBe('Todo App');
  });
});
