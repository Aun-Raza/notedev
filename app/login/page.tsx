'use client';

import LoginSignUp from '@/components/LoginSignUp';
import axios, { AxiosError } from 'axios';
import { User } from '@/types';

const LoginPage = () => {
  async function handleLogin(username: string, password: string) {
    try {
      const { data: user, headers } = await axios.post<User>(
        'http://localhost:3000/api/user/login',
        { username, password }
      );
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.message);
    }
  }

  return <LoginSignUp submitType='Login' onFormSubmit={handleLogin} />;
};

export default LoginPage;
