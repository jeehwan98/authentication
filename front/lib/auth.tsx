import { loginAPICalls } from "@/api/authApiCalls";

interface LoginUserInfoProps {
  userId: string;
  password: string;
}

export async function loginLib(loginDetails: LoginUserInfoProps) {
  return await loginAPICalls(loginDetails);
}