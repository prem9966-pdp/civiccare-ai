"use client"

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const adminService = {
  getSummary: async () => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get(`${API_URL}/admin/summary`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getUsers: async () => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get(`${API_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getComplaints: async () => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get(`${API_URL}/admin/complaints`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  upsertScheme: async (data: any) => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.post(`${API_URL}/admin/schemes/upsert`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  deleteScheme: async (id: string) => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.delete(`${API_URL}/admin/schemes/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  upsertHospital: async (data: any) => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.post(`${API_URL}/admin/hospitals/upsert`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  deleteHospital: async (id: string) => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.delete(`${API_URL}/admin/hospitals/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default adminService;
