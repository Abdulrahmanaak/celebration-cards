import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

function AdminDashboard() {
  const [isAuthed, setIsAuthed] = useState(
    sessionStorage.getItem('adminAuthed') === 'true'
  )
  const [password, setPassword] = useState('')
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAuthed) return
    const fetchCards = async () => {
      setLoading(true)
      const { data } = await supabase
        .from('cards')
        .select('id, message, template, download_count')
        .order('id', { ascending: true })
      if (data) setCards(data)
      setLoading(false)
    }
    fetchCards()
  }, [isAuthed])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      sessionStorage.setItem('adminAuthed', 'true')
      setIsAuthed(true)
    } else {
      alert('Invalid password')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this card?')) return
    await supabase.from('cards').delete().eq('id', id)
    setCards((prev) => prev.filter((c) => c.id !== id))
  }

  if (!isAuthed) {
    return (
      <form onSubmit={handleLogin} className="p-4">
        <input
          type="password"
          className="border p-2 mr-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    )
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Message</th>
              <th className="p-2">Template</th>
              <th className="p-2">Downloads</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <tr key={card.id} className="border-b">
                <td className="p-2">{card.message}</td>
                <td className="p-2">{card.template}</td>
                <td className="p-2 text-center">{card.download_count}</td>
                <td className="p-2 text-right">
                  <button
                    onClick={() => handleDelete(card.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminDashboard
