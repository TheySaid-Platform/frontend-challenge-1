/* eslint-disable prettier/prettier */


import React, { memo, useState } from 'react'

import Addtodo from '@/components/AddTodo/Addtodo'
import useTodos from '@/hooks/useTodos'

import Box from '../../components/Box'

import styles from './index.module.css'
import TodoList from '@/components/TodoList/TodoList'

interface Props {}
export interface todo {
  id: string;
  completed: boolean;
  title: string;
}

// types
export type filter = 'all' | 'active' | 'completed';

const Index: React.FC<Props> = memo(() => {
  // const [filter, setFilter] = useState<filter>('all');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const {
    addTodo, 
    todoList, 
    setTodoList, 
    removeTodo, 
    toggleTodo, 
    clearCompleted
  
  } = useTodos();
  return (
    <>
      <Box>
        <h1 className={styles.h1}>Todo List</h1>
      </Box>
      <Box>      
          <Addtodo addTodo={addTodo}/>
          <TodoList 
           todoList={todoList}
           setTodoList={setTodoList}
           filter={filter}
           setFilter={setFilter}
           removeTodo={removeTodo}
           toggleTodo={toggleTodo}
           clearCompleted={clearCompleted}
          />
      </Box>
    
    </>
  )
})
Index.displayName = 'Index'

export default Index
