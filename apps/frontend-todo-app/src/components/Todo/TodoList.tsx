import { useRecoilValue, useSetRecoilState } from "recoil";
import { filteredTodoListState, todoListState } from "../../recoil/todoState";
import { Todo } from "../../app/types/todo";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todos = useRecoilValue(filteredTodoListState);
  const setTodos = useSetRecoilState(todoListState);

  const toggleCompletion = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleEdit = (updated: Todo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === updated.id ? updated : todo))
    );
  };

  return (
    <div className="mt-6 space-y-3">
      {todos.length === 0 ? (
        <div className="text-sm text-gray-400 text-center py-6">
          No tasks found.
        </div>
      ) : (
        todos.map((todo: Todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => toggleCompletion(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
            onEdit={handleEdit}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
