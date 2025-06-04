import { useEffect, useRef, useState } from 'react'
import { toPng } from '../utils/toPng'

import birthdayImg from '../assets/templates/birthday.svg'
import congratsImg from '../assets/templates/congrats.svg'
import holidayImg from '../assets/templates/holiday.svg'

function CardViewer() {

  const templates = {
    birthday: birthdayImg,
    congrats: congratsImg,
    holiday: holidayImg,
  }
  const cardRef = useRef(null)
  const [message, setMessage] = useState('')
  const [template, setTemplate] = useState('birthday')
  const [count, setCount] = useState(0)
  const cardId = `${template}:${message}`

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const m = params.get('message')
    const t = params.get('template')
    if (m) setMessage(m)
    if (t && templates[t]) setTemplate(t)
  }, [])

  useEffect(() => {
    async function fetchCount() {
      const res = await fetch(`/api/cards/${encodeURIComponent(cardId)}/count`)
      if (res.ok) {
        const data = await res.json()
        setCount(data.count)
      }
    }
    fetchCount()
  }, [cardId])

  const handleDownload = async () => {
    if (!cardRef.current) return
    try {
      await fetch(`/api/cards/${encodeURIComponent(cardId)}/increment`, {
        method: 'POST',
      })
      const res = await fetch(`/api/cards/${encodeURIComponent(cardId)}/count`)
      if (res.ok) {
        const data = await res.json()
        setCount(data.count)
      }
      const dataUrl = await toPng(cardRef.current)
      const link = document.createElement('a')
      link.download = 'card.png'
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Failed to export image', err)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Card Viewer</h1>
      <div ref={cardRef} className="border rounded overflow-hidden relative">
        <img src={templates[template]} alt={template} className="w-full h-auto" />
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
          {message || 'Your message here'}
        </div>
      </div>
      <div className="mt-4 flex flex-col items-start gap-2">
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleDownload}
        >
          Download PNG
        </button>
        <div className="text-sm text-gray-700">Downloads: {count}</div>
      </div>

    </div>
  )
}

export default CardViewer
