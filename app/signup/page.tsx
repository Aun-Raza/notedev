'use client';

import LoginSignUp from '@/components/LoginSignUp';
import { User } from '@/types';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux/es/exports';
import { setUser } from '@/redux/feature';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  async function handleRegister(username: string, password: string) {
    const { data: user } = await axios.post<User>('/api/user/register', {
      username,
      password,
    });
    dispatch(setUser({ id: user.id, username }));
    router.push('/');
  }

  return <LoginSignUp submitType='Sign Up' onFormSubmit={handleRegister} />;
};

export default SignUpPage;
