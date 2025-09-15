const BASE_URL = 'https://jsonplaceholder.typicode.com'

export async function get(path) {
  const url = `${BASE_URL}${path}`
  const res = await fetch(url)
  if (!res.ok) {
    let body = ''
    try {
      body = await res.text()
    } catch {}
    throw new Error(`GET ${url} failed: ${res.status} ${res.statusText} ${body}`)
  }
  return res.json()
}
