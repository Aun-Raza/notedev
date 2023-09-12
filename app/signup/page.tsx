'use client';

import LoginSignUp from '@/components/LoginSignUp';
import { User } from '@/types';
import axios, { AxiosError } from 'axios';

const SignUpPage = () => {
  async function handleRegister(username: string, password: string) {
    try {
      const { data: user, headers } = await axios.post<User>(
        'http://localhost:3000/api/user/register',
        { username, password }
      );
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.message);
    }
  }

  return <LoginSignUp submitType='Sign Up' onFormSubmit={handleRegister} />;
};

export default SignUpPage;
