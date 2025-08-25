import { useState } from 'react'
import { useRoutes, Link } from 'react-router-dom'
import './App.css'
import ShowCreators from './pages/ShowCreators.jsx'
import ViewCreator from './pages/ViewCreator.jsx'
import AddCreator from './pages/AddCreator.jsx'
import EditCreator from './pages/EditCreator.jsx'

function AppRoutes() {
  const routes = useRoutes([
    { path: '/', element: <ShowCreators /> },
    { path: '/creators/new', element: <AddCreator /> },
    { path: '/creators/:id', element: <ViewCreator /> },
    { path: '/creators/:id/edit', element: <EditCreator /> },
    { path: '*', element: <div style={{padding:16}}>Not found. <Link to="/">Go Home</Link></div> },
  ])
  return routes
}

export default function App() {
  return (
    <div className="app-container">
      <header className="topbar">
        <div className="container">
          <div className="topbar-content">
            <Link to="/" className="brand">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{marginRight: '8px'}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
              Creator Verse
            </Link>
            <nav>
              <Link to="/creators/new" className="btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add Creator
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <div className="container">
        <AppRoutes />
      </div>
    </div>
  )
}
