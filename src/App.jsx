import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Posts from './pages/Posts.jsx'
import Users from './pages/Users.jsx'
import { ToastProvider, ToastViewport } from './components/Toast.jsx'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('auth_token')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

function AppShell() {
  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderBottom: '1px solid #e5e5e5',
  }

  const navStyle = { display: 'flex', gap: 12 }

  return (
    <div>
      <header style={headerStyle}>
        <strong>Mini Blog Admin</strong>
        <nav style={navStyle}>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/users">Users</Link>
        </nav>
      </header>
      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                <Posts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </main>
      <ToastViewport />
    </div>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </ToastProvider>
  )
}
