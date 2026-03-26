import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import HunterDashboard from './pages/HunterDashboard'
import CompanyDashboard from './pages/CompanyDashboard'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/hunter" element={<HunterDashboard />} />
      <Route path="/company" element={<CompanyDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  )
}

export default App

// **الشرح:**
// ```
// Routes   → حاوي كل الصفحات
// Route    → صفحة واحدة
// path     → العنوان في الـ URL
// element  → الـ Component اللي هيتعرض