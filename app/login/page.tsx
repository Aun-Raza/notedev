'use client';

import LoginSignUp from '@/components/LoginSignUp';

const LoginPage = () => {
  function handleLogin(username: string, password: string) {
    console.log('login', username, password);
  }

  return <LoginSignUp submitType='Login' onFormSubmit={handleLogin} />;
};

export default LoginPage;
