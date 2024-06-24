import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SidebarDashboard from "../pages/SidebarDashboard";
import NavbarDashboard from "../pages/NavbarDashboard";
import LandingPage from "../pages/LandingPage";


export const Dashboard = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SidebarDashboard isSidebarOpen={isSidebarOpen} />
  
      {/* Main Content */}
      <div className="flex flex-col w-full">
        {/* Navbar */}
        <NavbarDashboard toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>
  
        {/* Page Content */}
        <div className="flex flex-1 overflow-hidden">
          <div className="w-full p-4 overflow-y-auto">
            {location.pathname === "/dashboard" ? (
              <LandingPage />
            ) : (
              <Outlet />
            )}
          </div>
          <div className="p-4 absolute bottom-0 w-full bg-white">
          <p className="text-center text-xs text-gray-500">
            Copyright &copy; 2024
          </p>
        </div>
        </div>
      </div>
    
    </div>
  </>

  );
};