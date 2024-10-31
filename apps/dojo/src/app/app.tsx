import { useRecoilState, useRecoilValue } from 'recoil';
import WelcomePage from './components/WelcomePage';

import { visibleStateAtom } from './recoil/atoms/visibleAtom';
import { Header } from './components/Header';
import addButton from './../assets/images/add-circle.svg';
import todoIcon from './../assets/images/todo-icon.png';
import { todoListAtom } from './recoil/atoms/todoListAtom';
import { modalVisibleAtom } from './recoil/atoms/modalVisibleAtom';
import TodoItemCreator from './components/TodoItemCreator';
import { useEffect, useState } from 'react';

export function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setModalVisible] = useRecoilState(modalVisibleAtom);
  const openModal = () => {
    setModalVisible((prevState) => !prevState);
  };
  const [visible, setVisible] = useRecoilState(visibleStateAtom);

  const [todoList, setTodoList] = useRecoilState(todoListAtom);

  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => setShowAll((prev) => !prev);

  let show;

  if (!visible) {
    show = 'flex';
  } else {
    show = 'none';
  }

  // const [items, setItems] = useState([]);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(todoList));

    if (todoList.length > 0) {
      setVisible(false);
    }
  }, [todoList, setVisible]);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (id: string) => {
    setTodoList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, isComplete: !item.isComplete } : item
      )
    );
  };

  const handleDelete = (id: string) => {
    setTodoList((prevList) => prevList.filter((el) => el.id !== id));
  };

  return (
    <div className="container mx-auto px-4">
      <WelcomePage />
      {/* <Header /> */}
      <TodoItemCreator />
      <div
        className="py-8"
        style={{ display: `${show === 'flex' ? 'block' : 'none'}` }}
      >
        <div className="bg-[#2f4f4f] rounded-xl p-6 mb-6">
          <h2 className="text-4xl font-[500] text-white">Good Morning</h2>
          <p className="text-white">
            You’re all caught up, but we’ll keep your completed to-dos in case
            you need to refer back to them.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-[500]">To-dos</h2>
              <div className="flex items-center">
                <button type="button" onClick={openModal}>
                  <img src={addButton} alt="add button" width={40} />
                </button>
              </div>
            </div>
            {todoList.length < 1 ? (
              <div className="border-solid border-[1.5px] border-slate-300 rounded-xl p-6 ">
                <div className="flex flex-col flex-wrap items-center justify-center">
                  <div>
                    <img src={todoIcon} alt="todoIcon" width={200} />
                  </div>
                  <div className="pb-8">
                    <p>
                      You’re all caught up, but we’ll keep your completed to-dos
                      in case you need to refer back to them.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <ul>
                {(showAll ? todoList : todoList.slice(0, 4)).map((el) => (
                  <li
                    className="border-solid border-[1.5px] border-slate-300 rounded-xl p-6 ps-0 mb-2 grid grid-cols-9"
                    key={el.id}
                  >
                    <div className="checkbox-container">
                      <input
                        type="checkbox"
                        id={`checkbox-${el.id}`} // Unique ID for each checkbox
                        className="checkbox"
                        checked={el.isComplete}
                        onChange={() => handleCheckboxChange(el.id)} // Pass the id
                      />
                      <label
                        htmlFor={`checkbox-${el.id}`}
                        className="checkbox-label"
                      >
                        <svg className="checkmark" viewBox="0 0 24 24">
                          <path d="M6 12l4 4L18 6" />
                        </svg>
                      </label>
                    </div>

                    <div className="col-span-8">
                      <div>
                        <h4 className="text-xl font-[500] mb-2">
                          Title: {el.title}
                        </h4>
                        <div>
                          <label htmlFor="checkbox">Check me!</label>
                          <p>{`Checkbox is ${
                            isChecked ? 'checked' : 'unchecked'
                          }`}</p>
                        </div>
                      </div>
                      {el.description ? (
                        <div>
                          <p>Description: {el.description}</p>
                        </div>
                      ) : (
                        <span></span>
                      )}

                      {el.dueDate ? (
                        <div>
                          <p>Due by: {el.dueDate}</p>
                        </div>
                      ) : (
                        <span></span>
                      )}
                      <div>
                        <p>Id: {el.id}</p>
                      </div>
                      <div>
                        <p>Status: {el.isComplete ? 'Done' : 'Pending'}</p>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => handleDelete(el.id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}

                {todoList.length > 4 && (
                  <button
                    type="button"
                    className="outline-btn"
                    onClick={toggleShowAll}
                  >
                    <span>
                      {showAll
                        ? 'Show Less'
                        : `Show More (${todoList.length - 4})`}
                    </span>
                  </button>
                )}
              </ul>
            )}
          </div>
          <div>
            <div className="border-solid border-[1.5px] border-slate-300 rounded-xl p-6">
              <div>
                <h2 className="text-xl font-[500] mb-5">Upcoming To-dos</h2>
                <ul>
                  <li className="mb-3">
                    <p>
                      You’re all caught up, but we’ll keep your completed to-dos
                      in case you need to refer back to them.
                    </p>
                  </li>
                  <li className="mb-3">
                    <p>
                      You’re all caught up, but we’ll keep your completed to-dos
                      in case you need to refer back to them.
                    </p>
                  </li>
                  <li className="mb-3">
                    <p>
                      You’re all caught up, but we’ll keep your completed to-dos
                      in case you need to refer back to them.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
