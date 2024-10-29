import './global.css';
import RecoilContextProvider from 'src/lib/RecoilProvidor';

export const metadata = {
  title: 'Todo App',
  description: 'Todo App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RecoilContextProvider>{children}</RecoilContextProvider>
      </body>
    </html>
  );
}
