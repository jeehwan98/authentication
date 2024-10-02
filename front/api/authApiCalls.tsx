'use server';

interface LoginUserInfoProps {
  userId: string;
  password: string;
}

const baseURL = process.env.PUBLIC_API_BASE_URL;


export async function loginAPICalls(loginDetails: LoginUserInfoProps) {
  try {
    const response = await fetch(`${baseURL}/auth/login`, {
      // const response = await fetch(`http://localhost:8080/api/v1/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginDetails)
    })
    const responseData = await response.json();
    console.log('response???:::', response);
    console.log('response data???:::', responseData);

    if (response.ok) {
      // console.log('response headers:', response.headers);
      if (responseData.message === 'login success') {
        console.log('responseData:', responseData);
        return { token: responseData.token, errors: null };
      } else {
        return { token: null, errors: responseData.errors }; // ,errors: responseData.errors
      }
    }

  } catch (error) {
    throw error;
  }
}