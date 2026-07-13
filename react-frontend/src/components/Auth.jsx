import { useState } from 'react'
import axios from 'axios'

const API = 'https://snippet-saver-production.up.railway.app/api'

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/login`, { email, password })
      onLogin(res.data.token)
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  const handleRegister = async () => {
    try {
      const res = await axios.post(`${API}/register`, {
        name,
        email,
        password,
        password_confirmation: passwordConfirm
      })
      onLogin(res.data.token)
    } catch (err) {
      setError(JSON.stringify(err.response?.data?.errors || 'Register failed'))
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.title}>Snippet Saver</h1>
        <h2 style={styles.subtitle}>{isLogin ? 'Login' : 'Register'}</h2>

        {error && <p style={styles.error}>{error}</p>}

        {!isLogin && (
          <input
            style={styles.input}
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        )}

        <input
          style={styles.input}
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {!isLogin && (
          <input
            style={styles.input}
            placeholder="Confirm Password"
            type="password"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
          />
        )}

        <button
          style={styles.button}
          onClick={isLogin ? handleLogin : handleRegister}
        >
          {isLogin ? 'Login' : 'Register'}
        </button>

        <p
          style={styles.toggle}
          onClick={() => { setIsLogin(!isLogin); setError('') }}
        >
          {isLogin ? 'No account? Register' : 'Have an account? Login'}
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    background: '#f0f0f0',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    background: 'white',
    padding: '30px',
    borderRadius: '8px',
    width: '400px',
  },
  title: { fontSize: '24px', marginBottom: '8px' },
  subtitle: { fontSize: '18px', marginBottom: '16px' },
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
  button: {
    width: '100%',
    padding: '10px',
    background: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  error: { color: 'red', marginBottom: '10px', fontSize: '14px' },
  toggle: { color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' },
}

export default Auth