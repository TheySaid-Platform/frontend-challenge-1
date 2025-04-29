export function PageContainer(props: { children?: React.ReactNode }) {
  return (
    <div className="w-screen min-h-screen pt-5 bg-gray-50">
      <div className="max-w-[40rem] mx-auto bg-white rounded-md border-gray-100 p-4">
        {props.children}
      </div>
    </div>
  );
}

export default PageContainer;
