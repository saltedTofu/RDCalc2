import React, { useContext, useState, useEffect, ReactNode } from "react";
import { auth, addNewUserDB, addTubeFeedFavoriteDB, getCurrentTubeFeedFavoritesDB, changeThemeDB, getThemeDB} from "../firebase";

interface AuthContext {
	currentUser:any;
	login:any;
	signup:any;
	logout:any;
	resetPassword:any;
	addUser:any;
	addTubeFeedFavorite:any;
	getTubeFeedFavorites:any;
	changeTheme:any;
	getTheme:any;
}

const AuthContext = React.createContext<AuthContext | null>(null);

export function useAuth() {
	return useContext(AuthContext);
}

interface Props{
	children:ReactNode;
}

export function AuthProvider({ children }:Props) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	function signup(email:any, password:any) {
		//addNewUserDB(email); //fails if already taken
		return auth.createUserWithEmailAndPassword(email, password);
	}
	function addUser(email:any){
		addNewUserDB(email);
	}

	async function login(email:any, password:any) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function logout(auth:any) {
		return auth.signOut(auth);
	}

	async function changeTheme(user:any,theme:any){
		return await changeThemeDB(user,theme);
	}

	function getTheme(user:any){
		return getThemeDB(user);
	}

	//Tubefeed favorites
	function addTubeFeedFavorite(user:any,formula:any){
		return addTubeFeedFavoriteDB(user,formula);
	}
	function getTubeFeedFavorites(user:any){
		return getCurrentTubeFeedFavoritesDB(user);
	}
  
	//not implemented
	function resetPassword(email:any) { 
		return auth.sendPasswordResetEmail(email);
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user:any) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		login,
		signup,
		logout,
		resetPassword,
		addUser,
		addTubeFeedFavorite,
		getTubeFeedFavorites,
		changeTheme,
		getTheme
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}