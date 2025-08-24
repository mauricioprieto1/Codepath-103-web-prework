import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'

export default function AddCreator() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ name: '', url: '', description:'', image_url: ''})
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState(null)

    function onChange(e) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value}))
    }

    async function onSubmit(e) {
        e.preventDefault()
        setSaving(true); setError(null)
        const { data, error } = await supabase
            .from('creators')
            .insert([form])
            .select()
            .single()
        setSaving(false)
        if (error) setError(error.message)
        else navigate(`/creators/${data.id}`)
    }
    return (
        <main>
            <h1>Add Creator</h1>
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
                <button className="btn" disabled={saving}>{saving ? 'Saving…' : 'Create'}</button>
            </form>
        </main>
    )
}