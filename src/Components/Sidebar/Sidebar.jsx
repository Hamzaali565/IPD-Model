import React, { useState } from "react";
import SidebarButton from "../Button/SidebarButton";
import SidebarItems from "../SidebarItems/SidebarItems";

const Sidebar = () => {
  const [showIpd, setShowIPD] = useState(false);
  return (
    <div>
      <div className="border-b-2  transition-all duration-2000 ease-in ">
        <SidebarButton onClick={() => setShowIPD(!showIpd)} />
        {showIpd === true && (
          <div>
            <SidebarItems />
            <SidebarItems />
            <SidebarItems />
            <SidebarItems />
            <SidebarItems />
            <SidebarItems />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
