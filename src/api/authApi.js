import api from "./axios";

export const login = async (loginData) => {

  const response = await api.post("/auth/login", loginData);

  return response.data;

};
export const logout = async (token) => {

  const response = await api.post(
    "/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};