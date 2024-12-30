import React, { useState, useEffect } from 'react';
import completedImage from "./assets/completed.png";
import uncheckedImage from "./assets/unchecked.png";
import completedLight from "./assets/completed-light.png";
import uncheckedLight from "./assets/unchecked-light.png";

interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editTask, setEditTask] = useState<Todo | null>(null);
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );
  const [showModal, setShowModal] = useState(false);
  const [congratsMessage, setCongratsMessage] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const addTodo = () => {
    if (newTitle.trim()) {
      const newTodo = {
        id: Date.now(),
        title: newTitle,
        description: newDescription,
        completed: false,
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      setNewTitle('');
      setNewDescription('');
      setShowModal(false);
    }
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));

    // Show congratulations message when a task is completed
    const completedTask = updatedTodos.find(
      (todo) => todo.id === id && todo.completed
    );
    if (completedTask) {
      setCongratsMessage(true);
      setTimeout(() => {
        setCongratsMessage(false);
      }, 3000); // Hide message after 3 seconds
    }
  };

  const removeTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleEdit = (todo: Todo) => {
    setEditTask(todo);
  };

  const saveEditTask = () => {
    if (editTask) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editTask.id ? { ...editTask } : todo
      );
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      setEditTask(null);
    }
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-[#E8EBFF] to-[#8e70d4] text-black'
      }`}
    >
      {/* Header Section */}
      <header
        className={`sticky top-0 z-50 shadow-md p-4 mb-6 ${
          darkMode
            ? 'dark:bg-gray-800 text-white'
            : 'bg-gradient-to-r from-[#E0E1FF] to-[#A5A6D1] text-black'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-xl font-bold">Taskify</h1>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="focus:outline-none border-gray-300 rounded-3xl px-3 py-1 bg-[#41345e] text-white placeholder:text-white"
            placeholder="Search tasks"
          />
          <button
            onClick={toggleDarkMode}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-2 py-1 rounded-md transition-colors duration-300"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      {/* Add Task Button */}
      <div className="flex justify-end mt-6 mb-4 px-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      {/* Task Grid */}
      <div className="container mt-[40px] mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className={`p-4 rounded-md shadow-md shadow-[#ff7bc4] ${
              darkMode
                ? 'bg-gray-800 text-white shadow-md shadow-[#ff7bc4]'
                : 'bg-gradient-to-b from-[#3b2167] to-[#432379] shadow-none'
            }`}
          >
            <h3
              className={`font-bold text-lg ${
                darkMode ? 'text-white' : 'text-white'
              }`}
            >
              {todo.title}
            </h3>
            <p
              className={`${
                darkMode ? 'text-gray-300' : 'text-white'
              } mt-1 text-sm`}
            >
              {todo.description
                ? todo.description.length > 20
                  ? `${todo.description.slice(0, 20)}...`
                  : todo.description
                : 'No description provided.'}
            </p>
            <p
              className={`mt-2 ${
                darkMode ? 'text-gray-300' : 'text-white'
              } text-sm`}
            >
              Status: {todo.completed ? 'Completed' : 'Pending'}
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`px-2 py-1 rounded-md ${
                  darkMode
                    ? 'text-green-500 hover:text-green-700'
                    : ' bg-purple-800 text-white hover:bg-gray-800'
                }`}
              >
                <img className="w-7" src={darkMode ? (todo.completed ? completedImage : uncheckedImage) : (todo.completed ? completedLight : uncheckedLight)} />
              </button>
              <button
                onClick={() => removeTodo(todo.id)}
                className={`px-2 py-1 rounded-md ${
                  darkMode
                    ? 'text-red-500 font-semibold hover:text-red-700'
                    : 'text-red-500 font-semibold hover:bg-gray-800 hover:text-white'
                }`}
              >
                Delete
              </button>
              <button onClick={() => handleEdit(todo)}
                className={`px-2 py-1 rounded-md ${
                  darkMode
                    ? 'text-blue-500 font-semibold hover:text-blue-700'
                    : 'text-blue-300 font-semibold hover:bg-gray-800 hover:text-white'
                }`}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div
            className={`p-6 rounded-md shadow-md transition-colors duration-300 ${
              darkMode
                ? 'bg-gray-800 text-white'
                : 'bg-gradient-to-b from-[#E8EBFF] to-[#C9D0FF] text-black'
            }`}
          >
            <h2 className="text-xl font-bold mb-4 text-blue-400">Add New Task</h2>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className={`w-full mb-2 p-2 rounded-md focus:outline-none focus:ring-2 ${
                darkMode
                  ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500'
                  : 'bg-white text-black placeholder-gray-600 focus:ring-purple-400'
              }`}
              placeholder="Title"
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className={`w-full mb-2 p-2 rounded-md focus:outline-none focus:ring-2 ${
                darkMode
                  ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500'
                  : 'bg-white text-black placeholder-gray-600 focus:ring-purple-400'
              }`}
              placeholder="Description"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={addTodo}
                className="bg-blue-500 text-white px-4 py-1 rounded-md"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {editTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div
            className={`p-6 rounded-md shadow-md transition-colors duration-300 ${
              darkMode
                ? 'bg-gray-800 text-white'
                : 'bg-gradient-to-b from-[#E8EBFF] to-[#C9D0FF] text-black'
            }`}
          >
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            <input
              type="text"
              value={editTask.title}
              onChange={(e) =>
                setEditTask({ ...editTask, title: e.target.value })
              }
              className={`w-full mb-2 p-2 rounded-md focus:outline-none focus:ring-2 ${
                darkMode
                  ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500'
                  : 'bg-white text-black placeholder-gray-600 focus:ring-purple-400'
              }`}
              placeholder="Title"
            />
            <textarea
              value={editTask.description}
              onChange={(e) =>
                setEditTask({ ...editTask, description: e.target.value })
              }
              className={`w-full mb-2 p-2 rounded-md focus:outline-none focus:ring-2 ${
                darkMode
                  ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500'
                  : 'bg-white text-black placeholder-gray-600 focus:ring-purple-400'
              }`}
              placeholder="Description"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditTask(null)}
                className="text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={saveEditTask}
                className="bg-blue-500 text-white px-4 py-1 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Congratulations Message */}
      {congratsMessage && (
        <div
          className={`fixed left-0 bottom-16 bg-purple-800 text-white py-2 px-4 rounded-md shadow-md animate-slide-in`}
        >
          🎉 Congratulations! Task Completed!
        </div>
      )}

      {/* Footer */}
      <footer
        className={`fixed bottom-0 w-full text-center py-2 transition-colors duration-300 ${
          darkMode
            ? 'bg-gray-800 text-white'
            : 'bg-gradient-to-r from-[#E8EBFF] to-[#C9D0FF] text-black'
        }`}
      >
        <p>© Taskify Irsa Irfan 2025</p>
      </footer>
    </div>
  );
};

export default App;

