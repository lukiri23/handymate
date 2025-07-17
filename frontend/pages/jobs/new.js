import { useState } from 'react'
import { useRouter } from 'next/router'

export default function NewJobPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await fetch('http://localhost:5000/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, user_id: 1 }), 
    })
    if (res.ok) router.push('/jobs')
    else alert('Napaka pri dodajanju')
  }

  return (
    <div>
      <h1>Dodaj novo težavo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Naslov</label><br/>
          <input value={title} onChange={e => setTitle(e.target.value)} required/>
        </div>
        <div>
          <label>Opis</label><br/>
          <textarea value={description} onChange={e => setDescription(e.target.value)} required/>
        </div>
        <button type="submit">Pošlji</button>
      </form>
    </div>
  )
}
