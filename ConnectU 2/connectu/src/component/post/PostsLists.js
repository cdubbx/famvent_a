import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import Post  from './index'

export default function PostsLists({posts}) {
  return( 
    <Box px={"4"} align = "center">
        {posts?.length === 0 ?(
        <Text textAlign={"center"}  fontSize={"xl"}>
            No posts yet
        </Text> 
        ) : (
        
            posts?.map((post) => <Post key={post.id} post = {post} />)
  
  )}
 </Box>
  );
}
