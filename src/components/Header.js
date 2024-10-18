import React, { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import userIcon from "../assets/user.svg";
import { NavLink, useNavigate, Link, useLocation } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from "../contants/navigation";

const Header = () => {
  const location = useLocation()
  const removeSpace = location.search?.slice(3).split("%20").join(" ")
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if(searchInput){
      navigate(`/search?q=${searchInput}`)
    }
  }, [searchInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
            />
            <button className="text-2xl text-white" type="submit">
              <IoSearchOutline />
            </button>
          </form>
          <div
            className="w-10 h-10 rounded-full overflow-hidden 
                cursor-pointer active:scale-50 transition-all"
          >
            <img src={userIcon} alt="user-icon" width="w-full h-full" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
