// import { getAnalytics } from "firebase/analytics";
import { initializeApp,  } from "firebase/app";
import { getFirestore, collection, getDocs }  from "firebase/firestore";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";


const firebaseConfig = { 
  apiKey: "AIzaSyCyoT50jMxu-CNJKx9J6DVOBgukg2JrmoQ",
  authDomain: "newprojecttwitter.firebaseapp.com",
  projectId: "newprojecttwitter",
  storageBucket: "newprojecttwitter.appspot.com",
  messagingSenderId: "132577867665",
  appId: "1:132577867665:web:edf4b51052cc7cf56d4c30"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

//collection ref
const tweetRef = collection(db, 'tweets')
const userRef = collection(db, 'users')
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage();

//get collection data

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}

export {tweetRef, auth, provider, userRef}

//storage
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);
 
  updateProfile(currentUser, {photoURL});
  
  setLoading(false);
  alert("File Uploaded!")
}