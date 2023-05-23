import { Box, Button, Heading, HStack, Textarea } from '@chakra-ui/react'
import React from 'react'
import TextareaAutosize from "react-textarea-autosize";
import {useForm} from "react-hook-form"
import { useAddPost, usePosts } from '../../hooks/post';
import { useAuth } from '../../hooks/auth';
import PostsLists from '../../component/post/PostsLists';
import { usePost } from '../../hooks/post';

function NewPost() {

  const {register, handleSubmit,reset} = useForm();
  const {addPost,isLoading: addingPost} = useAddPost();
  const {user, isLoading: authLoading} = useAuth()

  function handleAddPost(data) { // the data object is going to come from the handleSubmit function from the useForm hook

    addPost({
      uid: user.id, // this is the user id of the person who posted the post
      text:data.text,
    })
    reset();
  }
  return  <Box maxW={"600px"} mx = "auto" py={"10"}>
  <form onSubmit={handleSubmit(handleAddPost)}>
    <HStack justify={"space-between"}>
      <Heading size={"lg"}>New Post</Heading>
      <Button colorScheme={"teal"}               /* if we dont put the type submit then reach form will not handle submit*/
       type = "submit" 
       isLoading ={authLoading || addingPost} /*  Which means button the button should be in the loading state, which means the button is disabled */
       loadingText = "Loading"
       > 
        Post
        </Button> 
      
    </HStack>
  <Textarea 
  as = {TextareaAutosize}
  resize={"none"} 
  mt = "5" 
  placeholder='Create a new post...'
  minRows={3}
  {...register("text", {required: true})}
  
  />
  </form>
</Box>
}

export default function Dashboard() {
  const {posts, isLoading} = usePosts();
 
   if (isLoading) return "Loading posts...";
  return (
   <>
  <NewPost />
  <PostsLists posts={posts} />
  </>
  );
}
