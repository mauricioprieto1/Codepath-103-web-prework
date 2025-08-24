import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { supabase } from '../client'

export default function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    url: '',
    description: '',
    image_url: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)   // id from /creators/:id/edit
        .single()

      if (error) setError(error.message)
      else if (data) {
        setForm({
          name: data.name ?? '',
          url: data.url ?? '',
          description: data.description ?? '',
          image_url: data.image_url ?? ''
        })
      }
      setLoading(false)
    }
    load()
  }, [id])

  function onChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function normalizeUrl(raw) {
    const v = raw.trim()
    if (!v) return v
    return /^https?:\/\//i.test(v) ? v : 'https://' + v
  }

  async function onSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload = {
      name: form.name.trim(),
      url: normalizeUrl(form.url),
      description: form.description.trim(),
      image_url: (form.image_url || '').trim() || null
    }

    const { error } = await supabase
      .from('creators')
      .update(payload)
      .eq('id', id)

    setSaving(false)

    if (error) setError(error.message)
    else navigate(`/creators/${id}`)
  }
    async function onDelete() {
    const yes = window.confirm('Delete this creator? This cannot be undone.')
    if (!yes) return

    const { error } = await supabase
        .from('creators')
        .delete()
        .eq('id', id)

    if (error) {
        setError(error.message)
        return
    }
    navigate('/') // go home after delete
    }
  if (loading) return <main><p>Loading…</p></main>

  return (
    <main>
      <h1>Edit Creator</h1>
      <form onSubmit={onSubmit} className="form">
        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            required
            placeholder="Creator name"
          />
        </label>

        <label>
          URL
          <input
            type="url"
            name="url"
            value={form.url}
            onChange={onChange}
            required
            placeholder="https://…"
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            required
            rows={4}
          />
        </label>

        <label>
          Image URL (optional)
          <input
            type="url"
            name="image_url"
            value={form.image_url}
            onChange={onChange}
            placeholder="https://…"
          />
        </label>

        {error && <p role="alert">Error: {error}</p>}

        <div className="actions">
          <button className="btn" disabled={saving}>
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
          <Link to={`/creators/${id}`} className="btn secondary">Cancel</Link>
          <button type="button" className="btn danger" onClick={onDelete}>
            Delete
            </button>
        </div>
      </form>
    </main>
  )
}
