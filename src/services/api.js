import axios from "axios";

const baseURL = "https://stg.dhunjam.in/account/admin";

const api = {
  postLogin: async (username, password) => {
    const response = await axios.post(`${baseURL}/login`, {
      username,
      password,
    });
    console.log(response);
    console.log(response.data);
    // console.log(response.data.data);
    return response.data;
  },

  getAdminDetails: async (adminId) => {
    const response = await axios.get(`${baseURL}/${adminId}`);
    console.log(response);
    console.log(response.data);
    return response.data;
  },

  updatePrices: async (adminId, updatedPrices) => {
    const response = await axios.put(`${baseURL}/${adminId}`, {
      amount: updatedPrices,
    });
    console.log(response);
    console.log(response.data);
    return response.data;
  },
};

export default api;
