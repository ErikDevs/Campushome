import { ReactNode } from "react";
import AppSidebar from "@/components/page-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const ProfileLayout = ({ children }: { children: ReactNode }) => (
  <SidebarProvider>
    <AppSidebar />
    <SidebarTrigger />
    <main>{children}</main>
  </SidebarProvider>
);

export default ProfileLayout;
