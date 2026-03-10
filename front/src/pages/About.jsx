import './About.css'

function About() {
    const techStack = [
        { name: 'MongoDB', version: 'v7+', color: '#00ED64', desc: 'NoSQL Document Database' },
        { name: 'Express.js', version: 'v5+', color: '#ffffff', desc: 'Node.js Web Framework' },
        { name: 'React', version: 'v19+', color: '#61DAFB', desc: 'UI Component Library' },
        { name: 'Node.js', version: 'v20+', color: '#68A063', desc: 'JavaScript Runtime' },
    ]

    return (
        <div className="about" id="about-page">
            <section className="about__hero section">
                <div className="container">
                    <p className="about__label animate-fade-in-up">About the Project</p>
                    <h1 className="about__title animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        Built with the <span className="text-gradient">MERN Stack</span>
                    </h1>
                    <p className="about__desc animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        PyCast is a full-stack JavaScript application that leverages the MERN stack
                        to deliver a fast, scalable, and maintainable web experience.
                    </p>
                </div>
            </section>

            <section className="stack section" id="stack-section">
                <div className="container">
                    <div className="stack__grid">
                        {techStack.map((tech, index) => (
                            <div
                                className="stack-card glass animate-fade-in-up"
                                key={tech.name}
                                style={{ animationDelay: `${0.1 * index}s` }}
                                id={`stack-card-${index}`}
                            >
                                <div className="stack-card__indicator" style={{ background: tech.color }}></div>
                                <div className="stack-card__content">
                                    <div className="stack-card__header">
                                        <h3 className="stack-card__name">{tech.name}</h3>
                                        <span className="stack-card__version">{tech.version}</span>
                                    </div>
                                    <p className="stack-card__desc">{tech.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="structure section" id="structure-section">
                <div className="container">
                    <h2 className="structure__title">
                        Project <span className="text-gradient">Structure</span>
                    </h2>
                    <div className="structure__layout">
                        <div className="structure__block glass">
                            <div className="structure__block-header">
                                <span className="structure__block-icon">📁</span>
                                <h3>front/</h3>
                            </div>
                            <ul className="structure__list">
                                <li><code>src/components/</code> — Reusable UI components</li>
                                <li><code>src/pages/</code> — Route-level page views</li>
                                <li><code>src/api/</code> — Axios API layer</li>
                                <li><code>src/assets/</code> — Static assets</li>
                            </ul>
                        </div>
                        <div className="structure__block glass">
                            <div className="structure__block-header">
                                <span className="structure__block-icon">📁</span>
                                <h3>backend/</h3>
                            </div>
                            <ul className="structure__list">
                                <li><code>server.js</code> — Express server entry</li>
                                <li><code>routes/</code> — API route handlers</li>
                                <li><code>models/</code> — Mongoose schemas</li>
                                <li><code>controllers/</code> — Business logic</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
