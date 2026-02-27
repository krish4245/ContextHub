import React, { createContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    if (token && email) setUser({ email })
  }, [])

  const login = (token, userInfo) => {
    localStorage.setItem('token', token)
    localStorage.setItem('email', userInfo.email)
    setUser(userInfo)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout, api }}>{children}</AuthContext.Provider>
}

export default AuthContext
