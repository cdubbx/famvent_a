import { useEffect, useState } from 'react';
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth'
import {useAuthState, useSignOut} from 'react-firebase-hooks/auth'
import { auth, db } from '../lib/firebase';
import { DASHBOARD } from '../lib/routes';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../lib/routes';
import {setDoc, doc, getDoc} from 'firebase/firestore'
import isUsernameExist from '../utils/isUsernameExist';
export function useAuth(){
    const [authUser, authLoading, error] = useAuthState(auth); // the auth is form the auth that we exported in firebase.js 
    const [isLoading,setLoading] = useState(true);
    const [user,setUser] = useState(null); // we use this user state to so we can apply a property to it =
  

    useEffect( () => { //Accepts a function that contains imperative, possibly effectful code.
        async function fetchData(){
            setLoading(true);
            const ref = doc(db,"users",authUser.uid); // Gets a DocumentReference instance that refers to the document at the specified absolute path
            const docSnap = await getDoc(ref); // attempts to provide up-to-date data when possible by waiting for data from the server,
            setUser(docSnap.data()) // this is going to set user by getting the user reference
            setLoading(false);
        }

        if(!authLoading){ // if authloading is done
            if(authUser) fetchData(); // check if there is a user
            else setLoading(false) // Not signed in,

        }
    }, [authLoading])

    return {user: authUser, isLoading, error };
}

export function useLogin(){
    const [isLoading,setLoading] = useState(false); // we set loading states because we want users to have the ability to load into the application 
    const toast = useToast(); // we want to create an instance of toast so that we able to use it 
    const navigate = useNavigate(); // Returns an imperative method for changing the location. Used by s, but may also be used by other elements to change the location.

    async function login({email,password,redirectTo = DASHBOARD}){  
        setLoading(true); // we want to load the user in the applicatoion 
        try{
            await signInWithEmailAndPassword(auth,email,password) // Asynchronously signs in using an email and password. it takes in the auth instance that is made from the config, email and password
            toast({
                title: "You are logged in",
                status: "success",
                isClosable: true,
                position: "top",
                duration:5000,
            });
            navigate(redirectTo);
        } catch(error){
            toast({
                title: "Logging in failed",
                description: error.message,
                status: 'error',
                isClosable:true,
                duration:5000,
            });
                setLoading(false)
                return false; // Return false if login failed
        }
        setLoading(false)
        return true; // Return true if login succeeded
    }

    return{login,isLoading} // this hook create login as an object and is loading so it could be used in the form 
}

export function useRegister(){
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();


    async function register({
        username,
        email,
        password, 
        redirectTo = DASHBOARD
    }) {
        setLoading(true);

        const usernameExists = await isUsernameExist(username)

        if (usernameExists){
            toast({
                title: "Username already exists",
                status: "error",
                isClosable:true,
                position: "top",
                duration: 5000,
            });
            setLoading(false);
        }

        else{
            try{
                const res = await createUserWithEmailAndPassword(auth,email,password);

                await setDoc(doc(db,"users",res.user.uid), { // calling setDoc, which is typically used to update doc but if the document does not exist it just makes a document
                    id: res.user.uid, // sets the id
                    username: username.toLowerCase(), // sets the fields in the document 
                    avatar: "",
                    data: Date.now(), // the date now function to a date on when the user created an account 
                });

                toast({
                    title: "Account created",
                    description: "You are logged in",
                    status: "success",
                    isClosable: true,
                    position: "top",
                    duration: 5000,
                });


                navigate(redirectTo); // the redirect to object was made before 

            } catch (error){
                toast({
                    title: "Signing up failed",
                    description: error.message,
                    status: "error",
                    isClosable: true,
                    position: "top",
                    duration: 5000,
                });
            } finally{
                setLoading(false);
            }
        }
       
    }
    
    return {register, isLoading}
}

export function useLogout() {
   const [signOut, isLoading, error] = useSignOut(auth) // this is a hook from firebase that allows you logout, 
   const navigate = useNavigate(); 
   const toast = useToast();


   async function logout(){
    if(await signOut()){
        toast({
            title: "Successfully Logged Out",
            status: "success",
            isClosable: true,
            position: "top",
            duration: 5000,
        })
        navigate(LOGIN);
        
    } // else show error [signOut returns false if failed]
   }
   
    return {logout,isLoading}
}