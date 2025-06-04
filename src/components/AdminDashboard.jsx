import { useEffect, useState } from 'react'

function AdminDashboard() {
  const [counts, setCounts] = useState({})

  useEffect(() => {
    async function fetchCounts() {
      const res = await fetch('/api/cards/all')
      if (res.ok) {
        const data = await res.json()
        setCounts(data)
      }
    }
    fetchCounts()
  }, [])

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Admin Dashboard</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2 text-left">Card</th>
            <th className="border p-2 text-left">Downloads</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(counts).map(([id, count]) => (
            <tr key={id}>
              <td className="border p-2">{id}</td>
              <td className="border p-2">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminDashboard
