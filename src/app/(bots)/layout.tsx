import Menu from "@/app/ui/chat/menu";


  
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="flex h-full flex-col overflow-hidden md:flex-row bg-white">
        <div className="w-full flex-none md:w-64">
            <Menu/>
        </div>
        <div className="flex-grow p-0 md:pl-12 md:mx-auto">{children}</div>
    </div>
  );
}
  