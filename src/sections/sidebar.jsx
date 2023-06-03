'use client'
import { useState, useEffect } from "react";
import { navLinks } from "@/constants";
import Link from "next/link";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { useTheme } from "next-themes";
import { FiMonitor, FiMoon, FiSun } from "react-icons/fi";
import { BsMoonStarsFill } from "react-icons/bs";
import { signOut } from "next-auth/react";
import LoadingComponent from "@/components/Loading";
import ConfirmModal from "@/components/ConfirmModal";
import { toast } from "react-toastify";

const CustomSidebar = () => {
  const { collapsed } = useProSidebar();
  const { setTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);

    try {
      await signOut();
      setLoading(false);
      setShowModal(false);
      location.reload();
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  const handleConfirm = () => {
    setShowModal(false);
    handleSignOut();
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleSignOutClick = () => {
    setShowModal(true);
  };

  const confirmModal = (
    <ConfirmModal
      message="Are you sure you want to sign out?"
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );

  useEffect(() => {
    if (showModal) {
      toast.warning(confirmModal, {
        className: "dark:bg-slate-800",
        onClose: () => setShowModal(false), // close the modal when the toast is closed
      });
    }
  }, [showModal]);

  return (
    <div className="flex !max-w-[256px]">
      <Sidebar
        width="256px"
        defaultCollapsed
        image="/assets/worker-preview-app-1.png"
      >
        {!collapsed && (
          <div className="sidebarHeader flex justify-start py-5 px-4">
            <Link href="/">
              <img src="/assets/sidebar icon.png" alt="logo" />
            </Link>
          </div>
        )}

        <Menu
        >
          {/* Theme mode toggle buttons */}
          <SubMenu icon={<BsMoonStarsFill />} label="Toggle mode">
            <MenuItem onClick={() => setTheme("dark")} icon={<FiMoon />}>
              Dark
            </MenuItem>
            <MenuItem onClick={() => setTheme("light")} icon={<FiSun />}>
              Light
            </MenuItem>
            <MenuItem onClick={() => setTheme("system")} icon={<FiMonitor />}>
              System
            </MenuItem>
          </SubMenu>
          {navLinks.map((navItem, index) => {
            if (navItem.children) {
              return (
                <SubMenu key={index} icon={navItem.icon} label={navItem.name} title={navItem.name}>
                  {navItem.children.map((submenuItem, submenuIndex) => (
                    <MenuItem
                      key={submenuIndex}
                      component={<Link href={submenuItem.link} />}
                      icon={submenuItem.icon}
                    >
                      {submenuItem.name}
                    </MenuItem>
                  ))}
                </SubMenu>
              );
            } else {
              return (
                <MenuItem key={index} component={<Link href={navItem.link} />} icon={navItem.icon} title={navItem.name}>
                  {navItem.name}
                </MenuItem>
              );
            }
          })}
          <div className="mt-7">
            <MenuItem
              component={<Link href="dashboard/settings" />}
              icon={<FaCog />}
            >
              Settings
            </MenuItem>
            <MenuItem
              icon={loading ? <LoadingComponent /> : <FaSignOutAlt />}
              onClick={handleSignOutClick}
            >
              {loading ? "Signing out..." : "Logout"}
            </MenuItem>
          </div>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default CustomSidebar;