import MainSidebar from "@/components/navigation/MainSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <MainSidebar />
      <main className="w-full h-screen py-2 px-10">{children}</main>
    </SidebarProvider>
  );
}
