import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

export default function Dashboard() {
  const { api } = useContext(AuthContext)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('/projects').then((r) => setProjects(r.data)).catch(() => setProjects([]))
  }, [])

  return (
    <div>
      <div className="topbar-row" style={{justifyContent:'space-between', marginBottom:12}}>
        <div>
          <h2 style={{margin:0, color:'#fff'}}>Projects</h2>
          <div className="small muted">Your projects and context versions</div>
        </div>
        <div>
          <Link className="btn" to="/create">Create Project</Link>
        </div>
      </div>
      <div>
        {projects.length === 0 && <div className="muted card">No projects yet — create one to get started.</div>}
        {projects.map((p) => (
          <div key={p._id || p.id} className="card" style={{ marginBottom: 8, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <Link to={`/projects/${p._id || p.id}`} style={{color:'#fff', fontWeight:700}}>{p.name}</Link>
              <div className="muted small">{p.description}</div>
            </div>
            <div>
              <Link to={`/projects/${p._id || p.id}`} className="btn secondary" style={{textDecoration:'none'}}>Open</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
