import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="footer" id="main-footer">
            <div className="footer__glow"></div>
            <div className="footer__inner container">
                <div className="footer__top">
                    <div className="footer__brand">
                        <Link to="/" className="footer__logo">
                            <span className="footer__logo-icon">⚡</span>
                            <span className="footer__logo-text">PyCast</span>
                        </Link>
                        <p className="footer__tagline">
                            Building the future with modern web technology.
                        </p>
                    </div>

                    <div className="footer__links-group">
                        <h4 className="footer__heading">Navigation</h4>
                        <ul className="footer__links">
                            <li><Link to="/" className="footer__link" id="footer-link-home">Home</Link></li>
                            <li><Link to="/about" className="footer__link" id="footer-link-about">About</Link></li>
                        </ul>
                    </div>

                    <div className="footer__links-group">
                        <h4 className="footer__heading">Resources</h4>
                        <ul className="footer__links">
                            <li><a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="footer__link">React</a></li>
                            <li><a href="https://expressjs.com" target="_blank" rel="noopener noreferrer" className="footer__link">Express</a></li>
                            <li><a href="https://www.mongodb.com" target="_blank" rel="noopener noreferrer" className="footer__link">MongoDB</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p className="footer__copy">&copy; {year} PyCast. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
