import img1 from './about-img/1.png';
import img2 from './about-img/2.png';
import img3 from './about-img/3.png';
import img4 from './about-img/4.png';
import img5 from './about-img/5.png';
import img6 from './about-img/6.png';

const students = [
  {
    id: 1,
    name: 'Andrew Lloyd Polidario ',
    role: 'Back-End Developer',
    linkedin: 'http://www.linkedin.com/in/andrew-lloyd-polidario',
    avatar: 'AL',
  },
  {
    id: 2,
    name: 'Dancharl Mondia',
    role: 'Front-End Developer',
    linkedin: 'https://www.linkedin.com/in/dancharl-mondia-b41a49346',
    avatar: 'DM',
  },
  {
    id: 3,
    name: 'Joshua Cordova',
    role: 'Project Manager',
    linkedin: 'http://www.linkedin.com/in/joshua-cordova-445442247',
    avatar: 'JC',
  },
  {
    id: 4,
    name: 'Juvelyn Moreno',
    role: 'Hardware Engineer',
    linkedin: 'http://www.linkedin.com/in/juvelyn-moreno-2804423ba/',
    avatar: 'JM',
  },
  {
    id: 5,
    name: 'Felix Kirk Amante',
    role: 'Front-End Developer',
    linkedin: 'https://www.linkedin.com/in/felix-kirk-amante-283553347?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    avatar: 'FK',
  },
  {
    id: 6,
    name: 'Kissa Sasaki',
    role: 'Hardware Engineer',
    linkedin: 'http://www.linkedin.com/in/kissa-sasaki',
    avatar: 'KS',
  },
  {
    id: 7,
    name: 'Manuel Colorado',
    role: 'Front-End Developer',
    linkedin: 'https://www.linkedin.com/in/manuel-colorado-701916330?trk=blended-typeahead',
    avatar: 'MC',
  },
  {
    id: 8,
    name: 'Rhifel Buscado',
    role: 'Lead Systems Engineer',
    linkedin: 'http://www.linkedin.com/in/rhifel',
    avatar: 'RB',
  },
  {
    id: 9,
    name: 'Shielou Nicole Ferolino',
    role: 'Systems Engineer',
    linkedin: 'http://www.linkedin.com/in/nicole-ferolino',
    avatar: 'JA',
  },
  {
    id: 10,
    name: 'Trizia Asis',
    role: 'QA Engineer',
    linkedin: 'http://www.linkedin.com/in/trizia-asis-3204a63a1',
    avatar: 'TA',
  },
];

const galleryImages = [img1, img2, img3, img4, img5, img6];

const avatarColors = [
  '#6c63ff', '#f59e0b', '#10b981', '#3b82f6',
  '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6',
  '#f97316', '#06b6d4',
];

