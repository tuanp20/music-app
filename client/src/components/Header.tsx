import React from "react";
import { Logo } from "../assets/img";
import { NavLink } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";

const Header = () => {
    return (
        <header className="flex items-center w-full p-4 md:py-2 md:px-6">
            <NavLink to={"/"}>
                <img src={Logo} alt="Logo" className="w-16" />
            </NavLink>
            <ul className="flex items-center justify-center ml-7">
                <li className="mx-5 text-lg">
                    <NavLink
                        to={"/"}
                        className={({ isActive }) =>
                            isActive ? isActiveStyles : isNotActiveStyles
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li className="mx-5 text-lg">
                    <NavLink
                        to={"/musics"}
                        className={({ isActive }) =>
                            isActive ? isActiveStyles : isNotActiveStyles
                        }
                    >
                        Musics
                    </NavLink>
                </li>
                <li className="mx-5 text-lg">
                    <NavLink
                        to={"/premium"}
                        className={({ isActive }) =>
                            isActive ? isActiveStyles : isNotActiveStyles
                        }
                    >
                        Premium
                    </NavLink>
                </li>
                <li className="mx-5 text-lg">
                    <NavLink
                        to={"/contact"}
                        className={({ isActive }) =>
                            isActive ? isActiveStyles : isNotActiveStyles
                        }
                    >
                        Contact Us
                    </NavLink>
                </li>
            </ul>
            <div className="flex items-center ml-auto cursor-pointer gap-2 relative">
                <img src="" className="w-12 min-w-[44px] object-center" alt="" />
            </div>
        </header>
    );
};

export default Header;
