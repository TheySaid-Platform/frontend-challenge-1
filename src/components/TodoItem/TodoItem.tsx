import React, { useEffect } from 'react';

// Recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { Task, tasksAtom } from '../../recoil/atoms/tasksAtom';
import { filterAtom } from '../../recoil/atoms/filterAtom';

// Icons
import { GoTrash } from 'react-icons/go';
import { LuAlarmClock } from 'react-icons/lu';

const TodoItem: React.FC = () => {
  // Get the tasks from the atom
  const [tasks, setTasks] = useRecoilState(tasksAtom);
  const filter = useRecoilValue(filterAtom);

  // Reset the newlyAdded state after a second
  useEffect(() => {
    const resetNewlyAdded = setTimeout(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => ({ ...task, newlyAdded: false }))
      );
    }, 1000);

    return () => clearTimeout(resetNewlyAdded);
  }, [tasks, setTasks]);

  // Toggle the checked state of a task
  const toggleCheck = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, checked: !task.checked, checkedAnimation: true }
        : task
    );
    setTasks(updatedTasks);

    // Reset the checkedAnimation state after the animation duration
    setTimeout(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, checkedAnimation: false } : task
        )
      );
    }, 400);
  };

  // Delete a task
  const deleteTask = (id: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this task?'
    );

    if (confirmDelete) {
      // Set isDeleting to true for the task being deleted
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, isDeleting: true } : task
      );
      setTasks(updatedTasks);

      // Wait for the animation to finish before removing the task
      setTimeout(() => {
        const finalTasks = tasks.filter((task) => task.id !== id);
        setTasks(finalTasks);
      }, 400);
    }
  };

  // Filter tasks based on the filter state
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'ACTIVE') return !task.checked;
    if (filter === 'COMPLETED') return task.checked;
    return true;
  });

  // Get the color of the priority based on the priority
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'Low':
        return 'bg-green-800';
      case 'Medium':
        return 'bg-yellow-800';
      case 'High':
        return 'bg-red-800';
      default:
        return 'bg-gray-800';
    }
  };

  // Render a message if there are no tasks
  const renderMessage = () => {
    if (filter === 'ACTIVE' && filteredTasks.length === 0) {
      return (
        <div className="text-center text-gray-500 mt-4 text-3xl">
          No active tasks
        </div>
      );
    }
    if (filter === 'COMPLETED' && filteredTasks.length === 0) {
      return (
        <div className="text-center text-gray-500 mt-4 text-3xl">
          No completed tasks
        </div>
      );
    }
    if (filteredTasks.length === 0) {
      return (
        <div className="text-center text-gray-500 mt-4 text-3xl">
          There are no tasks
        </div>
      );
    }
    return null; // No message to display
  };

  return (
    <>
      {renderMessage()}

      {filteredTasks.map((task) => (
        <div
          key={task.id}
          className={`task-container flex justify-between items-center mb-4 border-b border-gray-300 p-2 ${
            task.newlyAdded ? 'grow' : ''
          } ${task.isDeleting ? 'fade-out' : ''} ${
            task.checkedAnimation ? 'check-animation' : ''
          } ${task.checked ? 'checked' : ''}`}
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={!!task.checked}
              onChange={() => toggleCheck(task.id)}
              className="hidden" // Hide the default checkbox
              id={`checkbox-${task.id}`} // Assign a unique ID for label linking
            />
            <label
              htmlFor={`checkbox-${task.id}`} // Link the label to the input
              className={`min-w-6 min-h-6 rounded-full border-2 border-[#7328F6] cursor-pointer flex items-center justify-center ${
                task.checked ? 'bg-[#7328F6] border-[#7328F6]' : ''
              }`}
            >
              {task.checked && (
                <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
              )}
            </label>
            <div>
              <p
                className={`ms-2 text-lg ${
                  task.checked ? 'line-through text-gray-500' : ''
                }`}
              >
                {task.task}
              </p>
              <div
                className={`text-xs text-[#3ace58] flex items-center font-semibold ml-2 ${
                  task.checked ? 'text-[#a5e7b2]' : ''
                }`}
              >
                {task.date}
                <LuAlarmClock
                  className={`ml-1 text-[#000000] ${
                    task.checked ? 'text-[#a4a2a2]' : ''
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Overlay for completed task */}
          {task.checked && (
            <div className="completed-overlay">
              <span className="border-2 border-black bg-white text-black p-1 rounded-lg">
                COMPLETED
              </span>
            </div>
          )}

          <div className="space-y-3 flex flex-col items-end">
            <div
              className={`text-xs font-semibold rounded-md text-white flex justify-center items-center py-[1px] px-2 ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority}
            </div>
            <GoTrash
              onClick={() => deleteTask(task.id)}
              className="text-red-500 cursor-pointer"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default TodoItem;
