import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { navLogo, navbarNavigation } from "../../utils/blogs.constants";

const Navbar = () => {
  const [storePath, setStorePath] = useState(window.location.pathname);

  useEffect(() => {
    setInterval(() => {
      setStorePath(window.location.pathname);
    }, 1000);
  }, []);

  return (
    <div className="bg-white px-10 py-5 flex justify-between item-center shadow-md">
      <div className="w-[3%]">
        <img src={navLogo} alt="Logo" className="w-full" />
      </div>
      <ul className="flex justify-around items-center w-[40%]">
        {navbarNavigation.map((nav) => {
          return (
            <NavLink to={`${nav.navTo}`}>
              <li
                className={`${
                  nav.navTo === storePath
                    ? "border-b border-black"
                    : "border-transparent"
                }`}
              >
                {nav?.title}
              </li>
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
};

export default Navbar;
