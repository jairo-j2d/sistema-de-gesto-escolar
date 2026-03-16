import { createContext, useState, ReactNode } from 'react'

type AppContextType = {
  isAIChatOpen: boolean
  setAIChatOpen: (open: boolean) => void
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

export const AppContext = createContext<AppContextType>({} as AppContextType)

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAIChatOpen, setAIChatOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  return (
    <AppContext.Provider
      value={{
        isAIChatOpen,
        setAIChatOpen,
        isAuthenticated,
        login: () => setIsAuthenticated(true),
        logout: () => setIsAuthenticated(false),
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
