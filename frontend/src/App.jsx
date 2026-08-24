import React from 'react'
import AppRoutes from './routes/AppRoutes'

/**
 * App is a thin shell.
 * All routing logic lives in routes/AppRoutes.jsx.
 * All layout/global UI (Navbar, Footer) is composed inside AppRoutes.
 */
const App = () => {
  return <AppRoutes />
}

export default App