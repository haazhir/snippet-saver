import { useState, useEffect } from 'react'
import axios from 'axios'
import SnippetCard from './SnippetCard.jsx'

const API = 'https://snippet-saver-production.up.railway.app/api'

function Snippets({ token, onLogout }) {
  const [snippets, setSnippets] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const headers = { Authorization: `Bearer ${token}` }

  const loadSnippets = async () => {
    const res = await axios.get(`${API}/snippets`, { headers })
    setSnippets(res.data)
  }

  useEffect(() => {
    loadSnippets()
  }, [])

  const handleSave = async () => {
    if (!title || !content) return
    await axios.post(`${API}/snippets`, { title, content }, { headers })
    setTitle('')
    setContent('')
    loadSnippets()
  }

  const handleDelete = async (id) => {
    await axios.delete(`${API}/snippets/${id}`, { headers })
    loadSnippets()
  }

  const handleLogout = async () => {
    await axios.post(`${API}/logout`, {}, { headers })
    onLogout()
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>My Snippets</h1>
        <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
      </div>

      <div style={styles.createBox}>
        <input
          style={styles.input}
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          style={styles.textarea}
          placeholder="Write your snippet here..."
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button style={styles.saveBtn} onClick={handleSave}>Save Snippet</button>
      </div>

      {snippets.map(snippet => (
        <SnippetCard key={snippet.id} snippet={snippet} onDelete={handleDelete} />
      ))}
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '20px',
    background: '#f0f0f0',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: { fontSize: '24px' },
  logoutBtn: {
    padding: '8px 16px',
    background: '#dc2626',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  createBox: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  textarea: {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    height: '100px',
    resize: 'vertical',
    boxSizing: 'border-box',
  },
  saveBtn: {
    padding: '10px 20px',
    background: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
}

export default Snippets