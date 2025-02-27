import axiosClient from "./axiosClient.js";

export const staffService = {
  getAllBlog: async (page, size) => {
    const response = await axiosClient.get(
      `/api/staff/blogs?page=${
        page - 1
      }&size=${size}&sort=created_at&direction=desc`
    );
    console.log(response);
    return {
      content: response.data.content,
      totalElements: response.data.totalElements,
    };
  },
  getDetailBlog: async (id) => {
    const response = await axiosClient.get(`/api/staff/blog?blogId=${id}`);
    return response;
  },
  createBlog: async (data) => {
    const response = await axiosClient.post("/api/staff/blog", data);
    return response;
  },
  updateBlog: async (data) => {
    const response = await axiosClient.patch("/api/staff/blog", data);
    return response;
  },
  deleteBlog: async (id) => {
    const response = await axiosClient.delete(`/api/staff/blog?blogId=${id}`);
    return response;
  },
};
