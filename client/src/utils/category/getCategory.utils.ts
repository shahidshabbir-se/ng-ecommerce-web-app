import axios from "axios";

export default async function getCategory(categoryId: number) {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/category/getCategory/${categoryId}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching category data:", error);
    throw error; // Rethrow the error to handle it outside of this function
  }
}