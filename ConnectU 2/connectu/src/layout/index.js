import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LOGIN } from '../lib/routes';
import { useAuth } from '../hooks/auth';
import Navbar from './Navbar'
import Sidebar from '../layout/Sidebar';
import { Box, Flex } from '@chakra-ui/react';

export default function Layout() {
 
  const {pathname} = useLocation(); // Returns the current location object, which represents the current URL in web browsers
  const navigate = useNavigate();
  const  {user, isLoading} = useAuth();


  useEffect(() =>{ // checks if there is a user, but at the same time it does not immediately takes us back to the login page 
    if(!isLoading && pathname.startsWith("/protected") && !user){ // therre no users and the pathname starts with protected it will navigate you back to the login screen
       navigate(LOGIN)
    }
  }, [pathname, user,isLoading]);
   

  if (isLoading) return "Loading..."
  
  return (
    <>
   <Navbar />
   <Flex pt = "16" pb = "12" mx="auto" w = "full" maxW="1200px">
     <Box w = "900px">
        <Outlet /> 
    </Box>
    <Sidebar />
    </Flex>
    
    </>
  )
}


// the outlet component is how react-router knows where to incs