import axios from "axios";

const API_URL = "http://localhost:5039/api/InspectionReport";

export const getAllInspections = async () => {
  return await axios.get(API_URL);
};

export const getInspectionById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

// export const addIncident = async (incident) => {
//   return await axios.post(API_URL, incident);
// };

export const addInspections = (inspections) => {
  return axios.post(`${API_URL}`, inspections, {
    headers: { "Content-Type": "application/json" },
  });
}

export const updateInspections = async (id, inspections) => {
  return await axios.put(`${API_URL}/${id}`, inspections);
};

export const deleteInspections = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export const uploadInspectionsPhoto = async (formData) => {
  return await axios.post(`${API_URL}/upload-photo`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
