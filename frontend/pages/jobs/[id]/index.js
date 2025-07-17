import Link from 'next/link'

export default function JobDetail({ job }) {
  return (
    <div>
      <h1>{job.title}</h1>
      <p>Status: {job.status}</p>
      <p>Opis: {job.description}</p>
      <Link href="/jobs">← Nazaj na seznam</Link>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const { id } = params
  const res = await fetch(`http://localhost:5000/api/jobs/${id}`)
  if (res.status !== 200) {
    return { notFound: true }
  }
  const job = await res.json()
  return { props: { job } }
}
