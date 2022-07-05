import React, { useContext, useState, useEffect } from "react"
import { auth, addNewUserDB, addLayoutDB, readDB, deleteLayoutDB, addTubeFeedFavoriteDB, getCurrentTubeFeedFavoritesDB} from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function getLayouts(user){
    const result=readDB(user);
    return result;
  }
  function signup(email, password) {
    //addNewUserDB(email); //fails if already taken
    return auth.createUserWithEmailAndPassword(email, password)
  }
  function addUser(email){
    addNewUserDB(email);
  }
  function addLayout(user, layout, layoutName){
    addLayoutDB(user, layout, layoutName);
  }
  async function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout(auth) {
    return auth.signOut(auth);
  }

  function deleteLayout(user, layoutName){
    return deleteLayoutDB(user,layoutName)
  }
  
  //Tubefeed favorites
  function addTubeFeedFavorite(user,formula){
    return addTubeFeedFavoriteDB(user,formula);
  }
  function getTubeFeedFavorites(user){
    return getCurrentTubeFeedFavoritesDB(user)
  }
  
  //not implemented
  function resetPassword(email) { 
    return auth.sendPasswordResetEmail(email)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    addLayout,
    getLayouts,
    deleteLayout,
    addUser,
    addTubeFeedFavorite,
    getTubeFeedFavorites
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}