import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assest/logo.png";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../redux/userSlice";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/login");
  };

  const userData = useSelector((state) => state.user);

  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      {/* Desktop */}
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-14">
            <img src={logo} alt="R3a ecommerce" className="h-full" />
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-7">
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
            <Link to={""}>Home</Link>
            <Link to={"menu"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl text-slate-600 relative">
            <Link to={"cart"}>
              <BsCartFill />
              <div className="absolute -top-3 -right-4 text-white bg-red-500 h-6 w-6 rounded-full m-0 p-0 text-sm text-center ">
                0
              </div>
            </Link>
          </div>
          <div className=" text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
              {userData.image ? (
                <img
                  src={userData.image}
                  className="h-full w-full"
                  alt="User image"
                />
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                <Link
                  to={"newproduct"}
                  className="whitespace-nowrap cursor-pointer px-2"
                >
                  New product
                </Link>

                {userData.firstName ? (
                  <p
                    className="cursor-pointer text-white px-2 bg-red-500"
                    onClick={handleLogout}
                  >
                    Logout ({userData.firstName}){" "}
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile */}
    </header>
  );
};

export default Header;
