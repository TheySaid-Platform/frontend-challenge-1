import { useRecoilValue, useSetRecoilState } from "recoil";
import { filteredTodoListState, todoListState } from "../../recoil/todoState";
import TodoItem from "./TodoItem";
import { Todo } from "../../app/types/todo";

const TodoList = () => {
  const todos = useRecoilValue(filteredTodoListState);
  const setTodos = useSetRecoilState(todoListState);

  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleEdit = (updated: Todo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === updated.id ? updated : todo))
    );
  };

  return (
    <div className="mt-6">
      {todos.length === 0 ? (
        <div className="text-sm text-gray-400 text-center py-6">
          No tasks found.
        </div>
      ) : (
        <div
          className="space-y-3 max-h-[20rem] overflow-y-auto pr-1"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#94a3b8 transparent", // gray-400 thumb, transparent track
          }}
        >
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => handleToggle(todo.id)}
              onDelete={() => handleDelete(todo.id)}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
