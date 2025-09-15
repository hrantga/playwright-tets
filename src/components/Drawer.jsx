export default function Drawer({ open, onClose, title, children, width = 360 }) {
  if (!open) return null

  const backdropStyle = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.35)',
    zIndex: 900,
  }

  const panelStyle = {
    position: 'fixed',
    top: 0,
    right: 0,
    height: '100%',
    width,
    maxWidth: '90vw',
    background: '#fff',
    borderLeft: '1px solid #e5e5e5',
    boxShadow: '0 0 12px rgba(0,0,0,0.15)',
    zIndex: 901,
    display: 'flex',
    flexDirection: 'column',
  }

  const headerStyle = {
    padding: '12px 16px',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  return (
    <>
      <div style={backdropStyle} onClick={onClose} />
      <aside style={panelStyle} aria-label={title || 'Details panel'}>
        <div style={headerStyle}>
          <strong>{title}</strong>
          <button onClick={onClose} aria-label="Close drawer">Close</button>
        </div>
        <div style={{ padding: 16, overflow: 'auto' }}>{children}</div>
      </aside>
    </>
  )
}
