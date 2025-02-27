import axiosClient from "./axiosClient.js";

export const appointmentService = {
  createAppointment: async (data) => {
    const response = await axiosClient.post("/api/appointment", data);
    return response;
  },
};
