import Footer from "@/components/Footer";
import { MainNav } from "@/components/header";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <MainNav />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
