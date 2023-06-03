"use client";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import { ProSidebarProvider } from "react-pro-sidebar";
import { PhotoProvider } from "@/context/PhotoContext";
import "react-toastify/dist/ReactToastify.css";

const Providers = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ToastContainer closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <ProSidebarProvider>
        <SessionProvider>
          <PhotoProvider>
            {children}
          </PhotoProvider>
        </SessionProvider>
      </ProSidebarProvider>
    </ThemeProvider>
  );
};
export default Providers;
