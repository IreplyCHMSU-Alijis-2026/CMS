import axios from 'axios'

// Axios instance pre-configured for the Express backend
const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor — e.g., attach auth tokens
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Response interceptor — e.g., handle global errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 Unauthorized globally
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token')
            // Optionally redirect to login
            // window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default api
