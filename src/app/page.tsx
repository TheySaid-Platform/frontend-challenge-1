'use client';
import { useRecoilValue } from 'recoil';
import FilterTodo from 'src/components/FilterTodo';
import Form from 'src/components/AddTodoForm';
import TodoList from 'src/components/TodoList';
import { filteredTodoListState } from 'src/recoil/selectors';

export default function Index() {
  const todoList = useRecoilValue(filteredTodoListState);

  return (
    <div className="p-8 bg-gray-100 min-h-screen  ">
      <div className='p-10 bg-white shadow-lg rounded'>
        <h1 className="text-4xl font-bold">Task Todo</h1>
        <FilterTodo />
        <TodoList todoList={todoList} />
        <Form />
      </div>
    </div>
  );
}
