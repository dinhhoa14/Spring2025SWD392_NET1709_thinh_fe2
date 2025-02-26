import axiosClient from "./axiosClient.js";

export const blogService = {
  getAllBlog: async (page) => {
    const response = await axiosClient.get(
      `/api/user/blogs?page=${page - 1}&size=10&sort=created_at&direction=desc`
    );
    return response.data;
  },

  getBlogSection: async () => {
    const response = await axiosClient.get(
      `/api/user/blogs?page=0&size=4&sort=created_at&direction=desc`
    );
    return response.data;
  },

  getDetailBlog: async (id) => {
    const response = await axiosClient.get(`/api/staff/blog?blogId=${id}`);
    return response;
  },
};
