import { Box,Button, Code, Stack } from '@chakra-ui/react'
import React from 'react'
import { PROTECTED, USERS } from '../lib/routes';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import Avatar from '../component/profile/Avatar';
function ActiveUser(){

    const {user, isLoading} = useAuth();

    if (isLoading) return "Loading..."
   

    return (
    <Stack align={"center"} spacing = "5" my = "8">
       <Avatar user={user} />
        <Code>@{user.username}</Code> {/*For you to write code and show code in your website (Bascially a code way to display the user name */}
        <Button 
        colorScheme={"teal"}
         w= "full"
         as = {Link}
         to= {`${PROTECTED}/profile/${user.username}`}>
            Edit Profile
            </Button>
    </Stack>
    );
}

export default function Sidebar() {
  return (
    <Box
    px="6"
    height="100vh"
    w = "100%"
    maxW="300px"
    borderLeft="1px solid"
    borderLeftColor="teal.100"
    position="sticky"
    top="16"
    display={{base:"none", md: "block"}} // renders out like a block 
   >
    
      {/*Active user component*/}
      <ActiveUser /> {/* the active user component always users of the app to use the username of the user as a link to their profile  */}
        <Box align = "center">
        <Box as = "ul" borderBottom= "2px solid" borderColor= "teal.200" al  />
            <Button
            variant = "outline"
            colorScheme="teal"
            as = {Link}
           to = {USERS}
            mt = "4"
            size={"sm"}
            > All USERS

            </Button>
            </Box>
        </Box>
      
  );
}
