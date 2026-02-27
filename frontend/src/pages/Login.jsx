import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

export default function Login() {
  const { api, login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(null)
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/login', { email, password })
      login(res.data.token, res.data.user)
      nav('/')
    } catch (e) {
      setErr(e.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className="card" style={{ maxWidth:480, margin:'24px auto' }}>
      <h2 style={{color:'#fff'}}>Welcome back</h2>
      <p className="muted small">Log in to access your project contexts</p>
      <form onSubmit={submit} style={{marginTop:12}}>
        <div>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div style={{marginTop:8}}>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {err && <div className="muted small" style={{marginTop:8}}>{err}</div>}
        <div style={{ marginTop: 12, display:'flex', gap:8 }}>
          <button className="btn" type="submit">Sign in</button>
          <Link to="/register" className="btn secondary" style={{textDecoration:'none'}}>Create account</Link>
        </div>
      </form>
    </div>
  )
}
