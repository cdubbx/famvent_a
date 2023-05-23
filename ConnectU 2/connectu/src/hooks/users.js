import {useDocumentData} from "react-firebase-hooks/firestore"
import { query, doc, updateDoc} from 'firebase/firestore';
import { db, storage} from "../lib/firebase";
import {uploadBytes,ref,getDownloadURL} from "firebase/storage"
import { useToast } from '@chakra-ui/react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export function useUser(id){
    const q = query(doc(db,"users", id,)); //Creates a new immutable instance of Query that is extended to also include additional query constraints.(in other words I believe this find the user in the database )
    const [user,isLoading] = useDocumentData(q) // grabs the snapshot of the info from firebase and converts the snapshot into a date variable
    return {user, isLoading}; // it returns a user object and loading of the user 
}

export function useUpdateAvatar(uid){
    const [isLoading, setLoading] = useState(false);
    const [file, setFile] = useState(null) // this is set to null in the beginning because there is no file 
    const toast = useToast();
    const navigate = useNavigate() // creates an instance of navigation so this way we are able to navigate 
   
   async function updateAvatar(){

    
    if(!file) {

        toast({
            title: "No file selected",
            description: "Please select a file to upload",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
        });

        return;
    }
    
    setLoading(true)
    
    const fileRef = ref(storage,"avatars/" + uid) // make a ref of the file and concatenate the id to avatars so its the person avater 

    await uploadBytes(fileRef, file) // Uploads data to this object's location
     
    const avatarURL = await getDownloadURL(fileRef) //Returns the download URL for the given StorageReference.
    const docRef = doc(db, "users", uid);
     await updateDoc(docRef, {avatar: avatarURL})
   
    toast({
        title: "Profile updated",
        status: "success",
        isClosable: true, 
        position: "top",
        duration: 5000,
    });
    setLoading(false)    

    navigate(0)

    }   
    return{
        setFile,
         updateAvatar,
        isLoading};
}