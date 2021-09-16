import React, { useEffect, useState } from 'react'
import service from '../services/users-service'
export const AuthContext = React.createContext()

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined)

  useEffect(() => {
    const storeUser = localStorage.getItem('user');
    if (storeUser) {
      service.profile()
        .then((user) => {
          if (JSON.stringify(user) !== JSON.stringify(storeUser)) {
          setUser(user)
          }
        })
    }
  }, [])

  function login(user) {
    localStorage.setItem('user', JSON.stringify(user));
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