import { useState } from "react";


interface TaskItemProps{
  taskName:string,
}

export function TaskItem({ taskName }: TaskItemProps) {

  

  const [checked, setChecked] = useState(false);


  return <>
    <label className="flex items-center space-x-2 mb-2 w-full cursor-pointer hover:rotate-1">
      <span className="relative  w-6 h-6 flex items-end justify-center hover:cursor-pointer hover:scale-110 transition-scale duration-200 mt-1">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e)=>setChecked(e.target.checked)}
          className="peer opacity-0 w-6 h-6 absolute z-10 cursor-pointer" />
        <div
          className="w-5 h-5 rounded-full border-2 border-[#7228f7] bg-white peer-checked:bg-[#7228f7] flex items-center justify-center transition-colors duration-200">
          <div
            className="w-2.5 h-2.5 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"></div>
        </div>
      </span>
      <span className="flex-1 flex flex-col ml-1 ">
        <hr className='text-gray-300 w-full mb-1'/>
        <div className="flex">
          <span className={`text-lg ${checked?'line-through text-gray-500':''} text-gray-800 flex-1`}>
            {taskName}
          </span>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#7228f7] text-white px-2 rounded-md hover:bg-[#7128f7e9] hover:cursor-pointer hover:scale-105">Delete</button>
        </div>
      </span>
      
    </label>
  </>
}