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

  if (loading) return <main className="detail"><div className="loading">Loading</div></main>
  if (error) return <main className="detail"><p role="alert">Error: {error}</p></main>
  if (!creator) return <main className="detail"><p>Creator not found.</p></main>

  return (
    <main className="detail">
      <button className="btn back-button" onClick={() => navigate(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>
      
      <div className="creator-header">
        <img
          className="creator-image"
          src={creator.image_url || `https://picsum.photos/seed/${id}/960/540`}
          alt={creator.name}
        />
        
        <div className="creator-info">
          <h1>{creator.name}</h1>
          <a href={creator.url} target="_blank" rel="noreferrer" className="creator-url">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            {creator.url}
          </a>
        </div>
      </div>
      
      <div className="creator-description">
        <h2>About this Creator</h2>
        <p>{creator.description}</p>
      </div>

      <div className="actions">
        <Link to={`/creators/${id}/edit`} className="btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Creator
        </Link>
      </div>
    </main>
  )
}
