import api from "./axios";


export const getAllMembers = async () => {

    const response = await api.get("/admin-members");

    return response.data;

};


export const createMember = async (data) => {

    const response = await api.post(
        "/admin-members",
        data
    );

    return response.data;

};
export const getMemberById = async (id) => {

    const response = await api.get(
        `/admin-members/${id}`
    );

    return response.data;

};


export const updateMember = async (id, data) => {

    const response = await api.put(
        `/admin-members/${id}`,
        data
    );

    return response.data;

};

export const deleteMember = async (id) => {

    const response = await api.delete(
        `/admin-members/${id}`
    );

    return response.data;

};

export const getAllMemberLeads = async () => {

    const response = await api.get("/member-leads");

    return response.data;

};
export const updateLeadStatus = async(id,data)=>{

 const response = await api.put(
   `/member-leads/${id}/status`,
   data
 );

 return response.data;

};
export const getMemberLeadById = async (id) => {

    const response = await api.get(
        `/member-leads/leads/${id}`
    );

    return response.data;

};