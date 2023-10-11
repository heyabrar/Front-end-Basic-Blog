import React, { useEffect, useRef, useState } from "react";
import { createBlog, editBlog, getBlogsById } from "../../api";
import { useLocation, useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [blogTitle, setBlogTitle] = useState<string>("");
  const [blogText, setBlogText] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("_id");
  const inputRef = useRef(null);
  const nav = useNavigate();

  const handleGetBlogById = async () => {
    try {
      const response = await getBlogsById({ id: id as string });
      setBlogTitle(response?.data?.title);
      setBlogText(response?.data?.blog);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateBlog = async () => {
    if (blogText && blogTitle) {
      try {
        const formData = new FormData();
        formData.append("title", blogTitle);
        formData.append("blog", blogText);
        formData?.append("image", selectedImage);
        formData.append("markAsRead", false.toString());
        formData.append("createdAt", new Date().toDateString());
        const response = await createBlog({ payload: formData });
        if (response?.data?.message) {
          alert(response?.data?.message);
          nav("/blogs");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Cannot post a empty blog.");
    }
  };

  const handleEditBlog = async () => {
    try {
      const formData = new FormData();
      formData.append("title", blogTitle);
      formData.append("blog", blogText);
      formData?.append("image", selectedImage);
      const response = await editBlog({ id: id as string, payload: formData });
      if (response?.data?.message) {
        alert(response?.data?.message);
        nav("/blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      handleGetBlogById();
      if (inputRef.current) {
        (inputRef.current as HTMLTextAreaElement).focus();
      }
    }
  }, [id]);

  return (
    <div className="mt-5">
      <div className="flex gap-x-5 items-center">
        <input
          placeholder="Title Of The Blog"
          value={blogTitle}
          ref={inputRef}
          onChange={(e) => setBlogTitle(e.target.value)}
          className="w-full p-5 focus:outline-none border rounded-md"
        />
        <input
          type="file"
          accept=".png, .jpg, .jpeg, .webp"
          onChange={(e) => {
            if (e.target.files) {
              const file = e.target.files[0];
              setSelectedImage(file);
            }
          }}
        />
      </div>
      <textarea
        placeholder="Start Writing....."
        value={blogText}
        className="w-full !h-[400px] focus:outline-none p-5 border mt-2"
        onChange={(e) => setBlogText(e.target.value)}
      ></textarea>
      <div className="flex justify-end mt-5">
        {id ? (
          <button
            className="border px-8 py-1  hover:bg-black hover:text-white rounded-md"
            onClick={handleEditBlog}
          >
            Edit
          </button>
        ) : (
          <button
            className="border px-8 py-1 hover:bg-black hover:text-white rounded-md"
            onClick={handleCreateBlog}
          >
            Post
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateBlog;
