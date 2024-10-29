import AddTodo from '../components/AddTodo/AddTodo';
import TodoItem from '../components/TodoItem/TodoItem';
import FilertTasks from '../components/FilertTasks';
import Header from '../components/Header';
import { RecoilRoot } from 'recoil';

export function App() {
  return (
    <RecoilRoot>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-4xl p-10 h-[calc(100vh-5rem)] bg-[#FFFFFF] rounded-2xl shadow-xl overflow-auto scrollbar-thin scrollbar-thumb-[#7328F6] scrollbar-track-gray-200">
          <Header />
          <AddTodo />
          <FilertTasks />
          <TodoItem />
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
