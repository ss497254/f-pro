import { Cfetch } from "../utils/fetch";

interface LoginResponse {
  token: string;
  user: any;
}

export const handleLogin = async (data: {
  username: string;
  password: string;
}) => {
  const res = await Cfetch<LoginResponse>("/user/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (res.success) return res.data;

  throw new Error(res.message || "Login error");
};
