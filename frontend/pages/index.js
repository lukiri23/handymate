import { useEffect, useState } from 'react'

export default function Home() {
  
  const [jobs, setJobs] = useState([])

  
  useEffect(() => {
    fetch('http://localhost:5000/api/jobs')
      .then(res => res.json())       
      .then(data => setJobs(data))   
      .catch(err => console.error(err))
  }, []) 

  return (
    <div className="container mt-5">
      <h1>Seznam težav</h1>

      {}
      {jobs.length === 0 ? (
        <p>Trenutno ni nobene težave.</p>
      ) : (
        
        <ul>
          {jobs.map(job => (
            <li key={job.id}>{job.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
