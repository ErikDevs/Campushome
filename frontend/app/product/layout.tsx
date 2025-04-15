import Footer from "@/components/Footer";
import { MainNav } from "@/components/header";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <MainNav />
      {children}
      <Footer />
    </main>
  );
};

export default layout;
