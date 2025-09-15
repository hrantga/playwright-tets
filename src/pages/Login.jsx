import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../components/Toast.jsx'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate])

  function handleSubmit(e) {
    e.preventDefault()
    if (username === 'demo' && password === 'pass123') {
      localStorage.setItem('auth_token', 'demo-token')
      toast.show('Logged in')
      navigate('/dashboard', { replace: true })
    } else {
      setError('Invalid credentials')
    }
  }

  const formStyle = { maxWidth: 360, margin: '40px auto', display: 'grid', gap: 12 }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} aria-label="Login form" style={formStyle}>
        <label>
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="demo"
            name="username"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="pass123"
            name="password"
          />
        </label>
        <button type="submit">Login</button>
        {error ? (
          <div role="alert" style={{ color: 'crimson' }}>
            {error}
          </div>
        ) : null}
      </form>
    </div>
  )
}
