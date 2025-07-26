import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardLayout from './Layout/DashboardLayout'
import StudentPage from './pages/StudentPage'
import StaffPage from './pages/StaffPage'
import ProtectedRoutes from './ProtectedRoute'
import RequireAuth from './RequireAuth'
import Unauthorized from './pages/Unauthorized'
import NotFoundPage from './pages/NotFound'


function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>

          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/dashboard"
              element={
                <DashboardLayout />
              }
            >
              <Route index element={
                <RequireAuth allowedRoles={['super_admin', 'staff']}>
                  <StudentPage />
                </RequireAuth>
              } />
              <Route path="staff" element={
                <RequireAuth allowedRoles={['super_admin']}>
                  <StaffPage />
                </RequireAuth>
              } />
            </Route>

          </Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App