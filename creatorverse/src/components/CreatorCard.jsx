import { Link } from 'react-router-dom'

export default function CreatorCard({ creator }) {
    if (!creator) return null
    const { id, name, url, description, image_url } = creator
    const img = (image_url && image_url.trim()) || `/src/assets/jeff.jpg` || `https://picsum.photos/seed/${id || name}/640/360`
    
    return (
    <article className="card">
      <Link to={id ? `/creators/${id}` : '#'} aria-label={`View ${name}`} className="card-image-link">
        <img src={img} alt={name} />
        <div className="card-overlay">
          <span className="view-details">View Details</span>
        </div>
      </Link>

      <div className="card-body">
        <h3>
          {id ? <Link to={`/creators/${id}`}>{name}</Link> : name}
        </h3>
        <p className="desc">{description}</p>

        <div className="actions">
          <a href={url} target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{marginRight: '4px'}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Visit
          </a>
          {id && (
            <Link to={`/creators/${id}/edit`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{marginRight: '4px'}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}