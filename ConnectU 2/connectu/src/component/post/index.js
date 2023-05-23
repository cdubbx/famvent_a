import React from 'react'
import { Box, Text } from '@chakra-ui/react';
import Header from './Header';
import Actions from './Actions';


export default function Post({post}) {
    const {text} = post;
    return( 
    <Box p={"2"} maxW = "600px" textAlign={"left"}>
        <Box border={"2px solid"} borderColor = {"gray.100"} borderRadius = {"md"}>
            <Header post = {post}/> {/* uid={uid} date = {date}*/}

            <Box p={"2"} minH = {"100px"}>
                <Text wordBreak={"break-word"} fontSize = {["sm", "md"]}> {/* this is just breakpoints */}
                        {text}
                </Text>
            </Box>
                <Actions post = {post}/> 
        </Box>
    </Box>
  )
}
