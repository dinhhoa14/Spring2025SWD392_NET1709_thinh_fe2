import axiosClient from "./axiosClient.js";

export const servicePackageVaccine = {
    getAllPackageVaccine: async () => {
        const reponse = await axiosClient.get("/api/vaccine-packages")
        return reponse.data;
    },
};
