import React, { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import userIcon from "../assets/user.svg";
import { NavLink, useNavigate, Link, useLocation } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from "../contants/navigation";
import { auth } from '../store/firebase';
import { signOut } from "firebase/auth";
const Header = () => {
  const location = useLocation();
  //const removeSpace = location.search?.slice(3).split("%20").join(" ");
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
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName || user.email);
        setIsLoggedIn(true);
      } else {
        setUsername('');
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, [auth]);
  const handleUserIconClick = () => {
    setShowMenu(!showMenu);
  };
  const handleMouseLeaveMenu = () => {
    setShowMenu(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUsername('');
      setIsLoggedIn(false);
      setShowMenu(false);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="fixed top-0 w-full h-16 bg-black bg-opacity-75 z-40">
      <div className="container mx-auto px-16 flex items-center h-full">
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
          <div className="relative">
            {isLoggedIn ? (
              <>
                {/* <span className="text-white">Hello, {username}!</span> */}                              
                <img
                    src={userIcon}
                    alt="user-icon"
                    width="w-full h-full"
                    onClick={handleUserIconClick}
                    className="w-10 h-10 rounded-full
                      cursor-pointer active:scale-50 transition-all"
                  />
                {showMenu && (
                    <ul 
                      onMouseLeave={handleMouseLeaveMenu}
                      className="absolute bg-neutral-500 shadow-md rounded-md p-2 user-icon-menu
                      w-36 h-18 mt-2 ml-[-60px]">
                      <Link to={`/user-info`}>
                        <li className="cursor-pointer hover:text-white w-full">
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
                className=" font-bold  hover:text-neutral-100 cursor-pointer"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
