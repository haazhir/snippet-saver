function SnippetCard({ snippet, onDelete }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{snippet.title}</h3>
      <p style={styles.content}>{snippet.content}</p>
      <button style={styles.deleteBtn} onClick={() => onDelete(snippet.id)}>
        Delete
      </button>
    </div>
  )
}

const styles = {
  card: {
    background: 'white',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '12px',
  },
  title: { fontSize: '16px', marginBottom: '8px' },
  content: { color: '#555', fontSize: '14px', marginBottom: '12px' },
  deleteBtn: {
    padding: '6px 12px',
    background: '#dc2626',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
}

export default SnippetCard