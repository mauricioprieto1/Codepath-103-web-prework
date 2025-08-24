import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import CreatorCard from '../components/CreatorCard'


export default function ShowCreators() {
    const [creators, setCreators] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchCreators() {
            setLoading(true)
            setError(null)
            const {data, error } = await supabase
                .from('creators')
                .select('*')
                .order('id', {ascending: true })
            if (error) setError(error.message)
            else setCreators(data || [])
            setLoading(false)
        }
        fetchCreators()
    },[])
    return ( 
        <main>
            <div className="hero" style={{ marginBottom: 16}}>
                <h1>Creator Verse</h1>
                <p>Share your favorite creators and manage your list.</p>
                <Link to="/creators/new" className="btn">Add Creators</Link>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p role="alert">Error: {error}</p>}

            {!loading && !error && (creators.length === 0 ? (
                <p>No creators yet. Click <strong>Add Creator</strong> to create the first one.</p>
            ) : (
                <div className="grid">
                    {creators.map(c => <CreatorCard key={c.id} creator={c}/>)}
                </div>
            ))}
        </main>
    )
}