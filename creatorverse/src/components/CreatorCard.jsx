import { Link } from 'react-router-dom'

export default function CreatorCard({ creator }) {
    if (!creator) return null
    const img = (image_url && image_url.trim()) || `https://picsum.photos/seed/${id || name}/640/360`

    const { id, name, url, description, image_url } = creator
    return (
    <article className="card">
      <Link to={id ? `/creators/${id}` : '#'} aria-label={`View ${name}`}>
        <img src={img} alt={name} />
      </Link>

      <div className="card-body">
        <h3>
          {id ? <Link to={`/creators/${id}`}>{name}</Link> : name}
        </h3>
        <p className="desc">{description}</p>

        <div className="actions">
          <a href={url} target="_blank" rel="noreferrer">Visit</a>
          {id && <Link to={`/creators/${id}/edit`}>Edit</Link>}
        </div>
      </div>
    </article>
  )
}