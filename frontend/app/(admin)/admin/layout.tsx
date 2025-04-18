// app/admin/layout.tsx
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import Footer from "@/components/Footer";
import AppSidebar from "@/components/page-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { authConfig } from "@/app/auth.config";
import { MainNav } from "@/components/header";

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
        <MainNav />
        {children}
        <Footer />
      </main>
    </SidebarProvider>
  );
}
