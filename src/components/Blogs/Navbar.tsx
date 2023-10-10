import React from "react";
import { NavLink } from "react-router-dom";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div>
      <ul className="flex justify-around border bg-black text-white p-5">
        <NavLink to="/">
          <li>Home</li>
        </NavLink>
        <NavLink to="/blogs">
          <li>Blogs</li>
        </NavLink>
        <NavLink to="/create-blog">
          <li>Create Blog</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
