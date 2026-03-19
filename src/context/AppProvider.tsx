import { createContext, useState, ReactNode } from 'react'

type AppContextType = {
  isAIChatOpen: boolean
  setAIChatOpen: (open: boolean) => void
}

export const AppContext = createContext<AppContextType>({} as AppContextType)

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAIChatOpen, setAIChatOpen] = useState(false)

  return (
    <AppContext.Provider
      value={{
        isAIChatOpen,
        setAIChatOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
