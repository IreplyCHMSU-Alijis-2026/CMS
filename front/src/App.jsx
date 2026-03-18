import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoutes'
import './App.css'

function App() {
  return (
    <Routes>


      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>

    </Routes>
  )
}

export default App