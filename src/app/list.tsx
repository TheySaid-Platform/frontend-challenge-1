import { useState } from "react";
import { PiPlusCircleFill } from "react-icons/pi";
import { useRecoilState, atom } from "recoil";
import { FaRegCircle } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";

export function List({ title }: { title: string }) {
  const textState = atom({
    key: `teststate`,
    default: '',
  });
  const [isAnimated, setIsAnimated] = useState<string>('');
  const [listItems, setListItems] = useState<string[]>([]);
  const [text, setText] = useRecoilState<string>(textState);
  const [deleteIcon, setShowDeleteIcon] = useState<string>('');

  const onChange = (event: any) => {
    setText(event.target.value);
  };
  const addTodo = () => {
    setIsAnimated(text)
    if (!listItems.includes(text)) {
      setListItems(listItems => [...listItems, text])
    } else {
      alert('Item already exists')
    }
    setText('');
    setTimeout(() => {
      setIsAnimated('')
    }, 1000);
  };

  const removeTodo = (item: string) => {
    const filterList = listItems.filter(val => val !== item)
    setListItems(filterList)
  }

  return (
    <section className="flex flex-col gap-8 sm:mx-auto mt-16 sm:w-[600px] phone:w-[-webkit-fill-available] phone:m-8">
      <h1 className="text-3xl font-bold">{title}</h1>
      <section>
        {listItems.length == 0 && <span className="text-sm font-semibold text-gray-300">Add Todo Items</span>}
        <div className="flex flex-col gap-2">
          {listItems?.map(item => (
            <div key={Math.random()} className="flex gap-3 items-center relative">
              <FaRegCircle size={18} color="#7328f6" className={`animate__animated ${isAnimated === item && 'animate__zoomIn'}`} />
              <span className={`text-lg border-b py-1 w-full animate__animated ${isAnimated === item && 'animate__fadeIn'}`}
                onMouseMoveCapture={() => setShowDeleteIcon(item)}>
                {item}
              </span>
              <span
                onClick={() => removeTodo(item)}
                className={`${deleteIcon === item ? 'flex' : 'hidden'} absolute right-0 cursor-pointer`}>
                <TiDeleteOutline size={22} color="red" />
              </span>
            </div>
          ))}
        </div>
      </section>
      <section className="flex gap-4 addItemBtn">
        <span className="mt-2">
          <PiPlusCircleFill color="#7328f6" size={24} className="addItemIcon" />
        </span>
        <div className="flex phone:flex-col sm:flex-row sm:items-center w-full gap-2">
          <input
            value={text}
            type="text"
            placeholder="Memorized the dictionary"
            className="flex border-b py-2 outline-0 flex-1 text-base"
            onChange={onChange}
          />
          <button
            onClick={addTodo}
            className="flex flex-4 p-1 px-3 text-white text-sm bg-[#7328f6] rounded hover:bg-[#8d50f8] transition-all duration-300 w-max">
            Add Item
          </button>
        </div>
      </section>
    </section>
  )
}


export default List;
