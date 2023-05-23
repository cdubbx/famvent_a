import { Box } from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import Post from '../../component/post'
import { usePost } from '../../hooks/post';
import NewComment from '../comments/NewComment'
import CommentList from './CommentList';
export default function Comments() {
  const {id} = useParams();

  const {post,isLoading} =  usePost(id);

  if (isLoading) return "Loading..."
  
    return (
    <Box align = "center" pt={"50"}>
        <Post post = {post} />
        <NewComment post = {post} />
        <CommentList  post = {post}/>
    </Box>
  )
}
