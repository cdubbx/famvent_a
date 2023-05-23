import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import Avatar from '../../component/profile/Avatar';
import { useUser } from '../../hooks/users';
import {formatDistanceToNow} from 'date-fns'
import UsernameButton from '../../component/profile/UsernameButton';
export default function Header({post}) {
  const {uid,date} = post;
  const {user,isLoading} = useUser(uid);

  if (isLoading) return "Loading user..."
  
    return (
   <Flex 
   alignItems={"center"}
   borderBottom = "2px solid"
   borderColor={"teal.100"}
   p = "3"
   bg={"gray.50"}
   >
    <Avatar user = {user} size = "md"/>
    <Box ml={"4"}>
        <UsernameButton user = {user} />
        <Text
            fontSize={"sm"} color = "gray.500">
            {formatDistanceToNow(date)} ago
        </Text>
    </Box>
    

   </Flex>
  )
}
