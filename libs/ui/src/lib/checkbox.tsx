export function Checkbox(props: {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const { checked, onChange } = props;
  return <input type="checkbox" checked={checked} onChange={onChange} />;
}

export default Checkbox;
