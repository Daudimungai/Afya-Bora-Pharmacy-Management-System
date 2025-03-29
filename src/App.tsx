import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';
import { Patients } from './pages/Patients';
import { Prescriptions } from './pages/Prescriptions';
import { Sales } from './pages/Sales';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { ErrorBoundary } from './components/ErrorBoundary';

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/prescriptions" element={<Prescriptions />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;