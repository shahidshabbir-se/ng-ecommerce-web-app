import axios from "axios";
import {LoginUser} from "@interfaces/auth.interfaces";

export async function loginUser(
  loginUserCredentials: LoginUser
) {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/user/verify_by_credentials",
      {
        email: loginUserCredentials.email,
        password: loginUserCredentials.password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error;
  }
}