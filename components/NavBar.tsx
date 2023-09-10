'use client';

import {
  Navbar as NavbarNextUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';
import nextImage from '@/public/vercel.svg';

const NavBar = () => {
  return (
    <NavbarNextUI position='static'>
      <NavbarBrand>
        {/* <Image src={''} height={200} width={200} alt='next image' /> */}
        <p className='text-2xl font-semibold font-mono'>NoteDev</p>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Link color='foreground' href='#'>
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
          <Button as={Link} color='primary' href='#' variant='flat'>
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NavbarNextUI>
  );
};

export default NavBar;
