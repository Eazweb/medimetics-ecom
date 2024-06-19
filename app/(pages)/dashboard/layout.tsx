import Sidenavbar from "@/app/_dashboardComponents/Sidenavbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex-col">
      <Sidenavbar />
      {children}
    </div>
  );
};

export default layout;
