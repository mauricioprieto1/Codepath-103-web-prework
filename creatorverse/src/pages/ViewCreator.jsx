import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../client'


export default function ViewCreator() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [creator, setCreator] = useState(null)
    const [error, setError] = useState(null)


    useEffect(() => {
        async function fetchCreator() {
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single()
            if (error) setError(error.message)
            else setCreator(data)
        }
        fetchCreator()
    }, [id])


    if (error) return <p role="alert">Error: {error}</p>
    if (!creator) return <p>Loading…</p>


    return (
    <main className="detail">
        <img src={creator.image_url || `https://picsum.photos/seed/${id}/960/540`} alt={creator.name} />
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