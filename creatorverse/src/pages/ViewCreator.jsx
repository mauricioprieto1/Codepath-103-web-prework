import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../client'

export default function ViewCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [creator, setCreator] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCreator() {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)   // id comes from the URL like /creators/123
        .single()

      if (error) setError(error.message)
      else setCreator(data)

      setLoading(false)
    }
    fetchCreator()
  }, [id])

  if (loading) return <main><p>Loading…</p></main>
  if (error) return <main><p role="alert">Error: {error}</p></main>
  if (!creator) return <main><p>Creator not found.</p></main>

  return (
    <main className="detail">
      <img
        src={creator.image_url || `https://picsum.photos/seed/${id}/960/540`}
        alt={creator.name}
      />
      <h1>{creator.name}</h1>
      <p className="desc">{creator.description}</p>
      <p>
        <a href={creator.url} target="_blank" rel="noreferrer">{creator.url}</a>
      </p>

      <div className="actions">
        <Link to={`/creators/${id}/edit`} className="btn">Edit</Link>
        <button className="btn secondary" onClick={() => navigate(-1)}>Back</button>
      </div>
    </main>
  )
}
