// app/admin/layout.tsx
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import Footer from "@/components/Footer";
import AppSidebar from "@/components/page-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import UserProfile from "@/components/User";
import { ReactNode } from "react";
import { authConfig } from "@/app/auth.config";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authConfig);

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <main className="w-full max-w-7xl">
        <div className="flex justify-between w-full border-b py-4 items-center">
          <h2>Dashboard</h2>
          <div>
            <UserProfile />
          </div>
        </div>
        {children}
        <Footer />
      </main>
    </SidebarProvider>
  );
}
