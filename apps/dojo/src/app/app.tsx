import { useRecoilValue } from 'recoil';
import WelcomePage from './components/WelcomePage';

import { visibleStateAtom } from './recoil/atoms/visibleAtom';
import { Header } from './components/Header';

export function App() {
  const visible = useRecoilValue(visibleStateAtom);

  let show;

  if (!visible) {
    show = 'flex';
  } else {
    show = 'none';
  }

  return (
    <div className="container mx-auto px-4">
      <WelcomePage />
      <Header />
      <div className="welcome-page" style={{ display: `${show}` }}>
        <h1 className="heading text-4xl">
          <span className="text-accent">To-Do</span>
        </h1>

        <button className="btn welcome-btn">Add</button>
        <p className="text-center">
          Created by <b>Harshil Khimasia - Freelance Web Developer&trade;</b>.
          For more information, visit our{' '}
          <a
            href="https://harshilkhimasia.com/"
            target="_blank"
            rel="noreferrer"
            className="highlighted-link"
          >
            official website
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default App;
