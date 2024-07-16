import axios from "axios";

export async function getUser() {
  try {
    const response = await axios.get("/api/auth/user");
    return response.data;
  } catch (error) {
    return null;
  }
}