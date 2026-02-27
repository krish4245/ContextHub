import React from 'react'

export default function ContextView({ markdown, prompts = [] }) {
  return (
    <div className="card">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h3 style={{margin:0, color:'#fff'}}>Generated Context</h3>
        <div>
          <button className="btn" onClick={() => { navigator.clipboard.writeText(markdown || '') }}>Copy</button>
        </div>
      </div>
      <div style={{marginTop:12}}>
        <div className="context-area" dangerouslySetInnerHTML={{__html: markdown ? ('<pre>'+escapeHtml(markdown)+'</pre>') : '<div class="muted">No context yet</div>'}} />
        {prompts && prompts.length > 0 && (
          <div style={{marginTop:12}}>
            <h4 style={{margin:'8px 0', color:'#fff'}}>Suggested AI prompts</h4>
            <div className="muted small">Click to copy a prompt</div>
            <ul style={{marginTop:8}}>
              {prompts.map((p, i) => (
                <li key={i} style={{marginTop:6}}>
                  <button className="btn" style={{marginRight:8}} onClick={() => navigator.clipboard.writeText(p)}>Copy</button>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

function escapeHtml(str){
  if(!str) return ''
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
}
