function escapeCsvValue(value) {
  if (value === null || value === undefined) return ''
  const str = String(value)
  if (/[",\n]/.test(str)) {
    return '"' + str.replace(/"/g, '""') + '"'
  }
  return str
}

export function toCsvString(rows, columns) {
  const header = columns.map((c) => c.header).join(',')
  const lines = rows.map((row) => columns.map((c) => escapeCsvValue(row[c.key])).join(','))
  return [header, ...lines].join('\n')
}

export function downloadCsv(rows, columns, filename = 'export.csv') {
  const csv = toCsvString(rows, columns)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  setTimeout(() => {
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, 0)
  return csv
}
