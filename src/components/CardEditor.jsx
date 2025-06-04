import { useState } from 'react'
import birthdayImg from '../assets/templates/birthday.svg'
import congratsImg from '../assets/templates/congrats.svg'
import holidayImg from '../assets/templates/holiday.svg'

function CardEditor() {
  const templates = [
    { id: 'birthday', label: 'Birthday', src: birthdayImg },
    { id: 'congrats', label: 'Congrats', src: congratsImg },
    { id: 'holiday', label: 'Holiday', src: holidayImg },
  ]

  const [message, setMessage] = useState('')
  const [template, setTemplate] = useState(templates[0].id)

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Card Editor</h1>
      <div className="mb-4">
        <label className="block mb-1 font-semibold" htmlFor="message">Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border rounded p-2"
          rows="4"
        />
      </div>
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
      <h2 className="text-xl font-bold mb-2">Preview</h2>
      <div className="border rounded overflow-hidden relative">
        <img
          src={templates.find((t) => t.id === template).src}
          alt={template}
          className="w-full h-auto"
        />
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
          {message || 'Your message here'}
        </div>
      </div>
    </div>
  )
}

export default CardEditor
