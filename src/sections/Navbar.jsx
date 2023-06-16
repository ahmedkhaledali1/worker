"use client";
import { useEffect, useState } from "react";
import { FiSearch, FiBell, FiMenu } from "react-icons/fi";
import { useSession, signOut } from "next-auth/react";
import { useProSidebar } from "react-pro-sidebar";
import { BiChevronLeft } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { navLinks } from "@/constants";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState({ name: "loading...", email: "loading..." });
  useEffect(() => {
    if (session) {
      setUser(session.user.user || session.user);
    }
  }, [session]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm.trim() === "") return;

    router.push(`/dashboard/${encodeURIComponent(searchTerm.trim())}`);
  };
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    const searchSuggestions = navLinks
      .flatMap((navItem) => (navItem.children ? navItem.children : [navItem]))
      .filter((navItem) =>
        navItem.name.toLowerCase().includes(value.trim().toLowerCase())
      )
      .slice(0, 5);

    setSuggestions(searchSuggestions);
  };

  const { collapseSidebar, collapsed } = useProSidebar();
  const [showMenu, setShowMenu] = useState(false);

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    signOut();
  };

  return (
    <nav className="flex flex-col md:flex-row gap-3 md:gap-0 flex-wrap md:flex-nowrap justify-between relative items-center px-10 py-2">
      {/* SearchBar */}
      <div className="flex flex-1 md:flex-[0.4] w-full md:w-auto justify-center mt-2">
        <button onClick={() => collapseSidebar()} className="mr-3">
          {collapsed ? (
            <FiMenu className="text-2xl" />
          ) : (
            <BiChevronLeft className="text-2xl" />
          )}
        </button>
        <input
          type="search"
          className="bg-gray-100 px-3 flex-1 rounded-l-md focus:outline-blue-400 dark:text-slate-900"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        {searchTerm && (
          <div className="absolute bg-slate-200 dark:bg-slate-800 dark:text-slate-50 top-[77%] shadow-md p-2 rounded-md mt-1 z-10">
            {suggestions.length === 0 ? (
              <p className="p-1">No suggestions found</p>
            ) : (
              suggestions.map((navItem, index) => (
                <Link href={navItem.link} key={index}>
                  <button
                    className="block w-full dark:text-slate-50 transition-all dark:hover:bg-slate-700 text-left p-1 rounded-md hover:bg-gray-100"
                    onClick={() => {
                      setSearchTerm("");
                      setSuggestions([]);
                    }}
                  >
                    {navItem.icon}
                    <span>{navItem.name}</span>
                  </button>
                </Link>
              ))
            )}
          </div>
        )}
        <button
          type="button"
          className="bg-blue-500 p-2 !rounded-r-md flex items-center justify-center"
          onClick={handleSearch}
        >
          <FiSearch className="text-slate-50 text-[35px]" />
        </button>
      </div>
      {/* Icons */}
      <div className="flex gap-4 w-full md:w-auto justify-end md:justify-normal">
        <button className="relative">
          <FiBell className="text-[21px] md:text-[27px]  relative" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full"></span>
        </button>
        <button className="w-12 relative" onClick={handleMenu}>
          <img
            src={user.image ? user.image : "/assets/jhone.svg"}
            className="rounded-full"
            fill
            alt="admin"
          />
        </button>
        <div className="flex flex-col">
          <p className="capitalize text-lg">
            {user ? user.name : "loading..."}
          </p>
          <p className="text-sm">{user ? user.email : "loading..."}</p>
        </div>
        {showMenu && (
          <div className="absolute bg-gradient-to-tr from-slate-50 to-slate-200 dark:text-slate-900 shadow-md p-2 rounded-md mt-2 top-[80%] right-[10%] z-10">
            <button className="block w-full text-left p-1 rounded-md hover:bg-gray-100">
              <Link href="/dashboard/profile">Profile</Link>
            </button>
            <button className="block w-full text-left p-1 rounded-md hover:bg-gray-100">
              <Link href="/dashboard/account">My account</Link>
            </button>
            <button
              className="block w-full text-left p-1 rounded-md hover:bg-gray-100"
              onClick={handleSignOut}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
