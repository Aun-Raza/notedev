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
    const { data: user } = await axios.post<User>('/api/user/login', {
      username,
      password,
    });
    dispatch(setUser({ id: user.id, username }));
    router.push('/');
  }

  return <LoginSignUp submitType='Login' onFormSubmit={handleLogin} />;
};

export default LoginPage;
