import axios from "../utils/http";

// show all orders information
export const getOrders = async (page = 1, paid = null) => {
  const params = {
    page,
    paid,
  };
  const response = await axios.get("/orders/", { params });
  return response.data;
};

// create an order
export const createOrder = async (courseId) => {
  const response = await axios.post("/orders/", { course: courseId });
  return response.data;
};
