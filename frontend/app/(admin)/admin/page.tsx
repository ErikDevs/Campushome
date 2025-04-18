import { ImageCleanupButton } from "@/components/ImageCleanupButton";
import UserData from "@/components/UserData";
import React from "react";

const AdminPage = () => {
  return (
    <div>
      <UserData />
      <ImageCleanupButton />
    </div>
  );
};

export default AdminPage;
