import { TaskItem } from "../components/task-item/task-item";
import { AddTask } from "../components/task-item/add-task";
import {useAtom} from "jotai";
import { tasksAtom,inputItem } from "../atoms/atom";

export function App() {

  const [task, setTask] = useAtom(tasksAtom);

  const [inputValue, setInputValue] = useAtom(inputItem);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>){
    setInputValue(event.target.value);
  }

  function handleAddItem(){
    setTask((prevTask)=>[...prevTask,inputValue]);
    setInputValue('');
  }

  const TaskHTML = task.map((task,i)=>{
    return <li key={i}><TaskItem taskName={task}/></li>
  })


  return (
    <main className="border-purple-400 border-1">
      <h1 className='text-2xl font-bold mb-4'>Todo List</h1>
      <ul>
        {TaskHTML}
        <li>
          <AddTask handleInputChange={handleInputChange} handleAddItem={handleAddItem} inputValue={inputValue}/>
        </li>
      </ul>
    </main>

  );
}

export default App;
