import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function JobsList() {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/jobs')
      .then(res => setJobs(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="container mt-5">
      <h2>Seznam težav</h2>
      <Link href="/jobs/create"><a className="btn btn-success mb-3">Dodaj novo težavo</a></Link>
      {jobs.map(job => (
        <div key={job.id} className="card mb-2">
          <div className="card-body">
            <h5 className="card-title">{job.title}</h5>
            <p className="card-text">{job.description}</p>
            <Link href={`/jobs/${job.id}`}><a className="btn btn-primary">Več</a></Link>
          </div>
        </div>
      ))}
    </div>
  )
}
