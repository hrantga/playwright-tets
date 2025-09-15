import { Link, useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  function logout() {
    localStorage.removeItem('auth_token')
    navigate('/login', { replace: true })
  }
  return (
    <div>
      <h1>Welcome, Demo User!</h1>
      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        <Link to="/posts">Go to Posts</Link>
        <Link to="/users">Go to Users</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}
