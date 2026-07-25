import axios from "axios";
import api from "./axios";


export const getDashboardStats = async () => {

    const response = await api.get(
        "/dashboard/stats"
    );

    return response.data;

};
export const getMemberDashboard = async()=>{

    const response = await api.get(
        "/member/dashboard"
    );

    return response.data;

};