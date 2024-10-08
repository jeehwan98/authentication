'use client';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { useState } from 'react';

type LoginUserInfoProps = {
  userId: string;
  password: string;
};

export default function LoginForm() {
  const [loginDetails, setLoginDetails] = useState({
    userId: '',
    password: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8090/api/v1/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginDetails),
      });

      const responseData = await response.json();
      console.log('response???:::', response);
      console.log('response data???:::', responseData);

      if (response.ok) {
        if (responseData.message === 'login success') {
          revalidatePath('/');
          redirect('/');
        } else {
          setErrors(responseData.errors || { general: 'Login failed' });
        }
      } else {
        setErrors(responseData.errors || { general: 'Login failed' });
      }
    } catch (error) {
      console.error('Login Error:', error);
      setErrors({ general: 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="mt-2 mb-4">
        <input
          type="text"
          id="userId"
          name="userId"
          value={loginDetails.userId}
          onChange={handleChange}
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
          placeholder="UserId"
          required
        />
      </div>
      <div className="mt-2 mb-4">
        <input
          type="password"
          id="password"
          name="password"
          value={loginDetails.password}
          onChange={handleChange}
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Password"
          required
        />
        {errors && Object.keys(errors).length > 0 && (
          <ul>
            {Object.keys(errors).map((errorKey) => (
              <li key={errorKey} className="text-red-600 mt-4 text-sm">
                {errors[errorKey]}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-red-600 text-white p-3 rounded hover:bg-red-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <div className="flex justify-between items-center mt-3">
        <a href="#" className="text-sm text-blue-400 hover:text-blue-600">
          Forgot password?
        </a>
        <a href="#" className="text-sm text-blue-400 hover:text-blue-600">
          Register
        </a>
      </div>
    </form>
  );
}
