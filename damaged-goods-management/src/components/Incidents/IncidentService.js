import axios from "axios";

const API_URL = "https://localhost:7043/api/IncidentReport";

export const getAllIncidents = async () => {
  return await axios.get(API_URL);
};

export const getIncidentById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

export const addIncident = (incident) => {
  return axios.post(`${API_URL}`, incident, {
    headers: { "Content-Type": "application/json" },
  });
}

export const updateIncident = async (id, incident) => {
  return await axios.put(`${API_URL}/${id}`, incident);
};

export const deleteIncident = async (id) => {
  return await axios.patch(`${API_URL}/${id}`, { isActive: false });
};

// Example endpoint for uploading photos
// export const uploadIncidentPhoto = async (formData) => {
//   return await axios.post(`${API_URL}/upload-photo`, formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
// };

export const uploadIncidentPhoto = async (formData, reportId) => {
  try {
    // Adding the reportId to the formData
    formData.append("reportId", reportId);

    // Posting the formData with proper content-type for file uploads
    const response = await axios.post(`${API_URL}/upload-photos`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;  // Return response data
  } catch (error) {
    console.error("Error uploading photos:", error);
    throw error; // Rethrow for the frontend to handle
  }
};
