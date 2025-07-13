import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/users/register', form)
      router.push('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Napaka pri registraciji')
    }
  }

  return (
    <div className="container mt-5">
      <h2>Registracija</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Ime</label>
          <input name="name" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input name="email" type="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Geslo</label>
          <input name="password" type="password" className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Registriraj se</button>
      </form>
    </div>
  )
}
