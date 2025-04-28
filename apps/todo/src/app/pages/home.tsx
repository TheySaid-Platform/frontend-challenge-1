import { PageContainer, Title } from '@todo/ui';
import TodoList from '../components/todo-list';
export function Home() {
  return (
    <PageContainer>
      <Title>Todo App</Title>
      <TodoList />
    </PageContainer>
  );
}

export default Home;
