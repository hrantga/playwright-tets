import { useEffect, useMemo, useState } from 'react'
import { get } from '../lib/api.js'
import Drawer from '../components/Drawer.jsx'

export default function Users() {
  const [users, setUsers] = useState([])
  const [sortAsc, setSortAsc] = useState(false)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    get('/users').then(setUsers).catch(console.error)
  }, [])

  const sorted = useMemo(() => {
    const list = [...users]
    if (sortAsc) {
      list.sort((a, b) => a.name.localeCompare(b.name))
    }
    return list
  }, [users, sortAsc])

  return (
    <div>
      <h1>Users</h1>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setSortAsc(true)}>Sort A→Z</button>
      </div>
      <table role="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Name</th>
            <th style={{ textAlign: 'left' }}>Username</th>
            <th style={{ textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>
                <button onClick={() => setSelected(u)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? selected.name : 'User'}
      >
        {selected && (
          <div>
            <p>
              <strong>Email:</strong> {selected.email}
            </p>
            <p>
              <strong>Company:</strong> {selected.company?.name}
            </p>
          </div>
        )}
      </Drawer>
    </div>
  )
}
