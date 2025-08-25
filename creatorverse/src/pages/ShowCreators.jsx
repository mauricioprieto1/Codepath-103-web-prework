import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import CreatorCard from '../components/CreatorCard'
import { sampleCreators } from '../seedCreators'


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
            
            if (error) {
                setError(error.message)
                setLoading(false)
                return
            }
            
            // If no creators found, seed the database with sample creators
            if (!data || data.length === 0) {
                console.log('No creators found, seeding database...')
                const { data: seededData, error: seedError } = await supabase
                    .from('creators')
                    .insert(sampleCreators)
                    .select()
                
                if (seedError) {
                    setError('Error seeding database: ' + seedError.message)
                } else {
                    setCreators(seededData || [])
                    console.log('Database seeded successfully with sample creators')
                }
            } else {
                setCreators(data)
            }
            
            setLoading(false)
        }
        fetchCreators()
    },[])
    return ( 
        <main>
            <div className="hero">
                <h1>Creator Verse</h1>
                <p>Discover and share your favorite content creators across the digital universe.</p>
                <Link to="/creators/new" className="btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Creator
                </Link>
            </div>
            
            {loading && <div className="loading">Loading</div>}
            {error && <p role="alert">Error: {error}</p>}

            {!loading && !error && (creators.length === 0 ? (
                <div style={{textAlign: 'center', padding: '40px 0'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} style={{opacity: 0.6, margin: '0 auto', display: 'block'}}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                    <p style={{marginTop: '20px'}}>No creators yet. Click <strong>Add Creator</strong> to create the first one.</p>
                </div>
            ) : (
                <>
                    <h2 style={{margin: '40px 0 20px', fontSize: '1.75rem'}}>Featured Creators</h2>
                    <div className="grid">
                        {creators.map(c => <CreatorCard key={c.id} creator={c}/>)}
                    </div>
                </>
            ))}
        </main>
    )
}