import Navbar from '@/src/shared/components/ui/navbar/navBar';
import Footer from '@/src/shared/components/ui/footer/footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
}
