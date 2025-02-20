import axios from "axios";

const API_URL = "http://localhost:5039/api/LoadingUnloadingReport";

export const getAllLoadingUnloading = async () => {
  return await axios.get(API_URL);
};

export const getLoadingUnloadingById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

// export const addIncident = async (incident) => {
//   return await axios.post(API_URL, incident);
// };

export const addLoadingUnloading = (loadingUnloading) => {
  return axios.post(`${API_URL}`, loadingUnloading, {
    headers: { "Content-Type": "application/json" },
  });
}

export const updateLoadingUnloading = async (id, loadingUnloading) => {
  return await axios.put(`${API_URL}/${id}`, loadingUnloading);
};

export const deleteLoadingUnloading = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export const uploadLoadingUnloadingPhoto = async (formData) => {
  return await axios.post(`${API_URL}/upload-photo`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
