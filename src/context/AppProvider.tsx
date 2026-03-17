import { createContext, useState, ReactNode } from 'react'
import { MOCK_PROFESSIONALS } from '@/data/mock'

type AppContextType = {
  isAIChatOpen: boolean
  setAIChatOpen: (open: boolean) => void
  isAuthenticated: boolean
  user: any
  login: (email: string) => any
  logout: () => void
}

export const AppContext = createContext<AppContextType>({} as AppContextType)

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAIChatOpen, setAIChatOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [user, setUser] = useState<any>({ name: 'Administrador Geral', role: 'Administrador' })

  return (
    <AppContext.Provider
      value={{
        isAIChatOpen,
        setAIChatOpen,
        isAuthenticated,
        user,
        login: (email: string) => {
          const prof = MOCK_PROFESSIONALS.find((p) => p.email === email)
          const loggedUser = prof || { name: 'Administrador Geral', role: 'Administrador' }
          setUser(loggedUser)
          setIsAuthenticated(true)
          return loggedUser
        },
        logout: () => {
          setIsAuthenticated(false)
          setUser(null)
        },
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
