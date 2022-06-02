import firebase from  'firebase/compat/app'
import { getFirestore, setDoc, collection, getDocs, doc, updateDoc, getDoc, query, where } from "firebase/firestore";
import 'firebase/compat/auth';
import { useReducer } from 'react';

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
})

const db = getFirestore(app);
const usersRef = collection(db, 'users');


//get current layout data to use for updating
async function read(user){
  const querySnapshot = await getDoc(doc(db,'users',user));
  const layouts = querySnapshot.data().layouts;
  return layouts;
}

//add layout
async function addLayout(user, layout, layoutName){
  const currentLayouts = await read(user);
  console.log(currentLayouts);
  await updateDoc(doc(db, 'users',user),{
    layouts:{
      ...currentLayouts,
      [layoutName]:layout
    }
  })
}

//add new user
async function addNewUser(user){
  try {
    const docRef = await setDoc(doc(db,'users',user), {
      user:user,
      layouts: {},
      theme:'dark'
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

//delete layout for user


export const addNewUserDB = addNewUser;
export const readDB = read;
export const addLayoutDB = addLayout;
export const auth = app.auth()
export default app