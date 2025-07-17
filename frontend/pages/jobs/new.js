import { useState } from 'react'
import { useRouter } from 'next/router'

export default function NewJobPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    if (!title || !description) {
      setError('Izpolni še vsa polja.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, user_id: 1 }) 
      })
      if (!res.ok) throw new Error('Napaka na strežniku')
      const job = await res.json()
      router.push(`/jobs/${job.id}`)  // preusmeri na novo ustvarjeno težavo
    } catch (err) {
      console.error(err)
      setError('Uspešno ustvarjanje ni uspelo.')
      setLoading(false)
    }
  }

  return (
    <div className="container mt-5">
      <h1>Dodaj novo težavo</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Naslov</label>
          <input
            className="form-control"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Opis</label>
          <textarea
            className="form-control"
            rows="5"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Počakaj…' : 'Ustvari'}
        </button>
      </form>
    </div>
  )
}
