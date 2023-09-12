import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';

interface ISubmitType {
  onFormSubmit: (username: string, password: string) => void;
  submitType: string;
}

const LoginSignUp = ({ submitType, onFormSubmit }: ISubmitType) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        onFormSubmit(username, password);
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
        <Button type='submit' color='primary'>
          {submitType === 'Login' ? 'Login' : 'Sign Up'}
        </Button>
      </div>
    </form>
  );
};

export default LoginSignUp;
