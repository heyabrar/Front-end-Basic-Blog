import React, { useEffect, useRef, useState } from "react";
import { IBlogs } from "../../interface/Blogs";
import { getBlogsById } from "../../api";
import { useLocation } from "react-router-dom";

type Props = {};

const SingleBlog = (props: Props) => {
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
      const response = await getBlogsById({ id: id as string });
      setAllBlogs(response?.data);
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
    <div className="mt-5">
      <img
        src={`data:image/jpeg;base64,${allBlogs?.image}`}
        alt="blog-img"
        className="w-[60%] mx-auto rounded-lg shadow-lg"
      />
    </div>
  );
};

export default SingleBlog;
