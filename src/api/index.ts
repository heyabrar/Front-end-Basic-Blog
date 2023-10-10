import axios from "axios";
import { IBlogs } from "../interface/Blogs";

export const getBlogs = () => {
  return axios.get(`http://localhost:8080/blogs/get-blogs`);
};

export const getBlogsById = ({ id }: { id: string }) => {
  return axios.get(`http://localhost:8080/blogs/get-blogs?id=${id}`);
};

export const createBlog = ({ payload }: { payload: any }) => {
  return axios.post(`http://localhost:8080/blogs/create-blog`, payload);
};

export const editBlog = ({ payload, id }: { payload: any; id: string }) => {
  return axios.patch(`http://localhost:8080/blogs/edit-blog/${id}`, payload);
};

export const deleteBlog = ({ id }: { id: string }) => {
  return axios.delete(`http://localhost:8080/blogs/delete-blog/${id}`);
};
