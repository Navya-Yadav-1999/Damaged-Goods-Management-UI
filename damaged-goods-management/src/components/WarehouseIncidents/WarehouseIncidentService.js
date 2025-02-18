import axios from "axios";

const API_URL = "http://localhost:5039/api/WarehouseIncident";

export const getAllWarehouseIncident = async () => {
  return await axios.get(API_URL);
};

export const getWarehouseIncidentById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

// export const addIncident = async (incident) => {
//   return await axios.post(API_URL, incident);
// };

export const addWarehouseIncident = (warehouseIncident) => {
  return axios.post(`${API_URL}`, warehouseIncident, {
    headers: { "Content-Type": "application/json" },
  });
}

export const updateWarehouseIncident = async (id, warehouseIncident) => {
  return await axios.put(`${API_URL}/${id}`, warehouseIncident);
};

export const deleteWarehouseIncident = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export const uploadWarehouseIncidentPhoto = async (formData) => {
  return await axios.post(`${API_URL}/upload-photo`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
