import { useRecoilState } from 'recoil';
import WelcomePage from './components/WelcomePage';

import { visibleStateAtom } from './recoil/atoms/visibleAtom';
import { Header } from './components/Header';
import addButton from './../assets/images/add-circle.svg';
import todoIcon from './../assets/images/todo-icon.png';
import { todoListAtom } from './recoil/atoms/todoListAtom';
import { modalVisibleAtom } from './recoil/atoms/modalVisibleAtom';
import TodoItemCreator from './components/TodoItemCreator';
import { useEffect, useState } from 'react';
import deleteIcon from './../assets/images/delete.svg';
import arrowUp from './../assets/images/arrowUp.svg';
import arrowDown from './../assets/images/arrow-down.svg';
import InfoPrompt from './components/InfoPrompt';
import GreetingBox from './components/GreetingBox';

export function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setModalVisible] = useRecoilState(modalVisibleAtom);

  const [completedData, setCompletedData] = useState('');

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const openModal = () => {
    setModalVisible((prevState) => !prevState);
  };
  const [visible, setVisible] = useRecoilState(visibleStateAtom);

  const [todoList, setTodoList] = useRecoilState(todoListAtom);

  const completedTodoArr = todoList.filter((el) => el.isComplete);
  const pendingTodoArr = todoList.filter((el) => !el.isComplete);
  const [promptTextState, setPromptTextState] = useState('Loading..');
  useEffect(() => {
    if (completedTodoArr.length > 0 && pendingTodoArr.length < 1) {
      setPromptTextState(
        'You’re all caught up, but we’ll keep your completed to-dos in case you need to refer back to them.'
      );
    } else if (todoList.length < 1) {
      setPromptTextState(
        'It looks like you don’t have any tasks added yet. Start by adding your first to-do!'
      );
    }
  }, [completedTodoArr.length, pendingTodoArr.length, todoList.length]);

  const [showAll, setShowAll] = useState(false);
  const [completedShowAll, setCompletedShowAll] = useState(false);
  const toggleShowAll = () => setShowAll((prev) => !prev);
  const toggleCompletedShowAll = () => setCompletedShowAll((prev) => !prev);

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
  const currentDate = new Date();

  const handleCheckboxChange = (id: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }; // Correctly typed options
    const textDate = currentDate.toLocaleString('en-US', options);
    setTodoList((prevList) =>
      prevList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isComplete: !item.isComplete,
            completedDate: item.isComplete ? undefined : textDate, // Set date if completing the task
          };
        }
        return item; // Return the item unchanged if the id does not match
      })
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
        <GreetingBox />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-[500]">To-dos</h2>
              <div className="flex items-center">
                <button type="button" onClick={openModal}>
                  {/* <img src={addButton} alt="add button" width={40} /> */}
                  <div className="add-button">
                    <span className="plus">
                      <img src={addButton} alt="add button" width={28} />
                    </span>
                  </div>
                </button>
              </div>
            </div>
            {todoList.length < 1 ? (
              <InfoPrompt
                promptInfoIcon={todoIcon}
                promptInfoText={promptTextState}
              />
            ) : (
              <>
                <ul>
                  {(showAll ? pendingTodoArr : pendingTodoArr.slice(0, 4)).map(
                    (el) => (
                      <li
                        className="relative border-solid border-[1.5px] border-slate-300 rounded-xl p-6 lg:ps-0 mb-2 gridLi"
                        key={el.id}
                      >
                        <div className="checkbox-container order-2 md:order-1">
                          <input
                            type="checkbox"
                            id={`checkbox-${el.id}`} // Unique ID for each checkbox
                            className="checkbox"
                            checked={el.isComplete}
                            onChange={() => handleCheckboxChange(el.id)} // Pass the id
                          />
                          <label
                            htmlFor={`checkbox-${el.id}`}
                            className="checkbox-label w-[40px] h-[40px] md:w-[60px] md:h-[60px]"
                          >
                            <svg className="checkmark" viewBox="0 0 24 24">
                              <path d="M6 12l4 4L18 6" />
                            </svg>
                          </label>
                          <p className="ms-2.5 block md:hidden">
                            {el.isComplete
                              ? `Completed on ${el.completedDate}`
                              : el.dueDate
                              ? `Due by: ${el.dueDate}`
                              : ``}
                          </p>
                        </div>

                        <div className="flex justify-center flex-col order-1 md:order-2">
                          <div>
                            <h4
                              className={`text-xl font-[500] ${
                                el.description ? 'mb-2' : 'mb-0'
                              }`}
                            >
                              {el.title}
                            </h4>
                          </div>
                          {el.description ? (
                            <div key={el.id}>
                              <p>
                                {expandedId === el.id ||
                                el.description.length <= 160
                                  ? el.description
                                  : `${el.description.substring(0, 160)}...`}
                                {el.description.length > 160 && (
                                  <span
                                    onClick={() => toggleExpand(el.id)}
                                    className="read-more"
                                    style={{ color: 'blue', cursor: 'pointer' }}
                                  >
                                    {expandedId === el.id
                                      ? ' Show less'
                                      : ' Read more'}
                                  </span>
                                )}
                              </p>
                            </div>
                          ) : (
                            <span className="hidden"></span>
                          )}

                          {/* {el.dueDate ? (
                        <div>
                          <p>Due by: {el.dueDate}</p>
                        </div>
                      ) : (
                        <span></span>
                      )} */}

                          {/* <div>
                        <p>Status: {el.isComplete ? 'Done' : 'Pending'}</p>
                      </div> */}
                          <p className="mt-2.5 hidden md:block">
                            {el.isComplete
                              ? `Completed on ${el.completedDate}`
                              : el.dueDate
                              ? `Due by: ${el.dueDate}`
                              : ``}
                          </p>
                        </div>
                        <div className="order-3 md:order-3 deletCol">
                          <button
                            type="button"
                            onClick={() => handleDelete(el.id)}
                            className="text-red-600 hover:underline float-end"
                          >
                            <img src={deleteIcon} alt="deleteIcon" />
                          </button>
                        </div>
                      </li>
                    )
                  )}

                  {pendingTodoArr.length > 4 && (
                    <button
                      type="button"
                      className="outline-btn flex"
                      onClick={toggleShowAll}
                    >
                      <span>
                        {showAll
                          ? 'Show Less'
                          : `Show More (${pendingTodoArr.length - 4})`}
                      </span>{' '}
                      {showAll ? (
                        <img src={arrowUp} alt="arrowUp" />
                      ) : (
                        <img src={arrowDown} alt="arrowDown" />
                      )}
                    </button>
                  )}
                </ul>
                {completedTodoArr.length > 0 && pendingTodoArr.length < 1 ? (
                  <InfoPrompt
                    promptInfoIcon={todoIcon}
                    promptInfoText={promptTextState}
                  />
                ) : undefined}
                <ul>
                  {completedTodoArr.length > 0 && (
                    <button
                      type="button"
                      className="outline-btn completedOutlineBtn"
                      onClick={toggleCompletedShowAll}
                    >
                      <span>
                        {!completedShowAll
                          ? `Show Completed (${completedTodoArr.length})`
                          : 'Hide Completed'}
                      </span>{' '}
                      {completedShowAll ? (
                        <img src={arrowUp} alt="arrowUp" />
                      ) : (
                        <img src={arrowDown} alt="arrowDown" />
                      )}
                    </button>
                  )}

                  {(completedShowAll
                    ? completedTodoArr
                    : completedTodoArr.slice(0, 0)
                  ).map((el) => (
                    <li
                      className="relative border-solid border-[1.5px] border-slate-300 rounded-xl p-6 lg:ps-0 mb-2 gridLi"
                      key={el.id}
                    >
                      <div className="checkbox-container order-2 md:order-1">
                        <input
                          type="checkbox"
                          id={`checkbox-${el.id}`} // Unique ID for each checkbox
                          className="checkbox"
                          checked={el.isComplete}
                          onChange={() => handleCheckboxChange(el.id)} // Pass the id
                        />
                        <label
                          htmlFor={`checkbox-${el.id}`}
                          className="checkbox-label w-[40px] h-[40px] md:w-[60px] md:h-[60px]"
                        >
                          <svg className="checkmark" viewBox="0 0 24 24">
                            <path d="M6 12l4 4L18 6" />
                          </svg>
                        </label>
                        <p className="ms-2.5 block md:hidden">
                          {el.isComplete
                            ? `Completed on ${el.completedDate}`
                            : el.dueDate
                            ? `Due by: ${el.dueDate}`
                            : ``}
                        </p>
                      </div>

                      <div className="flex justify-center flex-col order-1 md:order-2">
                        <div>
                          <h4
                            className={`text-xl font-[500] ${
                              el.description ? 'mb-2' : 'mb-0'
                            }`}
                          >
                            {el.title}
                          </h4>
                        </div>
                        {el.description ? (
                          <div key={el.id}>
                            <p>
                              {expandedId === el.id ||
                              el.description.length <= 160
                                ? el.description
                                : `${el.description.substring(0, 160)}...`}
                              {el.description.length > 160 && (
                                <span
                                  onClick={() => toggleExpand(el.id)}
                                  className="read-more"
                                  style={{ color: 'blue', cursor: 'pointer' }}
                                >
                                  {expandedId === el.id
                                    ? ' Show less'
                                    : ' Read more'}
                                </span>
                              )}
                            </p>
                          </div>
                        ) : (
                          <span className="hidden"></span>
                        )}

                        {/* {el.dueDate ? (
                        <div>
                          <p>Due by: {el.dueDate}</p>
                        </div>
                      ) : (
                        <span></span>
                      )} */}

                        {/* <div>
                        <p>Status: {el.isComplete ? 'Done' : 'Pending'}</p>
                      </div> */}
                        <p className="mt-2.5 hidden md:block">
                          {el.isComplete
                            ? `Completed on ${el.completedDate}`
                            : el.dueDate
                            ? `Due by: ${el.dueDate}`
                            : ``}
                        </p>
                      </div>
                      <div className="order-3 md:order-3 deletCol">
                        <button
                          type="button"
                          onClick={() => handleDelete(el.id)}
                          className="text-red-600 hover:underline float-end"
                        >
                          <img src={deleteIcon} alt="deleteIcon" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
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
