import { useEffect, useState } from "react";
import { IBlogs } from "../../interface/Blogs";
import { editBlog, getBlogsById } from "../../api";
import { NavLink, useLocation } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";

const SingleBlog = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allBlogs, setAllBlogs] = useState<IBlogs>({
    _id: "",
    blog: "",
    createdAt: "",
    image: "",
    markAsRead: false,
    title: "",
  });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("_id");

  const handleGetBlogById = async () => {
    try {
      setIsLoading(true);
      const response = await getBlogsById({ id: id as string });
      setAllBlogs(response?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string, markAsRead: boolean) => {
    try {
      const formData = new FormData();
      formData.append("markAsRead", (!markAsRead).toString());
      const response = await editBlog({ id, payload: formData });
      if (response?.data?.message) {
        handleGetBlogById();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      handleGetBlogById();
    }
  }, [id]);

  return (
    <div className="mt-5 pb-5">
      {!isLoading ? (
        <div>
          <div className="w-[60%] mx-auto relative">
            <div>
              <img
                src={`data:image/jpeg;base64,${allBlogs?.image}`}
                alt="blog-img"
                className="w-full rounded-lg shadow-lg"
              />
              <p className="absolute font-bold rounded-md bottom-5 left-5 text-3xl text-black w-[90%] bg-gradient-to-r from-gray-300 from-10% via-transparent-300 via-30% to-transparent-500 to-80% p-2">
                {allBlogs?.title}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-center items-center gap-x-5">
              <NavLink to={`/create-blog?${id ? `_id=${id}` : ""}`}>
                <AiFillEdit className="cursor-pointer" />
              </NavLink>
              <button
                className={`border w-[9%] px-2 py-1 text-xs rounded-sm ${
                  Boolean(allBlogs?.markAsRead)
                    ? "bg-black border-black text-white"
                    : "bg-transparent"
                }`}
                onClick={() =>
                  handleMarkAsRead(allBlogs._id, allBlogs?.markAsRead)
                }
              >
                {Boolean(allBlogs?.markAsRead)
                  ? "Mark As Un-Read"
                  : "Mark As Read"}
              </button>
            </div>
            <p className="w-[70%] mx-auto leading-8 font-medium text-justify mt-5">
              {allBlogs?.blog}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-3xl">Loading...</p>
      )}
    </div>
  );
};

export default SingleBlog;
