import axios from "axios";

const API_URL = "http://localhost:5039/api/SupplierShipmentConfirmation";

export const getAllSupplierShipment = async () => {
  return await axios.get(API_URL);
};

export const getSupplierShipmentById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

// export const addIncident = async (incident) => {
//   return await axios.post(API_URL, incident);
// };

export const addSupplierShipment = (supplierShipment) => {
  return axios.post(`${API_URL}`, supplierShipment, {
    headers: { "Content-Type": "application/json" },
  });
}

export const updateSupplierShipment = async (id, supplierShipment) => {
  return await axios.put(`${API_URL}/${id}`, supplierShipment);
};

export const deleteSupplierShipment = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export const uploadSupplierShipmentPhoto = async (formData) => {
  return await axios.post(`${API_URL}/upload-photo`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
