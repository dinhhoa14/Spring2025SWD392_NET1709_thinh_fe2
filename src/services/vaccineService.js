import axiosClient from "./axiosClient.js";

const vaccineService = {
    getAllDiseaseType: async () => {
        const response = await axiosClient.get('/api/disease-types');
        return response;
    },
    createVaccine: async (data) => {
        const response = await axiosClient.post("/api/vaccine", data);
        return response.data;
    }
}
export default vaccineService;