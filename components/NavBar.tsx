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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  const username = useAppSelector((state) => state.userReducer.value.username);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <NavbarNextUI className='bg-secondary text-white' position='static'>
      <NavbarBrand as={Link} href='/'>
        <p className='text-3xl font-semibold text-white font-mono '>
          Note
          <FontAwesomeIcon className='px-1' color='white' icon={faNoteSticky} />
          Dev
        </p>
      </NavbarBrand>

      {!username && (
        <NavbarContent justify='end'>
          <NavbarItem>
            <Button
              as={Link}
              color='default'
              className='text-white'
              href='/login'
              variant='flat'
            >
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color='default'
              className='text-white'
              href='/signup'
              variant='flat'
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
      {username && (
        <NavbarContent justify='end'>
          <NavbarItem>
            <Avatar
              as={Link}
              href='/profile'
              className='text-xl'
              name={username.substring(0, 1).toUpperCase()}
            />
          </NavbarItem>
          <NavbarItem>
            <Button
              color='default'
              className='text-white'
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
        </NavbarContent>
      )}
    </NavbarNextUI>
  );
};

export default NavBar;
