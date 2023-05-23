import React from 'react'
import { Divider, Stack, HStack, Flex, Text, Button, useDisclosure} from '@chakra-ui/react'
import { useParams } from 'react-router-dom';
import PostsLists from '../post/PostsLists';
import { usePosts } from '../../hooks/post';
import { useUser } from '../../hooks/users';
import Avatar from './Avatar';
import { format } from 'date-fns';
import EditProfile from './EditProfile';
import { useAuth } from '../../hooks/auth';
export default function Profile() {
  const {id} = useParams();
  console.log('User ID:', id); // Add this line
  const {posts , isLoading: postsLoading} = usePosts(id); // the id is coming from the top of the path
  const {user, isLoading: userLoading} = useUser(id);
  const {user: authUser, isLoading: authLoading} = useAuth(id);
  const {isOpen, onOpen ,onClose} = useDisclosure();

  if (userLoading || authLoading) return "Loading..."
  if (!user) return "User not found";
  
    return (
    <Stack spacing={"5"}>
        <Flex p = {["4","6"]} pos = "relative" align={"center"}>
            <Avatar size='2xl' user={user} />

            {!authLoading && (authUser.id === user.id) && <Button pos={"absolute"} mb = "2" top={"6"} right ="6" colorScheme={"teal"} onClick = {onOpen}>
                Change avatar
            </Button>}
            <Stack ml={"10"}>
               <Text fontSize={"2xl"}>{user.username}</Text>
                <HStack spacing={"10"}>
                    <Text color={"gray.700"} fontSize = {["sm", "lg"]}>
                       Post: {posts.length}
                    </Text>
                    <Text color={"gray.700"} fontSize = {["sm", "lg"]}>
                        Likes: todo!
                    </Text>
                    <Text color={"gray.700"} fontSize = {["sm", "lg"]}>
                        Joined: {format(user.data,"MMM YYY")}
                    </Text>
                </HStack>
            </Stack>

           <EditProfile  isOpen={isOpen} onClose = {onClose}/>
        </Flex>
        <Divider />

        {postsLoading ? (
        <Text>Posts are loading...</Text>
      ) : (
        <PostsLists posts={posts} />
      )}
        
    </Stack>
    )
}
