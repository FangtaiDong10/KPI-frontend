import axios from "../utils/http";

export const getCourse = async (courseId) => {
  const response = await axios.get("/courses/" + courseId);
  return response.data;
};
