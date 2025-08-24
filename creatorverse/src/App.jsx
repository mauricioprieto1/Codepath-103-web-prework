import { useState } from 'react'
import { useRoutes, Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ShowCreators from './pages/ShowCreators.jsx'
import ViewCreator from '.pages/ViewCreator'
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
    <div className="container">
      <header className="topbar">
        <Link to="/" className="brand">CreatorVerse</Link>
        <nav>
          <Link to="/creators/new" className="btn">Add Creator</Link>
        </nav>
      </header>
      <AppRoutes />
    </div>
  )
}
