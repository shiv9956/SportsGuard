import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import DashLayout from './components/DashLayout';
import { Toaster } from 'sonner';

// Pages
const Landing = React.lazy(() => import('./pages/Landing'));
const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Assets = React.lazy(() => import('./pages/Assets'));
const Scan = React.lazy(() => import('./pages/Scan'));
const Detections = React.lazy(() => import('./pages/Detections'));
const Insights = React.lazy(() => import('./pages/Insights'));

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <React.Suspense fallback={<div className="bg-bg-void h-screen flex items-center justify-center text-brand-blaze font-mono animate-pulse">LOADING_MODULES...</div>}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login isRegister />} />
            
            <Route path="/dashboard" element={<DashLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="assets" element={<Assets />} />
              <Route path="threats" element={<Detections />} />
              <Route path="scan" element={<Scan />} />
              <Route path="insights" element={<Insights />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </React.Suspense>
        <Toaster theme="dark" position="bottom-right" toastOptions={{
          style: { borderRadius: '0px', background: '#111111', border: '1px solid #27272A', color: '#fff', fontFamily: 'Manrope' }
        }} />
      </BrowserRouter>
    </AuthProvider>
  );
}
