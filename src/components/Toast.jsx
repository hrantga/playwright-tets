import { createContext, useContext, useMemo, useState, useCallback } from 'react'

const ToastContext = createContext({ show: () => {} })

export function ToastProvider({ children }) {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)

  const show = useCallback((text) => {
    setMessage(String(text))
    setVisible(true)
    window.clearTimeout(window.__toastTimer)
    window.__toastTimer = window.setTimeout(() => setVisible(false), 1200)
  }, [])

  const api = useMemo(() => ({ show }), [show])

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        role="status"
        aria-live="polite"
        style={{
          position: 'fixed',
          left: '50%',
          bottom: 24,
          transform: 'translateX(-50%)',
          background: '#333',
          color: '#fff',
          padding: '8px 12px',
          borderRadius: 6,
          boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
          opacity: visible ? 1 : 0,
          pointerEvents: 'none',
          transition: 'opacity 160ms ease-in-out',
          fontSize: 14,
          zIndex: 1000,
        }}
      >
        {message}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}

export function ToastViewport() {
  return null
}
