import axiosClient from "./axiosClient.js";

export const blogService = {
  getAllBlog: async (page) => {
    const response = await axiosClient.get(
      `/api/user/blogs?page=${page - 1}&size=10&sort=id&direction=asc`
    );
    return response;
  },

  getBlogSection: async () => {
    const response = await axiosClient.get(
      `/api/user/blogs?page=0&size=4&sort=createdAt&direction=desc`
    );
    return response;
  },

  getDetailBlog: async (id) => {
    const response = await axiosClient.get(`/api/staff/blog?blogId=${id}`);
    return response;
  },
};
