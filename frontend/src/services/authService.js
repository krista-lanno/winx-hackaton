import axios from "axios";

const API_URL = "http://localhost:8080/api/auth"; // adjust to your backend

export const register = async (user) => {
    return axios.post(`${API_URL}/register`, user);
};

export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem("token");
};

export const getCurrentUser = () => {
    return localStorage.getItem("token");
};
