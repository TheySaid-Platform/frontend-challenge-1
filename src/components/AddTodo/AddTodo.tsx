import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { tasksAtom, Task } from '../../recoil/atoms/tasksAtom';
import './AddTodo.css';

// Toastify
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddTodo() {
  // State for the form inputs
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low');

  // State for the tasks
  const [tasks, setTasks] = useRecoilState(tasksAtom);

  // State to track validation
  const [taskError, setTaskError] = useState(false);
  const [dateError, setDateError] = useState(false);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate inputs
    let hasError = false;

    if (task.trim() === '') {
      setTaskError(true);
      hasError = true;
    } else {
      setTaskError(false);
    }

    if (date === '') {
      setDateError(true);
      hasError = true;
    } else {
      setDateError(false);
    }

    if (hasError) {
      setTimeout(() => {
        setTaskError(false);
        setDateError(false);
      }, 1000);
      return;
    }

    // Add the task to the state
    const newTask = {
      id: Date.now(),
      task,
      date,
      priority,
      checked: false,
      newlyAdded: true,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);

    // Clear the form
    setTask('');
    setDate('');
    setPriority('Low');

    // Show a success message
    toast('Task added successfully!', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
      style: {
        backgroundColor: '#7328F6',
        color: '#FFFFFF',
      },
    });
  };

  return (
    <div className="p-5 px-0 rounded bg-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center md:flex-row md:space-x-2">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className={`mt-1 block w-full md:w-[70%] p-2 border rounded ${
              taskError ? 'border-red-500 blink' : 'border-gray-300'
            }`}
            placeholder="Enter task"
          />
          <div className="w-full flex space-x-2 md:w-[30%]">
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate(e.target.value)}
              className={`mt-1 block w-full md:w-[60%] p-2 border rounded ${
                dateError ? 'border-red-500 blink' : 'border-gray-300'
              }`}
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Task['priority'])}
              className="mt-1 block w-full md:w-[40%] p-2 border border-gray-300 rounded"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full p-2 rounded border border-[#7328F6] text-[#7328F6] hover:shadow-sm hover:shadow-[#B788FF] ease-in-out duration-100 transition-all"
          >
            Add Task
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddTodo;
