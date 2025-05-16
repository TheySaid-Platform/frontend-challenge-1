interface AddTaskProps{
  handleInputChange:(event: React.ChangeEvent<HTMLInputElement>)=>void
  handleAddItem:()=>void,
  inputValue:string,
}

export function AddTask({handleInputChange,handleAddItem, inputValue}:AddTaskProps) {
 

  return <>
    <div
    className="flex items-center flex-col space-x-2 mt-4 w-full">
      <hr className='text-gray-300 w-full'/>
      <div className="flex items-center space-x-2 w-full my-2">
        <div
            className="w-5 h-5 rounded-full border-2 border-[#7228f7] bg-[#7228f7] flex items-center justify-center text-white">
              ✚
        </div>
        <input
            type="text"
            placeholder="Memorize the dictionary"
            onChange={handleInputChange}
            value={inputValue}
            className="focus:outline-none focus:border-none placeholder:text-gray-300 flex-1 py-1" />
        <button onClick={handleAddItem} className="rounded-lg px-4 py-1 bg-[#7228f7] text-white hover:scale-95 hover:bg-[#7128f7e6]">Add Item</button>
      </div>
      <hr className='text-gray-300 w-full'/>
    </div>
  </>
}