import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

export default function Header(){
  const { user, logout } = useContext(AuthContext)
  return (
    <header className="header">
      <div className="container topbar-row">
        <div className="brand">
          <span className="logo" />
          ContextHub
        </div>
        <nav className="navlinks">
          <Link to="/">Projects</Link>
          <Link to="/create">Create</Link>
          {!user ? <Link to="/login">Login</Link> : <a href="#" onClick={(e)=>{e.preventDefault(); logout()}}>Logout</a>}
        </nav>
      </div>
    </header>
  )
}
