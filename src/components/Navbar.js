import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import logo from "./images/logo.png";

const NavBarItem = ({ title, classProps }) => {
  let path = "/" + title;
  return (
    <li className={`mx-4 cursor-pointer ${classProps} `}>
      <a href={path}>{title}</a>
    </li>
  );
};

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="bg-black flex md:justify-center justify-between items-center p-2">
      <div className="md:flex-[0.5] flex-initial justify-center items-center text-left">
        <a href="/">
          <img src={logo} alt="logo" className="flex w-14 cursor-pointer" />
          <div className="text-white flex-right">HANGMAN</div>
        </a>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between item-center flex-initial">
        {["Leaderboard"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}
      </ul>
      <div className="flex-relative text-white z-10">
        {toggleMenu ? (
          <AiOutlineClose
            fontSize={28}
            className="md:hidden cursor-pointer hover:text-amber-700"
            onClick={() => setToggleMenu(!toggleMenu)}
          />
        ) : (
          <HiMenuAlt4
            fontSize={28}
            className="md:hidden cursor-pointer hover:text-amber-700"
            onClick={() => setToggleMenu(!toggleMenu)}
          />
        )}
      </div>
      {toggleMenu && (
        <ul
          className="fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none bg-stone-700
                flex flex-col justify-start items-end rounded-md text-white animate-slide-in"
        >
          <li className="mt-20 text-xl w-full my-2"></li>
          {["Leaderboard"].map((item, index) => (
            <NavBarItem
              key={item + index}
              title={item}
              classProps="my-2 text-lg hover:text-amber-700"
            />
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
//OK
