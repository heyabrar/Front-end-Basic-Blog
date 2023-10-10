import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages";
import BlogsPage from "../Pages/BlogsPage";
import CreateBlogPage from "../Pages/CreateBlogPage";

type Props = {};

const AllRoutes = (props: Props) => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/create-blog" element={<CreateBlogPage />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
