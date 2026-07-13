import { useState, useEffect } from 'react'
import Auth from './components/Auth.jsx'
import Snippets from './components/Snippets.jsx'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <div>
      {token
        ? <Snippets token={token} onLogout={handleLogout} />
        : <Auth onLogin={handleLogin} />
      }
    </div>
  )
}

export default App