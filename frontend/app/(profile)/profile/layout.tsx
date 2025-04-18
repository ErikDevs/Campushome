import Footer from "@/components/Footer";
import { MainNav } from "@/components/header";
import { ReactNode } from "react";

const ProfileLayout = ({ children }: { children: ReactNode }) => (
  <main className="max-w-7xl mx-auto px-6">
    <MainNav />
    {children}
    <Footer />
  </main>
);

export default ProfileLayout;
