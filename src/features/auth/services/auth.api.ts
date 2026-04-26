
import { api } from "@/src/config/api";
import { SignupInput, AuthResponse } from "../types/auth.types";

export const signupUser = async (
  data: SignupInput
): Promise<AuthResponse> => {
  const res = await api .post("/auth/signup", data);
  return res.data;
};

export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", data);
  return res.data;
};