import NxWelcome from './nx-welcome';
import { Button, Input } from '@todo/ui';

export function App() {
  return (
    <div>
      <Button />
      <Input onChange={() => {}} value="" />
      <p className="underline">Here is the todo app</p>
      {/* <NxWelcome title="todo" /> */}
    </div>
  );
}

export default App;
