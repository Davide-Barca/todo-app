import MainSidebar from "@/components/navigation/sidebar-main";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <MainSidebar />
      <main className="py-2 px-10">{children}</main>
    </SidebarProvider>
  );
}
