'use client';

import {
  Navbar as NavbarNextUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Avatar,
} from '@nextui-org/react';
import React from 'react';
import { resetUser } from '@/redux/feature';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const NavBar = () => {
  const username = useAppSelector((state) => state.userReducer.value.username);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <NavbarNextUI position='static'>
      <NavbarBrand as={Link} href='/'>
        {/* <Image src={''} height={200} width={200} alt='next image' /> */}
        <p className='text-2xl font-semibold font-mono'>NoteDev</p>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Link color='foreground' href='/dashboard'>
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='foreground' href='/about'>
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='foreground' href='#'>
            Profile
          </Link>
        </NavbarItem>
      </NavbarContent>
      {!username && (
        <NavbarContent justify='end'>
          <NavbarItem>
            <Button as={Link} color='primary' href='/login' variant='flat'>
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color='primary' href='/signup' variant='flat'>
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
      {username && (
        <NavbarContent justify='end'>
          <NavbarItem>
            <Button
              color='primary'
              variant='flat'
              onClick={async () => {
                await axios.post('/api/user/logout');
                dispatch(resetUser());
                router.push('/login');
              }}
            >
              Logout
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Avatar name={username} />
          </NavbarItem>
        </NavbarContent>
      )}
    </NavbarNextUI>
  );
};

export default NavBar;
