import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
    return (
        <div className="not-found" id="not-found-page">
            <div className="not-found__inner container">
                <div className="not-found__code">404</div>
                <h1 className="not-found__title">Page Not Found</h1>
                <p className="not-found__desc">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/" className="btn btn--primary" id="not-found-btn">
                    Back to Home
                    <span className="btn__arrow">→</span>
                </Link>
            </div>
        </div>
    )
}

export default NotFound
