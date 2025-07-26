import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './Layout/DashboardLayout'
import ProtectedRoutes from './ProtectedRoute'
import RequireAuth from './RequireAuth'

// Lazy loaded pages
const LoginPage = React.lazy(() => import('./pages/LoginPage'))
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'))
const StudentPage = React.lazy(() => import('./pages/StudentPage'))
const StaffPage = React.lazy(() => import('./pages/StaffPage'))
const Unauthorized = React.lazy(() => import('./pages/Unauthorized'))
const NotFoundPage = React.lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <div className='app'>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route
                  index
                  element={
                    <RequireAuth allowedRoles={['super_admin', 'staff']}>
                      <StudentPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="staff"
                  element={
                    <RequireAuth allowedRoles={['super_admin']}>
                      <StaffPage />
                    </RequireAuth>
                  }
                />
              </Route>
            </Route>

            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  )
}

export default App
