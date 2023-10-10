import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { deleteBlog, editBlog, getBlogs } from "../../api";
import { IBlogs } from "../../interface/Blogs";
import { NavLink } from "react-router-dom";
import ActionModal from "../Common/ActionModal";

const BlogsListing = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [storeDeleteId, setStoreDeleteId] = useState<string>("");
  const [allBlogs, setAllBlogs] = useState<IBlogs[]>([]);

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

  const handleMarkAsRead = async (id: string, markAsRead: boolean) => {
    try {
      const formData = new FormData();
      formData.append("markAsRead", (!markAsRead).toString());
      const response = await editBlog({ id, payload: formData });
      if (response?.data?.message) {
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
      <div>
        <NavLink to="/create-blog">
          <button className="border px-4 py-2 rounded-md hover:bg-black hover:text-white">
            Create a Blog
          </button>
        </NavLink>
        {allBlogs.map((blog) => {
          return (
            <div key={blog?._id} className="border p-6 mt-4 rounded-md">
              <div className="flex justify-between">
                <p className="font-bold">{blog?.title}</p>
                <div className="flex gap-x-10">
                  <AiFillDelete
                    className="cursor-pointer"
                    onClick={() => {
                      setOpenDeleteModal(true);
                      setStoreDeleteId(blog?._id);
                    }}
                  />
                  <NavLink to={`/create-blog?${blog ? `_id=${blog._id}` : ""}`}>
                    <AiFillEdit className="cursor-pointer" />
                  </NavLink>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <img
                  src={`data:image/jpeg;base64,${blog?.image}`}
                  alt="abc"
                  className="w-[20%] rounded-lg"
                />
                <p className="py-2 w-[65%] rounded-md">{blog?.blog}</p>
                <button
                  className={`border w-[9%] px-2 py-1 text-xs rounded-md ${
                    Boolean(blog?.markAsRead)
                      ? "bg-green-100 border-green-500"
                      : "bg-transparent"
                  }`}
                  onClick={() => handleMarkAsRead(blog._id, blog?.markAsRead)}
                >
                  {Boolean(blog?.markAsRead)
                    ? "Mark As Un-Read"
                    : "Mark As Read"}
                </button>
              </div>
            </div>
          );
        })}
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
