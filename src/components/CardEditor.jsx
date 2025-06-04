import { useState, useRef } from 'react'
import { toPng } from '../utils/toPng'
import supabase from '../utils/supabaseClient.js'
import birthdayImg from '../assets/templates/birthday.svg'
import congratsImg from '../assets/templates/congrats.svg'
import holidayImg from '../assets/templates/holiday.svg'

function CardEditor() {
  const templates = [
    { id: 'birthday', label: 'Birthday', src: birthdayImg },
    { id: 'congrats', label: 'Congrats', src: congratsImg },
    { id: 'holiday', label: 'Holiday', src: holidayImg },
  ]

  const [template, setTemplate] = useState(templates[0].id)
  const [cardId, setCardId] = useState(null)

  const cardRef = useRef(null)

  const handleAdd = () => {
    setPlaceholders((prev) => [
      ...prev,
      {
        id: Date.now(),
        x: 100,
        y: 100,
        text: 'Text',
        font: 'Arial',
        size: 24,
        color: '#000000',
      },
    ])
  }

  const handlePointerDown = (e, idx) => {
    const rect = e.target.getBoundingClientRect()
    setDragging({
      idx,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    })
    e.target.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e) => {
    if (!dragging || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - dragging.offsetX
    const y = e.clientY - rect.top - dragging.offsetY
    setPlaceholders((prev) =>
      prev.map((p, i) => (i === dragging.idx ? { ...p, x, y } : p))
    )
  }

  const handlePointerUp = (e) => {
    if (dragging) {
      e.target.releasePointerCapture(e.pointerId)
      setDragging(null)
    }
  }

  const handleDownload = async () => {
    if (!cardRef.current) return
    try {
      const cardId = `${template}:${message}`
      await fetch(`/api/cards/${encodeURIComponent(cardId)}/increment`, { method: 'POST' })
      // Wait for count to be incremented before creating the PNG
      const dataUrl = await toPng(cardRef.current)
      const link = document.createElement('a')
      link.download = 'card.png'
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Failed to export image', err)
    }
  }

  const handleSave = async () => {
    const { data, error } = await supabase
      .from('cards')
      .insert({ template, message, placeholder_settings: {}, download_count: 0 })
      .select('id')
      .single()
    if (error) {
      console.error('Failed to save card', error)
      alert('Failed to save card')
      return null
    }
    setCardId(data.id)
    return data.id
  }

  const handleShare = async () => {
    let id = cardId
    if (!id) {
      id = await handleSave()
    }
    if (!id) return
    const url = `${window.location.origin}/card/${id}`
    try {
      await navigator.clipboard.writeText(url)
      alert('Link copied to clipboard!')
    } catch {
      alert(`Share this link: ${url}`)
    }
  }

  const updatePlaceholder = (idx, field, value) => {
    setPlaceholders((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, [field]: value } : p))
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Card Editor</h1>
      <div className="mb-4">
        <label className="block mb-1 font-semibold" htmlFor="template">Template</label>
        <select
          id="template"
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          className="w-full border rounded p-2"
        >
          {templates.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
      {placeholders.map((p, idx) => (
        <div key={p.id} className="mb-4 border p-2 rounded">
          <label className="block mb-1 font-semibold">Placeholder {idx + 1} Text</label>
          <input
            className="w-full border rounded p-2 mb-2"
            value={p.text}
            onChange={(e) => updatePlaceholder(idx, 'text', e.target.value)}
          />
          <label className="block mb-1 font-semibold">Font Size</label>
          <input
            type="number"
            className="w-full border rounded p-2 mb-2"
            value={p.size}
            onChange={(e) => updatePlaceholder(idx, 'size', Number(e.target.value))}
          />
          <label className="block mb-1 font-semibold">Color</label>
          <input
            type="color"
            className="w-full border rounded p-2"
            value={p.color}
            onChange={(e) => updatePlaceholder(idx, 'color', e.target.value)}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="mb-4 bg-gray-200 px-3 py-1 rounded"
      >
        Add Placeholder
      </button>
      <h2 className="text-xl font-bold mb-2">Preview</h2>
      <div ref={cardRef} className="border rounded overflow-hidden relative">
        <img
          src={templates.find((t) => t.id === template).src}
          alt={template}
          className="w-full h-auto"
        />
        {placeholders.map((p, idx) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: p.x,
              top: p.y,
              transform: 'translate(-50%, -50%)',
              fontFamily: p.font,
              fontSize: p.size,
              color: p.color,
              cursor: 'move',
            }}
            onPointerDown={(e) => handlePointerDown(e, idx)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            {p.text || `Text ${idx + 1}`}
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleDownload}
        >
          Download PNG
        </button>
        <button
          type="button"
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          onClick={handleSave}
        >
          Save Card
        </button>
        <button
          type="button"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleShare}
        >
          Share Link
        </button>
      </div>
    </div>
  )
}

export default CardEditor
