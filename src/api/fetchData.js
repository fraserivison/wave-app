import axios from "./axiosDefault";

export const fetchData = async () => {
  try {
    const response = await axios.get('/data');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
