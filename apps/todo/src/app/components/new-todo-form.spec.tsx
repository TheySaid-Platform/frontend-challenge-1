import { render } from '@testing-library/react';

import NewTodoForm from './new-todo-form';

describe('NewTodoForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewTodoForm />);
    expect(baseElement).toBeTruthy();
  });
});
