import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

export default function CreateProject() {
  const { api } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    const res = await api.post('/projects', { name, description })
    nav(`/projects/${res.data._id || res.data.id}`)
  }

  return (
    <div className="card" style={{ maxWidth:700, margin:'12px auto' }}>
      <h2 style={{color:'#fff'}}>Create Project</h2>
      <p className="muted small">Give your project a name and short description.</p>
      <form onSubmit={submit} style={{marginTop:12}}>
        <div>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div style={{marginTop:8}}>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div style={{ marginTop: 12 }}>
          <button className="btn" type="submit">Create project</button>
        </div>
      </form>
    </div>
  )
}
