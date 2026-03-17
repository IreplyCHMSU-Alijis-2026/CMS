import './LogoutModal.css'

function LogoutModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay animate-fade-in" onClick={onCancel}>
      <div
        className="modal-container animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-glass">
          <div className="modal-icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor">
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>
          </div>
          <h2 className="modal-title">Sign Out</h2>
          <p className="modal-description">Are you sure you want to log out?</p>

          <div className="modal-actions">
            <button className="modal-btn modal-btn--cancel" onClick={onCancel}>
              Stay
            </button>
            <button className="modal-btn modal-btn--confirm" onClick={onConfirm}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
