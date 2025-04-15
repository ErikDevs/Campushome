import Footer from "@/components/Footer";
import { ReactNode } from "react";

const ProfileLayout = ({ children }: { children: ReactNode }) => (
  <main className="max-w-7xl mx-auto px-6">
    {children}
    <Footer />
  </main>
);

export default ProfileLayout;
