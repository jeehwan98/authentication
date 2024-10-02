'use server';

import { loginAPICalls } from "@/api/authApiCalls";
import { loginLib } from "@/lib/auth";

interface AuthResult {
  token: string | null;
  errors: string | null;
}

export async function auth(prevState: null, formData: FormData) {
  const userId = formData.get('userId') as string;
  const password = formData.get('password') as string;

  const loginDetails = {
    userId,
    password
  };

  console.log('inputted details: ', loginDetails);

  // const result: AuthResult = await loginLib(loginDetails);

  console.log('userId: ', userId);

  let errors: {
    userId: string;
    password: string;
  }

  const result: AuthResult = loginAPICalls(loginDetails);
  // const result: AuthResult = loginLib(loginDetails);

  if (result.token) {
    console.log('token details??:', result.token);
    return result.token;
  } else {
    return result.errors;
  }
}