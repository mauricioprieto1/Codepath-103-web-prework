import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'

export default function AddCreator() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    url: '',
    description: '',
    image_url: '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  function onChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function normalizeUrl(raw) {
    const v = raw.trim()
    if (!v) return v
    // basic normalization so links work if the user omits the scheme
    if (!/^https?:\/\//i.test(v)) return 'https://' + v
    return v
  }

  async function onSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload = {
      name: form.name.trim(),
      url: normalizeUrl(form.url),
      description: form.description.trim(),
      image_url: form.image_url.trim() || null, // optional
    }

    const { data, error } = await supabase
      .from('creators')
      .insert([payload])
      .select()
      .single()

    setSaving(false)

    if (error) {
      setError(error.message)
      return
    }

    // go to the detail page of the new row
    navigate(`/creators/${data.id}`)
  }

  return (
    <main>
      <h1>Add Creator</h1>
      <form onSubmit={onSubmit} className="form">
        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            required
            placeholder="e.g., Fireship"
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
            placeholder="e.g., https://youtube.com/@Fireship"
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            required
            placeholder="Why should people follow them?"
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

        <button className="btn" disabled={saving}>
          {saving ? 'Saving…' : 'Create'}
        </button>
      </form>
    </main>
  )
}