function Profile() {
  return (
    <div className="co">

      {/* ── SECTION 1: About Us ── */}
      <section className="about-section">
        <div className="about-inner">
          <div className="about-badge">About Us</div>
          <h1 className="about-title">
            Who We <span className="highlight">Are</span>
          </h1>
          <div className="about-divider" />
          <p className="about-text">
            This internship at iReply Back Office Services Inc. has been a transformative milestone in our academic and professional journeys, uniquely structured across two distinct phases that significantly broadened our technical expertise. We would like to express our deepest gratitude to Sir Martin Gilongo, who supervised our foundational training in Voice over IP (VoIP), Unified Communications as a Service (UCaaS), and Network Operations Center (NOC) practices. His guidance allowed us to gain hands-on experience with device configurations, including the Yealink SIP-T46G IP Phone and the Netsapiens Portal. Through rigorous mock call simulations and softphone integrations, we developed critical troubleshooting skills for network connectivity, registration failures, and audio quality issues, laying a strong telecommunications foundation.
          </p>
          <p className="about-text">
            We are equally grateful to our software development mentor, Sir Joedaimar Gozon, whose mentorship was instrumental as we transitioned into the second phase of our training. His guidance shaped our professional developer mindset, emphasizing documentation literacy and independent problem-solving. Under his leadership, we successfully transitioned into practical application, learning to leverage enterprise-level technologies such as the MERN stack, Firebase, and AIoT. His emphasis on quality learning and proper version control via GitHub empowered us to confidently propose and develop the Remote Digital Signage & Public Address (PA) Controller. Building this centralized media orchestrator allowed us to bridge software and hardware, utilizing a React-based Content Management System (CMS), a Node.js server for state management, and a Raspberry Pi acting as an event-driven edge media player. We are also profoundly thankful to the wider iReply development team for their collaborative spirit and for providing industry-standard codebases as invaluable learning resources.
          </p>
          <p className="about-text">
             Finally, this journey would not have been possible without the unwavering dedication and camaraderie within our own ranks. As a united team of seven Computer Engineering and three Information Technology students from Carlos Hilado Memorial State University (CHMSU), the synergy between our disciplines made navigating this dual-phase internship an incredibly rewarding experience. From mastering telecommunications infrastructure to brainstorming complex hardware-software integrations, our shared commitment, mutual support, and collective teamwork were the true driving forces behind our success.
          </p>
        </div>
        <div className="about-glow" />
      </section>

      {/* ── SECTION 2: Student Profiles ── */}
      <section className="team-section">
        <div className="section-header">
          <div className="about-badge">Meet the Team</div>
          <h2 className="section-title">Our <span className="highlight">Students</span></h2>
          <p className="section-subtitle">
            10 driven individuals behind this project — click a name to see them on LinkedIn.
          </p>
        </div>
        <div className="team-grid">
          {students.map((s, i) => (
            <div className="team-card" key={s.id}>
              <div
                className="avatar-circle"
                style={{ background: avatarColors[i % avatarColors.length] }}
              >
                {s.avatar}
              </div>
              <div className="team-info">
                <a
                  href={s.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="team-name-link"
                >
                  {s.name}
                </a>
                <span className="team-role">{s.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: Gallery ── */}
      <section className="gallery-section">
        <div className="section-header">
          <div className="about-badge">Gallery</div>
          <h2 className="section-title">Our <span className="highlight">Moments</span></h2>
          <p className="section-subtitle">
            Captured memories from our journey together.
          </p>
        </div>
        <div className="gallery-grid">
          {galleryImages.map((src, i) => (
            <div className="gallery-item" key={i}>
              <img src={src} alt={`Gallery ${i + 1}`} />
              <div className="gallery-overlay">
                <span>Photo {i + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        /* ── Page base ── */
        .profile-page {
          min-height: 100vh;
          color: #e2e8f0;
          font-family: 'Inter', 'Segoe UI', sans-serif;
          overflow-x: hidden;
        }

        /* ── Reusable badge ── */
        .about-badge {
          display: inline-block;
          background: rgba(108, 99, 255, 0.18);
          color: #5e63ff;
          border: 1px solid rgba(108, 99, 255, 0.4);
          padding: 4px 16px;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .highlight {
          background: linear-gradient(90deg, #5e63ff, #070ad5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Section 1: About ── */
        .about-section {
          position: relative;
          padding: 40px 6vw 10px;
          text-align: center;
          overflow: hidden;
        }

        .about-inner {
          position: relative;
          z-index: 2;
        }

        .about-title {
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 800;
          margin: 0 0 16px;
          line-height: 1.15;
          color: #f1f5f9;
        }

        .about-divider {
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #5e63ff, #4648c4ff);
          border-radius: 2px;
          margin: 0 auto 28px;
        }

        .about-text {
          font-size: 1.05rem;
          line-height: 1.85;
          color: #94a3b8;
          margin-bottom: 20px;
        }

        .about-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }

        /* ── Section headers (shared) ── */
        .section-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .section-title {
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 800;
          color: #f1f5f9;
          margin: 0 0 10px;
        }

        .section-subtitle {
          color: #64748b;
          font-size: 1rem;
          max-width: 480px;
          margin: 0 auto;
        }

        /* ── Section 2: Team ── */
        .team-section {
          padding: 60px 6vw 80px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }

        .team-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 18px 20px;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 16px;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          backdrop-filter: blur(10px);
          cursor: pointer;
        }

        .team-info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 6px;
          flex: 1;
          min-width: 0;
        }

        .team-card:hover {
          transform: translateY(-6px);
          border-color: rgba(129, 140, 248, 0.45);
          box-shadow: 0 12px 40px rgba(99, 102, 241, 0.18);
        }

        .avatar-circle {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.04em;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
          flex-shrink: 0;
        }

        .team-name-link {
          font-size: 0.88rem;
          font-weight: 600;
          color: #a5b4fc;
          text-decoration: none;
          text-align: left;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.2s;
        }

        .team-name-link:hover {
          color: #c4b5fd;
          text-decoration: underline;
        }

        .team-role {
          font-size: 0.72rem;
          color: #64748b;
          text-align: left;
          line-height: 1.4;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* ── Section 3: Gallery ── */
        .gallery-section {
          padding: 40px 5vw 10px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .gallery-item {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 4/3;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.07);
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .gallery-item:hover img {
          transform: scale(1.06);
        }

        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15,12,41,0.75) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: flex-end;
          padding: 16px;
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .gallery-overlay span {
          color: #e2e8f0;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.04em;
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .gallery-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default Profile;