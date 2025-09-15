import { useEffect, useMemo, useState } from 'react'
import { get } from '../lib/api.js'
import Drawer from '../components/Drawer.jsx'
import { downloadCsv } from '../lib/csv.js'
import { useToast } from '../components/Toast.jsx'

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(null)
  const toast = useToast()

  useEffect(() => {
    get('/posts').then(setPosts).catch(console.error)
  }, [])

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase()
    if (!q) return posts
    return posts.filter((p) => p.title.toLowerCase().includes(q))
  }, [posts, filter])

  function exportCsv() {
    const columns = [
      { key: 'id', header: 'id' },
      { key: 'title', header: 'title' },
      { key: 'body', header: 'body' },
      { key: 'userId', header: 'userId' },
    ]
    downloadCsv(filtered, columns, 'posts.csv')
    toast.show('Exported CSV')
  }

  return (
    <div>
      <h1>Posts</h1>
      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Filter by title
          <input
            placeholder="Filter by title"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </label>
        <button onClick={exportCsv}>Export CSV</button>
      </div>
      <table role="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>ID</th>
            <th style={{ textAlign: 'left' }}>Title</th>
            <th style={{ textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>
                <button onClick={() => setSelected(post)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `Post #${selected.id}` : 'Post'}
      >
        {selected && (
          <div>
            <p>
              <strong>Title:</strong> {selected.title}
            </p>
            <p>
              <strong>Body:</strong> {selected.body}
            </p>
            <p>
              <strong>User ID:</strong> {selected.userId}
            </p>
          </div>
        )}
      </Drawer>
    </div>
  )
}
