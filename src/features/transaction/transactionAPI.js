import axios from "../../utils/axios";

// get data from server

export const getTransactions = async () => {
  const response = await axios.get("/transactions");

  return response.data;
};

// Add data from server

export const addTransactions = async (data) => {
  const response = await axios.post(`/transactions`, data);

  return response.data;
};

// Edit data from server

export const editTransactions = async (id, data) => {
  const response = await axios.put(`/transactions/${id}`, data);

  return response.data;
};

// Edit data from server

export const deleteTransactions = async (id) => {
  const response = await axios.delete(`/transactions/${id}`);

  return response.data;
};
