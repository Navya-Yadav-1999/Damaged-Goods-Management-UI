import axios from "axios";

const API_URL = "http://localhost:5039/api/ShipperSupplierClaim";

export const getAllShipperClaim = async () => {
  return await axios.get(API_URL);
};

export const getShipperClaimById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

// export const addIncident = async (incident) => {
//   return await axios.post(API_URL, incident);
// };

export const addShipperClaim = (shipperClaim) => {
  return axios.post(`${API_URL}`, shipperClaim, {
    headers: { "Content-Type": "application/json" },
  });
}

export const updateShipperClaim = async (id, shipperClaim) => {
  return await axios.put(`${API_URL}/${id}`, shipperClaim);
};

export const deleteShipperClaim = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export const uploadShipperClaimPhoto = async (formData) => {
  return await axios.post(`${API_URL}/upload-photo`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
