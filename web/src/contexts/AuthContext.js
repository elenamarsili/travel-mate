import React, { useEffect, useState } from 'react'
import service from '../services/users-service'
export const AuthContext = React.createContext()

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState()

  useEffect(() => {
    const userId = localStorage.getItem('user');
    if (userId) {
      service.profile()
        .then((user) => setUser(user))
    }
  }, [])

  function login(user) {
    localStorage.setItem('user', user.id);
    setUser(user)
  }

  function logout() {
    localStorage.removeItem('user');
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    setUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}