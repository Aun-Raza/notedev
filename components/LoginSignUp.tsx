import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { AxiosError } from 'axios';

interface ISubmitType {
  onFormSubmit: (username: string, password: string) => void;
  submitType: string;
}

const LoginSignUp = ({ submitType, onFormSubmit }: ISubmitType) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <form
      onSubmit={async (ev) => {
        try {
          ev.preventDefault();
          setErrorMessage('');
          await onFormSubmit(username, password);
        } catch (e) {
          setErrorMessage('Invalid username or password');
        }
      }}
      className='mt-4 container mx-auto max-w-lg border bg-white rounded-lg'
    >
      <div className='p-5 flex flex-col gap-3'>
        <Input
          isRequired
          type='text'
          label='username'
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          placeholder='Enter your username'
        />
        <Input
          type='password'
          label='password'
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          placeholder='Enter your password'
        />
        {errorMessage && <div className='text-red-400'>{errorMessage}</div>}
        <Button type='submit' color='primary'>
          {submitType === 'Login' ? 'Login' : 'Sign Up'}
        </Button>
      </div>
    </form>
  );
};

export default LoginSignUp;
