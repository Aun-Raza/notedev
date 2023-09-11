'use client';

import LoginSignUp from '@/components/LoginSignUp';

const SignUpPage = () => {
  function handleRegister(username: string, password: string) {
    console.log('register', username, password);
  }

  return <LoginSignUp submitType='Register' onFormSubmit={handleRegister} />;
};

export default SignUpPage;
