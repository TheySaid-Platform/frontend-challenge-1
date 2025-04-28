import { PageContainer, Title } from '@todo/ui';
import TodoList from '../components/todo-list';
import NewTodoForm from '../components/new-todo-form';

export function Home() {
  return (
    <PageContainer>
      <Title>Todo App</Title>
      <TodoList />
      <NewTodoForm />
    </PageContainer>
  );
}

export default Home;
