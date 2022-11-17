import axios from "../utils/http";



// show all orders information
export const getOrders = async () => {
  const response = await axios.get("/orders/");
  return response.data;
};


// create an order
export const createOrder = async (courseId) => {
  const response = await axios.post("/orders/", { course: courseId });
  return response.data;
};
