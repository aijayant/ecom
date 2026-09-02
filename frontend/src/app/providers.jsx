import React, { createContext, useContext, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

/**
 * 1. TanStack Query Client Setup
 * Configures global defaults for React Query.
 * - staleTime: Prevents refetching data that is less than 1 minute old.
 * - retry: Limits failed requests to 1 automatic retry.
 */
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000, 
            retry: 1,
        },
    },
})

/**
 * 2. Auth Context Setup
 * Provides global authentication state across the application.
 */
const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    // Access token is held in React state (memory) rather than localStorage
    // to mitigate XSS (Cross-Site Scripting) vulnerability risks.
    const [accessToken, setAccessToken] = useState(null)

    // Derived state to easily check authentication status
    const isAuthenticated = !!accessToken

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)

/**
 * 3. Master Provider Component
 * Wraps the application to inject required contexts (React Query, Auth).
 */
export const AppProviders = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </QueryClientProvider>
    )
}
