import { Link } from 'react-router-dom'

export default function CreatorCard({ creator }) {
    const { id, name, url, description, image_url } = creator
    return (
        <article className="card">
            <Link to={`/creators/${id}`} className="cardm-media">
                <img src={image_url || `https://picsum.photos/seed/${id}/640/360`} alt={name} />
            </Link>
            <div className="card-body">
                <h3><Link to={`/creators/${id}`}>{name}</Link></h3>
                <p className="desc">{description}</p>
                <div className="actions">
                <a href={url} target="_blank" rel="noreferrer">Visit</a>
                <Link to={`/creators/${id}/edit`}>Edit</Link>
                </div>
            </div>
        </article>
    )
}