import firebase from  'firebase/compat/app';
import {getFirestore, setDoc, doc, updateDoc, getDoc, DocumentData, DocumentSnapshot} from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import 'firebase/compat/auth';

const app = firebase.initializeApp({
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID
});

const db = getFirestore(app);
getAnalytics(app);

//add new user
async function addNewUser(user:any){
	try {
		await setDoc(doc(db,'users',user), {
			user,
			tubeFeedFavorites: [],
			theme:'dark'
		});
	} catch (e) {
		console.log(e);
	}
}

//get tube feed favorites
async function getCurrentTubeFeedFavorites(user:any){
	try{
		const querySnapshot: DocumentSnapshot<DocumentData> = await getDoc(doc(db,'users',user));
		const tubeFeedFavorites = querySnapshot?.data()?.tubeFeedFavorites;
		return tubeFeedFavorites;
	}catch(e){
		//return an error
	}
}

//add or remove favorite to tube feeds
async function addTubeFeedFavorite(user:any,formula:any){
	let currentTubeFeedFavorites = await getCurrentTubeFeedFavorites(user);
	if(currentTubeFeedFavorites.includes(formula)){ //if new formula already in favorites, remove it from favorites
		currentTubeFeedFavorites = currentTubeFeedFavorites.filter((tubeFeed:any)=>tubeFeed!==formula);
	}
	else{//if new formula is not in favorites, add it to favorites and sort alphabetically
		currentTubeFeedFavorites = [...currentTubeFeedFavorites,formula];
		currentTubeFeedFavorites.sort();
	}
	await updateDoc(doc(db, 'users',user),{
		tubeFeedFavorites:currentTubeFeedFavorites
	});
	return currentTubeFeedFavorites;
}

//adjust saved theme
async function changeTheme(user:any,theme:any){
	await updateDoc(doc(db, 'users',user),{
		theme:theme
	});
}

async function getTheme(user:any){
	const querySnapshot = await getDoc(doc(db,'users',user));
	const savedTheme = querySnapshot?.data()?.theme;
	return savedTheme;
}

export const getThemeDB = getTheme;
export const changeThemeDB = changeTheme;
export const addNewUserDB = addNewUser;
export const addTubeFeedFavoriteDB = addTubeFeedFavorite;
export const getCurrentTubeFeedFavoritesDB = getCurrentTubeFeedFavorites;
export const auth = app.auth();
export default app;