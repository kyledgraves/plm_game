import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import MissionSelect from './pages/MissionSelect'
import Results from './pages/Results'
import LoadingSpinner from './components/ui/LoadingSpinner'
import { ErrorBoundary } from './components/error/ErrorBoundary'

const Mission1_1 = lazy(() => import('./pages/Act1/Mission1_1'))
const Mission1_2 = lazy(() => import('./pages/Act1/Mission1_2'))
const Mission1_3 = lazy(() => import('./pages/Act1/Mission1_3'))
const Mission1_4 = lazy(() => import('./pages/Act1/Mission1_4'))
const Mission1_5 = lazy(() => import('./pages/Act1/Mission1_5'))
const Mission2_1 = lazy(() => import('./pages/Act2/Mission2_1'))
const Mission2_2 = lazy(() => import('./pages/Act2/Mission2_2'))
const Mission2_3 = lazy(() => import('./pages/Act2/Mission2_3'))
const Mission2_4 = lazy(() => import('./pages/Act2/Mission2_4'))
const Mission3_1 = lazy(() => import('./pages/Act3/Mission3_1'))
const Mission3_2 = lazy(() => import('./pages/Act3/Mission3_2'))
const Mission3_3 = lazy(() => import('./pages/Act3/Mission3_3'))
const Mission3_4 = lazy(() => import('./pages/Act3/Mission3_4'))
const Mission3_5 = lazy(() => import('./pages/Act3/Mission3_5'))
const Mission3_6 = lazy(() => import('./pages/Act3/Mission3_6'))
const Mission4_1 = lazy(() => import('./pages/Act4/Mission4_1'))
const Mission4_2 = lazy(() => import('./pages/Act4/Mission4_2'))
const Mission4_3 = lazy(() => import('./pages/Act4/Mission4_3'))
const Mission4_4 = lazy(() => import('./pages/Act4/Mission4_4'))
const Mission4_5 = lazy(() => import('./pages/Act4/Mission4_5'))

function App() {
  return (
    <Routes>
      <Route element={< Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="missions" element={<MissionSelect />} />
        <Route path="results" element={<Results />} />
        
        <Route path="mission/1_1" element={
          <ErrorBoundary><Suspense fallback={<LoadingSpinner />}><Mission1_1 /></Suspense></ErrorBoundary>
        } />
        <Route path="mission/1_2" element={
          <ErrorBoundary><Suspense fallback={<LoadingSpinner />}><Mission1_2 /></Suspense></ErrorBoundary>
        } />
        <Route path="mission/1_3" element={
          <ErrorBoundary><Suspense fallback={<LoadingSpinner />}><Mission1_3 /></Suspense></ErrorBoundary>
        } />
        <Route path="mission/1_4" element={
          <ErrorBoundary><Suspense fallback={<LoadingSpinner />}><Mission1_4 /></Suspense></ErrorBoundary>
        } />
        <Route path="mission/1_5" element={
          <ErrorBoundary><Suspense fallback={<LoadingSpinner />}><Mission1_5 /></Suspense></ErrorBoundary>
        } />
        <Route path="mission/2_1" element={
          <ErrorBoundary><Suspense fallback={<LoadingSpinner />}><Mission2_1 /></Suspense></ErrorBoundary>
        } />
        <Route path="mission/2_2" element={
          <ErrorBoundary><Suspense fallback={<LoadingSpinner />}><Mission2_2 /></Suspense></ErrorBoundary>
        } />
        <Route path="mission/2_3" element={
          <ErrorBoundary><Suspense fallback={<LoadingSpinner />}><Mission2_3 /></Suspense></ErrorBoundary>
        } />
        <Route path="mission/2_4" element={
          <ErrorBoundary><Suspense fallback={<LoadingSpinner />}><Mission2_4 /></Suspense></ErrorBoundary>
        } />
        <Route path="mission/3_1" element={
          <ErrorBoundary><Suspense fallback={<LoadingSpinner />}><Mission3_1 /></Suspense></ErrorBoundary>
        } />
        <Route path="mission/3_2" element={
          <ErrorBoundary><Suspense fallback={<LoadingSpinner />}><Mission3_2 /></Suspense></ErrorBoundary>
        } />
        <Route path="mission/3_3" element={
          <ErrorBoundary><Suspense fallback={<LoadingSpinner />}><Mission3_3 /></Suspense></ErrorBoundary>
        } />
        <Route path="mission/3_4" element={
          <ErrorBoundary><Suspense fallback={<LoadingSpinner />}><Mission3_4 /></Suspense></ErrorBoundary>
        } />
        <Route path="mission/3_5" element={
          <ErrorBoundary><Suspense fallback={<LoadingSpinner />}><Mission3_5 /></Suspense></ErrorBoundary>
        } />
        <Route path="mission/3_6" element={
          <ErrorBoundary><Suspense fallback={<LoadingSpinner />}><Mission3_6 /></Suspense></ErrorBoundary>
        } />
        <Route path="mission/4_1" element={
          <ErrorBoundary><Suspense fallback={<LoadingSpinner />}><Mission4_1 /></Suspense></ErrorBoundary>
        } />
        <Route path="mission/4_2" element={
          <ErrorBoundary><Suspense fallback={<LoadingSpinner />}><Mission4_2 /></Suspense></ErrorBoundary>
        } />
        <Route path="mission/4_3" element={
          <ErrorBoundary><Suspense fallback={<LoadingSpinner />}><Mission4_3 /></Suspense></ErrorBoundary>
        } />
        <Route path="mission/4_4" element={
          <ErrorBoundary><Suspense fallback={<LoadingSpinner />}><Mission4_4 /></Suspense></ErrorBoundary>
        } />
        <Route path="mission/4_5" element={
          <ErrorBoundary><Suspense fallback={<LoadingSpinner />}><Mission4_5 /></Suspense></ErrorBoundary>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
