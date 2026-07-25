import api from "./axios";

export const getAllLeads = async () => {
  const response = await api.get("/admin-leads");

  return response.data;
};
export const createLead = async (leadData) => {
  const response = await api.post("/admin-leads", leadData);

  return response.data;
};
export const getLeadById = async (id) => {
  const response = await api.get(`/admin-leads/${id}`);

  return response.data;
};

export const updateLead = async (id, leadData) => {
  const response = await api.put(`/admin-leads/${id}`, leadData);

  return response.data;
};
export const deleteLead = async (id) => {
  const response = await api.delete(`/admin-leads/${id}`);

  return response.data;
};
export const createPublicLead = async (data) => {

  const response = await api.post(
    "/public-leads/create-lead",
    data
  );

  return response.data;

};

export const addNote  = async (id, noteData) => {
  const response = await api.post(`/admin-leads/${id}/notes`, noteData);

  return response.data;
};