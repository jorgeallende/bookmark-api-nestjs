import { AxiosError } from "axios";
import { API } from ".";
import { createUserFormData } from "../pages/Register";
import { loginFormData } from "../pages/Login";

export const SignUp = async (data: createUserFormData) => {
  try {
    const response = await API.post("/auth/signup", data);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};

export const LoginAuth = async (data: loginFormData) => {
  try {
    const response = await API.post("/auth/signin", data);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};
