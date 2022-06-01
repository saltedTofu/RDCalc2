import firebase from  'firebase/compat/app'
import { getFirestore, setDoc, collection, getDocs, doc, updateDoc } from "firebase/firestore";
import 'firebase/compat/auth';

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

//get data
function read(){
  getDocs(usersRef)
  .then((snapshot)=>{
    let users = []
    snapshot.docs.forEach((doc)=>{
      users.push({...doc.data(), id:doc.id})
    })
    console.log(users);
})
}

//update data
async function update(user, settings){
  await updateDoc(doc(db, 'users',user),{
    calcs:settings.calcs,
    positions:settings.positions,
    theme:settings.theme
  })
}

//create data
async function write(user){
  try {
    const docRef = await setDoc(doc(db,'users',user), {
      calcs: [],
      positions: [],
      theme:'dark'
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

//delete data
//not needed currently

export const writeDB = write;
export const readDB = read;
export const updateDB = update;
export const auth = app.auth()
export default app