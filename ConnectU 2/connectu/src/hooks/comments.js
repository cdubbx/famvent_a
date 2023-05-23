import { useState } from 'react';
import { setDoc, doc, collection, where, query, orderBy,deleteDoc } from 'firebase/firestore';
import { uuidv4 } from '@firebase/util';
import { db } from '../lib/firebase';
import { useToast } from '@chakra-ui/react';
import { useCollectionData, } from 'react-firebase-hooks/firestore';
export function useAddComment({postID, uid}){ // I am a little bit lost on where we get this uid from (side note i think it's the person who makes a comments uid)

    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
   
   
    async function addComment(text){
        setLoading(true);
        const id = uuidv4(); // lets us generate an id, because the comment is going have its on id 
        const date = Date.now() // where also going to put a time stamp on the comment 
        const docRef = doc(db,"comments",id) // database instance, collection, and third parameter is going to document
        await setDoc(docRef, {text,id, postID, date, uid})    // this info is going to be information that were going to set on the new collection that we are going to make 

        toast({
            title: "Comment added",
            status: "success",
            isClosable: true,
            position: "top",
            duration: 5000,
        })

        setLoading(false);
    }
    return {addComment, isLoading};  
}

export function useComments(postID){
    const q = query(collection(db,"comments"), where("postID", "==", postID), orderBy("date","asc"));

    const [comments, isLoading, error] = useCollectionData(q);// grabs the snapshot of the info from firebase and converts the snapshot into a date variable
    if (error) throw error;
    return {comments, isLoading}
}

export function useDeleteComment(id) {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
  
    async function deleteComment() {
      const res = window.confirm("Are you sure you want to delete this comment?"); // makes a window in the browswer to as the user if they want to delete the comment 
  
      if (res) {
        setLoading(true);
        const docRef = doc(db, "comments", id); // gets the document reference and uses the id, which is essentially the comment id to find it 
        await deleteDoc(docRef);  // deletes the comment doc 
        toast({
          title: "Comment deleted!",
          status: "info",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
        setLoading(false);
      }
    }
  
    return { deleteComment, isLoading };
  }