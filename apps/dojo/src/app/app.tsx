import { useRecoilState } from 'recoil';

import WelcomePage from './components/WelcomePage';

import { visibleStateAtom } from './recoil/atoms/visibleAtom';
import { Header } from './components/Header';

import todoIcon from './../assets/images/todo-icon.png';
import { todoListAtom } from './recoil/atoms/todoListAtom';

import TodoItemCreator from './components/TodoItemCreator';
import { useEffect } from 'react';

import InfoPrompt from './components/InfoPrompt';
import GreetingBox from './components/GreetingBox';
import AddTodoButton from './components/AddTodoButton';
import TodoList from './components/TodoList';

export function App() {
  const [visible, setVisible] = useRecoilState(visibleStateAtom);

  const [todoList] = useRecoilState(todoListAtom);

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
            <AddTodoButton />
            {todoList.length < 1 ? (
              <InfoPrompt promptInfoIcon={todoIcon} />
            ) : (
              <TodoList />
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
