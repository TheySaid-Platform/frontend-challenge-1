'use client';
import React from 'react';
import { useRecoilState } from 'recoil';
import { todoListFilterState, TodoListFiltersEnum } from 'src/recoil/atoms';

const TodoListFilters = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(value as TodoListFiltersEnum);
  };
  return (
    <div className=" flex justify-end">
      <select
        className="p-4 focus:outline-none "
        value={filter}
        onChange={updateFilter}
      >
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </div>
  );
};

export default TodoListFilters;
