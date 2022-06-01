import React, { useContext, useState, useEffect } from "react"
import { auth, writeDB, readDB, updateDB } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    writeDB(email); //fails if already taken
    return auth.createUserWithEmailAndPassword(email, password)
  }

  async function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout(auth) {
    return auth.signOut(auth);
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
    resetPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}