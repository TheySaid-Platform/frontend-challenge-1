import { Title } from '@todo/ui';
export function Home() {
  return (
    <div className="w-screen min-h-screen pt-5 bg-blue-50">
      <div className="max-w-[40rem] mx-auto min-h-[40rem] bg-white rounded-md shadow-md ">
        <Title>Todo App</Title>
      </div>
    </div>
  );
}

export default Home;
