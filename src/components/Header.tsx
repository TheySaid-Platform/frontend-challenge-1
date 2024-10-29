import { BiTask } from 'react-icons/bi';

function Header() {
  return (
    <h1 className="text-3xl font-bold text-center text-[#7328F6] flex justify-center items-center">
      <BiTask className="mr-2" /> Todo App
    </h1>
  );
}

export default Header;
