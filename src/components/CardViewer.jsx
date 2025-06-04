import { useEffect, useState } from 'react'
import supabase from '../utils/supabaseClient.js'
import birthdayImg from '../assets/templates/birthday.svg'
import congratsImg from '../assets/templates/congrats.svg'
import holidayImg from '../assets/templates/holiday.svg'

function CardViewer({ id }) {
  const templates = {
    birthday: birthdayImg,
    congrats: congratsImg,
    holiday: holidayImg,
  }
  const [card, setCard] = useState(null)

  useEffect(() => {
    async function fetchCard() {
      const { data, error } = await supabase
        .from('cards')
        .select('id, message, template, placeholder_settings, download_count')
        .eq('id', id)
        .single()
      if (error) {
        console.error('Failed to load card', error)
        return
      }
      setCard(data)
    }
    fetchCard()
  }, [id])

  if (!card) {
    return <div className="p-4 text-center">Loading...</div>
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Your Card</h1>
      <div className="border rounded overflow-hidden relative">
        <img
          src={templates[card.template]}
          alt={card.template}
          className="w-full h-auto"
        />
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
          {card.message}
        </div>
      </div>
    </div>
  )
}

export default CardViewer
