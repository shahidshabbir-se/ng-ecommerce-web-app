import axios from 'axios';
import {CreateUser} from "@interfaces/auth.interfaces";

export async function registerUser(
  createUser: CreateUser
) {
  try {
    const response = await axios.post('http://localhost:8080/api/user/createUser', {
      firstName: createUser.firstName,
      lastName: createUser.lastName,
      email: createUser.email,
      password: createUser.password
    }, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    return error
  }
}