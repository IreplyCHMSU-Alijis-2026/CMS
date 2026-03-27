import { useState, useEffect, useRef } from 'react'
import carousel1 from './icons/carousel/carousel1.png'
import carousel2 from './icons/carousel/carousel2.png'
import carousel3 from './icons/carousel/carousel3.png'
import './Home.css'
import axiosPrivate from '../api/axiosPrivate'
import axios from 'axios'
import Queue from '../components/Queue'

// const CAROUSEL_SLIDES = [
//     { id: 1, src: carousel1, title: 'Morning Announcements', type: 'Image' },
//     { id: 2, src: carousel2, title: 'School Events', type: 'Image' },
//     { id: 3, src: carousel3, title: 'Weekly Highlights', type: 'Image' },
// ]






function Home() {

    const [queue, setQueue] = useState([]);

    const [nowPlaying, setNowPlaying] = useState([]);

    const [isSubmitting, setIsSubmitting] = useState(false);

  

// const fetchNowPlaying = async () => {
//   try {
//     const res = await axios.get(`${import.meta.env.VITE_API_URL}/public/content`); 
 
//     setNowPlaying(res.data.data);
//   } catch (err) {
//     console.error("Failed to fetch now playing:", err);
//   }
// };

const DEFAULT_VIDEO = {
    _id: "default-video",
    title: "Promo",
    type: "video",
    fileUrl: "https://res.cloudinary.com/du4otsazk/video/upload/v1774593695/l9joevy9vqglkct4rijo.mp4",
    startTime: new Date().toISOString(),
    endTime: new Date(new Date().getTime() + 5 * 60 * 1000).toISOString(),
};

const fetchNowPlaying = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/public/content`);
    const data = res.data.data;

    setNowPlaying(data.length > 0 ? data : [DEFAULT_VIDEO]);
  } catch (err) {
    console.error("Failed to fetch now playing:", err);
   
    setNowPlaying([DEFAULT_VIDEO]);
  }
};


useEffect(() => {
  fetchNowPlaying(); 

  const interval = setInterval(fetchNowPlaying, 30000); 
  return () => clearInterval(interval); 
}, []);

useEffect(() => {
    if (current >= nowPlaying.length) {
        setCurrent(0);
    }
}, [nowPlaying]);

const fetchContent = async () => {
    try {
        const res = await axiosPrivate.get('/content')
        setQueue(res.data.data)
    } catch (err) {
        console.error(err)
    }
}
useEffect(() => {
    fetchContent()
}, [])

    /* ---------- Carousel state ---------- */
    const [current, setCurrent] = useState(0)
    const intervalRef = useRef(null)

// auto-advance carousel
useEffect(() => {
    if (nowPlaying.length === 0) return;

    const slide = nowPlaying[current];

    if (!slide) return;

    if (slide.type === "video") return;

    const timer = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % nowPlaying.length);
    }, 10000);

    return () => clearTimeout(timer);
}, [current, nowPlaying]);

    const goTo = (idx) => {
        clearInterval(intervalRef.current)
        setCurrent(idx)
        startAutoPlay()
    }

    const prev = () => goTo((current - 1 + nowPlaying.length) % nowPlaying.length)
    const next = () => goTo((current + 1) % nowPlaying.length)

    /* ---------- Upload modal state ---------- */
    const [modalOpen, setModalOpen] = useState(false)
    const [dragOver, setDragOver] = useState(false)
    const [uploadName, setUploadName] = useState('')
    const [uploadType, setUploadType] = useState('image')
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


    const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; //  prevent double click

    setIsSubmitting(true); // start loading

    try {
        const formData = new FormData();
        formData.append('file', uploadFile);
        formData.append('title', uploadName);
        formData.append('type', uploadType.toLowerCase());
        formData.append('startTime', uploadDate);
        formData.append('endTime', expiryDate);

        await axiosPrivate.post('/upload', formData);

        alert('Uploaded successfully');
        fetchContent();
        fetchNowPlaying();
        closeModal();

    } catch (err) {
        console.error(err);
        alert('Upload failed');
    } finally {
        setIsSubmitting(false); //  unlock button
    }
};
    /* ---------- Edit modal state & Actions ---------- */
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editItem, setEditItem] = useState({
    _id: null,
    title: '',
    type: 'image',
    startTime: '',
    endTime: '',
    file: null
})

    const openEditModal = (item) => {
    setEditItem({
        _id: item._id,
        title: item.title,
        type: item.type,
        startTime: item.startTime?.slice(0,16), 
        endTime: item.endTime?.slice(0,16) || '',
        file: null
    })
    setEditModalOpen(true)
}

    const closeEditModal = () => setEditModalOpen(false)



const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
        const formData = new FormData();

        formData.append('title', editItem.title);
        formData.append('type', editItem.type);
        formData.append('startTime', editItem.startTime);
        formData.append('endTime', editItem.endTime);

        if (editItem.file) {
            formData.append('file', editItem.file);
        }

        await axiosPrivate.put(`/content/${editItem._id}`, formData);

        // update UI (no reload needed)
        setQueue(prev =>
            prev.map(item =>
                item._id === editItem._id
                    ? { ...item, ...editItem }
                    : item
            )
        );

        fetchContent();
        fetchNowPlaying();

        alert('Updated successfully');
        closeEditModal();

    } catch (err) {
        console.error(err);
        alert('Update failed');
    }
};

    const handleDelete = async (item) => {
    if (!window.confirm(`Are you sure you want to delete "${item.title}"?`)) return;

    try {
        await axiosPrivate.delete(`/content/${item._id}`);
        setQueue(prevQueue => prevQueue.filter(q => q._id !== item._id));
        alert('Deleted successfully');
        fetchContent();
        fetchNowPlaying();
    } catch (err) {
        console.error(err);
        alert('Delete failed');
    }
};

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
  {nowPlaying.map((slide, idx) => (
    <div key={slide._id} className={`carousel-slide ${idx === current ? 'active' : ''}`}>
      {slide.type === "image" ? (
        <img src={slide.fileUrl} alt={slide.title} className="carousel-img" />
      ) : (
        <video
    key={slide._id + current} 
    src={slide.fileUrl}
    className="carousel-img"
    autoPlay
    muted
    playsInline
    controls={false}
    onEnded={() => {
        console.log("Video ended");
        setCurrent((prev) => (prev + 1) % nowPlaying.length);
    }}
/>
      )}
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
                    {/* <div className="carousel-dots">
                        {CAROUSEL_SLIDES.map((_, idx) => (
                            <button
                                key={idx}
                                className={`carousel-dot ${idx === current ? 'active' : ''}`}
                                onClick={() => goTo(idx)}
                                aria-label={`Slide ${idx + 1}`}
                            />
                        ))}
                    </div> */}
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
  {queue.map((item, index) => (
    <Queue
      key={item._id}
      item={item}
      index={index}
      openEditModal={openEditModal}
      handleDelete={handleDelete}
    />
    
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
                                    <option value="image">Image</option>
                                    <option value="video">Video</option>
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
                                <button
                                    type="submit"
                                    className="btn-modal btn-modal--submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Uploading..." : "Add to Queue"}
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
                                    value={editItem.title}
                                    onChange={e => setEditItem({ ...editItem, title: e.target.value })}
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
                                    <option value="image">Image</option>
                                    <option value="video">Video</option>
                                </select>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="edit-schedule">Start Schedule</label>
                                    <input
                                        id="edit-schedule"
                                        className="form-input"
                                        type="datetime-local"
                                        value={editItem.startTime}
                                        onChange={e => setEditItem({ ...editItem, startTime: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="edit-expiry">Expiry Date</label>
                                    <input
                                        id="edit-expiry"
                                        className="form-input"
                                        type="datetime-local"
                                        value={editItem.endTime}
                                        onChange={e => setEditItem({ ...editItem, endTime: e.target.value })}
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
