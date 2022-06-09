import React, { useContext, useState, useEffect } from "react"
import { auth, addNewUserDB, addLayoutDB, readDB, deleteLayoutDB} from "../firebase"

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
    addUser
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}