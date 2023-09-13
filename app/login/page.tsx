'use client';

import LoginSignUp from '@/components/LoginSignUp';
import axios, { AxiosError } from 'axios';
import { User } from '@/types';
import { useDispatch } from 'react-redux/es/exports';
import { setUser } from '@/redux/feature';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  async function handleLogin(username: string, password: string) {
    try {
      const { data: user } = await axios.post<User>(
        'http://localhost:3000/api/user/login',
        { username, password }
      );
      dispatch(setUser({ id: user.id, username }));
      router.push('/');
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.message);
    }
  }

  return <LoginSignUp submitType='Login' onFormSubmit={handleLogin} />;
};

export default LoginPage;
