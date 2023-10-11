import React, { useEffect, useState } from "react";
import { AiFillDelete, AiOutlineArrowRight } from "react-icons/ai";
import { deleteBlog, editBlog, getBlogs } from "../../api";
import { IBlogs } from "../../interface/Blogs";
import { NavLink } from "react-router-dom";
import ActionModal from "../Common/ActionModal";

const BlogsListing = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allBlogs, setAllBlogs] = useState<IBlogs[]>([]);
  const [storeDeleteId, setStoreDeleteId] = useState<string>("");
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const handleGetBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await getBlogs();
      setAllBlogs(response?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleDeleteBlog = async () => {
    try {
      const response = await deleteBlog({ id: storeDeleteId });
      if (response?.data) {
        setOpenDeleteModal(false);
        handleGetBlogs();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetBlogs();
  }, []);

  return (
    <div className="mt-4">
      <p className="text-center text-3xl font-bold">Your Blogs</p>
      <div className="mt-4">
        <NavLink to="/create-blog">
          <button className="border px-4 py-2 rounded-md hover:bg-black hover:text-white">
            Create a Blog
          </button>
        </NavLink>
        <div className="mt-8">
          {allBlogs.map((blog) => {
            return (
              <div
                key={blog?._id}
                className="border p-6 mt-4 rounded-md cursor-pointer"
              >
                <div className="flex justify-between">
                  <p className="font-bold">{blog?.title}</p>
                  <NavLink to={`/blog?${blog ? `_id=${blog._id}` : ""}`}>
                    <button className="flex items-center gap-x-2">
                      <p className="text-sm font-semibold">Read More</p>
                      <AiOutlineArrowRight />
                    </button>
                  </NavLink>
                </div>

                <div className="flex gap-x-10 mt-4">
                  <img
                    src={`data:image/jpeg;base64,${blog?.image}`}
                    alt="abc"
                    className="w-[20%] rounded-lg"
                  />
                  <div className="w-[70%]">
                    <p className="py-2 rounded-md leading-8">{blog?.blog}</p>
                    <p className="text-xs text-gray-600">
                      {`${
                        blog?.createdAt ? `Created At : ${blog?.createdAt}` : ""
                      }`}
                    </p>
                  </div>

                  <AiFillDelete
                    className="cursor-pointer mt-5"
                    onClick={() => {
                      setOpenDeleteModal(true);
                      setStoreDeleteId(blog?._id as string);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center">{!allBlogs?.length && "Starting Creating To See The Blog"}</p>
      </div>

      <ActionModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        title="Delete Blog?"
        content="Are you sure you want to delete blog."
        handleConfirmationAction={handleDeleteBlog}
      />
    </div>
  );
};

export default BlogsListing;
