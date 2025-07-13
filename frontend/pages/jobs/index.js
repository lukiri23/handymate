

import Link from 'next/link'

export default function JobsPage({ jobs }) {
  return (
    <div>
      <h1>Seznam težav</h1>
      {jobs.length === 0 ? (
        <p>Ni nobenih težav.</p>
      ) : (
        <ul>
          {jobs.map(job => (
            <li key={job.id}>
              <Link href={`/jobs/${job.id}`}>
                {job.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}


export async function getServerSideProps() {
  const res = await fetch('http://localhost:5000/api/jobs')
  const jobs = await res.json()

  return {
    props: { jobs }, 
  }
}
