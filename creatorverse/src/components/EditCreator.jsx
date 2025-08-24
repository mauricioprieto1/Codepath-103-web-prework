import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../client'


export default function EditCreator() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState({ name: '', url: '', description: '', image_url: '' })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState(null)


    useEffect(() => {
        async function load() {
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single()
            if (error) setError(error.message)
            else setForm({
                name: data?.name ?? '',
                url: data?.url ?? '',
                description: data?.description ?? '',
                image_url: data?.image_url ?? ''
            })
            setLoading(false)
        }
        load()
    }, [id])


    function onChange(e) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }


    async function onSubmit(e) {
        e.preventDefault()
        setSaving(true); setError(null)
        const { error } = await supabase
            .from('creators')
            .update(form)
            .eq('id', id)
        setSaving(false)
        if (error) setError(error.message)
        else navigate(`/creators/${id}`)
    }


    async function onDelete() {
        const yes = window.confirm('Delete this creator? This cannot be undone.')
        if (!yes) return
        const { error } = await supabase.from('creators').delete().eq('id', id)
        if (error) setError(error.message)
        else navigate('/')
    }


    if (loading) return <p>Loading…</p>


    return (
        <main>
            <h1>Edit Creator</h1>
            <form onSubmit={onSubmit} className="form">
                <label>
                    Name
                    <input name="name" value={form.name} onChange={onChange} required />
                </label>
                <label>
                    URL
                    <input type="url" name="url" value={form.url} onChange={onChange} required />
                </label>
                <label>
                    Description
                    <textarea name="description" value={form.description} onChange={onChange} required />
                </label>
                <label>
                    Image URL (optional)
                    <input type="url" name="image_url" value={form.image_url} onChange={onChange} />
                </label>
                {error && <p role="alert">Error: {error}</p>}
                <div className="actions">
                    <button className="btn" disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</button>
                    <button type="button" className="btn danger" onClick={onDelete}>Delete</button>
                </div>
            </form>
        </main>
    )
}