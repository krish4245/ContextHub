import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

export default function Register() {
  const { api, login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(null)
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/register', { email, password })
      login(res.data.token, res.data.user)
      nav('/')
    } catch (e) {
      setErr(e.response?.data?.error || 'Registration failed')
    }
  }

  return (
    <div className="card" style={{ maxWidth:480, margin:'24px auto' }}>
      <h2 style={{color:'#fff'}}>Create an account</h2>
      <p className="muted small">Quickly create an account to save project contexts</p>
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
        <div style={{ marginTop: 12 }}>
          <button className="btn" type="submit">Create account</button>
        </div>
      </form>
    </div>
  )
}
