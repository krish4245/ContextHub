import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export default function UploadDropzone({ onUpload }) {
  const [err, setErr] = useState(null)
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (!acceptedFiles || acceptedFiles.length === 0) return
      const file = acceptedFiles[0]
      onUpload(file).catch((e) => setErr(e.response?.data?.error || 'Upload failed'))
    },
    [onUpload]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false })

  return (
    <div {...getRootProps()} className="dropzone" style={{cursor:'pointer'}}>
      <input {...getInputProps()} />
      <div style={{padding:16}}>
        <div style={{fontSize:18, color:'var(--accent)'}}>{isDragActive ? 'Release to upload' : 'Upload project ZIP'}</div>
        <div className="muted small">Max 50MB. node_modules and .git are ignored.</div>
        {err && <div className="muted" style={{marginTop:8}}>{err}</div>}
      </div>
    </div>
  )
}
