export function PageContainer(props: { children?: React.ReactNode }) {
  return (
    <div className="w-screen min-h-screen pt-5 bg-blue-50">
      <div className="max-w-[40rem] mx-auto min-h-[40rem] bg-white rounded-md shadow-md p-4">
        {props.children}
      </div>
    </div>
  );
}

export default PageContainer;
