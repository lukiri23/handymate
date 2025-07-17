import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function JobDetail() {
  const router = useRouter()
  const { id } = router.query           
  const [job, setJob] = useState(null)  
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return                     
    fetch(`http://localhost:5000/api/jobs/${id}`)
      .then(res => res.json())
      .then(data => {
        setJob(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p>Nalagam…</p>
  if (!job)   return <p>Težava ni najdena.</p>

  return (
    <div className="container mt-5">
      <h1>{job.title}</h1>
      <p><strong>Opis:</strong> {job.description}</p>
      <p><strong>Stanje:</strong> {job.status}</p>
      <p><strong>Dodano:</strong> {new Date(job.created_at).toLocaleString()}</p>
    </div>
  )
}
