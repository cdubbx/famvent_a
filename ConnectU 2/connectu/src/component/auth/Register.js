import React from 'react'
import {Center,Box, Heading, FormLabel, Input, FormControl, FormErrorMessage, Button,Link,Text} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';
import { DASHBOARD, LOGIN, REGISTER } from '../../lib/routes';
import {useLogin, useRegister} from "../../hooks/auth"
import { emailValidate,passwordValidate, usernameValidate } from '../../utils/form-validate';
import {useForm} from 'react-hook-form'

export default function Register() {
  const {register: signup, isLoading} = useRegister();
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
    } = useForm();

    console.log(errors)

  async function handleRegister(data){
   signup({
    username: data.username, 
    email: data.email, 
     password:
     data.password, 
     redirectTo: DASHBOARD,
    });

  }
  
    return ( 
  <Center w= "100%" h="100vh">
    <Box mx ="1" maxW = "md" p= "9" borderWidth="1px" borderRadius = "lg">
         <Heading mb = "4" size="lg" textAlign = "center">Register
         
         </Heading>

         <form onSubmit={handleSubmit(handleRegister)}>
            <FormControl isInvalid = {errors.email} py = "2">
                <FormLabel>Username</FormLabel>
                    <Input 
                    placeholder='username' 
                    {...register('username',usernameValidate)}/>
                    <FormErrorMessage>
                      {errors.username && errors.username.message}
                      </FormErrorMessage>
               
            </FormControl>
            <FormControl isInvalid = {errors.email} py = "2">
                <FormLabel>
                    <Input type = "email" placeholder='user@email.com' {...register('email',emailValidate)}/>
                    <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                </FormLabel>
            </FormControl>
            <FormControl isInvalid = {errors.password} py = "2">
                <FormLabel>
                    <Input type = "password" placeholder='password123' {...register('password',passwordValidate)}/>
                    <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                </FormLabel>
            </FormControl>
            <Button  mt="4" 
            type='submit' 
            colorScheme="teal" 
            size= "md" w = "full" 
            //isLoading= {true} 
            loadingText = "Signing UP">
              Register </Button> 
           
         </form>
        <Text fontSize= "xlg" align= "center" mt = "6"> Already have an account? {" "}
        <Link 
        as = {RouterLink}
         to={LOGIN} 
        color = "teal.800" 
        fontWeight="medium"
        textDecor="underline" 
        _hover={{background:"teal.800"}} >
            
            Register</Link> {" "}
            instead!
        </Text>
         
     </Box>
   </Center>
  );
}
