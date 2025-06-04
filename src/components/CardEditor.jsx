import { useState } from 'react'

function CardEditor() {
  const [message, setMessage] = useState('')
  const [template, setTemplate] = useState('birthday')

  const templateStyles = {
    birthday: 'bg-pink-200',
    congrats: 'bg-green-200',
    holiday: 'bg-red-200',
  }

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
          <option value="birthday">Birthday</option>
          <option value="congrats">Congrats</option>
          <option value="holiday">Holiday</option>
        </select>
      </div>
      <h2 className="text-xl font-bold mb-2">Preview</h2>
      <div className={`border rounded p-6 min-h-[150px] flex items-center justify-center text-xl font-bold ${templateStyles[template]}`}>{message || 'Your message here'}</div>
    </div>
  )
}

export default CardEditor
