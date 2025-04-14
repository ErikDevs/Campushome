import Footer from "@/components/Footer";
import AppSidebar from "@/components/page-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import UserProfile from "@/components/User";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <main className="w-full max-w-7xl">
        <div className="flex justify-between w-full border-b py-4 items-center">
          <h2>Dashboard</h2>
          <div>
            {" "}
            <UserProfile />
          </div>
        </div>
        {children}
        <Footer />
      </main>
    </SidebarProvider>
  );
};

export default layout;
