import React, { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import userIcon from "../assets/user.svg";
import { NavLink, useNavigate, Link, useLocation } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from "../contants/navigation";
const Header = () => {
  const location = useLocation();
  const removeSpace = location.search?.slice(3).split("%20").join(" ");
  const [searchInput, setSearchInput] = useState("");
  const [username, setUsername] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  };
  // useEffect for login
  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };
    setUsername(getCookie("username"));
    const storedUsername = getCookie("username");
    setIsLoggedIn(!!storedUsername);
  }, []);

  const handleUserIconClick = () => {
    setShowMenu(!showMenu);
  };
  const handleMouseLeaveMenu = () => {
    setShowMenu(false);
  };

  const handleLogout = () => {
    document.cookie =
      "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    setShowMenu(false);
  };

  return (
    <header className="fixed top-0 w-full h-16 bg-black bg-opacity-75 z-40">
      <div className="container mx-auto px-4 flex items-center h-full">
        <Link to={"/"}>
          <img src={logo} alt="logo" width={150} />
        </Link>
        <nav className="hidden lg:flex items-center gap-1 ml-5 font-bold">
          {navigation.map((nav, index) => {
            return (
              <div>
                <NavLink
                  key={nav.label}
                  to={nav.href}
                  className={({ isActive }) =>
                    `px-2 hover:text-neutral-100 ${
                      isActive && "text-neutral-100"
                    }`
                  }
                >
                  {nav.label}
                </NavLink>
              </div>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <form
            action=""
            className="flex items-center gap-2"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Search here..."
              className="bg-transparent px-4 py-1 outline-none border-none hidden lg:block"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button
              className="text-2xl text-white active:scale-75 transition-all"
              type="submit"
            >
              <IoSearchOutline />
            </button>
          </form>
          <div className="flex items-center justify-center gap-3">
            <img
              src={userIcon}
              alt="user-icon"
              width="w-full h-full"
              onClick={handleUserIconClick}
              className="w-10 h-10 rounded-full 
                cursor-pointer active:scale-50 transition-all"
            />
            {isLoggedIn ? (
              <>
                <span>Xin chào, {username}!</span>
                {showMenu && (
                  <ul 
                    onMouseLeave={handleMouseLeaveMenu}
                    className="absolute mt-7 ml-8 bg-neutral-500 shadow-md rounded-md p-2">
                    <Link to={"/user-info"}>
                      <li className="cursor-pointer hover:text-white">
                        User infomation
                        </li>
                    </Link>
                    <li 
                      onClick={handleLogout}
                      className="cursor-pointer hover:text-white">
                      Log out</li>
                  </ul>
                )}
              </>
            ) : (
              <Link
                to={"/login"}
                className="hover:text-neutral-100 cursor-pointer"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
