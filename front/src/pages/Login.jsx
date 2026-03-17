import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from './icons/ireply-logo-300x150.png'
import Footer from '../components/Footer'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setError('')
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Please fill in all fields.')
      return
    }

    setIsLoading(true)
    // Simulate a login request (no backend yet)
    setTimeout(() => {
      setIsLoading(false)
      // Placeholder: navigate to home on "success"
      navigate('/')
    }, 1500)
  }

  return (
    <div className="login-page">
      <div className="login-content">

        <div className="login-card animate-fade-in-up">
          {/* Logo / Branding */}
          <div className="login-brand">
            <div className="login-brand__icon">
              <img src={logo} alt="Logo" />
            </div>
            <h1 className="login-brand__title">
              Welcome Back
            </h1>
            <p className="login-brand__subtitle">Sign in to your account to continue</p>
          </div>

          {/* Form */}
          <form id="login-form" className="login-form" onSubmit={handleSubmit} noValidate>

            {/* Error message */}
            {error && (
              <div className="login-error" role="alert">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="16" r="1" fill="currentColor" />
                </svg>
                {error}
              </div>
            )}

            {/* Username */}
            <div className="login-field">
              <label htmlFor="login-username" className="login-label">Username</label>
              <div className="login-input-wrapper">
                <span className="login-input-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
                <input
                  id="login-username"
                  type="text"
                  name="username"
                  className="login-input"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  autoFocus
                />
              </div>
            </div>

            {/* Password */}
            <div className="login-field">
              <label htmlFor="login-password" className="login-label">Password</label>
              <div className="login-input-wrapper">
                <span className="login-input-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"
                      stroke="currentColor" strokeWidth="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="login-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <button
                  id="toggle-password-visibility"
                  type="button"
                  className="login-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <line x1="1" y1="1" x2="23" y2="23"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="login-submit-btn"
              type="submit"
              className={`login-btn${isLoading ? ' login-btn--loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="login-spinner" />
                  Signing in…
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login
