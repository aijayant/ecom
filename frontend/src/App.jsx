import React from 'react'
import AppRoutes from './app/routes'

/**
 * App is a thin shell.
 * All routing logic lives in app/routes.jsx.
 * All layout/global UI (Navbar, Footer) is composed inside AppRoutes.
 */
const App = () => {
  return <AppRoutes />
}

export default App