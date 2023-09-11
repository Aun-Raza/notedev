'use client';

import {
  Navbar as NavbarNextUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@nextui-org/react';
import React from 'react';

const NavBar = () => {
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
          <Link color='foreground' href='#'>
            Features
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='foreground' href='#'>
            Profile
          </Link>
        </NavbarItem>
      </NavbarContent>
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
    </NavbarNextUI>
  );
};

export default NavBar;
