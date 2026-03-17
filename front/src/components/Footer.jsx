import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="footer" id="main-footer">
            <div className="footer__glow"></div>
            <div className="footer__inner container">
                <p className="footer__copy">&copy; {year} CHMSU iReply CMS. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
