import { Header } from './components/Header';
import HomePage from './pages/HomePage';

export function App() {
  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto px-4">
          <HomePage />
        </div>
      </main>
    </>
  );
}

export default App;
