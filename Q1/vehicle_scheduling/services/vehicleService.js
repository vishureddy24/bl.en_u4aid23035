const apiClient = require("../config/axiosConfig");
const getDepots = async () => {
    const response = await apiClient.get("/depots");
    return response.data.depots;
};
const getvehicles = async () => {
    const response = await apiClient.get("/vehicles");
    return response.data.vehicles;
};
module.exports = {
    getDepots,
    getVehicles
};


