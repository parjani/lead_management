import api from "./axios";


export const getAllActivities = async () => {

    const response = await api.get(
        "/admin-activities"
    );

    return response.data;

};
export const getMemberActivities = async () => {

    const response = await api.get(
        "/member-activities"
    );

    return response.data;

};

export const getMemberActivityStats = async () => {

    const response = await api.get(
        "/member-activities/stats"
    );

    return response.data;

};