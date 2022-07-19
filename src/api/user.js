import axios from "../utils/http";

export const getUser = async (username) => {
  const response = await axios.get("/users/" + username);
  console.log(response.data);

  return response.data;
};
