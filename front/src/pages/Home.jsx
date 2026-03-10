import { useState, useEffect, useRef } from 'react'
import carousel1 from './icons/carousel/carousel1.png'
import carousel2 from './icons/carousel/carousel2.png'
import carousel3 from './icons/carousel/carousel3.png'
import './Home.css'

const CAROUSEL_SLIDES = [
    { id: 1, src: carousel1, title: 'Morning Announcements', type: 'Image' },
    { id: 2, src: carousel2, title: 'School Events', type: 'Image' },
    { id: 3, src: carousel3, title: 'Weekly Highlights', type: 'Image' },
]

const INITIAL_QUEUE = [
    { id: 1, name: 'Morning Announcements', type: 'Image', schedule: '2026-03-06 07:00 AM' },
    { id: 2, name: 'School Events', type: 'Image', schedule: '2026-03-06 09:00 AM' },
    { id: 3, name: 'Campus Tour Video', type: 'Video', schedule: '2026-03-06 11:00 AM' },
    { id: 4, name: 'Weekly Highlights', type: 'Image', schedule: '2026-03-06 01:00 PM' },
    { id: 5, name: 'Promo Video', type: 'Video', schedule: '2026-03-06 03:00 PM' },
]

function Home() {
    /* ---------- Carousel state ---------- */
    const [current, setCurrent] = useState(0)
    const intervalRef = useRef(null)

    const startAutoPlay = () => {
        intervalRef.current = setInterval(() => {
            setCurrent(prev => (prev + 1) % CAROUSEL_SLIDES.length)
        }, 4000)
    }

    useEffect(() => {
        startAutoPlay()
        return () => clearInterval(intervalRef.current)
    }, [])

    const goTo = (idx) => {
        clearInterval(intervalRef.current)
        setCurrent(idx)
        startAutoPlay()
    }

    const prev = () => goTo((current - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length)
    const next = () => goTo((current + 1) % CAROUSEL_SLIDES.length)

    /* ---------- Upload modal state ---------- */
    const [modalOpen, setModalOpen] = useState(false)
    const [dragOver, setDragOver] = useState(false)
    const [uploadName, setUploadName] = useState('')
    const [uploadType, setUploadType] = useState('Image')
    const [uploadDate, setUploadDate] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [uploadFile, setUploadFile] = useState(null)
    const fileInputRef = useRef(null)

    const openModal = () => { setModalOpen(true); resetForm() }
    const closeModal = () => setModalOpen(false)

    const resetForm = () => {
        setUploadName('')
        setUploadType('Image')
        setUploadDate('')
        setExpiryDate('')
        setUploadFile(null)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setDragOver(false)
        const file = e.dataTransfer.files[0]
        if (file) setUploadFile(file)
    }

    const handleFileInput = (e) => {
        const file = e.target.files[0]
        if (file) setUploadFile(file)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // TODO: wire to backend
        alert(`Queued: "${uploadName}" (${uploadType}) for ${uploadDate} to ${expiryDate || 'No Expiry'}`)
        closeModal()
    }

    /* ---------- Edit modal state & Actions ---------- */
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editItem, setEditItem] = useState({
        id: null,
        name: '',
        type: 'Image',
        schedule: '',
        expiry: ''
    })

    const openEditModal = (item) => {
        // Since INITIAL_QUEUE current schedule string '2026-03-06 07:00 AM' 
        // doesn't fit neatly into datetime-local directly natively without parsing,
        // we leave it mostly empty or use it exactly as provided for this static demo.
        setEditItem({
            id: item.id,
            name: item.name,
            type: item.type,
            schedule: '', // Would need parsed date here for proper UX
            expiry: ''
        })
        setEditModalOpen(true)
    }

    const closeEditModal = () => setEditModalOpen(false)

    const handleEditSubmit = (e) => {
        e.preventDefault()
        alert(`Edited Item [${editItem.id}]: "${editItem.name}" (${editItem.type}) for ${editItem.schedule} to ${editItem.expiry || 'No Expiry'}`)
        closeEditModal()
    }

    const handleDelete = (item) => {
        if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
            // TODO: wire to backend
            alert(`Deleted "${item.name}"`)
        }
    }

    return (
        <div className="cms-page" id="home-page">

            {/* ======== NOW PLAYING ======== */}
            <section className="cms-section" id="now-playing-section">
                <div className="cms-section__header">
                    <span className="cms-section__dot"></span>
                    <h1 className="cms-section__title">Now Playing</h1>
                </div>

                <div className="carousel-wrapper">
                    {/* Slides */}
                    <div className="carousel-track">
                        {CAROUSEL_SLIDES.map((slide, idx) => (
                            <div
                                key={slide.id}
                                className={`carousel-slide ${idx === current ? 'active' : ''}`}
                            >
                                <img src={slide.src} alt={slide.title} className="carousel-img" />
                                <div className="carousel-caption">
                                    <span className="carousel-caption__type">{slide.type}</span>
                                    <span className="carousel-caption__title">{slide.title}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Arrows */}
                    <button className="carousel-arrow carousel-arrow--prev" onClick={prev} aria-label="Previous">
                        ‹
                    </button>
                    <button className="carousel-arrow carousel-arrow--next" onClick={next} aria-label="Next">
                        ›
                    </button>

                    {/* Dots */}
                    <div className="carousel-dots">
                        {CAROUSEL_SLIDES.map((_, idx) => (
                            <button
                                key={idx}
                                className={`carousel-dot ${idx === current ? 'active' : ''}`}
                                onClick={() => goTo(idx)}
                                aria-label={`Slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ======== QUEUE ======== */}
            <section className="cms-section" id="queue-section">
                <div className="cms-section__header">
                    <h2 className="cms-section__title cms-section__title--sm">Queue</h2>
                    <button className="upload-btn" onClick={openModal} id="open-upload-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
                            <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                        </svg>
                        Upload
                    </button>
                </div>

                <div className="queue-table-wrapper">
                    <table className="queue-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Schedule</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {INITIAL_QUEUE.map((item) => (
                                <tr key={item.id}>
                                    <td className="queue-table__num">{item.id}</td>
                                    <td className="queue-table__name">{item.name}</td>
                                    <td>
                                        <span className={`badge badge--${item.type.toLowerCase()}`}>
                                            {item.type === 'Video'
                                                ? <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="currentColor"><path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" /></svg>
                                                : <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="currentColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-800v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Z" /></svg>
                                            }
                                            {item.type}
                                        </span>
                                    </td>
                                    <td className="queue-table__schedule">{item.schedule}</td>
                                    <td>
                                        <button className="queue-action queue-action--edit" title="Edit" onClick={() => openEditModal(item)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg>
                                        </button>
                                        <button className="queue-action queue-action--delete" title="Delete" onClick={() => handleDelete(item)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* ======== UPLOAD MODAL ======== */}
            {modalOpen && (
                <div className="modal-overlay" onClick={closeModal} id="upload-modal-overlay">
                    <div className="modal" onClick={e => e.stopPropagation()} id="upload-modal">
                        <div className="modal__header">
                            <h3 className="modal__title">Upload Content</h3>
                            <button className="modal__close" onClick={closeModal} aria-label="Close">✕</button>
                        </div>

                        <form className="modal__form" onSubmit={handleSubmit}>
                            {/* Drag & Drop Zone */}
                            <div
                                className={`dropzone ${dragOver ? 'dropzone--active' : ''} ${uploadFile ? 'dropzone--filled' : ''}`}
                                onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current.click()}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*,video/*"
                                    hidden
                                    onChange={handleFileInput}
                                />
                                {uploadFile ? (
                                    <div className="dropzone__filled">
                                        <span className="dropzone__file-icon">📁</span>
                                        <span className="dropzone__file-name">{uploadFile.name}</span>
                                        <span className="dropzone__file-size">
                                            {(uploadFile.size / 1024 / 1024).toFixed(2)} MB
                                        </span>
                                    </div>
                                ) : (
                                    <>
                                        <div className="dropzone__icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor">
                                                <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                                            </svg>
                                        </div>
                                        <p className="dropzone__text">Drag & drop your file here</p>
                                        <p className="dropzone__sub">or <span>click to browse</span></p>
                                        <p className="dropzone__hint">Supports: JPG, PNG, MP4, MOV</p>
                                    </>
                                )}
                            </div>

                            {/* Fields */}
                            <div className="form-group">
                                <label className="form-label" htmlFor="upload-name">Content Name</label>
                                <input
                                    id="upload-name"
                                    className="form-input"
                                    type="text"
                                    placeholder="e.g. Monday Announcements"
                                    value={uploadName}
                                    onChange={e => setUploadName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="upload-type">Type</label>
                                <select
                                    id="upload-type"
                                    className="form-input"
                                    value={uploadType}
                                    onChange={e => setUploadType(e.target.value)}
                                >
                                    <option value="Image">Image</option>
                                    <option value="Video">Video</option>
                                </select>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="upload-schedule">Start Schedule</label>
                                    <input
                                        id="upload-schedule"
                                        className="form-input"
                                        type="datetime-local"
                                        value={uploadDate}
                                        onChange={e => setUploadDate(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="upload-expiry">Expiry Date</label>
                                    <input
                                        id="upload-expiry"
                                        className="form-input"
                                        type="datetime-local"
                                        value={expiryDate}
                                        onChange={e => setExpiryDate(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="modal__actions">
                                <button type="button" className="btn-modal btn-modal--cancel" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-modal btn-modal--submit">
                                    Add to Queue
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ======== EDIT MODAL ======== */}
            {editModalOpen && (
                <div className="modal-overlay" onClick={closeEditModal} id="edit-modal-overlay">
                    <div className="modal" onClick={e => e.stopPropagation()} id="edit-modal">
                        <div className="modal__header">
                            <h3 className="modal__title">Edit Content</h3>
                            <button className="modal__close" onClick={closeEditModal} aria-label="Close">✕</button>
                        </div>

                        <form className="modal__form" onSubmit={handleEditSubmit}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="edit-name">Content Name</label>
                                <input
                                    id="edit-name"
                                    className="form-input"
                                    type="text"
                                    placeholder="e.g. Monday Announcements"
                                    value={editItem.name}
                                    onChange={e => setEditItem({ ...editItem, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="edit-type">Type</label>
                                <select
                                    id="edit-type"
                                    className="form-input"
                                    value={editItem.type}
                                    onChange={e => setEditItem({ ...editItem, type: e.target.value })}
                                >
                                    <option value="Image">Image</option>
                                    <option value="Video">Video</option>
                                </select>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="edit-schedule">Start Schedule</label>
                                    <input
                                        id="edit-schedule"
                                        className="form-input"
                                        type="datetime-local"
                                        value={editItem.schedule}
                                        onChange={e => setEditItem({ ...editItem, schedule: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="edit-expiry">Expiry Date</label>
                                    <input
                                        id="edit-expiry"
                                        className="form-input"
                                        type="datetime-local"
                                        value={editItem.expiry}
                                        onChange={e => setEditItem({ ...editItem, expiry: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="modal__actions">
                                <button type="button" className="btn-modal btn-modal--cancel" onClick={closeEditModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-modal btn-modal--submit">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home
