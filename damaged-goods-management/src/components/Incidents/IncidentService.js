import axios from "axios";

const API_URL = "http://localhost:5039/api/IncidentReport";

export const getAllIncidents = async () => {
  return await axios.get(API_URL);
};

export const getIncidentById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

// export const addIncident = async (incident) => {
//   return await axios.post(API_URL, incident);
// };

export const addIncident = (incident) => {
  return axios.post(`${API_URL}`, incident, {
    headers: { "Content-Type": "application/json" },
  });
}

export const updateIncident = async (id, incident) => {
  return await axios.put(`${API_URL}/${id}`, incident);
};

export const deleteIncident = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export const uploadIncidentPhoto = async (formData) => {
  return await axios.post(`${API_URL}/upload-photo`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
