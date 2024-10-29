import React from 'react';
// Recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { filterAtom, FilterType } from '../recoil/atoms/filterAtom';
import { tasksAtom } from '../recoil/atoms/tasksAtom';

const FilertTasks: React.FC = () => {
  // Get the filter state from the atom
  const [filter, setFilter] = useRecoilState(filterAtom);
  const tasks = useRecoilValue(tasksAtom);

  // Handle the filter change event
  const handleFilterChange = (filterType: FilterType) => {
    setFilter(filterType);
  };

  // Calculate the total number of tasks
  const totalTasks = tasks.length;

  return (
    <div className="flex items-center justify-between md:justify-start mb-4 font-semibold text-gray-500 md:space-x-7">
      <div
        className={`p-2 cursor-pointer hover:bg-[#EEEEEE] ${
          filter === 'ALL' ? 'border-b-2 border-blue-500 text-blue-500' : ''
        }`}
        onClick={() => handleFilterChange('ALL')}
      >
        ALL {totalTasks > 0 && `(${totalTasks})`} {/* Show count next to ALL */}
      </div>
      <div
        className={`p-2 cursor-pointer hover:bg-[#EEEEEE] ${
          filter === 'ACTIVE' ? 'border-b-2 border-blue-500 text-blue-500' : ''
        }`}
        onClick={() => handleFilterChange('ACTIVE')}
      >
        ACTIVE
      </div>
      <div
        className={`p-2 cursor-pointer hover:bg-[#EEEEEE] ${
          filter === 'COMPLETED'
            ? 'border-b-2 border-blue-500 text-blue-500'
            : ''
        }`}
        onClick={() => handleFilterChange('COMPLETED')}
      >
        COMPLETED
      </div>
    </div>
  );
};

export default FilertTasks;
