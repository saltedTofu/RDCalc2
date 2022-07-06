import firebase from  'firebase/compat/app'
import { getFirestore, setDoc, collection, doc, updateDoc, getDoc, deleteField} from "firebase/firestore";
import 'firebase/compat/auth';
import { useReducer } from 'react';
import {getAnalytics} from 'firebase/analytics';

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
      tubeFeedFavorites: [],
      theme:'dark'
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

//delete layout for user
async function deleteLayout(user, layoutName){
  try{
    let currentLayouts = await read(user);
    delete currentLayouts[layoutName];
    console.log(currentLayouts);
    await updateDoc(doc(db,'users',user), {
      layouts:currentLayouts
    })
    return 'Layout Deleted'
  } catch(e){
    console.log(e)
    return 'Unable to Delete Layout'
  }
}
//get tube feed favorites
async function getCurrentTubeFeedFavorites(user){
  console.log('reading DB')
  const querySnapshot = await getDoc(doc(db,'users',user));
  const tubeFeedFavorites = querySnapshot.data().tubeFeedFavorites;
  return tubeFeedFavorites;
}
//add favorite to tube feeds
async function addTubeFeedFavorite(user,formula){
  let currentTubeFeedFavorites = await getCurrentTubeFeedFavorites(user);
  if(currentTubeFeedFavorites.includes(formula)){ //if new formula already in favorites, remove it from favorites
    currentTubeFeedFavorites = currentTubeFeedFavorites.filter((tubeFeed)=>tubeFeed!==formula)
  }
  else{//if new formula is not in favorites, add it to favorites and sort alphabetically
    currentTubeFeedFavorites = [...currentTubeFeedFavorites,formula]
    currentTubeFeedFavorites.sort();
  }
  await updateDoc(doc(db, 'users',user),{
    tubeFeedFavorites:currentTubeFeedFavorites
  })
  return currentTubeFeedFavorites;
}


export const addNewUserDB = addNewUser;
export const readDB = read;
export const addLayoutDB = addLayout;
export const deleteLayoutDB = deleteLayout;
export const addTubeFeedFavoriteDB = addTubeFeedFavorite;
export const getCurrentTubeFeedFavoritesDB = getCurrentTubeFeedFavorites;
export const auth = app.auth()
export default app