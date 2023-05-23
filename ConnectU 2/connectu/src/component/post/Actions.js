import { Flex, IconButton } from '@chakra-ui/react'
import { PROTECTED } from '../../lib/routes';
import React from 'react'
import {FaRegHeart, FaHeart, FaComment,FaRegComment, FaTrash} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import {useToggleLike, useDeletePost} from "../../hooks/post"
import { useComments } from '../../hooks/comments';
export default function Actions({post}) {
  const {id,likes} = post;

  const {user, isLoading: userLoading} = useAuth();

  const isLiked = likes.includes(user?.id);

  const configObj = {
    id,
    isLiked, 
    uid:user?.id
}

  const {toggleLike, isLoading: likeLoading} = useToggleLike(configObj) 
  const {deletePost, isLoading: deleteLoading} = useDeletePost(id)
 const {comments, isLoading: commentsLoading} = useComments(id)
    return (
    <Flex p = "2">

        <Flex alignItems={"center"}>
         <IconButton 
         onClick={toggleLike}
         isLoading = {likeLoading || userLoading}
         size={"md"} 
         colorScheme = "red" 
         variant={"ghost"} 
         icon = {isLiked ? <FaHeart/> : <FaRegHeart />} // sayin if is like full heart, but if not like open heart 
          isRound/>
         {likes.length} 
        </Flex>
        <Flex alignItems={"center"} ml = "2"> {/*React component used to create flexbox layouts. It renders a div with display: flex and comes with helpful style shorthand. */}
         <IconButton 
        as = {Link}
        to = {`${PROTECTED}/comments/${id}`}
         //isLoading = {likeLoading || userLoading}
         size={"md"} 
         colorScheme = "teal" 
         variant={"ghost"} 
         icon = { comments?.length === 0?<FaRegComment/> : <FaComment />}
          isRound/>
        {comments?.length}
        </Flex>
        <IconButton 
       ml={"auto"}
       onClick = {deletePost}
         isLoading = {deleteLoading}
         size={"md"} 
         colorScheme = "red" 
         variant={"ghost"} 
         icon = { <FaTrash />}
          isRound/>
    </Flex>
    
  )
}
