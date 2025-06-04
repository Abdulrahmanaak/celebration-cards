import { useState, useEffect, useRef } from 'react'
import birthdayImg from '../assets/templates/birthday.svg'
import congratsImg from '../assets/templates/congrats.svg'
import holidayImg from '../assets/templates/holiday.svg'

function CardViewer() {
  const templates = [
    { id: 'birthday', label: 'Birthday', src: birthdayImg },
    { id: 'congrats', label: 'Congrats', src: congratsImg },
    { id: 'holiday', label: 'Holiday', src: holidayImg },
  ]

  const cardRef = useRef(null)
  const [cardData, setCardData] = useState(null)
  const [values, setValues] = useState([])

  useEffect(() => {
    const id = window.location.pathname.split('/card/')[1]
    const stored = localStorage.getItem(`card-${id}`)
    if (stored) {
      const data = JSON.parse(stored)
      setCardData(data)
      setValues(data.placeholders.map((p) => p.text))
    }
  }, [])

  if (!cardData) {
    return <div className="p-4 text-center">Card not found.</div>
  }

  const handleChange = (idx, val) => {
    setValues((prev) => prev.map((v, i) => (i === idx ? val : v)))
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Your Card</h1>
      <div ref={cardRef} className="border rounded overflow-hidden relative mb-4">
        <img
          src={templates.find((t) => t.id === cardData.template).src}
          alt={cardData.template}
          className="w-full h-auto"
        />
        {cardData.placeholders.map((p, idx) => (
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
              pointerEvents: 'none',
            }}
          >
            {values[idx] || p.text}
          </div>
        ))}
      </div>
      {cardData.placeholders.map((p, idx) => (
        <div key={p.id} className="mb-2">
          <label className="block mb-1 font-semibold">Text {idx + 1}</label>
          <input
            value={values[idx]}
            onChange={(e) => handleChange(idx, e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
      ))}
    </div>
  )
}

export default CardViewer
