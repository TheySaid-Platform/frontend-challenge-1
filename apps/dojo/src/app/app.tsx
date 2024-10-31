import { useRecoilState, useRecoilValue } from 'recoil';
import WelcomePage from './components/WelcomePage';

import { visibleStateAtom } from './recoil/atoms/visibleAtom';
import { Header } from './components/Header';
import addButton from './../assets/images/add-circle.svg';
import todoIcon from './../assets/images/todo-icon.png';
import { modalVisibleAtom } from './recoil/atoms/modalVisibleAtom';

export function App() {
  const visible = useRecoilValue(visibleStateAtom);
  const [modalVisible, setModalVisible] = useRecoilState(modalVisibleAtom);

  const openModal = () => {
    setModalVisible((prevState) => !prevState);
  };

  let show;

  if (!visible) {
    show = 'flex';
  } else {
    show = 'none';
  }

  return (
    <div className="container mx-auto px-4">
      <WelcomePage />
      {/* <Header /> */}
      <div className={`modalOverlay ${modalVisible ? 'block' : 'hidden'}`}>
        <div className="todoModal p-10">
          <h2 className="pb-1 mb-7 text-[32px] border-b-[1px] border-black inline-block">
            Add To-do
          </h2>
          <div>
            <div className="mb-5">
              <label htmlFor="title" className="text-[22px]">
                Title
              </label>
              <br></br>
              <input
                type="text"
                name="title"
                id="title"
                className="border-solid border-[1.5px] border-slate-300 rounded-xl w-full p-2"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="dueDate" className="text-[22px]">
                Due Date (Optional)
              </label>
              <br></br>
              <input
                type="date"
                name="dueDate"
                id="dueDate"
                className="border-solid border-[1.5px] border-slate-300 rounded-xl w-full p-2"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="description" className="text-[22px]">
                Description (Optional)
              </label>
              <br></br>
              <textarea
                name="description"
                id="description"
                className="border-solid border-[1.5px] border-slate-300 rounded-xl w-full p-2 min-h-[150px] resize-none focus:outline-none focus:border-black focus:border-[2px]"
              ></textarea>
            </div>
          </div>
          <button type="button" className="btn float-end" onClick={openModal}>
            Confirm
          </button>
          <button
            type="button"
            className="outline-btn float-start"
            onClick={openModal}
          >
            Cancel
          </button>
        </div>
      </div>
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
            <div className="border-solid border-[1.5px] border-slate-300 rounded-xl p-6 flex flex-col flex-wrap items-center justify-center">
              <div>
                <img src={todoIcon} alt="todoIcon" width={200} />
              </div>
              <div className="pb-8">
                <p>
                  You’re all caught up, but we’ll keep your completed to-dos in
                  case you need to refer back to them.
                </p>
              </div>
            </div>
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
