export function Button(props: { children?: string; onClick?: () => void }) {
  const { children, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-md bg-gradient-to-r from-gray-500 to-blue-400 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-[10rem]"
    >
      {children}
    </button>
  );
}

export default Button;
