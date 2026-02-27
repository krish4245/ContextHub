import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import UploadDropzone from '../components/UploadDropzone'
import ContextView from '../components/ContextView'

export default function ProjectDetail() {
  const { id } = useParams()
  const { api } = useContext(AuthContext)
  const [project, setProject] = useState(null)
  const [context, setContext] = useState('')
  const [prompts, setPrompts] = useState([])

  useEffect(() => {
    api.get(`/projects/${id}`).then((r) => setProject(r.data)).catch(() => {})
    api.get(`/projects/${id}/context`).then((r) => {
      const ctx = r.data.context;
      if (ctx) {
        setContext(ctx.generated_text || '')
        setPrompts(ctx.prompts || [])
      }
    }).catch(() => {})
  }, [id])

  const handleUpload = async (file) => {
    const fd = new FormData()
    fd.append('file', file)
    const res = await api.post(`/upload/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    setContext(res.data.context || '')
    setPrompts(res.data.suggested_prompts || [])
  }

  return (
    <div>
      <div className="topbar-row" style={{justifyContent:'space-between', marginBottom:12}}>
        <div>
          <h2 style={{margin:0, color:'#fff'}}>{project?.name || 'Project'}</h2>
          <div className="muted small">Upload a ZIP to generate project context</div>
        </div>
      </div>
      <div className="grid cols-2">
        <div>
          <h4 style={{color:'#fff'}}>Upload</h4>
          <div className="dropzone card">
            <UploadDropzone onUpload={handleUpload} />
          </div>
        </div>
        <div>
          <ContextView markdown={context} prompts={prompts} />
        </div>
      </div>
    </div>
  )
}
